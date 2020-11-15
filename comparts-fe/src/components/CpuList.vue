<template>
  <v-container fluid class="cpu-list">
    <v-card class="ma-3 cpu-list__search-filter" tile>
      <v-list-item>
        <v-list-item-content>
          <v-btn @click="onClickSearchButton">Search</v-btn>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-combobox
            v-model="selectedManufacturer"
            :items="cpuManufacturerList"
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
            :items="cpuSocketList"
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
            :items="cpuCoreNumList"
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
            :items="cpuThreadNumList"
            label="Number of Threads"
            multiple
            chips
          ></v-combobox>
        </v-list-item-content>
      </v-list-item>
    </v-card>
    <v-row>
      <v-col v-for="(cpu, index) in cpuList" :key="index" cols="2">
        <v-card
          class="cpu-list__card"
          @click="onToggleRevealCard(cpu)"
          @focusout="onClickOutsideCard(cpu)"
          tabindex="0"
        >
          <v-img height="200" contain :src="cpu.img"></v-img>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-card-title v-bind="attrs" v-on="on" class="ellipsis">{{
                cpu.manufacturer + " " + cpu.name
              }}</v-card-title>
            </template>

            <span>{{ cpu.manufacturer + " " + cpu.name }}</span>
          </v-tooltip>
          <v-card-text class="cpu-list__card__description">
            <div class="subtitle-1 red--text ellipsis">
              VND • {{ formatNumber(cpu.price) }}
            </div>
            <div class="subtitle-2 ellipsis">
              • Base Frequency: {{ cpu.base_frequency }} MHz
            </div>
            <div v-if="cpu.turbo_frequency" class="subtitle-2 ellipsis">
              • Turbo Frequency: {{ cpu.turbo_frequency }} MHz
            </div>
            <div class="subtitle-2 ellipsis">
              • Number of Cores: {{ cpu.core_num }}
            </div>
            <div class="subtitle-2 ellipsis">
              • Number of Threads: {{ cpu.thread_num }}
            </div>
          </v-card-text>

          <v-expand-transition>
            <v-card
              v-if="cpu.reveal"
              class="transition-fast-in-fast-out cpu-list__card--reveal"
            >
              <v-card-text class="pb-0">
                <div class="title text--primary">Specification</div>
                <v-divider class="mb-4"></v-divider>
                <div class="subtitle-2">• CPU Name: {{ cpu.name }}</div>
                <div class="subtitle-2">
                  • Manufacturer: {{ cpu.manufacturer }}
                </div>
                <div class="subtitle-2">
                  • Number of Threads: {{ cpu.thread_num }}
                  <div class="subtitle-2">
                    • Base Frequency: {{ cpu.base_frequency }} MHz
                  </div>
                  <div v-if="cpu.turbo_frequency" class="subtitle-2">
                    • Turbo Frequency: {{ cpu.turbo_frequency }} MHz
                  </div>
                  <div class="subtitle-2">• Cache: {{ cpu.cache }} MB</div>
                  <div class="subtitle-2">• Socket: {{ cpu.socket }}</div>
                  <div class="subtitle-2">• TDP: {{ cpu.tdp }} W</div>
                  <div class="subtitle-2">
                    • Supported Memory: {{ cpu.supported_memory_type }}-{{
                      cpu.supported_memory_frequency
                    }}
                    MHz
                  </div>
                  <div class="subtitle-2">• Process: {{ cpu.process }} nm</div>
                  <div v-if="cpu.graphics" class="subtitle-2">
                    • Integrated Graphics: {{ cpu.graphics }}
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-expand-transition>
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
      cpuSocketList: [],
      cpuCoreNumList: [],
      cpuThreadNumList: [],

      selectedManufacturer: [],
      selectedSocket: [],
      selectedCoreNum: [],
      selectedThreadNum: [],
    };
  },
  created() {
    this.searchCpuList();
  },
  methods: {
    onClickSearchButton() {
      let url = this.url.cpu + "?";
      this.selectedManufacturer.forEach((manufacturer) => {
        url += `manufacturer=${manufacturer}&`;
      });
      this.selectedSocket.forEach((socket) => {
        url += `socket=${socket}&`;
      });
      this.selectedCoreNum.forEach((core_num) => {
        url += `core_num=${core_num}&`;
      });
      this.selectedThreadNum.forEach((thread_num) => {
        url += `thread_num=${thread_num}&`;
      });
      this.$http.get(url).then((res) => {
        this.cpuList = [];
        res.data.forEach((cpu) => {
          cpu.reveal = false;
          this.cpuList.push(cpu);
        });
      });
    },
    onToggleRevealCard(cpu) {
      cpu.reveal = !cpu.reveal;
    },
    onClickOutsideCard(cpu) {
      cpu.reveal = false;
    },
    searchCpuList() {
      this.$http.get(this.url.cpu).then((res) => {
        this.cpuList = [];
        res.data.forEach((cpu) => {
          cpu.reveal = false;
          this.cpuList.push(cpu);
          if (this.cpuManufacturerList.indexOf(cpu.manufacturer) === -1) {
            this.cpuManufacturerList.push(cpu.manufacturer);
          }
          if (this.cpuSocketList.indexOf(cpu.socket) === -1) {
            this.cpuSocketList.push(cpu.socket);
          }
          if (this.cpuCoreNumList.indexOf(cpu.core_num) === -1) {
            this.cpuCoreNumList.push(cpu.core_num);
          }
          if (this.cpuThreadNumList.indexOf(cpu.thread_num) === -1) {
            this.cpuThreadNumList.push(cpu.thread_num);
          }
        });
        this.cpuManufacturerList.sort();
        this.cpuSocketList.sort();
        this.cpuCoreNumList.sort((a, b) => a - b);
        this.cpuThreadNumList.sort((a, b) => a - b);
      });
    },
  },
};
</script>

<style scoped>
.cpu-list {
  display: flex;
}
.cpu-list__card {
  height: 100%;
  max-height: 400px;
  cursor: pointer;
}
.cpu-list__card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}
.ellipsis {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.cpu-list__card__actions {
  position: absolute;
  width: 100%;
  bottom: 0;
}
.cpu-list__search-filter {
  position: sticky;
  top: 64px;
  min-width: 250px;
  max-width: 250px;
  height: fit-content;
}
</style>