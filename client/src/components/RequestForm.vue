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
                />
              </v-flex>
              <v-flex xs3>
                <v-dialog
                  ref="dateDialog"
                  v-model="dateDialog"
                  :return-value.sync="editedRequest.issueDate"
                  persistent
                  lazy
                  full-width
                  width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="editedRequest.issueDate"
                      label="Data de Emissão"
                      prepend-icon="event"
                      readonly
                      :rules="[required]"
                      required
                      v-on="on"
                    />
                  </template>
                  <v-date-picker
                    v-model="editedRequest.issueDate"
                    scrollable
                    color="primary"
                    locale="pt-br"
                  >
                    <v-spacer />
                    <v-btn
                      flat
                      color="primary"
                      @click="dateDialog = false"
                    >
                      Cancelar
                    </v-btn>
                    <v-btn
                      flat
                      color="primary"
                      @click="$refs.dateDialog.save(editedRequest.issueDate)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-dialog>
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
            <p>Material(is)</p>
            <v-layout
              v-for="(material, index) in editedMaterials"
              :key="material.id"
              xs12
            >
              <v-flex xs9>
                <select-material
                  :material-selected="material"
                  :material-selected-index="index"
                  @replace-material="replaceMaterial"
                  :rules="[required]"
                  required
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

export default {
  components: {
    SelectMaterial
  },
  props: {
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
      dateDialog: false,
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
    console.log('mounted')
  },
  methods: {
    editItem (item) {
      this.editedIndex = item.id
      this.editedRequest = Object.assign({}, item)
    },
    close () {
      setTimeout(() => {
        this.editedIndex = -1
        this.$refs.form.reset()
      }, 300)
    },
    async save () {
      if (this.$refs.form.validate()) {
        try {
          if (this.editedIndex > -1) {
            await RequestsService.update(this.editedIndex, this.editedRequest)
          } else {
            await RequestsService.create(this.editedRequest)
          }
          this.close()
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
    }
  }
}
</script>
