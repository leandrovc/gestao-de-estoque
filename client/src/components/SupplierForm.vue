<template>
  <v-dialog
    v-model="dialog"
    max-width="550px"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        color="primary"
        dark
        class="mb-2"
        fab
        v-on="on"
      >
        <v-icon>add</v-icon>
      </v-btn>
    </template>
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
              <v-flex xs8>
                <v-text-field
                  v-model="editedItem.socialName"
                  label="Razão Social"
                  :rules="[required]"
                  required
                />
              </v-flex>
              <v-flex xs4>
                <v-text-field
                  v-model="editedItem.cnpj"
                  label="CNPJ"
                  return-masked-value
                  mask="##.###.###/####-##"
                  :rules="[required]"
                  required
                />
              </v-flex>
            </v-layout>
            <br>
            <p>Endereço</p>
            <v-layout
              row
              wrap
            >
              <v-flex xs10>
                <v-text-field
                  v-model="editedItem.Address.street"
                  label="Logradouro"
                  :rules="[required]"
                  required
                />
              </v-flex>
              <v-flex xs2>
                <v-text-field
                  v-model="editedItem.Address.number"
                  label="Número"
                  mask="#####"
                  :rules="[required]"
                  required
                />
              </v-flex>
              <v-flex xs5>
                <v-text-field
                  v-model="editedItem.Address.district"
                  label="Bairro"
                  :rules="[required]"
                  required
                />
              </v-flex>
              <v-flex xs5>
                <v-text-field
                  v-model="editedItem.Address.city"
                  label="Cidade"
                  :rules="[required]"
                  required
                />
              </v-flex>
              <v-flex xs2>
                <v-combobox
                  v-model="editedItem.Address.state"
                  :items="states"
                  label="UF"
                  mask="AA"
                  return-masked-value
                  :rules="[required]"
                  required
                />
              </v-flex>
              <v-flex xs5>
                <v-text-field
                  v-model="editedItem.Address.cep"
                  label="CEP"
                  mask="#####-###"
                  return-masked-value
                  :rules="[required]"
                  required
                />
              </v-flex>
            </v-layout>
            <br>
            <p>Telefone(s)</p>
            <v-layout
              row
              wrap
            >
              <v-flex
                v-for="(tel, index) in editedItem.Telephones"
                :key="tel.id"
                xs12
              >
                <v-text-field
                  v-model="tel.number"
                  v-mask="['(##) ####-####', '(##) #####-####']"
                  return-masked-value
                  :label="'Telefone ' + ++index"
                  type="tel"
                  append-icon="delete"
                  @click:append="deleteTelephone(tel)"
                />
              </v-flex>
              <v-btn
                round
                @click="appendTelephone"
              >
                <v-icon>
                  add phone
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
  </v-dialog>
</template>
<script>
import SuppliersService from '@/services/SuppliersService'
import { mask } from 'vue-the-mask'

export default {
  directives: {
    mask
  },
  data () {
    return {
      dialog: false,
      editedIndex: -1,
      editedItem: {
        socialName: '',
        cnpj: '',
        Address: {
          street: '',
          number: '',
          district: '',
          city: '',
          state: '',
          cep: ''
        },
        Telephones: [
          {
            number: ''
          }
        ]
      },
      defaultItem: {
        socialName: '',
        cnpj: '',
        Address: {
          street: '',
          number: '',
          district: '',
          city: '',
          state: '',
          cep: ''
        },
        Telephones: [
          {
            number: ''
          }
        ]
      },
      states: ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO'],
      valid: true,
      required: (value) => !!value || 'Preenchimento obrigatório!'
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Novo Fornecedor' : 'Editar Fornecedor'
    }
  },
  watch: {
    dialog (value) {
      value || this.close()
    }
  },
  methods: {
    editItem (item) {
      this.editedIndex = item.id
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
        this.$refs.form.reset()
      }, 300)
    },
    async save () {
      if (this.$refs.form.validate()) {
        try {
          if (this.editedIndex > -1) {
            await SuppliersService.update(this.editedIndex, this.editedItem)
          } else {
            await SuppliersService.create(this.editedItem)
          }
          this.close()
        } catch (err) {
          console.log(err)
        }
      }
    },
    appendTelephone () {
      const newTelephone = { number: '' }
      this.editedItem.Telephones.push(newTelephone)
    },
    deleteTelephone (telephone) {
      if (telephone.id) {
        confirm(`Tem certeza de que deseja EXCLUIR ${telephone.number}?`) &&
        SuppliersService.deleteTelephone(telephone.id)
      }
      const index = this.editedItem.Telephones.indexOf(telephone)
      this.editedItem.Telephones.splice(index, 1)
    }
  }
}
</script>
