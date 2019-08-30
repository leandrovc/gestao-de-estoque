<template>
  <v-container
    class="elevation-1"
    grid-list-md
  >
    <v-toolbar
      text
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
        v-if="!form"
        color="primary"
        dark
        @click="form = true"
      >
        Adicionar
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
      @search="searchInvoices"
    />
    <the-data-table
      v-if="!form"
      :headers="headers"
      :items="invoices.getList()"
      :loading="loading"
      show-edit
      expand
      @edit-item="editItem"
      @delete-item="deleteItem"
    />
  </v-container>
</template>

<script>
import Invoice from '@/models/Invoice'
import InvoiceForm from '@/components/invoice/InvoiceForm'
import InvoicesFilter from '@/components/invoice/InvoicesFilter'
import TheDataTable from '@/components/TheDataTable'

export default {
  components: {
    InvoiceForm,
    InvoicesFilter,
    TheDataTable
  },
  data () {
    return {
      form: false,
      loading: true,
      editingInvoice: null,
      invoices: null,
      headers: [
        { text: 'Nº', value: 'number' },
        { text: 'Data de Emissão', value: 'issueDate' },
        { text: 'Fornecedor', value: 'Supplier.socialName' },
        { text: 'Ações', value: 'action', sortable: false }
      ]
    }
  },
  created () {
    this.invoices = Invoice.newList()
  },
  mounted () {
    this.loadInvoicesTable()
  },
  methods: {
    async getAllInvoices () {
      await this.invoices.showAll()
    },
    async searchInvoices (filter) {
      this.loading = true
      await this.invoices.showSearchResult(filter)
      this.loading = false
    },
    loadInvoicesTable () {
      this.loading = true
      this.getAllInvoices()
      this.closeForm()
      this.loading = false
    },
    editItem (invoice) {
      this.editingInvoice = Invoice.assign(invoice)
      this.form = true
    },
    deleteItem (invoice) {
      confirm(`Tem certeza de que deseja EXCLUIR ${invoice.number}?`) &&
      this.invoices.delete(invoice)
    },
    closeForm () {
      this.editingInvoice = null
      this.form = false
    }
  }
}
</script>
