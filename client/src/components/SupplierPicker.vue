<template>
  <v-layout>
    <v-text-field
      v-model="supplier.socialName"
      label="Fornecedor"
      readonly
      append-icon="edit"
      @click:append="openDialog"
    />
    <v-dialog
      v-model="dialog"
      max-width="1024px"
    >
      <supplier-search
        select-suppliers
        @supplier-selected="supplierSelected"
      />
    </v-dialog>
  </v-layout>
</template>

<script>
import SupplierSearch from '@/components/SupplierSearch'

export default {
  components: {
    SupplierSearch
  },
  props: {
    supplier: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      dialog: false
    }
  },
  methods: {
    supplierSelected (selectedSupplier) {
      this.$emit('supplier-selected', selectedSupplier)
      this.dialog = false
    },
    openDialog () {
      this.dialog = true
    }
  }
}
</script>
