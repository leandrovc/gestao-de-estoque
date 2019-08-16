<template>
  <v-layout
    row
    align-center
  >
    <v-flex
      xs1
      mr-3
    >
      <v-text-field
        v-model="filter.number"
        label="Número"
        return-masked-value
        mask="###.###"
      />
    </v-flex>
    <v-flex
      xs2
      mr-3
    >
      <date-picker
        :key="forceRerender"
        :picked-date="filter.initialDate"
        label="Data Inicial"
        @date-picked="(value) => {setDate(value, 'initialDate')}"
      />
    </v-flex>
    <v-flex
      xs2
      mr-3
    >
      <date-picker
        :key="forceRerender"
        :picked-date="filter.finalDate"
        label="Data Final"
        @date-picked="(value) => {setDate(value, 'finalDate')}"
      />
    </v-flex>
    <v-flex
      xs2
      mr-3
    >
      <v-combobox
        v-model="filter.applicant"
        :items="applicants"
        label="Requerente"
      />
    </v-flex>
    <v-flex
      xs2
      mr-3
    >
      <v-combobox
        v-model="filter.authorizer"
        :items="authorizers"
        label="Autorizador"
      />
    </v-flex>
    <v-flex
      xs2
      mr-3
    >
      <material-picker
        :key="forceRerender"
        :material="filter.material"
        @material-selected="materialSelected"
      />
    </v-flex>
    <v-layout column>
      <v-btn
        icon
        @click="submit"
      >
        <v-icon
          color="primary"
        >
          search
        </v-icon>
      </v-btn>
      <v-btn
        icon
        @click="clear"
      >
        <v-icon
          color="red"
        >
          clear
        </v-icon>
      </v-btn>
    </v-layout>
  </v-layout>
</template>

<script>
import MaterialPicker from '@/components/MaterialPicker'
import DatePicker from '@/components/DatePicker'

export default {
  components: {
    MaterialPicker,
    DatePicker
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
      forceRerender: false,
      filter: null,
      filterDefault: {
        number: '',
        initialDate: new Date().toISOString().substr(0, 4) + '-01-01',
        finalDate: new Date().toISOString().substr(0, 10),
        applicant: '',
        authorizer: '',
        material: {
          id: null,
          description: ''
        }
      }
    }
  },
  created () {
    this.filter = Object.assign({}, this.filterDefault)
    this.filter.material = Object.assign({}, this.filterDefault.material)
  },
  methods: {
    submit () {
      this.$emit('search', this.filter)
    },
    clear () {
      this.filter = Object.assign({}, this.filterDefault)
      this.filter.material = Object.assign({}, this.filterDefault.material)
      this.forceRerender = !this.forceRerender
    },
    materialSelected (selectedMaterial) {
      this.filter.material.id = selectedMaterial.id
      this.filter.material.description = selectedMaterial.description
    },
    setDate (value, index) {
      this.filter[index] = value
    }
  }
}
</script>
