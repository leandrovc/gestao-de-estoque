<template>
  <v-layout column>
    <supplier-search
      :key="resetSearch"
      show-edit
      @supplier-selected="editSupplier"
    >
      <template v-slot:add-button>
        <v-dialog
          v-model="formDialog"
          max-width="600px"
        >
          <template v-slot:activator="{ on }">
            <v-btn
              color="accent"
              class="mb-2 black--text"
              v-on="on"
            >
              Adicionar
            </v-btn>
          </template>
          <supplier-form
            :key="resetSearch"
            :editing-supplier="formSupplier"
            @closing="closeForm"
          />
        </v-dialog>
      </template>
    </supplier-search>
  </v-layout>
</template>

<script>
import Supplier from '@/models/Supplier'
import SupplierForm from '@/components/supplier/SupplierForm'
import SupplierSearch from '@/components/supplier/SupplierSearch'

export default {
  components: {
    SupplierForm,
    SupplierSearch
  },
  data () {
    return {
      resetSearch: false,
      formDialog: false,
      formSupplier: null
    }
  },
  watch: {
    formDialog (value) {
      !value && this.onFormClose()
    }
  },
  created () {
    this.formSupplier = Supplier.assign()
  },
  methods: {
    editSupplier (supplier) {
      this.formSupplier = Supplier.assign(supplier)
      this.formDialog = true
    },
    closeForm () {
      this.formDialog = false
    },
    onFormClose () {
      this.formSupplier = Supplier.assign()
      this.resetSearch = !this.resetSearch
    }
  }
}
</script>
