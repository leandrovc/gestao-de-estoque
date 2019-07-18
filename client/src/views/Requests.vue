<template>
  <v-layout column>
    <v-flex>
      <div>
        <v-toolbar
          flat
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
            color="primary"
            dark
            fab
            @click="form = !form"
          >
            <v-icon>{{ form ? 'undo' : 'add' }}</v-icon>
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
          :search="searchRequests"
        />
        <requests-table
          v-if="!form"
          :requests="requests"
          :loading="loading"
          @edit-item="editItem"
          @delete-item="deleteItem"
        />
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import RequestsService from '@/services/RequestsService'
import RequestForm from '@/components/RequestForm'
import RequestsTable from '@/components/RequestsTable'
import RequestsFilter from '@/components/RequestsFilter'

export default {
  components: {
    RequestForm,
    RequestsTable,
    RequestsFilter
  },

  data () {
    return {
      form: false,
      loading: true,
      editingRequest: null,
      requests: [],
      applicants: [],
      authorizers: []
    }
  },

  mounted () {
    this.loadRequestsTable()
  },

  methods: {
    editItem (item) {
      this.editingRequest = this.requests[this.requests.indexOf(item)]
      this.form = true
    },

    deleteItem (item) {
      const index = this.requests.indexOf(item)
      confirm(`Tem certeza de que deseja EXCLUIR ${item.number}?`) &&
      RequestsService.delete(item.id) &&
      this.requests.splice(index, 1)
    },

    async getRequests () {
      this.loading = true
      this.requests = (await RequestsService.showAll()).data
      this.loading = false
    },

    async searchRequests (filter) {
      this.loading = true
      this.requests = (await RequestsService.search(filter)).data
      this.loading = false
    },

    async getComboboxItems () {
      this.applicants = await RequestsService.getAttributeOptions('applicant')
      this.authorizers = await RequestsService.getAttributeOptions('authorizer')
    },
    loadRequestsTable () {
      this.getRequests()
      this.getComboboxItems()
      this.closeForm()
    },
    closeForm () {
      this.editingRequest = null
      this.form = false
    }
  }
}
</script>
