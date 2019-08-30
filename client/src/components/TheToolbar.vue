<template>
  <v-app-bar
    color="primary"
    app
    dark
  >
    <img
      src="@/assets/unifesp-logo.png"
    >

    <v-toolbar-title>
      Gestão de Estoque
    </v-toolbar-title>

    <v-spacer />

    <v-toolbar-items>
      <v-btn
        text
        to="/materials"
      >
        Materiais
      </v-btn>
      <v-btn
        text
        to="/invoices"
      >
        Notas Fiscais
      </v-btn>
      <v-btn
        text
        to="/suppliers"
      >
        Fornecedores
      </v-btn>
      <v-btn
        text
        to="/requests"
      >
        Requisições
      </v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>
