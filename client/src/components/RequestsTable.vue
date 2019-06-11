<template>
  <v-data-table
    :headers="headers"
    :items="requests"
    :expand="expand"
    :loading="loading"
    :rows-per-page-text="rowsPerPageText"
    class="elevation-1"
  >
    <template v-slot:items="props">
      <tr @click="props.expanded = !props.expanded">
        <td>{{ props.item.number }}</td>
        <td>{{ props.item.issueDate | formatDate }}</td>
        <td>{{ props.item.applicant }}</td>
        <td>{{ props.item.authorizer }}</td>
        <td>{{ props.item.comments }}</td>
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
    <template v-slot:pageText="props">
      {{ props.pageStart }} - {{ props.pageStop }} de {{ props.itemsLength }}
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
      rowsPerPageText: 'Linhas por página:',
      headers: [
        { text: 'Nº', value: 'number' },
        { text: 'Data de Emissão', value: 'issueDate' },
        { text: 'Requerente', value: 'applicant' },
        { text: 'Autorizador', value: 'authorizer' },
        { text: 'Comentários', value: 'comments' }
      ]
    }
  }
}
</script>

<style scoped>
.quantity {
  color: red;
  font-weight: bold;
}
</style>
