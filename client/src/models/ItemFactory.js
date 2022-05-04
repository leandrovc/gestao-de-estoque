export default class ItemFactory {
  /**
   * 
   * @param {Object} _service Service that talks to the DB
   * @param {Object} _emptyItem Contains Item default properties
   * @param {Array} [_decimalProperties=null] Number properties that needs to be converted to show in brazilian standards
   */
  constructor(_service, _emptyItem, _decimalProperties) {
    this.service = _service
    this.emptyItem = _emptyItem
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
      //console.log(key + ' ' + value);
      if (Array.isArray(value)) {
        value.forEach((v, i) => {
          item[key][i] = this.formatDecimal(v, isSaving)
        })
      } else if (typeof value === 'object' &&
        !Array.isArray(value) &&
        value != null) {
          item[key] = this.formatDecimal(value, isSaving)
      } else {
        //console.log(key + ' ' + value, this.decimalProperties.indexOf(key))
        if (this.decimalProperties.indexOf(key) > -1) {
          //console.log(key, item[key], typeof item[key])
          if (isSaving) {
            item[key] = item[key].toString().replace(',', '.')
          } else {
            if (item[key].toString().indexOf('.') > -1) {
              item[key] = item[key].toString().replace('.', ',')
              //console.log(item[key].length - item[key].indexOf(','), item[key].length, item[key].indexOf(','))
              if (item[key].length - item[key].indexOf(',') == 2) {
                item[key] += '0'
              }
            } else {
              item[key] = item[key] + ',00'
            }
          }
          //console.log(key, item[key], typeof item[key])
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
        result = 'criado'
      } else {
        await this.service.update(item.id, item)
        result = 'atualizado'
      }
      callback(result)
    } catch (err) {
      console.log(err)
    }
  }
  deleteItem(item, list) {
    let index = list.indexOf(item)
    this.service.delete(item.id) && list.splice(index, 1)
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
