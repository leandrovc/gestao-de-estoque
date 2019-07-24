<template>
  <v-container
    class="elevation-1"
  >
    <v-layout
      row
      wrap
    >
      <v-flex xs1>
        <v-text-field
          v-model="filter.number"
          label="Número"
          return-masked-value
          mask="###.###"
        />
      </v-flex>
      <v-flex xs2>
        <v-dialog
          ref="initialDateDialog"
          v-model="initialDateDialog"
          :return-value.sync="filter.initialDate"
          persistent
          lazy
          full-width
          width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="filter.initialDate"
              label="Data Inicial"
              prepend-icon="event"
              readonly
              v-on="on"
            />
          </template>
          <v-date-picker
            v-model="filter.initialDate"
            scrollable
            color="primary"
            locale="pt-br"
          >
            <v-spacer />
            <v-btn
              flat
              color="primary"
              @click="initialDateDialog = false"
            >
              Cancelar
            </v-btn>
            <v-btn
              flat
              color="primary"
              @click="$refs.initialDateDialog.save(filter.initialDate)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-dialog>
      </v-flex>
      <v-flex xs2>
        <v-dialog
          ref="finalDateDialog"
          v-model="finalDateDialog"
          :return-value.sync="filter.finalDate"
          persistent
          lazy
          full-width
          width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="filter.finalDate"
              label="Data Final"
              prepend-icon="event"
              readonly
              v-on="on"
            />
          </template>
          <v-date-picker
            v-model="filter.finalDate"
            scrollable
            color="primary"
            locale="pt-br"
          >
            <v-spacer />
            <v-btn
              flat
              color="primary"
              @click="finalDateDialog = false"
            >
              Cancelar
            </v-btn>
            <v-btn
              flat
              color="primary"
              @click="$refs.finalDateDialog.save(filter.finalDate)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-dialog>
      </v-flex>
      <v-flex xs2>
        <v-autocomplete
          v-model="filter.supplier"
          :loading="loading"
          :items="suppliers"
          :search-input.sync="searchSupplierInput"
          label="Fornecedor"
          cache-items
          item-text="socialName"
          item-value="id"
          hide-no-data
          hide-selected
          return-object
        />
      </v-flex>
      <v-flex xs4>
        <v-autocomplete
          v-model="filter.material"
          :loading="loading"
          :items="materials"
          :search-input.sync="searchMaterialInput"
          label="Descrição do Material"
          cache-items
          item-text="description"
          item-value="id"
          hide-no-data
          hide-selected
          return-object
        />
      </v-flex>
      <v-layout column>
        <v-btn
          icon
          @click="submit"
        >
          <v-icon
            color="primary"
          >
            search
          </v-icon>
        </v-btn>
        <v-btn
          icon
          @click="clear"
        >
          <v-icon
            color="red"
          >
            clear
          </v-icon>
        </v-btn>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
import MaterialsService from '@/services/MaterialsService'
import SuppliersService from '@/services/SuppliersService'

export default {
  data () {
    return {
      initialDateDialog: false,
      finalDateDialog: false,
      filter: null,
      filterDefault: {
        number: '',
        initialDate: '2011-03-01',
        finalDate: new Date().toISOString().substr(0, 10),
        supplier: null,
        material: null
      },
      suppliers: [],
      materials: [],
      loading: false,
      searchMaterialInput: null,
      searchSupplierInput: null,
      searchTimeout: null
    }
  },
  watch: {
    searchMaterialInput (searchText) {
      searchText && searchText !== '' && this.searchMaterials(searchText)
    },
    searchSupplierInput (searchText) {
      searchText && searchText !== '' && this.searchSuppliers(searchText)
    }
  },
  created () {
    this.filter = Object.assign({}, this.filterDefault)
  },
  methods: {
    submit () {
      if (this.filter.supplier != null) {
        this.filter.SupplierId = this.filter.supplier.id
      }
      if (this.filter.material != null) {
        this.filter.MaterialId = this.filter.material.id
      }
      this.$emit('search-invoices', this.filter)
    },
    clear () {
      this.filter = Object.assign({}, this.filterDefault)
    },
    startSearchTimeout (callback) {
      if (this.searchTimeout !== null) {
        clearTimeout(this.searchTimeout)
      }
      this.loading = true
      this.searchTimeout = setTimeout(callback, 500)
    },
    searchMaterials (searchText) {
      this.startSearchTimeout(async () => {
        this.materials = (await MaterialsService.searchDescription(searchText)).data
        this.loading = false
      })
    },
    searchSuppliers (searchText) {
      this.startSearchTimeout(async () => {
        this.suppliers = (await SuppliersService.searchSocialName(searchText)).data
        this.loading = false
      })
    }
  }
}
</script>
