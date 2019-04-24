<template>
  <v-layout column>
    <v-flex>
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
          <v-layout>
            <v-flex xs6>
              <div class="material-description">
                {{ material.description }}
              </div>
              <div class="material-code">
                {{ material.code }}
              </div>
              <div class="material-group">
                {{ material.group }}
              </div>
            </v-flex>

            <v-flex xs4>
              <div class="material-quantity">
                {{ material.currentQuantity }} {{ material.unit }}
              </div>
            </v-flex>
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
      materials: null
    }
  },
  async mounted () {
    this.materials = (await MaterialsService.index()).data
  }
}
</script>

<style scoped>
.material {
  padding: 20px;
  height: 330px;
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
