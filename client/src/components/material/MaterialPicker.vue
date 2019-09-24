<template>
  <v-layout>
    <v-text-field
      v-model="material.description"
      label="Descrição"
      :filled="filled"
      readonly
      append-icon="edit"
      required
      :rules="rules"
      @click="openDialog"
      @click:append="openDialog"
    />
    <v-dialog
      v-model="dialog"
      max-width="1024px"
    >
      <material-search
        :key="resetSearch"
        select-materials
        @material-selected="materialSelected"
      >
        <template
          v-if="showAdd"
          v-slot:add-button
        >
          <v-dialog
            v-model="formDialog"
            max-width="512px"
          >
            <template v-slot:activator="{ on }">
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
              :editing-material="formMaterial"
              @closing="closeForm"
            />
          </v-dialog>
        </template>
      </material-search>
    </v-dialog>
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
  props: {
    material: {
      type: Object,
      required: true
    },
    rules: {
      type: Array,
      default: () => {}
    },
    filled: {
      type: Boolean,
      default: false
    },
    showAdd: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      dialog: false,
      formDialog: false,
      resetSearch: false,
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
    materialSelected (selectedMaterial) {
      this.$emit('material-selected', selectedMaterial)
      this.dialog = false
    },
    openDialog () {
      this.dialog = true
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
