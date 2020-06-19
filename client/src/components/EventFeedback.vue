<template>
  <v-bottom-sheet
    v-model="sheet"
    persistent
    inset
    hide-overlay
  >
    <v-alert
      outlined
      type="success"
      text
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
      timeout: null
    }
  },
  created () {
    EventBus.$on('show-feedback', this.showFeedback)
  },
  methods: {
    showFeedback (msg) {
      if (this.sheet) clearTimeout(this.timeout)

      this.sheet = true
      this.message = msg
      this.timeout = setTimeout(() => (this.sheet = false), 3000)
    }
  }
}
</script>
