<template>
  <v-layout column>
    <v-flex>
      <v-text-field
        v-model="searchText"
        autofocus
        outline
        label="Busca"
        append-icon="search"
        @click:append="search"
        @keyup.enter="search"
      />
      <title-panel title="MATERIAIS">
        <v-btn
          slot="action"
          to="materials/create"
          class="accent"
          light
          medium
          absolute
          right
          middle
          fab
        >
          <v-icon>add</v-icon>
        </v-btn>
        <div
          v-for="material in materials"
          :key="material.id"
          class="material"
        >
          <v-layout row>
            <div class="material-description">
              {{ material.description }}
            </div>
            <div class="material-code">
              {{ material.code }}
            </div>
            <div class="material-group">
              {{ material.group }}
            </div>
            <div class="material-quantity">
              {{ material.currentQuantity }} {{ material.unit }}
            </div>
          </v-layout>
        </div>
      </title-panel>
    </v-flex>
  </v-layout>
</template>

<script>
import MaterialsService from '@/services/MaterialsService'
import TitlePanel from '@/components/TitlePanel'

export default {
  components: {
    TitlePanel
  },
  data () {
    return {
      materials: null,
      searchText: null
    }
  },
  methods: {
    async search () {
      this.materials = (await MaterialsService.search(this.searchText)).data
    }
  }
}
</script>

<style scoped>
.material {
  padding: 2px;
  height: 128px;
  overflow: hidden;
}

.material-description {
  font-size: 2.5rem;
}

.material-code {
  font-size: 1.5rem;
}

.material-group {
  font-size: 1rem;
}

.material-quantity {
  font-size: 3.5rem;
}
</style>
