<template>
  <v-app
    id="main"
  >
    <the-toolbar />

    <v-content>
      <v-container fluid>
        <v-layout
          align-center
          justify-center
        >
          <router-view />
        </v-layout>
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
