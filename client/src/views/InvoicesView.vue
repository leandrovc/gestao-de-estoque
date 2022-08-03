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
      :items="invoices"
      :loading="loading"
      show-edit
      expand
      @edit-item="editItem"
      @delete-item="deleteInvoice"
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
      invoicesFactory: null,
      headers: [
        { text: 'Nº', value: 'number' },
        { text: 'Data de Emissão', value: 'issueDate' },
        { text: 'Fornecedor', value: 'Supplier.socialName' }
      ]
    }
  },
  created () {
    this.invoicesFactory = new Invoice()
    this.invoices = []
    if (process.env.NODE_ENV != 'production') {
      this.headers.push({ text: 'Ações', value: 'action', sortable: false })
    }
  },
  mounted () {
    this.loadInvoicesTable()
  },
  methods: {
    async getAllInvoices () {
      this.invoices = await this.invoicesFactory.showAll()
    },
    async searchInvoices (filter) {
      this.loading = true
      this.invoices = await this.invoicesFactory.showSearchResult(filter)
      this.loading = false
    },
    loadInvoicesTable () {
      this.loading = true
      this.getAllInvoices()
      this.closeForm()
      this.loading = false
    },
    editItem (invoice) {
      this.editingInvoice = Object.assign({}, invoice)
      this.form = true
    },
    deleteInvoice (invoice) {
      confirm(`Tem certeza de que deseja EXCLUIR ${invoice.number}?`) &&
      this.invoicesFactory.deleteItem(invoice, this.invoices)
    },
    closeForm () {
      this.editingInvoice = this.invoicesFactory.getEmptyItem()
      this.form = false
    }
  }
}
</script>
