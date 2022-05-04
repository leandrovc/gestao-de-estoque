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
    let itemsList
    itemsList = (await MaterialsService.getLatest()).data
    itemsList.forEach((item) => {
      item = this.formatDecimal(item, false)
    })
    return itemsList
  }
}
