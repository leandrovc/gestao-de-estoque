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
                :value="editingMaterial.description"
                label="Descrição"
                :rules="[required]"
                required
                @input="valueChanged($event, 'description')"
              />
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex
              offset-xs1
              xs3
            >
              <v-select
                :value="editingMaterial.group"
                :items="groups"
                label="Grupo"
                :rules="[required]"
                required
                @input="valueChanged($event, 'group')"
              />
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-mask="codeMask"
                :value="editingMaterial.code"
                label="Código"
                :rules="[required]"
                required
                @input="valueChanged($event, 'code')"
              />
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex
              offset-xs1
              xs4
            >
              <v-text-field
                v-mask="['#,##', '##,##', '###,##', '####,##']"
                :value="editingMaterial.currentQuantity"
                label="Quant. atual"
                :rules="[required]"
                required
                @input="valueChanged($event, 'currentQuantity')"
              />
            </v-flex>
            <v-flex xs4>
              <v-text-field
                v-mask="['#,##', '##,##', '###,##', '####,##']"
                :value="editingMaterial.minimumQuantity"
                label="Quant. mínima"
                :rules="[required]"
                required
                @input="valueChanged($event, 'minimumQuantity')"
              />
            </v-flex>
            <v-flex xs2>
              <v-text-field
                v-mask="unitMask"
                :value="editingMaterial.unit"
                label="Unidade"
                return-masked-value
                :rules="[required]"
                required
                @input="valueChanged($event, 'unit')"
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
    value: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      groups: [
        'ADES',
        'CNLT',
        'ELTR',
        'ELTD',
        'FECH',
        'FERR',
        'GERL',
        'HIDR',
        'ILUM',
        'IMPE',
        'REVE',
        'SANT'
      ],
      groupMask: 'AAAA',
      codeMask: '#####',
      unitMask: 'aa',
      valid: true,
      editingMaterial: null,
      materialFactory: null,
      required: (value) => {
        return (value != null && value !== '') || 'Preenchimento obrigatório!'
      },
    }
  },
  computed: {
    formTitle() {
      return this.editingMaterial.id == null
        ? 'Novo Material'
        : 'Editar Material'
    },
  },
  created() {
    this.materialFactory = new Material()
    this.editingMaterial =
      this.value !== undefined && this.value != null
        ? Object.assign({}, this.value)
        : this.materialFactory.getEmptyItem()
  },
  methods: {
    async valueChanged($event, fieldName) {
      this.editingMaterial[fieldName] = $event
      this.$emit('input', this.editingMaterial)
      if (fieldName == 'group') {
        this.editingMaterial.code = await this.materialFactory.getNewGroupCode($event)
      }
    },
    close() {
      this.$emit('closing')
    },
    async save() {
      if (this.$refs.form.validate()) {
        this.materialFactory.save(this.editingMaterial, this.close)
      }
    },
  },
}
</script>
