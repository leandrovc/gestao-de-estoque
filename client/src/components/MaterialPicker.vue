<template>
  <v-layout>
    <v-text-field
      v-model="material.description"
      label="Material"
      readonly
      append-icon="edit"
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
import MaterialSearch from '@/components/MaterialSearch'

export default {
  components: {
    MaterialSearch
  },
  props: {
    material: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      materialDescription: '',
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
