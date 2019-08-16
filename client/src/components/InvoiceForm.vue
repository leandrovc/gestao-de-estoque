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
                  v-model="editedInvoice.number"
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
                  :picked-date="editedInvoice.issueDate"
                  label="Data de Emissão"
                  @date-picked="setDate"
                />
              </v-flex>
              <v-flex xs4>
                <v-autocomplete
                  v-model="editedInvoice.supplier"
                  :loading="loading"
                  :items="suppliers"
                  :search-input.sync="searchSupplierInput"
                  label="Fornecedor"
                  cache-items
                  item-text="socialName"
                  item-value="id"
                  hide-no-data
                  hide-selected
                  return-object
                  :rules="[required]"
                  required
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
                <v-layout
                  column
                  wrap
                >
                  <v-flex xs2>
                    <v-text-field
                      v-model="material.brand"
                      label="Marca"
                      :rules="[required]"
                      required
                    />
                  </v-flex>
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
                  <v-flex xs2>
                    <v-text-field
                      v-model="material.unitaryValue"
                      label="Valor Unitário"
                      hint="9999.99"
                      persistent-hint
                      :rules="[required]"
                      required
                    />
                  </v-flex>
                </v-layout>
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
import InvoicesService from '@/services/InvoicesService'
import SelectMaterial from '@/components/SelectMaterial'
import SuppliersService from '@/services/SuppliersService'
import DatePicker from '@/components/DatePicker'

export default {
  components: {
    SelectMaterial,
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
      editedIndex: -1,
      editedInvoice: {
        number: '',
        issueDate: '',
        supplier: ''
      },
      editedMaterials: [
        {
          description: '',
          brand: '',
          quantity: null,
          unitaryValue: null
        }
      ],
      loading: false,
      suppliers: [],
      searchSupplierInput: null,
      searchTimeout: null,
      valid: true,
      required: (value) => !!value || 'Preenchimento obrigatório!'
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Nova Nota Fiscal' : 'Editar Nota Fiscal'
    }
  },
  watch: {
    editedMaterials (value) {
      this.emptyMaterialSlot = value[value.length - 1].description === ''
    },
    searchSupplierInput (searchText) {
      searchText && searchText !== '' && this.searchSuppliers(searchText)
    }
  },
  mounted () {
    if (this.invoice) {
      this.editedInvoice = this.invoice
      this.editedInvoice.supplier = {
        id: this.invoice.SupplierId
      }
      // TODO textfield?
      this.editedInvoice.supplier.socialName = this.getSupplierSocialName(this.invoice.SupplierId)
      console.log(this.editedInvoice.supplier)
      if (this.editedInvoice.Materials.length > 0) {
        this.editedMaterials = this.invoice.Materials
        this.editedMaterials.forEach(m => {
          m.brand = m.MaterialInvoices.brand
          m.quantity = m.MaterialInvoices.quantity
          m.unitaryValue = m.MaterialInvoices.unitaryValue
        })
      }
      this.editedIndex = this.invoice.id
    }
  },
  methods: {
    editItem (item) {
      this.editedInvoice = Object.assign({}, item)
    },
    close () {
      this.$emit('close')
    },
    async save () {
      this.editedInvoice.Materials = this.editedMaterials
      if (this.$refs.form.validate()) {
        try {
          this.editedInvoice.SupplierId = this.editedInvoice.supplier.id
          if (this.editedIndex > -1) {
            await InvoicesService.update(this.editedIndex, this.editedInvoice)
          } else {
            await InvoicesService.create(this.editedInvoice)
          }
          this.$emit('save')
        } catch (err) {
          console.log(err)
        }
      }
    },
    appendMaterial () {
      const newMaterial = {
        description: '',
        brand: '',
        quantity: null,
        unitaryValue: null
      }
      this.editedMaterials.push(newMaterial)
    },
    replaceMaterial (material, index) {
      // "const replaced =" replaced.id shows if this is an update or creation
      this.editedMaterials.splice(index, 1, material)
      // TODO: update quantity
      this.editedMaterials[index].quantity = null
    },
    startSearchTimeout (callback) {
      if (this.searchTimeout !== null) {
        clearTimeout(this.searchTimeout)
      }
      this.loading = true
      this.searchTimeout = setTimeout(callback, 500)
    },
    searchSuppliers (searchText) {
      this.startSearchTimeout(async () => {
        this.suppliers = (await SuppliersService.searchSocialName(searchText)).data
        this.loading = false
      })
    },
    async getSupplierSocialName (id) {
      return (await SuppliersService.show(id)).data.socialName
    },
    setDate (value) {
      this.editedInvoice.issueDate = value
    }
  }
}
</script>
