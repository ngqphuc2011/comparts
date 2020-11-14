<template>
  <v-container fluid>
    <v-row>
      <v-col v-for="(cpu, index) in cpuList" :key="index" cols="2">
        <v-card min-width="200px" height="100%" min-height="32em">
          <v-img height="250" :src="cpu.img"></v-img>
          <v-card-title>{{ cpu.manufacturer + " " + cpu.name }}</v-card-title>
          <v-card-text class="cpu-list__card__description">
            <div class="subtitle-1 red--text">VND • {{ formatNumber(cpu.price) }}</div>
            <div class="subtitle-2">
              • Base Frequency: {{ cpu.base_frequency }} MHz
            </div>
            <div v-if="cpu.turbo_frequency" class="subtitle-2">
              • Turbo Frequency: {{ cpu.turbo_frequency }} MHz
            </div>
            <div class="subtitle-2">• Number of Cores: {{ cpu.core_num }}</div>
            <div class="subtitle-2">
              • Number of Threads: {{ cpu.thread_num }}
            </div>
          </v-card-text>
          <v-card-actions class="cpu-list__card__actions">
            <v-btn text block> View Detail </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "CpuList",
  data() {
    return {
      url: {
        cpu: "http://localhost:3000/cpu",
      },
      cpuList: [],
      cpuManufacturerList: [],
    };
  },
  created() {
    this.searchCpuList();
  },
  methods: {
    searchCpuList() {
      this.$http.get(this.url.cpu).then((res) => {
        console.log(res.data);
        this.cpuList.length = 0;
        res.data.forEach((item) => {
          this.cpuList.push(item);
          if (this.cpuManufacturerList.indexOf(item.manufacturer) === -1) {
            this.cpuManufacturerList.push(item.manufacturer);
          }
        });
      });
    },
  },
};
</script>

<style scoped>
.cpu-list__card__description {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.cpu-list__card__actions {
  position: absolute;
  width: 100%;
  bottom: 0;
}
</style>