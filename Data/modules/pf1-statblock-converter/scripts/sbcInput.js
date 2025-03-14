import { sbcConfig } from "./sbcConfig.js";
import { sbcApp } from "./sbc.js";
import { sbcParser } from "./sbcParser.js";
import { sbcUtils } from "./sbcUtils.js";
import { sbcData, sbcError } from "./sbcData.js";
import { sbcRenderer } from "./sbcRenderer.js";

/* ------------------------------------ */
/* sbcInputDialog                        */
/* Create a modal dialog with           */
/* an input, preview and error area.    */
/* Input is saved in a raw format and   */
/* send to sbcParser.js to convert to   */
/* workable data.                       */
/* ------------------------------------ */

export class sbcInputDialog extends Application {

    constructor(options){
        super(options)
    }

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
          "id": "sbcModal",
          "template": "modules/pf1-statblock-converter/templates/sbcModal.html",
          "width": 1600,
          "height": 800,
          "resizable": true,
          "classes": ["sbcModal"],
          "popOut": true,
          "title": "sbc | Statblock Converter by Fair Strides",
          "scrollY": [".sbcInput", ".sbcHighlights"]});
    }

    static sbcInputDialogInstance = {}

    static async renderInputDialog() {
        sbcApp.resetSBC(true);

        sbcInputDialog.sbcInputDialogInstance = new sbcInputDialog()
        sbcData.actorType = +sbcConfig.options.defaultActorType

        sbcInputDialog.sbcInputDialogInstance.render(true)

    }

    /* ------------------------------------ */
    /* eventListeners                        */
    /* ------------------------------------ */

    activateListeners(html) {
        super.activateListeners(html);

        /* ------------------------------------ */
        /* ActorType Toggle                        */
        /* ------------------------------------ */
        let actorTypeToggle = $(".actorTypeToggle")

        // Check if the defaultActorType is pc instead of npc
        if (sbcData.actorType === 1) {
            let actorTypeToggle = $(".actorTypeToggle")
            actorTypeToggle.addClass("createPC")
        }

        actorTypeToggle.on("click", async function() {
            // When the actorTypeToggle is clicked, check if there i input and try to generate an updated preview
            sbcUtils.log("Switching between PC and NPC actor type")

            await sbcUtils.resetCategoryCounter()
            await sbcRenderer.updateActorType()

            await sbcUtils.resetCharacterData()

            if (sbcData.input) {
                await sbcParser.prepareInput(sbcInputDialog.characterData, sbcInputDialog.input)
            }

            if (sbcData.parsedInput.success) {
                sbcConfig.options.actorReady = true
                sbcRenderer.updatePreview()
                sbcRenderer.updateErrorArea()
                Hooks.callAll("sbc.inputParsed");
            }

            sbcRenderer.updateErrorArea()
        })

        /* ------------------------------------ */
        /* Input Area (with delay)                */
        /* ------------------------------------ */

        // Get the input from the textArea
        // delayed by inputDelay so not every keystroke results in a previewGeneration
        let inputArea = $(".sbcContainer #sbcInput")
        inputArea.on("keyup", _debounce( async () => {
          sbcData.preparedInput = {}
          sbcData.parsedInput = {}
          sbcData.notes = {}
          sbcData.characterData.items = []
          sbcData.input = inputArea.val().trim()
          sbcUtils.resetFlags()

          await sbcUtils.resetCharacterData()

          // Check, if there is an input and try to parse that
          if (sbcData.input) {
            // Prepare and parse the input
            await sbcParser.prepareInput(inputArea);

            // if the input could successly be parsed, generate a new preview
            if (sbcData.parsedInput.success) {
              sbcRenderer.updatePreview();
              sbcRenderer.updateErrorArea();
              sbcConfig.options.actorReady = true;
              Hooks.callAll("sbc.inputParsed");
            } else {
              // The input could not be parsed
              let errorMessage = "Could not parse the input"
              let error = new sbcError(0, "Parse", errorMessage)
              sbcData.errors.push(error)
              sbcConfig.options.actorReady = false
              sbcRenderer.logErrors()
            }
          } else {
            // There is no input to generate a preview from, reset sbc
            sbcApp.resetSBC()
            sbcConfig.options.actorReady = false
          }
        }, sbcConfig.options.inputDelay))

        // Link the scroll event to the backdrop of the highlights
        inputArea.on("scroll", function () {

            let backdrop = $("#sbcBackdrop")
            let scrollTop = inputArea.scrollTop()

            backdrop.scrollTop(scrollTop)

        })

        /* ------------------------------------ */
        /* Import Button                        */
        /* ------------------------------------ */

        // Get the input from the textArea when sbcImportButton is clicked
        let sbcImportButton = $(".sbcContainer #sbcImportButton")
        sbcImportButton.on("click", async function() {
          sbcUtils.log("Processing input")

          // If there is Input
          if (sbcData.input) {
            // If the input could be parsed correctly
            if (sbcConfig.options.actorReady) {
              // try {
                // Create a permanent actor using the data from the temporary one
                let actorData = sbcData.characterData.actorData.toObject();
                let actorUpdates = pf1.migrations.migrateActorData(actorData, null, {actor: sbcData.characterData.actorData });
                if (!foundry.utils.isEmpty(actorUpdates)) {
                    await sbcData.characterData.actorData.update(actorUpdates);
                }

                // Fix health if it's off from max after all that.
                // Needs to be done here with real actor since the temporary misbehaves with health.
                const hp = sbcData.characterData.actorData.system.attributes.hp;
                if (hp.value !== hp.max) await sbcData.characterData.actorData.update({ "attributes.hp.value": hp.max });

                await sbcData.characterData.actorData.update({ "folder": sbcData.customFolderId })
                sbcData.imported = true;
                sbcInputDialog.sbcInputDialogInstance.close()
                sbcApp.resetSBC(false)
              // } catch (err) {
              //     throw err
              // }
            } else {
              let errorMessage = "Could not create an Actor"
              let error = new sbcError(0, "Import", errorMessage)

              sbcData.errors.push(error)
              sbcRenderer.logErrors()
            }
          } else {
            let errorMessage = "No Input found"
            let error = new sbcError(0, "Input", errorMessage)

            sbcData.errors.push(error)
            sbcRenderer.logErrors()
          }
        })

        // Reset everything
        let sbcResetButton = $(".sbcContainer #sbcResetButton")
        sbcResetButton.on("click", async function() {
          sbcUtils.resetCharacterData();
          sbcApp.resetSBC()
        })
    }

}

/* ------------------------------------ */
/* Input Delay                          */
/* ------------------------------------ */
function _debounce(callback, wait) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(function () { callback.apply(this, args) }, wait);
    };
}
