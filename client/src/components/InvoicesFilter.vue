<template>
  <v-layout
    row
    align-center
  >
    <v-flex
      xs1
      mr-3
    >
      <v-text-field
        v-model="filter.number"
        label="Número"
        return-masked-value
        mask="###.###"
      />
    </v-flex>
    <v-flex
      xs2
      mr-3
    >
      <date-picker
        :key="forceRerender"
        :picked-date="filter.initialDate"
        label="Data Inicial"
        @date-picked="(value) => {setDate(value, 'initialDate')}"
      />
    </v-flex>
    <v-flex
      xs2
      mr-3
    >
      <date-picker
        :key="forceRerender"
        :picked-date="filter.finalDate"
        label="Data Final"
        @date-picked="(value) => {setDate(value, 'finalDate')}"
      />
    </v-flex>
    <v-flex
      xs2
      mr-3
    >
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
    <v-flex
      xs4
      mr-3
    >
      <material-picker
        :key="forceRerender"
        :material="filter.material"
        @material-selected="materialSelected"
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
</template>

<script>
import MaterialPicker from '@/components/MaterialPicker'
import SuppliersService from '@/services/SuppliersService'
import DatePicker from '@/components/DatePicker'

export default {
  components: {
    MaterialPicker,
    DatePicker
  },
  data () {
    return {
      forceRerender: false,
      filter: null,
      filterDefault: {
        number: '',
        initialDate: '2011-03-01',
        finalDate: new Date().toISOString().substr(0, 10),
        supplier: null,
        material: {
          id: null,
          description: ''
        }
      },
      suppliers: [],
      loading: false,
      searchSupplierInput: null,
      searchTimeout: null
    }
  },
  watch: {
    searchSupplierInput (searchText) {
      searchText && searchText !== '' && this.searchSuppliers(searchText)
    }
  },
  created () {
    this.filter = Object.assign({}, this.filterDefault)
    this.filter.material = Object.assign({}, this.filterDefault.material)
  },
  methods: {
    submit () {
      if (this.filter.supplier != null) {
        this.filter.SupplierId = this.filter.supplier.id
      }
      if (this.filter.material.id != null) {
        this.filter.MaterialId = this.filter.material.id
      }
      this.$emit('search', this.filter)
    },
    clear () {
      this.filter = Object.assign({}, this.filterDefault)
      this.filter.material = Object.assign({}, this.filterDefault.material)
      this.forceRerender = !this.forceRerender
    },
    startSearchTimeout (callback) {
      if (this.searchTimeout !== null) {
        clearTimeout(this.searchTimeout)
      }
      this.loading = true
      this.searchTimeout = setTimeout(callback, 500)
    },
    materialSelected (selectedMaterial) {
      this.filter.material.id = selectedMaterial.id
      this.filter.material.description = selectedMaterial.description
    },
    searchSuppliers (searchText) {
      this.startSearchTimeout(async () => {
        this.suppliers = (await SuppliersService.searchSocialName(searchText)).data
        this.loading = false
      })
    },
    setDate (value, index) {
      this.filter[index] = value
    }
  }
}
</script>
