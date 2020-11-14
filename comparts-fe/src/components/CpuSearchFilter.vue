<template>
  <v-card class="ma-6 cpu-search-filter" width="300" height="fit-content" tile>
    <v-list-item>
      <v-list-item-content>
        <v-btn text @click="onClickSearchButton">Search</v-btn>
      </v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-content>
        <v-combobox
          v-model="selectedManufacturer"
          :items="itemsManufacturer"
          label="Manufacturer"
          multiple
          chips
        ></v-combobox>
      </v-list-item-content>
    </v-list-item>

    <v-list-item>
      <v-list-item-content>
        <v-combobox
          v-model="selectedSocket"
          :items="itemsSocket"
          label="Socket"
          multiple
          chips
        ></v-combobox>
      </v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-content>
        <v-combobox
          v-model="selectedCoreNum"
          :items="itemsCoreNum"
          label="Number of Cores"
          multiple
          chips
        ></v-combobox>
      </v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-content>
        <v-combobox
          v-model="selectedThreadNum"
          :items="itemsThreadNum"
          label="Number of Threads"
          multiple
          chips
        ></v-combobox>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  name: "CpuSearchFilter",
  data() {
    return {
      selectedManufacturer: [],
      itemsManufacturer: ["AMD", "Intel"],
      selectedSocket: [],
      itemsSocket: ["LGA 1200", "AM4"],
      selectedCoreNum: [],
      itemsCoreNum: ["2", "4", "6", "8"],
      selectedThreadNum: [],
      itemsThreadNum: ["2", "4", "6", "8"],
    };
  },
  methods: {
    onClickSearchButton() {
      console.log(this.selectedManufacturer);
    },
  },
};
</script>

<style scoped>
.cpu-search-filter {
  position: sticky;
  top: 16px;
}
</style>