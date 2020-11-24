<template>
  <v-container fluid class="cpu-list">
    <v-card class="ma-3 cpu-list__search-filter">
      <v-list-item>
        <v-list-item-content>
          <v-btn color="primary" text @click="onClickSearchButton"
            >Search
          </v-btn>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-combobox
            dense
            v-model="selectedManufacturer"
            :items="cpuManufacturerList"
            @keyup.enter="onClickSearchButton"
            label="Manufacturer"
            multiple
            chips
          ></v-combobox>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-combobox
            dense
            v-model="selectedSocket"
            :items="cpuSocketList"
            @keyup.enter="onClickSearchButton"
            label="Socket"
            multiple
            chips
          ></v-combobox>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-combobox
            dense
            v-model="selectedCoreNum"
            :items="cpuCoreNumList"
            @keyup.enter="onClickSearchButton"
            label="Number of Cores"
            multiple
            chips
          ></v-combobox>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-combobox
            dense
            v-model="selectedThreadNum"
            :items="cpuThreadNumList"
            @keyup.enter="onClickSearchButton"
            label="Number of Threads"
            multiple
            chips
          ></v-combobox>
        </v-list-item-content>
      </v-list-item>
    </v-card>
    <div class="cpu-list__grid-page">
      <v-row class="ml-3 cpu-list__grid-page__row">
        <v-col v-for="(cpu, index) in cpuList" :key="index" cols="2">
          <v-card
            class="cpu-list__card"
            @click="onClickCard(cpu)"
            @mouseover="onMouseOverCard(cpu)"
            @mouseleave="onMouseLeaveCard(cpu)"
          >
            <v-img
              height="200"
              contain
              :src="url.cpuImg + '/' + cpu.img"
            ></v-img>
            <v-card-title class="ellipsis">
              {{ cpu.manufacturer + " " + cpu.name }}
            </v-card-title>
            <v-card-text class="cpu-list__card__description">
              <div class="subtitle-1 red--text ellipsis">
                ₫ • {{ formatNumber(cpu.price) }}
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
                      • Supported Memory: {{ cpu.memory_type }}-{{
                        cpu.memory_frequency
                      }}
                      MHz
                    </div>
                    <div class="subtitle-2">
                      • Process: {{ cpu.process }} nm
                    </div>
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
      <v-pagination
        v-model="currentPage"
        :length="totalPages"
        :total-visible="5"
      ></v-pagination>
    </div>
    <cpu-cu
      v-if="showCpuCuForm"
      :visible="showCpuCuForm"
      mode="U"
      :originalCpu="selectedCpu"
      @close="showCpuCuForm = false"
      @search="buildPage"
    />
  </v-container>
</template>

<script>
import CpuCu from "./CpuCu";
export default {
  name: "CpuList",
  components: { CpuCu },
  data() {
    return {
      url: {
        cpu: "http://localhost:3000/cpus",
        cpuImg: "http://localhost:3000/public/cpus",
      },
      currentPage: 1,
      totalPages: 1,
      pagination: {
        page: 0,
        size: 12,
      },
      searchQuery: {},

      cpuList: [],
      cpuManufacturerList: [],
      cpuSocketList: [],
      cpuCoreNumList: [],
      cpuThreadNumList: [],

      selectedManufacturer: [],
      selectedSocket: [],
      selectedCoreNum: [],
      selectedThreadNum: [],

      showCpuCuForm: false,
      selectedCpu: {
        name: "",
        manufacturer: "",
        socket: "",
        coreNum: 0,
        threadNum: 0,
        baseFrequency: 0,
        turboFrequency: 0,
        cache: 0,
        tdp: 0,
        memoryType: "",
        memoryFrequency: 0,
        process: 0,
        graphics: "",
        price: 0,
        img: "",
      },
    };
  },
  watch: {
    currentPage(page) {
      this.pagination.page = page - 1;
      this.searchCpuList(this.url.cpu, this.pagination, this.searchQuery);
    },
  },
  created() {
    this.buildPage();
  },
  methods: {
    onClickSearchButton() {
      this.searchQuery = {
        manufacturer: this.selectedManufacturer,
        socket: this.selectedSocket,
        core_num: this.selectedCoreNum,
        thread_num: this.selectedThreadNum,
      };
      this.pagination.page = 0;
      this.currentPage = 1;
      this.searchCpuList(this.url.cpu, this.pagination, this.searchQuery);
    },
    onMouseOverCard(cpu) {
      cpu.reveal = true;
    },
    onMouseLeaveCard(cpu) {
      cpu.reveal = false;
    },
    onClickCard(cpu) {
      this.showCpuCuForm = true;
      this.selectedCpu = {
        id: cpu.id,
        name: cpu.name,
        manufacturer: cpu.manufacturer,
        socket: cpu.socket,
        coreNum: cpu.core_num,
        threadNum: cpu.thread_num,
        baseFrequency: cpu.base_frequency,
        turboFrequency: cpu.turbo_frequency,
        cache: cpu.cache,
        tdp: cpu.tdp,
        memoryType: cpu.memory_type,
        memoryFrequency: cpu.memory_frequency,
        process: cpu.process,
        graphics: cpu.graphics,
        price: cpu.price,
        img: cpu.img,
      };
    },

    searchCpuList(url, pagination, query) {
      return this.$http
        .get(url, { params: { ...pagination, ...query } })
        .then((res) => {
          this.cpuList = [];
          this.totalPages = res.data.totalPages;
          res.data.items.forEach((cpu) => {
            cpu.reveal = false;
            this.cpuList.push(cpu);
          });
        });
    },
    buildSearchFilter() {
      this.cpuManufacturerList = [];
      this.cpuSocketList = [];
      this.cpuCoreNumList = [];
      this.cpuThreadNumList = [];

      return this.$http
        .get(this.url.cpu, { params: { size: 9999 } })
        .then((res) => {
          res.data.items.forEach((cpu) => {
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
    buildPage() {
      this.buildSearchFilter();
      this.searchCpuList(this.url.cpu, this.pagination, this.searchQuery);
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
  max-width: 250px;
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
.cpu-list__grid-page {
  width: 100%;
}
.cpu-list__grid-page__row {
  min-height: 840px;
}
</style>