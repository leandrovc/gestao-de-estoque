<template>
  <v-app
    id="main"
  >
    <the-toolbar />

    <v-content>
      <v-layout>
        <v-container>
          <router-view />
        </v-container>
      </v-layout>
    </v-content>

    <event-feedback />
  </v-app>
</template>

<script>
import TheToolbar from '@/components/TheToolbar'
import EventFeedback from '@/components/EventFeedback'

export default {
  name: 'App',
  components: {
    TheToolbar,
    EventFeedback
  }
}
</script>
