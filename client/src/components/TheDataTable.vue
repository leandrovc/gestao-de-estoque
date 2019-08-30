<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      :loading="loading"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      hide-default-footer
      single-expand
      :expanded.sync="expanded"
      item-key="id"
      :show-expand="expand"
      class="elevation-1 mytable"
      @page-count="pageCount = $event"
    >
      <template v-slot:item.action="{ item }">
        <v-icon
          v-if="showEdit"
          small
          class="mr-2"
          @click="$emit('edit-item', item)"
        >
          edit
        </v-icon>
        <v-icon
          v-if="showEdit"
          small
          @click="$emit('delete-item', item)"
        >
          delete
        </v-icon>
        <v-btn
          v-if="!showEdit"
          small
          class="mr-2"
          @click="$emit('select-item', item)"
        >
          Escolher
        </v-btn>
      </template>
      <template v-slot:no-data>
        <v-alert type="error">
          Sua busca não retornou resultados.
        </v-alert>
      </template>
      <template v-slot:expanded-item="{ item, headers }">
        <td :colspan="headers.length">
          <ul
            v-for="line in item.expanded"
            :key="line.id"
          >
            {{ line }}
          </ul>
        </td>
      </template>
    </v-data-table>
    <div class="text-xs-center pt-2">
      <v-pagination
        v-model="page"
        color="secondary"
        :length="pageCount"
        :total-visible="7"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    headers: {
      type: Array,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    showEdit: {
      type: Boolean,
      default: false
    },
    expand: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      page: 1,
      pageCount: 10,
      itemsPerPage: 10,
      expanded: []
    }
  }
}
</script>

<style>
thead th {
  background-color: #C5E0D8
}
tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, .03)
}
</style>
