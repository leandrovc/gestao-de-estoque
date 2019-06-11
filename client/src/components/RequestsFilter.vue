<template>
  <v-container
    class="elevation-1"
  >
    <v-layout
      row
      wrap
    >
      <v-flex xs1>
        <v-text-field
          v-model="filter.number"
          label="Número"
          return-masked-value
          mask="###.###"
        />
      </v-flex>
      <v-flex xs2>
        <v-dialog
          ref="initialDateDialog"
          v-model="initialDateDialog"
          :return-value.sync="filter.initialDate"
          persistent
          lazy
          full-width
          width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="filter.initialDate"
              label="Data Inicial"
              prepend-icon="event"
              readonly
              v-on="on"
            />
          </template>
          <v-date-picker
            v-model="filter.initialDate"
            scrollable
            color="primary"
            locale="pt-br"
          >
            <v-spacer />
            <v-btn
              flat
              color="primary"
              @click="initialDateDialog = false"
            >
              Cancelar
            </v-btn>
            <v-btn
              flat
              color="primary"
              @click="$refs.initialDateDialog.save(filter.initialDate)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-dialog>
      </v-flex>
      <v-flex xs2>
        <v-dialog
          ref="finalDateDialog"
          v-model="finalDateDialog"
          :return-value.sync="filter.finalDate"
          persistent
          lazy
          full-width
          width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="filter.finalDate"
              label="Data Final"
              prepend-icon="event"
              readonly
              v-on="on"
            />
          </template>
          <v-date-picker
            v-model="filter.finalDate"
            scrollable
            color="primary"
            locale="pt-br"
          >
            <v-spacer />
            <v-btn
              flat
              color="primary"
              @click="finalDateDialog = false"
            >
              Cancelar
            </v-btn>
            <v-btn
              flat
              color="primary"
              @click="$refs.finalDateDialog.save(filter.finalDate)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-dialog>
      </v-flex>
      <v-flex xs3>
        <v-combobox
          v-model="filter.applicant"
          :items="applicants"
          label="Requerente"
        />
      </v-flex>
      <v-flex xs3>
        <v-combobox
          v-model="filter.authorizer"
          :items="authorizers"
          label="Autorizador"
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
  </v-container>
</template>

<script>
export default {
  props: {
    applicants: {
      type: Array,
      required: true
    },
    authorizers: {
      type: Array,
      required: true
    },
    search: {
      type: Function,
      required: true
    }
  },

  data () {
    return {
      initialDateDialog: false,
      finalDateDialog: false,
      filter: {
        number: '',
        initialDate: new Date().toISOString().substr(0, 4) + '-01-01',
        finalDate: new Date().toISOString().substr(0, 10),
        applicant: '',
        authorizer: ''
      }
    }
  },

  methods: {
    submit () {
      this.search(this.filter)
    },
    clear () {
      this.filter.number = ''
      this.filter.initialDate = new Date().toISOString().substr(0, 4) + '-01-01'
      this.filter.finalDate = new Date().toISOString().substr(0, 10)
      this.filter.applicant = ''
      this.filter.authorizer = ''
    }
  }
}
</script>
