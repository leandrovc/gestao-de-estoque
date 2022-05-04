<template>
  <v-layout>
    <v-text-field
      :value="value.description"
      label="Descrição"
      :filled="filled"
      readonly
      append-icon="edit"
      required
      :rules="rules"
      @click="openDialog"
      @click:append="openDialog"
      @input="valueChanged($event, 'description')"
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
          #add-button
        >
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
    value: {
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
      formMaterial: null,
      material: {},
      materialFactory: null
    }
  },
  watch: {
    formDialog (value) {
      !value && this.onFormClose()
    },
    value (newValue) {
      if (Object.keys(this.material).length === 0 && this.material.constructor === Object) {
       this.material = newValue
      }
    }
  },
  created () {
    this.materialFactory = new Material()
    this.formMaterial = this.materialFactory.getEmptyItem()
    this.material = Object.assign({}, this.value)
  },
  methods: {
    materialSelected (selectedMaterial) {
      this.$emit('material-selected', selectedMaterial)
      this.dialog = false
    },
    valueChanged ($event, fieldName) {
      this.material[fieldName] = $event
      this.$emit('input', this.material)
    },
    openDialog () {
      this.dialog = true
    },
    closeForm () {
      this.formDialog = false
    },
    onFormClose () {
      this.formMaterial = this.materialFactory.getEmptyItem()
      this.resetSearch = !this.resetSearch
    }
  }
}
</script>
