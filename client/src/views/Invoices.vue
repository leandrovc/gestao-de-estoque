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

export default {
  components: {
    InvoicesTable
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
    async getInvoices () {
      this.invoices = (await InvoicesService.showAll()).data
      console.log(this.invoices)
    },
    loadInvoicesTable () {
      this.getInvoices()
    }
  }
}
</script>
