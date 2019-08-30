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
