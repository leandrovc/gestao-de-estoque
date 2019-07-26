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
          <v-layout
            row
            wrap
          >
            <v-flex xs6>
              <v-text-field
                v-model="editingMaterial.description"
                label="Descrição"
                :rules="[required]"
                required
              />
            </v-flex>
            <v-flex xs3>
              <v-combobox
                v-model="editingMaterial.group"
                :items="groups"
                label="Grupo"
                mask="AAAA"
                :rules="[required]"
                required
              />
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="editingMaterial.code"
                label="Código"
                mask="#####"
                :rules="[required]"
                required
              />
            </v-flex>
          </v-layout>
          <v-layout wrap>
            <v-flex xs3>
              <v-text-field
                v-model="editingMaterial.currentQuantity"
                label="Quant. atual"
                hint="9999.99"
                persistent-hint
                reverse
                :rules="[required]"
                required
              />
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="editingMaterial.minimumQuantity"
                label="Quant. mínima"
                hint="9999.99"
                persistent-hint
                reverse
                :rules="[required]"
                required
              />
            </v-flex>
            <v-flex xs2>
              <v-text-field
                v-model="editingMaterial.unit"
                label="Unidade"
                mask="aa"
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
          flat
          @click="close"
        >
          Cancelar
        </v-btn>
        <v-btn
          :disabled="!valid"
          color="blue darken-1"
          flat
          @click="save"
        >
          Salvar
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import MaterialsService from '@/services/MaterialsService'

export default {
  props: {
    editingMaterial: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      groups: ['ADES', 'CNLT', 'ELET', 'ELTD', 'FECH', 'FERR', 'GERL', 'HIDR', 'ILUM', 'IMPE', 'REVE', 'SANT'],
      valid: true,
      required: (value) => !!value || 'Preenchimento obrigatório!'
    }
  },
  computed: {
    formTitle () {
      return this.editingMaterial.id == null ? 'Novo Material' : 'Editar Material'
    }
  },
  methods: {
    close () {
      this.$refs.form.reset()
      this.$emit('closing')
    },
    async save () {
      if (this.$refs.form.validate()) {
        try {
          if (this.editingMaterial.id == null) {
            await MaterialsService.create(this.editingMaterial)
          } else {
            await MaterialsService.update(this.editingMaterial.id, this.editingMaterial)
          }
          this.close()
        } catch (err) {
          console.log(err)
        }
      }
    }
  }
}
</script>
