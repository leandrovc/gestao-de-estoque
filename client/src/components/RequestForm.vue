<template>
  <v-container
    class="elevation-1"
    max-width="600px"
    transition="slide-x-reverse-transition"
  >
    <v-card>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-card-title>
          <span class="headline">
            {{ formTitle }}
          </span>
        </v-card-title>

        <v-card-text>
          <v-container grid-list-md>
            <v-layout
              row
              wrap
            >
              <v-flex xs2>
                <v-text-field
                  v-model="editedRequest.number"
                  label="Número"
                  return-masked-value
                  mask="###.###"
                  :rules="[required]"
                  required
                  autofocus
                />
              </v-flex>
              <v-flex xs3>
                <date-picker
                  :picked-date="editedRequest.issueDate"
                  label="Data de Emissão"
                  @date-picked="setDate"
                />
              </v-flex>
              <v-flex xs3>
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
              <v-flex xs12>
                <v-textarea
                  v-model="editedRequest.comments"
                  label="Comentários"
                />
              </v-flex>
            </v-layout>
            <br>
            <p>{{ editedMaterials.length > 1 ? 'Materiais' : 'Material' }}</p>
            <v-layout
              v-for="(material, index) in editedMaterials"
              :key="material.id"
              xs12
              align-center
            >
              <v-flex xs9>
                <select-material
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
                  v-model="material.quantity"
                  label="Quantidade"
                  hint="9999.99"
                  persistent-hint
                  :rules="[required]"
                  required
                />
              </v-flex>
            </v-layout>
            <v-layout>
              <v-btn
                v-if="!emptyMaterialSlot"
                round
                @click="appendMaterial"
              >
                <v-icon>
                  add
                </v-icon>
              </v-btn>
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
  </v-container>
</template>

<script>
import RequestsService from '@/services/RequestsService'
import SelectMaterial from '@/components/SelectMaterial'
import DatePicker from '@/components/DatePicker'

export default {
  components: {
    SelectMaterial,
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
      editedIndex: -1,
      editedRequest: {
        number: '',
        issueDate: '',
        applicant: '',
        authorizer: '',
        comments: ''
      },
      editedMaterials: [
        {
          description: '',
          quantity: null
        }
      ],
      valid: true,
      required: (value) => !!value || 'Preenchimento obrigatório!'
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Nova Requisição' : 'Editar Requisição'
    }
  },
  watch: {
    editedMaterials (value) {
      this.emptyMaterialSlot = value[value.length - 1].description === ''
    }
  },
  mounted () {
    if (this.request) {
      this.editedRequest = this.request
      if (this.editedRequest.Materials.length > 0) {
        this.editedMaterials = this.request.Materials
        this.editedMaterials.forEach(m => {
          m.quantity = m.MaterialRequests.quantity
        })
      }
      this.editedIndex = this.request.id
    }
  },
  methods: {
    editItem (item) {
      this.editedRequest = Object.assign({}, item)
    },
    close () {
      this.$emit('close')
    },
    async save () {
      this.editedRequest.Materials = this.editedMaterials
      if (this.$refs.form.validate()) {
        try {
          if (this.editedIndex > -1) {
            await RequestsService.update(this.editedIndex, this.editedRequest)
          } else {
            await RequestsService.create(this.editedRequest)
          }
          this.$emit('save')
        } catch (err) {
          console.log(err)
        }
      }
    },
    appendMaterial () {
      const newMaterial = { description: '', quantity: null }
      this.editedMaterials.push(newMaterial)
    },
    replaceMaterial (material, index) {
      // "const replaced =" replaced.id shows if this is an update or creation
      this.editedMaterials.splice(index, 1, material)
      // TODO: update quantity
      this.editedMaterials[index].quantity = null
    },
    setDate (value) {
      this.editedRequest.issueDate = value
    }
  }
}
</script>
