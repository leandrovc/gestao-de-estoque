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
        select-materials
        @material-selected="materialSelected"
      />
    </v-dialog>
  </v-layout>
</template>

<script>
import MaterialSearch from '@/components/material/MaterialSearch'

export default {
  components: {
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
    }
  },
  data () {
    return {
      dialog: false
    }
  },
  methods: {
    materialSelected (selectedMaterial) {
      this.$emit('material-selected', selectedMaterial)
      this.dialog = false
    },
    openDialog () {
      this.dialog = true
    }
  }
}
</script>
