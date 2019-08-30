<template>
  <v-dialog
    ref="dateDialog"
    v-model="dialog"
    persistent
    full-width
    width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="date"
        :label="label"
        prepend-icon="event"
        readonly
        :rules="rules"
        required
        v-on="on"
      />
    </template>
    <v-date-picker
      v-model="date"
      scrollable
      color="primary"
      locale="pt-br"
    >
      <v-spacer />
      <v-btn
        text
        color="primary"
        @click="cancel"
      >
        Cancelar
      </v-btn>
      <v-btn
        text
        color="primary"
        @click="save"
      >
        OK
      </v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script>
export default {
  props: {
    pickedDate: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: 'Data'
    },
    rules: {
      type: Array,
      default: () => {}
    }
  },
  data () {
    return {
      dialog: false,
      date: ''
    }
  },
  created () {
    this.date = this.pickedDate
  },
  methods: {
    cancel () {
      this.date = this.pickedDate
      this.dialog = false
    },
    save () {
      this.$emit('date-picked', this.date)
      this.dialog = false
    }
  }
}
</script>
