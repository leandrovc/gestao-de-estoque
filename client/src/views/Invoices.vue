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
        <invoices-filter
          v-if="!form"
          @search-invoices="searchInvoices"
        />
        <invoices-table
          v-if="!form"
          :invoices="invoices"
          :loading="loading"
        />
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import InvoicesService from '@/services/InvoicesService'
import InvoicesTable from '@/components/InvoicesTable'
import InvoicesFilter from '@/components/InvoicesFilter'

export default {
  components: {
    InvoicesTable,
    InvoicesFilter
  },
  data () {
    return {
      form: false,
      loading: true,
      editingRequest: null,
      invoices: []
    }
  },
  mounted () {
    this.loading = true
    this.loadInvoicesTable()
    this.loading = false
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
      this.getAllInvoices()
    }
  }
}
</script>
