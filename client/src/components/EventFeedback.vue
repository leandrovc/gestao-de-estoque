<template>
  <v-bottom-sheet
    v-model="sheet"
    persistent
    inset
    hide-overlay
    prominent
  >
    <v-alert
      :type="type"
    >
      {{ message }}
    </v-alert>
  </v-bottom-sheet>
</template>

<script>
import EventBus from '@/event-bus'

export default {
  data () {
    return {
      sheet: false,
      message: '',
      timeout: null,
      type: 'success'
    }
  },
  created () {
    EventBus.$on('show-feedback', this.showFeedback)
    EventBus.$on('show-error', this.showError)
  },
  methods: {
    showAlert (msg) {
      if (this.sheet) clearTimeout(this.timeout)

      this.sheet = true
      this.message = msg
      this.timeout = setTimeout(() => (this.sheet = false), 3000)
    },
    showFeedback (msg) {
      this.type = 'success'
      this.showAlert(msg) 
    },
    showError (msg) {
      this.type = 'error'
      this.showAlert(msg) 
    }
  }
}
</script>
