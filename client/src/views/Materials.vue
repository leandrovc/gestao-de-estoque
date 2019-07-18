<template>
  <v-layout column>
    <v-flex>
      <div>
        <v-toolbar
          flat
          color="secondary"
        >
          <v-toolbar-title>MATERIAIS</v-toolbar-title>
          <v-divider
            class="mx-2"
            inset
            vertical
          />
          <v-spacer />
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Busca"
            class="pr-4"
            single-line
            hide-details
            @keyup.enter="searchMaterials"
            @click:append="searchMaterials"
          />
          <material-form ref="materialForm" />
        </v-toolbar>
        <v-data-table
          :headers="headers"
          :items="materials"
          :loading="loading"
          :rows-per-page-text="rowsPerPageText"
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
              {{ props.item.currentQuantity }}
            </td>
            <td class="text-xs-right">
              {{ props.item.minimumQuantity }}
            </td>
            <td class="text-xs-right">
              {{ props.item.unit }}
            </td>
            <td class="justify-center layout px-0">
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
          </template>
          <template v-slot:no-data>
            <v-alert
              :value="true"
              color="error"
              icon="warning"
            >
              Sua busca por "{{ search }}" não retornou resultados.
            </v-alert>
          </template>
          <template v-slot:pageText="props">
            {{ props.pageStart }} - {{ props.pageStop }} de {{ props.itemsLength }}
          </template>
        </v-data-table>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import MaterialsService from '@/services/MaterialsService'
import MaterialForm from '@/components/MaterialForm'

export default {
  components: {
    MaterialForm
  },

  data () {
    return {
      search: '',
      searchTimer: null,
      loading: true,
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
        { text: 'Ações', value: 'id', sortable: false }
      ],
      rowsPerPageText: 'Linhas por página:',
      materials: []
    }
  },
  mounted () {
    this.getLatestMaterials()
    this.$watch(
      '$refs.materialForm.dialog',
      (value) => {
        value || this.getLatestMaterials()
      }
    )
  },
  methods: {
    editItem (item) {
      this.$refs.materialForm.editItem(item)
    },

    deleteItem (item) {
      const index = this.materials.indexOf(item)
      confirm(`Tem certeza de que deseja EXCLUIR ${item.description}?`) &&
      MaterialsService.delete(item.id) &&
      this.materials.splice(index, 1)
    },

    async getLatestMaterials () {
      this.loading = true
      this.materials = (await MaterialsService.getLatest()).data
      this.loading = false
    },

    async searchMaterials () {
      this.loading = true
      this.materials = (await MaterialsService.search(this.search)).data
      this.loading = false
    }
  }
}
</script>
