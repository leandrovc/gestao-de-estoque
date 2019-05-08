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
          <v-dialog
            v-model="dialog"
            max-width="500px"
          >
            <template v-slot:activator="{ on }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                fab
                v-on="on"
              >
                <v-icon>add</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-form
                ref="form"
                v-model="valid"
                lazy-validation
              >
                <v-card-title>
                  <span class="headline">
                    {{ formTitle }}
                  </span>
                </v-card-title>

                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex
                        xs12
                        sm6
                        md4
                      >
                        <v-text-field
                          v-model="editedItem.description"
                          label="Descrição"
                          :rules="[required]"
                          required
                        />
                      </v-flex>
                      <v-flex
                        xs12
                        sm6
                        md4
                      >
                        <v-combobox
                          v-model="editedItem.group"
                          :items="groups"
                          label="Grupo"
                          mask="AAAA"
                          :rules="[required]"
                          required
                        />
                      </v-flex>
                      <v-flex
                        xs12
                        sm6
                        md4
                      >
                        <v-text-field
                          v-model="editedItem.code"
                          label="Código"
                          mask="#####"
                          :rules="[required]"
                          required
                        />
                      </v-flex>
                      <v-flex
                        xs12
                        sm6
                        md4
                      >
                        <v-text-field
                          v-model="editedItem.currentQuantity"
                          label="Quant. atual"
                          mask="######"
                          type="number"
                          :rules="[required]"
                          required
                        />
                      </v-flex>
                      <v-flex
                        xs12
                        sm6
                        md4
                      >
                        <v-text-field
                          v-model="editedItem.minimumQuantity"
                          label="Quant. mínima"
                          mask="######"
                          type="number"
                          :rules="[required]"
                          required
                        />
                      </v-flex>
                      <v-flex
                        xs12
                        sm6
                        md4
                      >
                        <v-text-field
                          v-model="editedItem.unit"
                          label="Unidade"
                          mask="aa"
                          :rules="[required]"
                          required
                        />
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    color="blue darken-1"
                    flat
                    @click="close"
                  >
                    Cancelar
                  </v-btn>
                  <v-btn
                    :disabled="!valid"
                    color="blue darken-1"
                    flat
                    @click="save"
                  >
                    Salvar
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-dialog>
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

export default {
  data () {
    return {
      dialog: false,
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
      materials: [],
      editedIndex: -1,
      editedItem: {
        description: '',
        group: '',
        code: '',
        currentQuantity: 0,
        minimumQuantity: 0,
        unit: 'pc'
      },
      defaultItem: {
        description: '',
        group: '',
        code: '',
        currentQuantity: 0,
        minimumQuantity: 0,
        unit: 'pc'
      },
      valid: true,
      groups: [
        'ADES',
        'CNLT',
        'ELET',
        'ELTD',
        'FECH',
        'FERR',
        'GERL',
        'HIDR',
        'ILUM',
        'IMPE',
        'REVE',
        'SANT'
      ],
      required: (value) => !!value || 'Preenchimento obrigatório!'
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Novo Material' : 'Editar Material'
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  mounted () {
    this.getLatestMaterials()
  },
  methods: {
    editItem (item) {
      this.editedIndex = item.id
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.materials.indexOf(item)
      confirm(`Tem certeza de que quer EXCLUIR ${item.description}?`) &&
      MaterialsService.delete(item.id) &&
      this.materials.splice(index, 1)
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
        this.$refs.form.reset()
      }, 300)
    },

    async save () {
      if (this.$refs.form.validate()) {
        try {
          if (this.editedIndex > -1) {
            await MaterialsService.update(this.editedIndex, this.editedItem)
          } else {
            await MaterialsService.post(this.editedItem)
          }
          this.getLatestMaterials()
          this.close()
        } catch (err) {
          console.log(err)
        }
      }
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
