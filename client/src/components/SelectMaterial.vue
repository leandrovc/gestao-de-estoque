<template>
  <v-container grid-list-md>
    <v-layout
      row
      wrap
    >
      <v-flex xs12>
        <material-picker
          :material="selectedItem"
          :rules="rules"
          @material-selected="itemSelected"
        />
      </v-flex>
      <v-flex xs2>
        <v-text-field
          v-model="selectedItem.group"
          label="Grupo"
          readonly
          :disabled="selectedItem.description === ''"
        />
      </v-flex>
      <v-flex xs2>
        <v-text-field
          v-model="selectedItem.code"
          label="Código"
          readonly
          :disabled="selectedItem.description === ''"
        />
      </v-flex>
      <v-flex xs2>
        <v-text-field
          v-model="selectedItem.currentQuantity"
          label="Quant. atual"
          readonly
          :disabled="selectedItem.description === ''"
        />
      </v-flex>
      <v-flex xs2>
        <v-text-field
          v-model="selectedItem.minimumQuantity"
          label="Quant. mínima"
          readonly
          :disabled="selectedItem.description === ''"
        />
      </v-flex>
      <v-flex xs2>
        <v-text-field
          v-model="selectedItem.unit"
          label="Unidade"
          readonly
          :disabled="selectedItem.description === ''"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import MaterialPicker from '@/components/MaterialPicker'

export default {
  components: {
    MaterialPicker
  },
  props: {
    materialSelected: {
      type: Object,
      required: true
    },
    materialSelectedIndex: {
      type: Number,
      required: true
    },
    rules: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      selectedItem: {
        description: '',
        group: '',
        code: '',
        currentQuantity: null,
        minimumQuantity: null,
        unit: 'pc'
      }
    }
  },
  mounted () {
    this.selectedItem = Object.assign({}, this.materialSelected)
  },
  methods: {
    itemSelected (selectedMaterial) {
      this.selectedItem = Object.assign({}, selectedMaterial)
      this.$emit('material-selected', selectedMaterial, this.materialSelectedIndex)
    }
  }
}
</script>
