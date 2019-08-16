<template>
  <v-layout wrap>
    <v-flex mt-4>
      <v-data-table
        :headers="headers"
        :items="requests"
        :expand="expand"
        :loading="loading"
        hide-actions
        :pagination.sync="pagination"
        class="elevation-1"
      >
        <template v-slot:items="props">
          <tr @click="props.expanded = !props.expanded">
            <td>{{ props.item.number }}</td>
            <td>{{ props.item.issueDate | formatDate }}</td>
            <td>{{ props.item.applicant }}</td>
            <td>{{ props.item.authorizer }}</td>
            <td>{{ props.item.comments }}</td>
            <td class="justify-center layout px-0">
              <v-icon
                small
                class="mr-2"
                @click="editItem(props.item)"
              >
                edit
              </v-icon>
              <v-icon
                small
                @click="deleteItem(props.item)"
              >
                delete
              </v-icon>
            </td>
          </tr>
        </template>
        <template v-slot:no-data>
          <v-alert
            :value="true"
            color="error"
            icon="warning"
          >
            Sua busca não retornou resultados.
          </v-alert>
        </template>
        <template v-slot:expand="props">
          <v-card flat>
            <v-card-text>
              <li
                v-for="mat in props.item.Materials"
                :key="mat.id"
              >
                {{ mat.description }}
                | <span class="quantity"> quantidade: {{ mat.MaterialRequests.quantity }} </span>
              </li>
            </v-card-text>
          </v-card>
        </template>
      </v-data-table>
      <div class="text-xs-center pt-2">
        <v-pagination
          v-model="pagination.page"
          :length="pages"
          :total-visible="7"
        />
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  filters: {
    formatDate: value => {
      var day = value.substr(8, 2)
      var month = value.substr(5, 2)
      var year = value.substr(0, 4)
      return day + '/' + month + '/' + year
    }
  },
  props: {
    requests: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      expand: true,
      pagination: {
        rowsPerPage: 10,
        sortBy: 'issueDate'
      },
      headers: [
        { text: 'Nº', value: 'number' },
        { text: 'Data de Emissão', value: 'issueDate' },
        { text: 'Requerente', value: 'applicant' },
        { text: 'Autorizador', value: 'authorizer' },
        { text: 'Comentários', value: 'comments' },
        { text: 'Ações', value: 'id', sortable: false }
      ]
    }
  },
  computed: {
    pages () {
      if (this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      ) return 0

      return Math.ceil(this.pagination.totalItems /
        this.pagination.rowsPerPage)
    }
  },
  methods: {
    editItem (item) {
      this.$emit('edit-item', item)
    },

    deleteItem (item) {
      this.$emit('delete-item', item)
    }
  }
}
</script>

<style scoped>
.quantity {
  color: #005300;
  font-weight: bold;
}
</style>
