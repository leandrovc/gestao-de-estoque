<template>
  <v-layout column>
    <supplier-search
      :key="resetSearch"
      show-edit
      @supplier-selected="editSupplier"
    >
      <template #add-button>
        <v-dialog
          v-model="formDialog"
          max-width="600px"
        >
          <template #activator="{ on }">
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
            v-model="formSupplier"
            @closing="closeForm"
          />
        </v-dialog>
      </template>
    </supplier-search>
  </v-layout>
</template>

<script>
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
    this.suppliersFactory = new Supplier()
  },
  methods: {
    editSupplier (supplier) {
      this.formSupplier = Object.assign({}, supplier)
      this.formDialog = true
    },
    closeForm () {
      this.formDialog = false
    },
    onFormClose () {
      this.formSupplier = null
      this.resetSearch = !this.resetSearch
    }
  }
}
</script>
