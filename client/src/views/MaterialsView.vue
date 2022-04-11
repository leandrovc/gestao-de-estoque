<template>
  <v-layout column>
    <material-search
      :key="resetSearch"
      show-edit
      @material-selected="editMaterial"
    >
      <template #add-button>
        <v-dialog
          v-model="formDialog"
          max-width="512px"
        >
          <template #activator="{ on }">
            <v-btn
              color="accent"
              class="mb-2 black--text"
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
import Material from '@/models/Material'
import MaterialForm from '@/components/material/MaterialForm'
import MaterialSearch from '@/components/material/MaterialSearch'

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
  created () {
    this.formMaterial = Material.assign()
  },
  methods: {
    editMaterial (material) {
      this.formMaterial = Material.assign(material)
      this.formDialog = true
    },
    closeForm () {
      this.formDialog = false
    },
    onFormClose () {
      this.formMaterial = Material.assign()
      this.resetSearch = !this.resetSearch
    }
  }
}
</script>
