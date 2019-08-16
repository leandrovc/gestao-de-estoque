<template>
  <v-layout column>
    <v-toolbar
      flat
      color="secondary"
    >
      <v-toolbar-title>MATERIAIS</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      />
      <v-spacer />
      <v-dialog
        v-model="formDialog"
        max-width="512px"
      >
        <template v-slot:activator="{ on }">
          <v-btn
            color="primary"
            dark
            class="mb-2"
            v-on="on"
          >
            Adicionar Material
          </v-btn>
        </template>
        <material-form
          :key="resetSearch"
          :editing-material="formMaterial"
          @closing="closeForm"
        />
      </v-dialog>
    </v-toolbar>
    <material-search
      :key="resetSearch"
      edit-materials
      @material-selected="editMaterial"
    />
  </v-layout>
</template>

<script>
import MaterialForm from '@/components/MaterialForm'
import MaterialSearch from '@/components/MaterialSearch'

export default {
  components: {
    MaterialForm,
    MaterialSearch
  },
  data () {
    return {
      resetSearch: false,
      formDialog: false,
      formMaterial: null,
      emptyFormMaterial: {
        id: null,
        description: '',
        group: '',
        code: '',
        currentQuantity: null,
        minimumQuantity: null,
        unit: 'pc'
      }
    }
  },
  watch: {
    formDialog (value) {
      !value && this.onFormClose()
    }
  },
  created () {
    this.formMaterial = Object.assign({}, this.emptyFormMaterial)
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
      this.formMaterial = Object.assign({}, this.emptyFormMaterial)
      this.resetSearch = !this.resetSearch
    }
  }
}
</script>
