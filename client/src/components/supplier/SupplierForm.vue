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
                :value="value.socialName"
                label="Razão Social"
                :rules="[required]"
                required
                @input="valueChanged($event, 'socialName')"
              />
            </v-flex>
            <v-flex xs4>
              <v-text-field
                v-mask="cnpjMask"
                :value="value.cnpj"
                label="CNPJ"
                return-masked-value
                :rules="[required]"
                required
                @input="valueChanged($event, 'cnpj')"
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
                :value="value.Address.street"
                label="Logradouro"
                :rules="[required]"
                required
                @input="valueAddressChanged($event, 'street')"
              />
            </v-flex>
            <v-flex xs2>
              <v-text-field
                v-mask="numberMask"
                :value="value.Address.number"
                label="Número"
                :rules="[required]"
                required
                @input="valueAddressChanged($event, 'number')"
              />
            </v-flex>
            <v-flex xs5>
              <v-text-field
                :value="value.Address.district"
                label="Bairro"
                :rules="[required]"
                required
                @input="valueAddressChanged($event, 'district')"
              />
            </v-flex>
            <v-flex xs5>
              <v-text-field
                :value="value.Address.city"
                label="Cidade"
                :rules="[required]"
                required
                @input="valueAddressChanged($event, 'city')"
              />
            </v-flex>
            <v-flex xs2>
              <v-select
                :value="value.Address.state"
                :items="states"
                label="UF"
                :rules="[required]"
                required
                @input="valueAddressChanged($event, 'state')"
              />
            </v-flex>
            <v-flex xs5>
              <v-text-field
                v-mask="cepMask"
                :value="value.Address.cep"
                label="CEP"
                return-masked-value
                :rules="[required]"
                required
                @input="valueAddressChanged($event, 'cep')"
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
    value: {
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
      editingSupplier: {},
      suppliersFactory: null,
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
  watch: {
    value (newValue) {
      if (Object.keys(this.editingSupplier).length === 0 && this.editingSupplier.constructor === Object) {
       this.editingSupplier = newValue
      }
    }
  },
  created () {
    this.suppliersFactory = new Supplier()
    this.editingSupplier = Object.assign({}, this.value)
  },
  methods: {
    valueChanged ($event, fieldName) {
      this.editingSupplier[fieldName] = $event
      this.$emit('input', this.editingSupplier)
    },
    valueAddressChanged ($event, fieldName) {
      this.editingSupplier.Address[fieldName] = $event
      this.$emit('input', this.editingSupplier)
    },
    close () {
      this.$emit('closing')
    },
    async save () {
      if (this.$refs.form.validate()) {
        this.suppliersFactory.save(this.editingSupplier, this.close)
      }
    },
    appendTelephone () {
      this.suppliersFactory.appendTelephone(this.editingSupplier)
    },
    deleteTelephone (telephone) {
      confirm(`Tem certeza de que deseja EXCLUIR ${telephone.number}?`) &&
        this.suppliersFactory.deleteTelephone(this.editingSupplier, telephone)
    }
  }
}
</script>
