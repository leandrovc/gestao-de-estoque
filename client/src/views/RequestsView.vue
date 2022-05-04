<template>
  <v-container
    class="elevation-1"
    grid-list-md
  >
    <v-toolbar
      text
      color="secondary"
    >
      <v-toolbar-title>REGISTROS DE SAÍDA</v-toolbar-title>
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
    <request-form
      v-if="form"
      :request="editingRequest"
      :applicants="applicants"
      :authorizers="authorizers"
      @save="loadRequestsTable"
      @close="closeForm"
    />
    <requests-filter
      v-if="!form"
      :applicants="applicants"
      :authorizers="authorizers"
      @search="searchRequests"
    />
    <the-data-table
      v-if="!form"
      :headers="headers"
      :items="requests"
      :loading="loading"
      show-edit
      expand
      @edit-item="editItem"
      @delete-item="deleteRequest"
    />
  </v-container>
</template>

<script>
import Request from '@/models/Request'
import RequestForm from '@/components/request/RequestForm'
import RequestsFilter from '@/components/request/RequestsFilter'
import TheDataTable from '@/components/TheDataTable'

export default {
  components: {
    RequestForm,
    RequestsFilter,
    TheDataTable
  },
  data () {
    return {
      form: false,
      loading: true,
      editingRequest: null,
      requests: null,
      applicants: [],
      authorizers: [],
      requestsFactory: null,
      headers: [
        { text: 'Nº', value: 'number' },
        { text: 'Data de Emissão', value: 'issueDate' },
        { text: 'Requerente', value: 'applicant' },
        { text: 'Autorizador', value: 'authorizer' },
        { text: 'Comentários', value: 'comments' },
        { text: 'Ações', value: 'action', sortable: false }
      ]
    }
  },
  created () {
    this.requests = []
    this.requestsFactory = new Request()
  },
  mounted () {
    this.loadRequestsTable()
  },
  methods: {
    async getRequests () {
      this.requests = await this.requestsFactory.showAll()
    },
    async searchRequests (filter) {
      this.loading = true
      this.requests = await this.requestsFactory.showSearchResult(filter)
      this.loading = false
    },
    async getComboboxItems () {
      this.applicants = await this.requestsFactory.getApplicantOptions()
      this.authorizers = await this.requestsFactory.getAuthorizerOptions()
    },
    loadRequestsTable () {
      this.loading = true
      this.getRequests()
      this.getComboboxItems()
      this.closeForm()
      this.loading = false
    },
    editItem (request) {
      this.editingRequest = Object.assign({}, request)
      this.form = true
    },
    deleteRequest (request) {
      confirm(`Tem certeza de que deseja EXCLUIR ${request.number}?`) &&
      this.requestsFactory.deleteItem(request, this.requests)
    },
    closeForm () {
      this.editingRequest = this.requestsFactory.getEmptyItem()
      this.form = false
    }
  }
}
</script>
