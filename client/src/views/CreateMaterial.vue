<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-layout
      align-center
      justify-center
      column
    >
      <title-panel title="Adicionar Material">
        <v-layout
          column
        >
          <v-layout
            row
          >
            <v-flex
              xs12
            >
              <v-text-field
                v-model="material.description"
                label="Descrição"
                outline
                autofocus
                :rules="[required]"
                required
              />
            </v-flex>
          </v-layout>
          <v-layout
            row
          >
            <v-flex
              xs6
            >
              <v-combobox
                v-model="material.group"
                :items="groups"
                label="Grupo"
                outline
                class="pr-1"
                mask="AAAA"
                :rules="[required]"
                required
              />
            </v-flex>
            <v-flex
              xs6
            >
              <v-text-field
                v-model="material.code"
                label="Código"
                outline
                class="pl-1"
                mask="#####"
                :rules="[required]"
                required
              />
            </v-flex>
          </v-layout>
        </v-layout>
        <p>Quantidade</p>
        <v-layout
          row
        >
          <v-flex
            xs6
          >
            <v-text-field
              v-model="material.currentQuantity"
              label="Atual"
              mask="######"
              type="number"
              outline
              :rules="[required]"
              required
            />
            <v-text-field
              v-model="material.minimumQuantity"
              label="Mínima"
              mask="######"
              type="number"
              outline
              :rules="[required]"
              required
            />
          </v-flex>
          <v-flex
            xs6
            align-self-center
          >
            <v-text-field
              v-model="material.unit"
              label="Unidade"
              mask="aa"
              outline
              :rules="[required]"
              required
            />
          </v-flex>
        </v-layout>
      </title-panel>

      <v-layout
        row
      >
        <v-btn
          :disabled="!valid"
          color="success"
          @click="create"
        >
          Adicionar
        </v-btn>
        <v-btn
          color="error"
          @click="reset"
        >
          Apagar
        </v-btn>
      </v-layout>
    </v-layout>
  </v-form>
</template>

<script>
import TitlePanel from '@/components/TitlePanel'
import MaterialsService from '@/services/MaterialsService'

export default {
  components: {
    TitlePanel
  },

  data () {
    return {
      valid: true,
      material: {
        description: null,
        group: null,
        code: null,
        currentQuantity: '0',
        minimumQuantity: '0',
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
      required: (value) => !!value || 'Preenchimento obrigatório!'
    }
  },

  methods: {
    async create () {
      if (this.$refs.form.validate()) {
        try {
          await MaterialsService.post(this.material)
          this.$router.push({
            name: 'materials'
          })
        } catch (err) {
          console.log(err)
        }
      }
    },
    reset () {
      this.$refs.form.reset()
      this.material.currentQuantity = '0'
      this.material.minimumQuantity = '0'
      this.material.unit = 'pc'
    }
  }
}
</script>

<style scoped>
</style>
