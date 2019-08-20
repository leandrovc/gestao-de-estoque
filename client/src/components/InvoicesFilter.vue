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
      <supplier-picker
        :key="forceRerender"
        :supplier="filter.supplier"
        @supplier-selected="supplierSelected"
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
import SupplierPicker from '@/components/SupplierPicker'
import DatePicker from '@/components/DatePicker'

export default {
  components: {
    MaterialPicker,
    SupplierPicker,
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
        supplier: {
          id: null,
          socialName: ''
        },
        material: {
          id: null,
          description: ''
        }
      }
    }
  },
  created () {
    this.filter = Object.assign({}, this.filterDefault)
    this.filter.material = Object.assign({}, this.filterDefault.material)
    this.filter.supplier = Object.assign({}, this.filterDefault.supplier)
  },
  methods: {
    submit () {
      if (this.filter.supplier.id != null) {
        this.filter.SupplierId = this.filter.supplier.id
      }
      this.$emit('search', this.filter)
    },
    clear () {
      this.filter = Object.assign({}, this.filterDefault)
      this.filter.material = Object.assign({}, this.filterDefault.material)
      this.filter.supplier = Object.assign({}, this.filterDefault.supplier)
      this.forceRerender = !this.forceRerender
    },
    materialSelected (selectedMaterial) {
      this.filter.material.id = selectedMaterial.id
      this.filter.material.description = selectedMaterial.description
    },
    supplierSelected (selectedSupplier) {
      this.filter.supplier.id = selectedSupplier.id
      this.filter.supplier.socialName = selectedSupplier.socialName
    },
    setDate (value, index) {
      this.filter[index] = value
    }
  }
}
</script>
