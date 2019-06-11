<template>
  <v-dialog
    v-model="dialog"
    max-width="700px"
  >
    <template v-slot:activator="{ on }">
      <v-layout wrap>
        <v-text-field
          v-model="materialSelected.description"
          placeholder="Selecionar"
          single-line
          hide-details
          readonly
          v-on="on"
        />
        <v-icon v-on="on">
          search
        </v-icon>
      </v-layout>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">
          Selecionar Material
        </span>
      </v-card-title>

      <v-card-text>
        <v-container grid-list-md>
          <v-layout
            row
            wrap
          >
            <v-flex xs12>
              <v-autocomplete
                :loading="loading"
                :items="materials"
                :search-input.sync="search"
                item-text="description"
                item-value="id"
                :placeholder="selectedItem.description"
                clearable
                autofocus
                @input="input"
              />
            </v-flex>
            <v-flex xs2>
              <v-text-field
                v-model="selectedItem.group"
                label="Grupo"
                readonly
                disabled
              />
            </v-flex>
            <v-flex xs2>
              <v-text-field
                v-model="selectedItem.code"
                label="Código"
                readonly
                disabled
              />
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="selectedItem.currentQuantity"
                label="Quant. atual"
                readonly
                disabled
              />
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="selectedItem.minimumQuantity"
                label="Quant. mínima"
                readonly
                disabled
              />
            </v-flex>
            <v-flex xs2>
              <v-text-field
                v-model="selectedItem.unit"
                label="Unidade"
                readonly
                disabled
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
          color="blue darken-1"
          flat
          @click="save"
        >
          Confirmar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
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
    }
  },
  data () {
    return {
      dialog: false,
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
    dialog (value) {
      value && this.selectItem(this.materialSelected)
    },
    search (searchText) {
      searchText && searchText !== '' && this.searchMaterials(searchText)
    }
  },
  methods: {
    selectItem (item) {
      this.selectedItem = item
    },
    close () {
      this.dialog = false
    },
    save () {
      this.$emit('replace-material', this.selectedItem, this.materialSelectedIndex)
      this.close()
    },
    searchMaterials (searchText) {
      if (this.searchTimeout !== null) {
        clearTimeout(this.searchTimeout)
      }
      this.loading = true
      this.searchTimeout = setTimeout(async () => {
        this.materials = (await MaterialsService.searchDescription(searchText)).data
        this.loading = false
      }, 1000)
    },
    async input (itemId) {
      if (!itemId) return
      this.loading = true
      this.selectItem((await MaterialsService.show(itemId)).data)
      this.loading = false
    }
  }
}
</script>
