<template>
  <v-card>
    <v-card-title class="headline">
      <v-flex xs3>
        FORNECEDORES
      </v-flex>
      <v-divider
        class="mx-4"
        inset
        vertical
      />
      <v-flex
        xs6
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
      <v-spacer />
      <slot name="add-button" />
    </v-card-title>
    <v-card-text>
      <the-data-table
        :headers="headers"
        :items="suppliers.getList()"
        :loading="loading"
        :show-edit="showEdit"
        expand
        @edit-item="selectSupplier"
        @delete-item="deleteSupplier"
        @select-item="selectSupplier"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import Supplier from '@/models/Supplier'
import TheDataTable from '@/components/TheDataTable'

export default {
  components: {
    TheDataTable
  },
  props: {
    showEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      searchText: '',
      loading: false,
      headers: [
        { text: 'Razão Social', value: 'socialName' },
        { text: 'CNPJ', value: 'cnpj' },
        { text: 'Ações', value: 'action', sortable: false }
      ],
      suppliers: null
    }
  },
  created () {
    this.suppliers = Supplier.newList()
  },
  mounted () {
    this.getSuppliers()
  },
  methods: {
    selectSupplier (supplier) {
      this.$emit('supplier-selected', supplier)
    },
    deleteSupplier (supplier) {
      confirm(`Tem certeza de que deseja EXCLUIR ${supplier.socialName}?`) &&
      this.suppliers.deleteItem(supplier)
    },
    async getSuppliers () {
      this.loading = true
      await this.suppliers.showAll()
      this.loading = false
    },
    async searchSuppliers () {
      this.loading = true
      await this.suppliers.showSearchResult(this.searchText)
      this.loading = false
    }
  }
}
</script>
