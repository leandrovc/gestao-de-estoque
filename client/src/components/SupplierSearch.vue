<template>
  <v-card>
    <v-card-title class="headline">
      <v-flex xs3>
        Buscar Fornecedor
      </v-flex>
      <v-flex
        xs5
        offset-xs1
      >
        <v-text-field
          v-model="searchText"
          append-icon="search"
          label="Razão Social"
          class="pr-4"
          single-line
          hide-details
          @keyup.enter="searchSuppliers"
          @click:append="searchSuppliers"
        />
      </v-flex>
    </v-card-title>
    <v-card-text>
      <div>
        <v-data-table
          :headers="headers"
          :items="suppliers"
          :expand="expand"
          :loading="loading"
          hide-actions
          :pagination.sync="pagination"
          class="elevation-1"
        >
          <template v-slot:items="props">
            <tr @click="props.expanded = !props.expanded">
              <td>{{ props.item.socialName }}</td>
              <td>{{ props.item.cnpj }}</td>
              <td
                v-if="editSuppliers"
                class="justify-center layout px-0"
              >
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
              <td
                v-if="selectSuppliers"
                class="justify-center layout px-0"
              >
                <v-btn
                  small
                  class="mr-2"
                  @click="editItem(props.item)"
                >
                  Escolher
                </v-btn>
              </td>
            </tr>
          </template>
          <template v-slot:no-data>
            <v-alert
              :value="hasSearched"
              type="error"
            >
              Sua busca não retornou resultados.
            </v-alert>
          </template>
          <template v-slot:expand="props">
            <v-card flat>
              <v-card-text>
                {{ props.item.Address.street }},
                {{ props.item.Address.number }} -
                {{ props.item.Address.district }},
                {{ props.item.Address.city }},
                {{ props.item.Address.state }} -
                CEP: {{ props.item.Address.cep }}
                <li
                  v-for="tel in props.item.Telephones"
                  :key="tel.id"
                >
                  {{ tel.number }}
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
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import SuppliersService from '@/services/SuppliersService'

export default {
  props: {
    editSuppliers: {
      type: Boolean,
      default: false
    },
    selectSuppliers: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      searchText: '',
      hasSearched: false,
      expand: true,
      pagination: {
        rowsPerPage: 10,
        sortBy: 'id',
        descending: true
      },
      loading: false,
      headers: [
        { text: 'Razão Social', value: 'socialName' },
        { text: 'CNPJ', value: 'cnpj' },
        { text: 'Ações', value: 'id', sortable: false }
      ],
      headerAction: { text: 'Ações', value: 'id', sortable: false },
      suppliers: []
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
  mounted () {
    if (this.editSuppliers || this.selectSuppliers) {
      this.headers.push(this.headerAction)
    }
    this.getSuppliers()
  },
  methods: {
    editItem (supplier) {
      this.$emit('supplier-selected', supplier)
    },
    deleteItem (supplier) {
      const index = this.suppliers.indexOf(supplier)
      confirm(`Tem certeza de que deseja EXCLUIR ${supplier.socialName}?`) &&
      SuppliersService.delete(supplier.id) &&
      this.suppliers.splice(index, 1)
    },
    async getSuppliers () {
      this.loading = true
      this.suppliers = (await SuppliersService.showAll()).data
      this.pagination.totalItems = this.suppliers.length
      this.loading = false
    },
    async searchSuppliers () {
      this.loading = true
      this.suppliers = (await SuppliersService.search(this.searchText)).data
      this.pagination.totalItems = this.suppliers.length
      this.hasSearched = true
      this.loading = false
    }
  }
}
</script>
