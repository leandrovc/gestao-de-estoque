<template>
  <v-toolbar
    app
    dark
    color="primary"
    fixed
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
        flat
        to="/materials"
      >
        Materiais
      </v-btn>
      <v-btn flat>
        Notas Fiscais
      </v-btn>
      <v-btn flat>
        Fornecedores
      </v-btn>
      <v-btn flat>
        Requisições
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>
