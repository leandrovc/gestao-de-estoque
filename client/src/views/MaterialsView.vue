<template>
  <v-layout column>
    <material-search
      :key="resetSearch"
      show-edit
      @material-selected="editMaterial"
    >
      <template #minimum-button>
        <v-btn
          color="secondary"
          class="ma-2 black--text"
          @click="searchOnMinimum"
        >
          Atual &lt;= Mínima
        </v-btn>
      </template>
      <template #add-button>
        <v-dialog
          v-model="formDialog"
          max-width="512px"
        >
          <template #activator="{ on }">
            <v-btn
              color="accent"
              class="ma-2 black--text"
              v-on="on"
            >
              Adicionar
            </v-btn>
          </template>
          <material-form
            :key="resetSearch"
            v-model="formMaterial"
            @closing="closeForm"
          />
        </v-dialog>
      </template>
    </material-search>
  </v-layout>
</template>

<script>
import MaterialForm from '@/components/material/MaterialForm'
import MaterialSearch from '@/components/material/MaterialSearch'
import EventBus from '@/event-bus'

export default {
  components: {
    MaterialForm,
    MaterialSearch
  },
  data () {
    return {
      resetSearch: false,
      formDialog: false,
      formMaterial: null
    }
  },
  watch: {
    formDialog (value) {
      !value && this.onFormClose()
    }
  },
  methods: {
    editMaterial (material) {
      this.formMaterial = Object.assign({}, material)
      this.formDialog = true
    },
    closeForm () {
      this.formDialog = false
    },
    onFormClose () {
      this.formMaterial = null
      this.resetSearch = !this.resetSearch
    },
    searchOnMinimum () {
      EventBus.$emit('show-low-quantity')
    }
  }
}
</script>
