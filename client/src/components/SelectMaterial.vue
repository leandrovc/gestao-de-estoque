<template>
  <v-container grid-list-md>
    <v-layout
      row
      wrap
    >
      <v-flex xs10>
        <v-autocomplete
          v-if="editing"
          :loading="loading"
          :items="materials"
          :search-input.sync="search"
          label="Descrição"
          cache-items
          item-text="description"
          item-value="id"
          hide-no-data
          hide-selected
          return-object
          :rules="rules"
          required
          @input="input"
        />
        <v-text-field
          v-if="!editing"
          v-model="selectedItem.description"
          label="Descrição"
          readonly
          :disabled="selectedItem.description === ''"
          :rules="rules"
          required
        />
      </v-flex>
      <v-flex xs2>
        <v-icon @click="editing = !editing">
          edit
        </v-icon>
      </v-flex>
      <v-flex xs2>
        <v-text-field
          v-model="selectedItem.group"
          label="Grupo"
          readonly
          :disabled="selectedItem.description === ''"
        />
      </v-flex>
      <v-flex xs2>
        <v-text-field
          v-model="selectedItem.code"
          label="Código"
          readonly
          :disabled="selectedItem.description === ''"
        />
      </v-flex>
      <v-flex xs2>
        <v-text-field
          v-model="selectedItem.currentQuantity"
          label="Quant. atual"
          readonly
          :disabled="selectedItem.description === ''"
        />
      </v-flex>
      <v-flex xs2>
        <v-text-field
          v-model="selectedItem.minimumQuantity"
          label="Quant. mínima"
          readonly
          :disabled="selectedItem.description === ''"
        />
      </v-flex>
      <v-flex xs2>
        <v-text-field
          v-model="selectedItem.unit"
          label="Unidade"
          readonly
          :disabled="selectedItem.description === ''"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import MaterialsService from '@/services/MaterialsService'

export default {
  props: {
    materialSelected: {
      type: Object,
      required: true
    },
    materialSelectedIndex: {
      type: Number,
      required: true
    },
    rules: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      editing: false,
      loading: false,
      materials: [],
      search: null,
      searchTimeout: null,
      selectedItem: {
        description: '',
        group: '',
        code: '',
        currentQuantity: null,
        minimumQuantity: null,
        unit: 'pc'
      }
    }
  },
  watch: {
    search (searchText) {
      searchText && searchText !== '' && this.searchMaterials(searchText)
    }
  },
  mounted () {
    this.selectedItem = Object.assign({}, this.materialSelected)
  },
  methods: {
    selectMaterial (materialData) {
      this.selectedItem = Object.assign({}, materialData)
      this.$emit('material-selected', materialData, this.materialSelectedIndex)
    },
    searchMaterials (searchText) {
      if (this.searchTimeout !== null) {
        clearTimeout(this.searchTimeout)
      }
      this.loading = true
      this.searchTimeout = setTimeout(async () => {
        this.materials = (await MaterialsService.searchDescription(searchText)).data
        this.loading = false
      }, 500)
    },
    async input (material) {
      if (!material) return
      this.loading = true
      this.selectMaterial((await MaterialsService.show(material.id)).data)
      this.editing = false
      this.loading = false
    }
  }
}
</script>
