<template>
  <v-app
    id="main"
  >
    <the-toolbar />

    <v-content>
      <v-container>
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import TheToolbar from '@/components/TheToolbar'

export default {
  name: 'App',
  components: {
    TheToolbar
  }
}
</script>
