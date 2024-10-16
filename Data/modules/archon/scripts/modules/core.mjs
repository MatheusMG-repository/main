export class Core {

  static #MODULE = null;
  
  static build(MODULE) {
    this.#MODULE = MODULE;
    Core.#hooks();
    Core.#settings();
  }

  static config = {
    register(key, {
      scope = "world",        // This specifies a world-level setting
      config = true,          // This specifies that the setting appears in the configuration view
      requiresReload= false,  // This will prompt the GM to have all clients reload the
                              //   application for the setting to take effect
      type = Boolean,
      range = null,           // If range is specified, the resulting setting will be a range slider
      defaultValue = false,    // The default value for the setting
      onChange = null,
    } = {}) {
      const name = `${Core.#MODULE.meta.id}.setting.${key}.name`;
      const hint = `${Core.#MODULE.meta.id}.setting.${key}.hint`;
      return game.settings.register(Core.#MODULE.meta.id, key, {
        name, hint, scope, config, requiresReload, type, range, default: defaultValue, onChange})
    },

    set(key, value, options = {}) {
      return game.settings.set(Core.#MODULE.meta.id, key, value, options);
    },

    get(key) {
      return game.settings.get(Core.#MODULE.meta.id, key)
    }
  }


  static translate(moduleKey, data = {}) {
    return game.i18n.format(`${Core.#MODULE.meta.id}.${moduleKey}`, data);
  }

  static #hooks() {
    Hooks.on('renderItemDirectory', this._onRender.bind(this));
    Hooks.on('getItemDirectoryEntryContext', this._onGetContext.bind(this));
    Hooks.on('renderItemSheet', this._onRenderSheet.bind(this));
  }

  static #settings() {
    const onChange = () => game.items.directory.render(true);

    Core.config.register('useWhiteBadge', {
      onChange,
    })

    Core.config.register('disableBadge', {
      onChange,
    })

    Core.config.register('disableContextMenu', {
      onChange,
    })

    Core.config.register('disableSheetControl');
  }

  static #injectControl(itemDir) {
    const [existing = null] = itemDir.getElementsByClassName('archon');
    if (existing) return;

    const [searchRow = null] = itemDir.getElementsByClassName('header-search')
    if (!searchRow) return;

    const buttonHTML = `
      <a class="archon" name="create-archon" data-tooltip="${Core.translate('show')}"><i class="fas fa-eye-low-vision"></i></a>
      `

    searchRow.insertAdjacentHTML('beforeend', buttonHTML);

    const button = searchRow.getElementsByClassName('archon')['create-archon'];
    if (!button) throw new Error('Uh oh');

    button.addEventListener('mouseup', Core._onCreate.bind(this));

  }

  static #markListArchons(listContainer) {

    /* set badge preferences */
    const showBadge = this.#configureBadges(listContainer);

    const itemNodes = listContainer.getElementsByClassName('item');

    const toggleBadge = (node, show = true) => node.classList.toggle(
      'archon-badge',
      show ? node.classList.contains('archon-item') : false
    )

    const toggleArchon = (node) => node.classList.toggle(
      'archon-item',
      Core.#MODULE.Lib.Archon.isArchon(
        game.items.get( node.dataset?.documentId )
      )
    )

    for (const node of itemNodes) {
      toggleArchon(node);
      toggleBadge(node, showBadge);
    }
  }


  static #configureBadges(containerNode) {

    if(this.config.get('disableBadge')) return false;

    const filename = this.config.get('useWhiteBadge') ? 'a_ico_white.svg' : 'a_ico.svg';
    const asset = this.#MODULE.paths.cssAsset(filename);
    containerNode.style.setProperty('--archon-badge-url',`url(${asset})`);

    return true;
  }

  static _onRender(_, elements) {

    /* only GMs get the toys! */
    if(!game.user.isGM) return;

    const html = elements[0];

    /* place the control panel button */
    this.#injectControl(html);

    /* add badges to any archons in item directory */
    for (const node of html.getElementsByClassName('directory-list')) {
      this.#markListArchons(node)
    }
  }

  static _onRenderSheet(app, elements) {

    /* only GMs get the toys! */
    if(!game.user.isGM || this.config.get('disableSheetControl')) return;

    /* only trigger on archons */
    if (!Core.#MODULE.Lib.Archon.isArchon(app.document)) return;

    const html = `<div class="archon-item-actions" data-tooltip="${this.#MODULE.meta.id}.control.itemTip"><i class="fa-solid fa-v fa-flip-vertical"></i></div>`;
    elements[0].insertAdjacentHTML('beforeend', html);
    ContextMenu.create(app, elements, '.archon-item-actions', [{
      name: `${this.#MODULE.meta.id}.control.viewSource`,
      icon: '<i class="fas fa-magnifying-glass"></i>',
      callback: () => this.#MODULE.Lib.Archon.archonSheet(app.document),
    },{
      name: `${this.#MODULE.meta.id}.control.reveal`,
      condition: () => app.isEditable,
      icon: '<i class="fas fa-eye-low-vision"></i>',
      callback: () => this.#MODULE.Lib.Archon.reveal(app.document),
    }], {hookName:"ArchonContext"});
  }

  static _onCreate(event) {
    event.preventDefault;
    new (this.#MODULE.Apps.ArchonControl)().render(true); 
  }

  static _onGetContext( _, buttons) {

    /* only GMs get the toys! */
    if(!game.user.isGM) return;

    const condition = ([li]) => {
        const noShow = this.config.get('disableContextMenu');
        if (noShow) return false;
        return li.classList.contains('archon-item');
      }

    buttons.push({
      name: `${this.#MODULE.meta.id}.control.viewSource`,
      icon: '<i class="fas fa-magnifying-glass"></i>',
      condition,
      callback: ([li]) => {
        const item = game.items.get(li.dataset?.documentId);
        if(item) {
          return this.#MODULE.Lib.Archon.archonSheet(item);
        }
      },
    },{
      name: `${this.#MODULE.meta.id}.control.reveal`,
      icon: '<i class="fas fa-eye-low-vision"></i>',
      condition,
      callback: ([li]) => {
        const item = game.items.get(li.dataset?.documentId);
        if(item) {
          return this.#MODULE.Lib.Archon.reveal(item);
        }
      },
    });
  }
}
