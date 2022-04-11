<template>
  <v-layout>
    <v-text-field
      :value="value.socialName"
      label="Fornecedor"
      readonly
      append-icon="edit"
      required
      :rules="rules"
      @click="openDialog"
      @click:append="openDialog"
      @input="valueChanged($event, 'socialName')"
    />
    <v-dialog
      v-model="dialog"
      max-width="1024px"
    >
      <supplier-search
        :key="resetSearch"
        select-suppliers
        @supplier-selected="supplierSelected"
      >
        <template
          v-if="showAdd"
          #add-button
        >
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
    </v-dialog>
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
  props: {
    value: {
      type: Object,
      required: true
    },
    rules: {
      type: Array,
      default: () => {}
    },
    showAdd: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      dialog: false,
      resetSearch: false,
      formDialog: false,
      formSupplier: null,
      supplier: {},
    }
  },
  watch: {
    formDialog (value) {
      !value && this.onFormClose()
    },
    value (newValue) {
      if (Object.keys(this.supplier).length === 0 && this.supplier.constructor === Object) {
       this.supplier = newValue
      }
    }
  },
  created () {
    this.formSupplier = Supplier.assign()
    this.supplier = { ...this.value }
  },
  methods: {
    supplierSelected (selectedSupplier) {
      this.$emit('supplier-selected', selectedSupplier)
      this.dialog = false
    },
    valueChanged ($event, fieldName) {
      this.supplier[fieldName] = $event
      this.$emit('input', this.supplier)
    },
    openDialog () {
      this.dialog = true
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
