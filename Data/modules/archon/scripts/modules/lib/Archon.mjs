export default class Archon extends Item.implementation {

  static #MODULE = null;

  static DEFAULT_ICON = null;
  static STRIPPED_DATA = ['_id', 'folder', 'sort', 'ownership', '_stats', 'data', 'permission'];

  static build(MODULE) {
    this.#MODULE = MODULE

    this.DEFAULT_ICON = MODULE.paths.assets('a_ico.svg');
  }

  static isArchon(item) {
    return !!(item?.getFlag(this.#MODULE.meta.id, 'uuid'));
  }

  static getData(item, allowFetch = false) {
    const embedded = item.getFlag(this.#MODULE.meta.id, 'source')
    const uuid = item.getFlag(this.#MODULE.meta.id, 'uuid');
    if (!embedded && allowFetch) {
      return fromUuid(uuid)
              .then( source => source.toObject())
              .catch( e => {
                console.error(e);
                return {
                  name: this.#MODULE.Core.translate('error.noSource'),
                  img: this.DEFAULT_ICON,
                  type:item.type,
                }})
    }

    const name = this.#MODULE.Core.translate( !!uuid ? 'control.symLink' : 'error.noSource' )

    return !!embedded ? embedded : {name, img: this.DEFAULT_ICON, type: item.type};
  }

  static _stripSource(sourceItem) {
    const data = sourceItem.toObject();
    this.STRIPPED_DATA.forEach( key => delete data[key] )
    return data;
  }

  static async archonSheet(item) {
    const data = await Archon.getData(item, true);
    const tempItem = await Archon.create(data, {temporary: true, parent: item.parent})
    return tempItem.sheet.render(true, {editable:false});
  }

  static async reveal(archon) {
    const newData = await Archon.getData(archon, true);

    /* if the same type, we can simply update the item in-place.
     * otherwise, safest bet is to delete this item and create
     * the new item type
     */
    if(archon.type !== newData.type) {

      if (!!archon.parent) {
        return archon.parent.createEmbeddedDocuments('Item',[newData])
          .then( results => archon.delete()
            .finally( _ => results[0]));
      } else {
        return super.create(newData)
          .then( results => archon.delete()
            .finally( _ => results));
      }
      
    } else {
      archon.updateSource({[`flags.-=${Archon.#MODULE.meta.id}`]: null});
      return archon.update(newData);
    }
  }

  #setSource(sourceItem, symbolic = true, overrides = {}) {

    Reflect.ownKeys(overrides).forEach( key => {
      if(overrides[key]) this.updateSource({[key]: sourceItem[key]});
    })

    const sourceData = symbolic ? undefined : Archon._stripSource(sourceItem);

    this.updateSource({[`flags.${Archon.#MODULE.meta.id}`]: {source: sourceData, uuid: sourceItem.uuid}}, {recursive:false});

  }

  async create(sourceItem, symbolic = true, overrides = {}) {
    this.#setSource(sourceItem, symbolic, overrides); 
    return Archon.create(this.toObject())
  }

}
