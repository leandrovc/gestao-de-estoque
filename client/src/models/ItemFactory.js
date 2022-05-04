import EventBus from '@/event-bus'

export default class ItemFactory {
  /**
   * 
   * @param {Object} _service Service that talks to the DB
   * @param {Object} _emptyItem Contains Item default properties
   * @param {Object} _itemName Item's name and gender to use in feedback
   * @param {Array} [_decimalProperties=null] Number properties that needs to be converted to show in brazilian standards
   */
  constructor(_service, _emptyItem, _itemName, _decimalProperties) {
    this.service = _service
    this.emptyItem = _emptyItem
    this.itemName = _itemName
    this.decimalProperties = _decimalProperties
  }
  getEmptyItem() {
    return Object.assign({}, this.emptyItem)
  }
  formatDecimal(item, isSaving) {
    if (this.decimalProperties === undefined ||
      this.decimalProperties == null) {
      return item
    }
    for (var [key, value] of Object.entries(item)) {
      if (Array.isArray(value)) {
        value.forEach((v, i) => {
          item[key][i] = this.formatDecimal(v, isSaving)
        })
      } else if (typeof value === 'object' &&
        !Array.isArray(value) &&
        value != null) {
          item[key] = this.formatDecimal(value, isSaving)
      } else {
        if (this.decimalProperties.indexOf(key) > -1) {
          if (isSaving) {
            item[key] = item[key].toString().replace(',', '.')
          } else {
            if (item[key].toString().indexOf('.') > -1) {
              item[key] = item[key].toString().replace('.', ',')
              if (item[key].length - item[key].indexOf(',') == 2) {
                item[key] += '0'
              }
            } else {
              item[key] = item[key] + ',00'
            }
          }
        }
      }
    }
    return item
  }
  async save(item, callback) {
    try {
      let result
      this.formatDecimal(item, true)
      if (item.id == null) {
        await this.service.create(item)
        EventBus.$emit('show-feedback', this.itemName.text + ' criad' + this.itemName.gender)
      } else {
        await this.service.update(item.id, item)
        EventBus.$emit('show-feedback', this.itemName.text + ' atualizad' + this.itemName.gender)
      }
      callback()
    } catch (err) {
      console.log(err)
    }
  }
  deleteItem(item, list) {
    let index = list.indexOf(item)
    this.service.delete(item.id) && list.splice(index, 1)
    EventBus.$emit('show-feedback', this.itemName.text + ' excluíd' + this.itemName.gender)
  }
  setExpandedInfo (item) {
    return item
  }
  processData(itemsList) {
    itemsList.forEach((item) => {
      item = this.formatDecimal(item, false)
      item = this.setExpandedInfo(item)
    })
    return itemsList
  }
  async showAll(searchParams) {
    return this.processData(
      (await this.service.showAll(searchParams)).data)
  }
  async showSearchResult(searchParams) {
    return this.processData(
      (await this.service.search(searchParams)).data)
  }
}
