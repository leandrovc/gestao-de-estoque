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
          filled
          :show-add="showAdd"
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
      <v-flex>
        <v-btn
          rounded
          @click="deleteItem"
        >
          <v-icon>
            delete
          </v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import MaterialPicker from '@/components/material/MaterialPicker'

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
    },
    showAdd: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      selectedItem: null
    }
  },
  created () {
    this.selectedItem = Object.assign({}, this.materialSelected)
  },
  methods: {
    itemSelected (selectedMaterial) {
      this.selectedItem = Object.assign({}, selectedMaterial)
      this.$emit('material-selected', selectedMaterial, this.materialSelectedIndex)
    },
    deleteItem () {
      this.$emit('material-deleted', this.materialSelectedIndex)
    }
  }
}
</script>
