<template>
  <v-layout column>
    <v-flex>
      <div>
        <v-toolbar
          flat
          color="secondary"
        >
          <v-toolbar-title>FORNECEDORES</v-toolbar-title>
          <v-divider
            class="mx-2"
            inset
            vertical
          />
          <v-spacer />
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Busca"
            class="pr-4"
            single-line
            hide-details
            @keyup.enter="searchSuppliers"
            @click:append="searchSuppliers"
          />
          <supplier-form ref="supplierForm" />
        </v-toolbar>
        <v-data-table
          :headers="headers"
          :items="suppliers"
          :expand="expand"
          :loading="loading"
          :rows-per-page-text="rowsPerPageText"
          class="elevation-1"
        >
          <template v-slot:items="props">
            <tr @click="props.expanded = !props.expanded">
              <td>{{ props.item.socialName }}</td>
              <td>{{ props.item.cnpj }}</td>
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
              Sua busca por "{{ search }}" não retornou resultados.
            </v-alert>
          </template>
          <template v-slot:pageText="props">
            {{ props.pageStart }} - {{ props.pageStop }} de {{ props.itemsLength }}
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
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import SuppliersService from '@/services/SuppliersService'
import SupplierForm from '@/components/SupplierForm'

export default {
  components: {
    SupplierForm
  },

  data () {
    return {
      search: '',
      searchTimer: null,
      expand: true,
      loading: true,
      headers: [
        { text: 'Razão Social', value: 'socialName' },
        { text: 'CNPJ', value: 'cnpj' },
        { text: 'Ações', value: 'id', sortable: false }
      ],
      rowsPerPageText: 'Linhas por página:',
      suppliers: []
    }
  },
  mounted () {
    this.getSuppliers()
    this.$watch(
      '$refs.supplierForm.dialog',
      (value) => {
        value || this.getSuppliers()
      }
    )
  },
  methods: {
    editItem (item) {
      this.$refs.supplierForm.editItem(item)
    },

    deleteItem (item) {
      const index = this.suppliers.indexOf(item)
      confirm(`Tem certeza de que deseja EXCLUIR ${item.socialName}?`) &&
      SuppliersService.delete(item.id) &&
      this.suppliers.splice(index, 1)
    },

    async getSuppliers () {
      this.loading = true
      this.suppliers = (await SuppliersService.showAll()).data
      this.loading = false
    },

    async searchSuppliers () {
      this.loading = true
      this.suppliers = (await SuppliersService.search(this.search)).data
      this.loading = false
    }
  }
}
</script>
