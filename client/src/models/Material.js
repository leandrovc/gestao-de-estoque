import ItemFactory from './ItemFactory'
import MaterialsService from '@/services/MaterialsService'

export default class Material extends ItemFactory {
  constructor() {
    let emptyMaterial = {
      id: null,
      description: '',
      group: '',
      code: '',
      currentQuantity: null,
      minimumQuantity: null,
      unit: 'un',
    }
    let name = {
      text: 'Material',
      gender: 'o'
    }
    let decimalProperties = [
      'currentQuantity',
      'minimumQuantity'
    ]
    super(MaterialsService, emptyMaterial, name, decimalProperties)
  }
  async showLatest() {
    let itemsList = (await MaterialsService.getLatest()).data
    itemsList.forEach((item) => {
      item = this.formatDecimal(item, false)
    })
    return itemsList
  }
  async getNewGroupCode(group) {
    let codeList = (await MaterialsService.getLastGroupCode(group)).data
    let code = (codeList[0] != null && codeList[0] !== undefined) ? codeList[0].code : '-1'
    code = parseInt(code, 10) + 1
    return code
  }
}
