import { sbcData, sbcError, sbcErrorLevels } from "./sbcData.js"
import { sbcUtils } from "./sbcUtils.js"
import { sbcConfig } from "./sbcConfig.js"
import { sbcApp } from "./sbc.js"

export class sbcRenderer {
    static resetErrorLog () {
        sbcData.errors = []
        let errorArea = $(".sbcErrorContainer #sbcErrors")
        errorArea.html("")
        this.updateErrorArea()
    }

    static resetInput() {
        let inputArea = $(".sbcContainer #sbcInput")
        this.resetHighlights()
        inputArea.val(null)
    }

    static resetHighlights () {
        let highlights = $("#sbcHighlights")
        highlights.html("")
    }

    static resetPreview() {
        let previewArea = $(".sbcContainer #sbcPreview")
        previewArea.html("")
    }

    static resetNotes() {
        sbcData.notes = {}
    }

    static async updatePreview() {
        this.resetPreview()
        let previewArea = $(".sbcContainer #sbcPreview")
        let preview = await renderTemplate('modules/pf1-statblock-converter/templates/sbcPreview.hbs' , {actor: sbcData.characterData.actorData, notes: sbcData.notes })
        previewArea.append(preview)
    }

    static updateErrorArea() {
        sbcRenderer.logErrors()

        // Check, if there are buttons in the area
        let parseTreasureAsGearButton = $("#parseTreasureAsGearButton")
        parseTreasureAsGearButton.on("click", async function() {
            sbcRenderer.parseTreasureAsGear()
        })
    }

    static async updateActorType() {

        let actorTypeToggle = $(".actorTypeToggle")

        if (sbcData.actorType === 0) {
            sbcData.actorType = 1
            actorTypeToggle.addClass("createPC")
        } else {
            sbcData.actorType = 0;
            actorTypeToggle.removeClass("createPC")
        }

        sbcData.characterData.actorData.update({
            type: sbcConfig.const.actorType[sbcData.actorType]
        });

    }

    // Hacky Stuff
    static async parseTreasureAsGear() {

        // Remove the treasure line
        sbcData.preparedInput.data.splice(sbcData.treasureParsing.lineToRemove, 1)

        // Add the treasure line into statistics
        sbcData.treasureParsing.treasureToParse = sbcData.treasureParsing.treasureToParse.replace(/,?\s?other treasure/i, '');
        sbcData.preparedInput.data.splice(sbcData.treasureParsing.statisticsStartLine+1, 0, "Gear " + sbcData.treasureParsing.treasureToParse)

        let newInput = sbcData.preparedInput.data.join("\n")

        // Reset sbc and reparse with the new values
        let inputArea = $(".sbcContainer #sbcInput")
        await sbcUtils.resetCharacterData();
        await sbcApp.resetSBC();
        inputArea.val(newInput)
        inputArea.keyup()


    }

    /* ------------------------------------ */
    /* ProgressBar Related Stuff            */
    /* ------------------------------------ */

    /*
    * TOTAL = 1
    * "preparation" = 0.1
    * "parsing" = 0.6
    * "entityCreation" = 0.2
    * "checkFlags" =  0.05
    * "generateNotes" = 0.05
    */

    static async updateProgressBar (process = "", subProcess = "", total = 1, step = 1) {

        let widthPreparation = 0.10
        let widthParsing = 0.60
        let widthEntities = 0.20
        let widthFlags =  0.05
        let widthPreview = 0.05

        let progressBar = $( "#sbcProgressBar" )
        let progressBarValue = $( "#sbcProgressValue" )
        let increment = 100 / total

        let newWidth = 0
        let progressBarText = ""

        switch (process.toLowerCase()) {
            case "preparation":
                progressBar.removeClass("ready")
                newWidth = Math.floor( widthPreparation * increment * step )
                progressBarText = process + ": " + subProcess
                break
            case "parsing":
                newWidth = Math.floor( 100 * ( widthPreparation ) + widthParsing * increment * step )
                progressBarText = process + ": " + subProcess
                break
            case "entities":
                newWidth = Math.floor( 100 * ( widthParsing + widthPreparation ) + widthEntities * increment * step )
                progressBarText = subProcess
                break
            case "flags":
                newWidth = Math.floor( 100 * ( widthEntities + widthParsing + widthPreparation ) + widthFlags * increment * step )
                progressBarText = subProcess
                break
            case "preview":
                newWidth = Math.floor( 100 * ( widthFlags + widthEntities + widthParsing + widthPreparation ) + widthPreview * increment * step )
                progressBarText = subProcess
                break
            case "actor":
                newWidth = 100
                progressBarText = subProcess
                progressBar.addClass("ready")
            default:
                break
        }

        progressBar.css("width", newWidth + "%")
        progressBarValue.empty().append(progressBarText)
    }

    static logErrors() {

        if (sbcData.errors.length > 0) {

            let errorLines = []

            let errorArea = $(".sbcErrorContainer #sbcErrors")
            errorArea.empty()
            errorArea.append("There were " + sbcData.errors.length + " issue(s) parsing the provided statblock:<br/>")

            let lastText = ""
            let lastId = 0
            let duplicateErrors = 2

            sbcUtils.log("> There were " + sbcData.errors.length + " issue(s) parsing the provided statblock:");

            // Loop over all errors and create error messages as well as highlight problematic areas in the input
            for(let i=0; i<sbcData.errors.length; i++) {

                let error = sbcData.errors[i]

                let id = "sbcError-" + i
                let level = sbcErrorLevels[error.level]
                let keyword = error.keyword
                let text = error.message
                let line = error.line
                let message = level
                if (error.level < 2) {
                    message += " >> " + keyword + " failed "
                }
                message += " >> " + text

                if (text == lastText) {

                    let duplicateErrorIndicator = $("#" + lastId)
                    duplicateErrorIndicator.text(duplicateErrors)

                    duplicateErrorIndicator.addClass("active")
                    duplicateErrors++

                } else {

                    // Create a new error message in the error area
                    lastId = id
                    lastText = text
                    let errorMessage = `<div draggable='false' class='sbcErrors ${id}'><span id='${id}' class='identicalErrorIndicator'>${duplicateErrors}</span>${message}</div>`
                    sbcUtils.log("> " + text)

                    errorArea.append(errorMessage)
                    duplicateErrors = 2

                    if (line !== -1) errorLines.push(line)

                }

            }

            // Highlight the lines, in which an error occured
            if (sbcData.preparedInput.data) {
                let highlights = $("#sbcHighlights")
                let inputArea = $("#sbcInput")
                let highlightedText = this.applyHighlights(errorLines)

                highlights.html(highlightedText)
                let backdrop = $("#sbcBackdrop")
                backdrop.scrollTop(inputArea.scrollTop());
            }
        }
    }

    static applyHighlights(errorLines) {

        let highlightedText = []

        for (let i=0; i<sbcData.preparedInput.data.length; i++) {
            if (errorLines.includes(i)) {
                highlightedText.push("<div class='lineNumbers marked'>" + sbcData.preparedInput.data[i] + "</div>")
            } else if(sbcData.preparedInput.data[i] !== "") {
                highlightedText.push("<div class='lineNumbers'>" + sbcData.preparedInput.data[i] + "</div>")
            } else {
                highlightedText.push("<div class='lineNumbers'><br></div>")
            }
        }

        return highlightedText
    }

}
