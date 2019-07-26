<template>
  <v-layout column>
    <v-flex>
      <div>
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
          <v-btn
            v-if="!formOpen"
            color="primary"
            dark
            class="mb-2"
            @click="createMaterial"
          >
            Adicionar Material
          </v-btn>
        </v-toolbar>
        <material-search
          v-if="!formOpen"
          edit-materials
          @material-selected="editMaterial"
        />
        <material-form
          v-if="formOpen"
          :editing-material="formMaterial"
          @closing="closeForm"
        />
      </div>
    </v-flex>
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
      formOpen: false,
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
  methods: {
    editMaterial (material) {
      this.formMaterial = Object.assign({}, material)
      this.formOpen = true
    },
    createMaterial () {
      this.formMaterial = Object.assign({}, this.emptyFormMaterial)
      this.formOpen = true
    },
    closeForm () {
      this.formOpen = false
    }
  }
}
</script>
