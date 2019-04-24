<template>
  <v-layout
    class="white elevation-2"
    column
  >
    <v-toolbar
      flat
      dense
      class="secondary"
    >
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <slot name="action" />
    </v-toolbar>

    <v-flex
      class="pl-4 pr-4 pt-4 pb-2"
    >
      <slot>
        Nenhum conteúdo definido.
      </slot>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>
