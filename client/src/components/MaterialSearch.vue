<template>
  <v-card>
    <v-card-title class="headline">
      <v-flex xs2>
        Buscar Material
      </v-flex>
      <v-flex
        xs6
        offset-xs1
      >
        <v-text-field
          v-model="searchText"
          append-icon="search"
          label="Descrição, Grupo ou Código"
          class="pr-4"
          single-line
          hide-details
          @keyup.enter="searchMaterials"
          @click:append="searchMaterials"
        />
      </v-flex>
    </v-card-title>
    <v-card-text>
      <div>
        <v-data-table
          :headers="headers"
          :items="materials"
          :loading="loading"
          hide-actions
          :pagination.sync="pagination"
          class="elevation-1"
        >
          <template v-slot:items="props">
            <td>{{ props.item.description }}</td>
            <td class="text-xs-right">
              {{ props.item.group }}
            </td>
            <td class="text-xs-right">
              {{ props.item.code }}
            </td>
            <td class="text-xs-right">
              {{ props.item.currentQuantity | formatDecimal }}
            </td>
            <td class="text-xs-right">
              {{ props.item.minimumQuantity | formatDecimal }}
            </td>
            <td class="text-xs-right">
              {{ props.item.unit }}
            </td>
            <td
              v-if="editMaterials"
              class="justify-center layout px-0"
            >
              <v-icon
                small
                class="mr-2"
                @click="editItem(props.item)"
              >
                edit
              </v-icon>
              <v-icon
                small
                @click="deleteItem(props.item)"
              >
                delete
              </v-icon>
            </td>
            <td
              v-if="selectMaterials"
              class="justify-center layout px-0"
            >
              <v-btn
                small
                class="mr-2"
                @click="editItem(props.item)"
              >
                Escolher
              </v-btn>
            </td>
          </template>
          <template v-slot:no-data>
            <v-alert
              :value="hasSearched"
              type="error"
            >
              Sua busca não retornou resultados.
            </v-alert>
          </template>
        </v-data-table>
        <div class="text-xs-center pt-2">
          <v-pagination
            v-model="pagination.page"
            :length="pages"
            :total-visible="7"
          />
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import MaterialsService from '@/services/MaterialsService'

export default {
  filters: {
    formatDecimal: value => {
      if (typeof value !== 'number') {
        return value
      }
      return value.toString().replace('.', ',')
    }
  },
  props: {
    editMaterials: {
      type: Boolean,
      default: false
    },
    selectMaterials: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      searchText: '',
      hasSearched: false,
      pagination: {
        rowsPerPage: 10,
        sortBy: 'id',
        descending: true
      },
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
        { text: 'Unidade', value: 'unit' }
      ],
      headerAction: { text: 'Ações', value: 'id', sortable: false },
      materials: []
    }
  },
  computed: {
    pages () {
      if (this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      ) return 0

      return Math.ceil(this.pagination.totalItems /
        this.pagination.rowsPerPage)
    }
  },
  mounted () {
    if (this.editMaterials || this.selectMaterials) {
      this.headers.push(this.headerAction)
    }
    this.getLatestMaterials()
  },
  methods: {
    editItem (material) {
      this.$emit('material-selected', material)
    },
    deleteItem (material) {
      const index = this.materials.indexOf(material)
      confirm(`Tem certeza de que deseja EXCLUIR ${material.description}?`) &&
      MaterialsService.delete(material.id) &&
      this.materials.splice(index, 1)
    },
    async getLatestMaterials () {
      this.loading = true
      this.materials = (await MaterialsService.getLatest()).data
      this.pagination.totalItems = this.materials.length
      this.loading = false
    },
    async searchMaterials () {
      this.loading = true
      this.materials = (await MaterialsService.search(this.searchText)).data
      this.pagination.totalItems = this.materials.length
      this.hasSearched = true
      this.loading = false
    }
  }
}
</script>
