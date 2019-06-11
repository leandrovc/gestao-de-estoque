<template>
  <v-dialog
    v-model="dialog"
    max-width="500px"
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
              <v-flex xs12>
                <v-text-field
                  v-model="editedItem.description"
                  label="Descrição"
                  :rules="[required]"
                  required
                />
              </v-flex>
              <v-flex xs3>
                <v-combobox
                  v-model="editedItem.group"
                  :items="groups"
                  label="Grupo"
                  mask="AAAA"
                  :rules="[required]"
                  required
                />
              </v-flex>
              <v-flex xs3>
                <v-text-field
                  v-model="editedItem.code"
                  label="Código"
                  mask="#####"
                  :rules="[required]"
                  required
                />
              </v-flex>
            </v-layout>
            <v-layout wrap>
              <v-flex xs3>
                <v-text-field
                  v-model="editedItem.currentQuantity"
                  label="Quant. atual"
                  hint="9999.99"
                  persistent-hint
                  reverse
                  :rules="[required]"
                  required
                />
              </v-flex>
              <v-flex xs3>
                <v-text-field
                  v-model="editedItem.minimumQuantity"
                  label="Quant. mínima"
                  hint="9999.99"
                  persistent-hint
                  reverse
                  :rules="[required]"
                  required
                />
              </v-flex>
              <v-flex xs2>
                <v-text-field
                  v-model="editedItem.unit"
                  label="Unidade"
                  mask="aa"
                  return-masked-value
                  :rules="[required]"
                  required
                />
              </v-flex>
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
import MaterialsService from '@/services/MaterialsService'

export default {
  data () {
    return {
      dialog: false,
      editedIndex: -1,
      editedItem: {
        description: '',
        group: '',
        code: '',
        currentQuantity: null,
        minimumQuantity: null,
        unit: 'pc'
      },
      defaultItem: {
        description: '',
        group: '',
        code: '',
        currentQuantity: null,
        minimumQuantity: null,
        unit: 'pc'
      },
      groups: [
        'ADES',
        'CNLT',
        'ELET',
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
      valid: true,
      required: (value) => !!value || 'Preenchimento obrigatório!'
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Novo Material' : 'Editar Material'
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
            await MaterialsService.update(this.editedIndex, this.editedItem)
          } else {
            await MaterialsService.create(this.editedItem)
          }
          this.close()
        } catch (err) {
          console.log(err)
        }
      }
    }
  }
}
</script>
