<template>
  <v-layout wrap>
    <v-flex mt-4>
      <v-data-table
        :headers="headers"
        :items="invoices"
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
            <td>{{ props.item.Supplier.socialName }}</td>
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
              <table>
                <tr>
                  <th>Descrição do Produto</th>
                  <th>Marca</th>
                  <th>Un.</th>
                  <th>Quant.</th>
                  <th>V. Unit.</th>
                </tr>
                <tr
                  v-for="mat in props.item.Materials"
                  :key="mat.id"
                >
                  <td> {{ mat.description }} </td>
                  <td> {{ mat.MaterialInvoices.brand }} </td>
                  <td> {{ mat.unit }} </td>
                  <td> {{ mat.MaterialInvoices.quantity }} </td>
                  <td> {{ mat.MaterialInvoices.unitaryValue | formatBRL }} </td>
                </tr>
              </table>
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
    },
    formatBRL: value => {
      if (typeof value !== 'number') {
        return value
      }
      var formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2
      })
      return formatter.format(value)
    }
  },
  props: {
    invoices: {
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
        { text: 'Fornecedor', value: 'socialName' },
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
