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
            <v-flex xs8>
              <v-text-field
                v-model="editingSupplier.socialName"
                label="Razão Social"
                :rules="[required]"
                required
              />
            </v-flex>
            <v-flex xs4>
              <v-text-field
                v-model="editingSupplier.cnpj"
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
                v-model="editingSupplier.Address.street"
                label="Logradouro"
                :rules="[required]"
                required
              />
            </v-flex>
            <v-flex xs2>
              <v-text-field
                v-model="editingSupplier.Address.number"
                label="Número"
                mask="#####"
                :rules="[required]"
                required
              />
            </v-flex>
            <v-flex xs5>
              <v-text-field
                v-model="editingSupplier.Address.district"
                label="Bairro"
                :rules="[required]"
                required
              />
            </v-flex>
            <v-flex xs5>
              <v-text-field
                v-model="editingSupplier.Address.city"
                label="Cidade"
                :rules="[required]"
                required
              />
            </v-flex>
            <v-flex xs2>
              <v-combobox
                v-model="editingSupplier.Address.state"
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
                v-model="editingSupplier.Address.cep"
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
              v-for="(tel, index) in editingSupplier.Telephones"
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
</template>

<script>
import SuppliersService from '@/services/SuppliersService'
import { mask } from 'vue-the-mask'

export default {
  directives: {
    mask
  },
  props: {
    editingSupplier: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      states: ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO'],
      valid: true,
      required: (value) => {
        return (value != null && value !== '') || 'Preenchimento obrigatório!'
      }
    }
  },
  computed: {
    formTitle () {
      return this.editingSupplier.id == null ? 'Novo Fornecedor' : 'Editar Fornecedor'
    }
  },
  methods: {
    close () {
      this.$emit('closing')
    },
    async save () {
      if (this.$refs.form.validate()) {
        try {
          if (this.editingSupplier.id == null) {
            await SuppliersService.create(this.editingSupplier)
          } else {
            await SuppliersService.update(this.editingSupplier.id, this.editingSupplier)
          }
          this.close()
        } catch (err) {
          console.log(err)
        }
      }
    },
    appendTelephone () {
      const newTelephone = { number: '' }
      this.editingSupplier.Telephones.push(newTelephone)
    },
    deleteTelephone (telephone) {
      if (telephone.id) {
        confirm(`Tem certeza de que deseja EXCLUIR ${telephone.number}?`) &&
        SuppliersService.deleteTelephone(telephone.id)
      }
      const index = this.editingSupplier.Telephones.indexOf(telephone)
      this.editingSupplier.Telephones.splice(index, 1)
    }
  }
}
</script>
