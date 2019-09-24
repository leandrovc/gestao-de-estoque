<template>
  <v-container
    class="elevation-1"
    grid-list-md
  >
    <v-toolbar
      text
      color="secondary"
    >
      <v-toolbar-title>REQUISIÇÕES</v-toolbar-title>
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
      :items="requests.getList()"
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
    this.requests = Request.newList()
  },
  mounted () {
    this.loadRequestsTable()
  },
  methods: {
    async getRequests () {
      await this.requests.showAll()
    },
    async searchRequests (filter) {
      this.loading = true
      await this.requests.showSearchResult(filter)
      this.loading = false
    },
    async getComboboxItems () {
      this.applicants = await Request.getApplicantOptions()
      this.authorizers = await Request.getAuthorizerOptions()
    },
    loadRequestsTable () {
      this.loading = true
      this.getRequests()
      this.getComboboxItems()
      this.closeForm()
      this.loading = false
    },
    editItem (request) {
      this.editingRequest = Request.assign(request)
      this.form = true
    },
    deleteRequest (request) {
      confirm(`Tem certeza de que deseja EXCLUIR ${request.number}?`) &&
      this.requests.deleteItem(request)
    },
    closeForm () {
      this.editingRequest = null
      this.form = false
    }
  }
}
</script>
