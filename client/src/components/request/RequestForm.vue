<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-layout ma-4>
      <span class="headline">
        {{ formTitle }}
      </span>
    </v-layout>

    <v-layout
      row
      mx-2
    >
      <v-flex
        xs2
        mr-4
      >
        <v-text-field
          v-model="editedRequest.number"
          v-mask="numberMask"
          label="Número"
          return-masked-value
          :rules="[required, minimumLength]"
          required
          autofocus
        />
      </v-flex>
      <v-flex
        xs2
        mr-4
      >
        <date-picker
          :picked-date="editedRequest.issueDate"
          label="Data de Emissão"
          :rules="[required]"
          @date-picked="setDate"
        />
      </v-flex>
      <v-flex
        xs3
        mr-4
      >
        <v-combobox
          v-model="editedRequest.applicant"
          :items="applicants"
          label="Requerente"
          :rules="[required]"
          required
        />
      </v-flex>
      <v-flex xs3>
        <v-combobox
          v-model="editedRequest.authorizer"
          :items="authorizers"
          label="Autorizador"
          :rules="[required]"
          required
        />
      </v-flex>
      <v-flex xs10>
        <v-text-field
          v-model="editedRequest.comments"
          label="Comentários"
        />
      </v-flex>
      <br>
      <v-flex xs12>
        <p>{{ editedRequest.Materials.length > 1 ? 'Materiais' : 'Material' }}</p>
      </v-flex>
      <v-layout
        v-for="(material, index) in editedRequest.Materials"
        :key="material.id"
      >
        <v-flex xs9>
          <material-data
            :material-selected="material"
            :material-selected-index="index"
            :rules="[required]"
            required
            @material-selected="replaceMaterial"
          />
        </v-flex>
        <v-spacer />
        <v-flex xs2>
          <v-text-field
            v-model="material.MaterialRequests.quantity"
            v-mask="['#,##', '##,##', '###,##', '####,##']"
            label="Quantidade"
            hint="9999,99"
            return-masked-value
            persistent-hint
            :rules="[required]"
            required
          />
        </v-flex>
      </v-layout>
      <v-flex>
        <v-btn
          v-if="!emptyMaterialSlot"
          rounded
          @click="appendMaterial"
        >
          <v-icon>
            add
          </v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout justify-end>
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
    </v-layout>
  </v-form>
</template>

<script>
import Request from '@/models/Request'
import MaterialData from '@/components/material/MaterialData'
import DatePicker from '@/components/DatePicker'
import { mask } from 'vue-the-mask'

export default {
  directives: {
    mask
  },
  components: {
    MaterialData,
    DatePicker
  },
  props: {
    request: {
      type: Object,
      default: null
    },
    applicants: {
      type: Array,
      required: true
    },
    authorizers: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      emptyMaterialSlot: true,
      editedRequest: null,
      numberMask: '###.###',
      valid: true,
      required: (value) => !!value || 'Preenchimento obrigatório!',
      minimumLength: (value) => value.length === 7 || 'Quantidade insuficiente de caracteres'
    }
  },
  computed: {
    formTitle () {
      return this.editedRequest.id == null ? 'Nova Requisição' : 'Editar Requisição'
    }
  },
  created () {
    this.editedRequest = Request.assign(this.request)
    this.emptyMaterialSlot = this.request == null
  },
  methods: {
    close () {
      this.$emit('close')
    },
    async save () {
      if (this.$refs.form.validate()) {
        Request.save(this.editedRequest, () => {
          this.$emit('save')
        })
      }
    },
    appendMaterial () {
      Request.appendMaterial(this.editedRequest)
      this.emptyMaterialSlot = true
    },
    replaceMaterial (material, index) {
      Request.replaceMaterial(this.editedRequest.Materials, material, index)
      this.emptyMaterialSlot = false
    },
    setDate (value) {
      this.editedRequest.issueDate = value
    }
  }
}
</script>
