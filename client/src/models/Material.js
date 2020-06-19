import MaterialsService from '@/services/MaterialsService'
import EventBus from '@/event-bus'

export default {
  emptyMaterial: {
    id: null,
    description: '',
    group: '',
    code: '',
    currentQuantity: null,
    minimumQuantity: null,
    unit: 'pc'
  },
  assign (material) {
    if (material !== undefined && material != null) {
      return Object.assign({}, material)
    }
    return Object.assign({}, this.emptyMaterial)
  },
  async save (material, callback) {
    try {
      material.currentQuantity = material.currentQuantity.toString().replace(',', '.')
      material.minimumQuantity = material.minimumQuantity.toString().replace(',', '.')
      if (material.id == null) {
        await MaterialsService.create(material)
        EventBus.$emit('show-feedback', 'Material adicionado')
      } else {
        await MaterialsService.update(material.id, material)
        EventBus.$emit('show-feedback', 'Material editado')
      }
      callback()
    } catch (err) {
      console.log(err)
    }
  },
  newList () {
    return {
      list: [],
      formatDecimal () {
        this.list.forEach((m) => {
          m.currentQuantity = m.currentQuantity.toString().replace('.', ',')
          m.minimumQuantity = m.minimumQuantity.toString().replace('.', ',')
        })
      },
      getList () {
        return this.list
      },
      async showLatest () {
        this.list = (await MaterialsService.getLatest()).data
        this.formatDecimal()
      },
      async showSearchResult (searchText) {
        this.list = (await MaterialsService.search(searchText)).data
        this.formatDecimal()
      },
      deleteItem (item) {
        const index = this.list.indexOf(item)
        MaterialsService.delete(item.id) &&
        this.list.splice(index, 1)
        EventBus.$emit('show-feedback', 'Material excluído')
      }
    }
  }
}
