<template>
  <v-card>
    <v-card-title class="headline">
      <v-flex xs2>
        MATERIAIS
      </v-flex>
      <v-divider
        class="mx-4"
        inset
        vertical
      />
      <v-flex
        xs6
        offset-xs1
      >
        <v-text-field
          v-model="searchText"
          append-icon="search"
          label="Buscar por Descrição, Grupo ou Código"
          class="pr-4"
          single-line
          hide-details
          @keyup.enter="searchMaterials"
          @click:append="searchMaterials"
        />
      </v-flex>
      <v-spacer />
      <slot name="add-button" />
    </v-card-title>
    <v-card-text>
      <the-data-table
        :headers="headers"
        :items="materials"
        :loading="loading"
        :show-edit="showEdit"
        @edit-item="selectMaterial"
        @delete-item="deleteMaterial"
        @select-item="selectMaterial"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import Material from '@/models/Material'
import TheDataTable from '@/components/TheDataTable'

export default {
  components: {
    TheDataTable
  },
  props: {
    showEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      searchText: '',
      loading: false,
      headers: [
        {
          text: 'Descrição',
          align: 'left',
          value: 'description'
        },
        { text: 'Grupo', value: 'group' },
        { text: 'Código', value: 'code' },
        { text: 'Quant. atual', value: 'currentQuantity' },
        { text: 'Quant. mínima', value: 'minimumQuantity' },
        { text: 'Unidade', value: 'unit' },
        { text: 'Ações', value: 'action', sortable: false }
      ],
      materials: [],
      materialFactory: null
    }
  },
  created () {
    this.materialFactory = new Material()
  },
  mounted () {
    this.fillInMaterials()
  },
  methods: {
    selectMaterial (material) {
      this.$emit('material-selected', material)
    },
    deleteMaterial (material) {
      confirm(`Tem certeza de que deseja EXCLUIR ${material.description}?`) &&
      this.materialFactory.deleteItem(material, this.materials)
    },
    async fillInMaterials () {
      this.loading = true
      this.materials = await this.materialFactory.showLatest()
      this.loading = false
    },
    async searchMaterials () {
      this.loading = true
      this.materials = await this.materialFactory.showSearchResult(this.searchText)
      this.loading = false
    }
  }
}
</script>
