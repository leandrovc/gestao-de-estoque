<template>
  <v-card>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-card-title class="headline">
        {{ formTitle }}
      </v-card-title>

      <v-card-text>
        <v-container grid-list-md>
          <v-layout>
            <v-flex
              offset-xs1
              xs10
            >
              <v-text-field
                v-model="editingMaterial.description"
                label="Descrição"
                :rules="[required]"
                required
              />
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex
              offset-xs1
              xs3
            >
              <v-combobox
                v-model="editingMaterial.group"
                v-mask="groupMask"
                :items="groups"
                label="Grupo"
                :rules="[required]"
                required
              />
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="editingMaterial.code"
                v-mask="codeMask"
                label="Código"
                :rules="[required]"
                required
              />
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex
              offset-xs1
              xs4
            >
              <v-text-field
                v-model="editingMaterial.currentQuantity"
                v-mask="['#,##', '##,##', '###,##', '####,##']"
                label="Quant. atual"
                :rules="[required]"
                required
              />
            </v-flex>
            <v-flex xs4>
              <v-text-field
                v-model="editingMaterial.minimumQuantity"
                v-mask="['#,##', '##,##', '###,##', '####,##']"
                label="Quant. mínima"
                :rules="[required]"
                required
              />
            </v-flex>
            <v-flex xs2>
              <v-text-field
                v-model="editingMaterial.unit"
                v-mask="unitMask"
                label="Unidade"
                return-masked-value
                :rules="[required]"
                required
              />
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn
          color="blue darken-1"
          text
          @click="close"
        >
          Cancelar
        </v-btn>
        <v-btn
          :disabled="!valid"
          color="blue darken-1"
          text
          @click="save"
        >
          Salvar
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import Material from '@/models/Material'
import { mask } from 'vue-the-mask'

export default {
  directives: {
    mask
  },
  props: {
    editingMaterial: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      groups: ['ADES', 'CNLT', 'ELET', 'ELTD', 'FECH', 'FERR', 'GERL', 'HIDR', 'ILUM', 'IMPE', 'REVE', 'SANT'],
      groupMask: 'AAAA',
      codeMask: '#####',
      unitMask: 'aa',
      valid: true,
      required: (value) => {
        return (value != null && value !== '') || 'Preenchimento obrigatório!'
      }
    }
  },
  computed: {
    formTitle () {
      return this.editingMaterial.id == null ? 'Novo Material' : 'Editar Material'
    }
  },
  methods: {
    close () {
      this.$emit('closing')
    },
    async save () {
      if (this.$refs.form.validate()) {
        Material.save(this.editingMaterial, this.close)
      }
    }
  }
}
</script>
