<template>
  <v-layout column>
    <v-toolbar
      flat
      color="secondary"
    >
      <v-toolbar-title>FORNECEDORES</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      />
      <v-spacer />
      <v-dialog
        v-model="formDialog"
        max-width="512px"
      >
        <template v-slot:activator="{ on }">
          <v-btn
            color="primary"
            dark
            class="mb-2"
            v-on="on"
          >
            Adicionar Fornecedor
          </v-btn>
        </template>
        <supplier-form
          :key="resetSearch"
          :editing-supplier="formSupplier"
          @closing="closeForm"
        />
      </v-dialog>
    </v-toolbar>
    <supplier-search
      :key="resetSearch"
      edit-suppliers
      @supplier-selected="editSupplier"
    />
  </v-layout>
</template>

<script>
import SupplierForm from '@/components/SupplierForm'
import SupplierSearch from '@/components/SupplierSearch'

export default {
  components: {
    SupplierForm,
    SupplierSearch
  },
  data () {
    return {
      resetSearch: false,
      formDialog: false,
      formSupplier: null,
      emptyFormSupplier: {
        id: null,
        socialName: '',
        cnpj: '',
        Address: {
          street: '',
          number: '',
          district: '',
          city: '',
          state: '',
          cep: ''
        },
        Telephones: [
          {
            number: ''
          }
        ]
      }
    }
  },
  watch: {
    formDialog (value) {
      !value && this.onFormClose()
    }
  },
  created () {
    this.formSupplier = Object.assign({}, this.emptyFormSupplier)
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
      this.formSupplier = Object.assign({}, this.emptyFormSupplier)
      this.resetSearch = !this.resetSearch
    }
  }
}
</script>
