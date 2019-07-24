<template>
  <v-layout column>
    <v-flex>
      <div>
        <v-toolbar
          flat
          color="secondary"
        >
          <v-toolbar-title>NOTAS FISCAIS</v-toolbar-title>
          <v-divider
            class="mx-2"
            inset
            vertical
          />
          <v-spacer />
          <v-btn
            color="primary"
            dark
            fab
            @click="form = !form"
          >
            <v-icon>{{ form ? 'undo' : 'add' }}</v-icon>
          </v-btn>
        </v-toolbar>
        <invoice-form
          v-if="form"
          :invoice="editingInvoice"
          @save="loadInvoicesTable"
          @close="closeForm"
        />
        <invoices-filter
          v-if="!form"
          @search-invoices="searchInvoices"
        />
        <invoices-table
          v-if="!form"
          :invoices="invoices"
          :loading="loading"
          @delete-item="deleteItem"
          @edit-item="editItem"
        />
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import InvoicesService from '@/services/InvoicesService'
import InvoicesTable from '@/components/InvoicesTable'
import InvoicesFilter from '@/components/InvoicesFilter'
import InvoiceForm from '@/components/InvoiceForm'

export default {
  components: {
    InvoicesTable,
    InvoicesFilter,
    InvoiceForm
  },
  data () {
    return {
      form: false,
      loading: true,
      editingInvoice: null,
      invoices: []
    }
  },
  mounted () {
    this.loadInvoicesTable()
  },
  methods: {
    async getAllInvoices () {
      this.invoices = (await InvoicesService.showAll()).data
    },
    async searchInvoices (filter) {
      this.loading = true
      this.invoices = (await InvoicesService.search(filter)).data
      this.loading = false
    },
    loadInvoicesTable () {
      this.loading = true
      this.getAllInvoices()
      this.closeForm()
      this.loading = false
    },
    editItem (item) {
      this.editingInvoice = this.invoices[this.invoices.indexOf(item)]
      this.form = true
    },
    deleteItem (item) {
      const index = this.invoices.indexOf(item)
      confirm(`Tem certeza de que deseja EXCLUIR ${item.number}?`) &&
      InvoicesService.delete(item.id) &&
      this.invoices.splice(index, 1)
    },
    closeForm () {
      this.editingInvoice = null
      this.form = false
    }
  }
}
</script>
