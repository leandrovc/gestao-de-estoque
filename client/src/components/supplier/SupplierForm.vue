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
                v-mask="cnpjMask"
                label="CNPJ"
                return-masked-value
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
                v-mask="numberMask"
                label="Número"
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
                v-mask="stateMask"
                :items="states"
                label="UF"
                return-masked-value
                :rules="[required]"
                required
              />
            </v-flex>
            <v-flex xs5>
              <v-text-field
                v-model="editingSupplier.Address.cep"
                v-mask="cepMask"
                label="CEP"
                return-masked-value
                :rules="[required]"
                required
              />
            </v-flex>
          </v-layout>
          <br>
          <p>{{ editingSupplier.Telephones.length > 1 ? 'Telefones' : 'Telefone' }}</p>
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
                :rules="[required]"
                required
                @click:append="deleteTelephone(tel)"
              />
            </v-flex>
            <v-btn
              rounded
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
import Supplier from '@/models/Supplier'
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
      cnpjMask: '##.###.###/####-##',
      numberMask: '#####',
      stateMask: 'AA',
      cepMask: '#####-###',
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
        Supplier.save(this.editingSupplier, this.close)
      }
    },
    appendTelephone () {
      Supplier.appendTelephone(this.editingSupplier)
    },
    deleteTelephone (telephone) {
      Supplier.deleteTelephone(this.editingSupplier, telephone)
    }
  }
}
</script>
