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
          v-model="editedInvoice.number"
          v-mask="numberMask"
          label="Número"
          return-masked-value
          :rules="[required, minimumLength]"
          required
          autofocus
        />
      </v-flex>
      <v-flex
        xs3
        mr-4
      >
        <date-picker
          :picked-date="editedInvoice.issueDate"
          label="Data de Emissão"
          @date-picked="setDate"
        />
      </v-flex>
      <v-flex xs3>
        <supplier-picker
          :supplier="editedInvoice.Supplier"
          :rules="[required]"
          show-add
          @supplier-selected="supplierSelected"
        />
      </v-flex>
      <br>
      <v-flex xs12>
        <p>{{ editedInvoice.Materials.length > 1 ? 'Materiais' : 'Material' }}</p>
      </v-flex>
      <v-layout
        v-for="(material, index) in editedInvoice.Materials"
        :key="material.id"
      >
        <v-flex xs9>
          <material-data
            :material-selected="material"
            :material-selected-index="index"
            :rules="[required]"
            show-add
            required
            @material-selected="replaceMaterial"
          />
        </v-flex>
        <v-spacer />
        <v-flex xs2>
          <v-layout
            column
            wrap
          >
            <v-flex xs2>
              <v-text-field
                v-model="material.MaterialInvoices.brand"
                label="Marca"
                :rules="[required]"
                required
              />
            </v-flex>
            <v-flex xs2>
              <v-text-field
                v-model="material.MaterialInvoices.quantity"
                v-mask="['#,##', '##,##', '###,##', '####,##']"
                label="Quantidade"
                hint="9999,99"
                return-masked-value
                persistent-hint
                :rules="[required]"
                required
              />
            </v-flex>
            <v-flex xs2>
              <v-text-field
                v-model="material.MaterialInvoices.unitaryValue"
                v-mask="['#,##', '##,##', '###,##', '####,##']"
                label="Valor Unitário"
                hint="R$9999,99"
                return-masked-value
                persistent-hint
                prefix="R$"
                :rules="[required]"
                required
              />
            </v-flex>
          </v-layout>
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
import Invoice from '@/models/Invoice'
import MaterialData from '@/components/material/MaterialData'
import SupplierPicker from '@/components/supplier/SupplierPicker'
import DatePicker from '@/components/DatePicker'
import { mask } from 'vue-the-mask'

export default {
  directives: {
    mask
  },
  components: {
    MaterialData,
    SupplierPicker,
    DatePicker
  },
  props: {
    invoice: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      emptyMaterialSlot: true,
      editedInvoice: null,
      numberMask: '###.###',
      valid: true,
      required: (value) => !!value || 'Preenchimento obrigatório!',
      minimumLength: (value) => value.length === 7 || 'Quantidade insuficiente de caracteres'
    }
  },
  computed: {
    formTitle () {
      return this.editedInvoice.id == null ? 'Nova Nota Fiscal' : 'Editar Nota Fiscal'
    }
  },
  created () {
    this.editedInvoice = Invoice.assign(this.invoice)
    this.emptyMaterialSlot = this.invoice == null
  },
  methods: {
    close () {
      this.$emit('close')
    },
    async save () {
      if (this.$refs.form.validate()) {
        Invoice.save(this.editedInvoice, () => {
          this.$emit('save')
        })
      }
    },
    appendMaterial () {
      Invoice.appendMaterial(this.editedInvoice)
      this.emptyMaterialSlot = true
    },
    replaceMaterial (material, index) {
      Invoice.replaceMaterial(this.editedInvoice.Materials, material, index)
      this.emptyMaterialSlot = false
    },
    supplierSelected (selectedSupplier) {
      this.editedInvoice.Supplier.id = selectedSupplier.id
      this.editedInvoice.Supplier.socialName = selectedSupplier.socialName
    },
    setDate (value) {
      this.editedInvoice.issueDate = value
    }
  }
}
</script>
