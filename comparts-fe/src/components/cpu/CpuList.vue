<template>
  <v-container fluid class="cpu-list">
    <div class="mt-3 cpu-list__search-sort-area">
      <v-expansion-panels accordion :value="0">
        <v-expansion-panel>
          <v-expansion-panel-header> Search </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-btn color="primary" block text @click="onClickSearchButton"
              >Search
            </v-btn>
            <div class="mt-3">
              <v-select
                dense
                v-model="selectedManufacturer"
                :items="cpuManufacturerList"
                label="Manufacturer"
                multiple
                chips
              ></v-select>
              <v-select
                dense
                v-model="selectedSocket"
                :items="cpuSocketList"
                label="Socket"
                multiple
                chips
              ></v-select>
              <v-select
                dense
                v-model="selectedCoreNum"
                :items="cpuCoreNumList"
                label="Number of Cores"
                multiple
                chips
              ></v-select>
              <v-select
                dense
                v-model="selectedThreadNum"
                :items="cpuThreadNumList"
                label="Number of Threads"
                multiple
                chips
              ></v-select>
            </div>
            <v-btn color="error" block text @click="onClickClearFilterButton"
              >Clear Filter
            </v-btn>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header> Sort </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-btn color="primary" block text @click="onClickSortButton"
              >Sort
            </v-btn>
            <v-radio-group label="Sort by" v-model="sortParam">
              <v-radio
                v-for="(item, index) in sortByRadios"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></v-radio>
            </v-radio-group>
            <v-radio-group label="Sort in" v-model="orderParam">
              <v-radio
                v-for="(item, index) in sortInRadios"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></v-radio>
            </v-radio-group>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <div class="ml-6 cpu-list__grid-page">
      <v-row class="cpu-list__grid-page__row">
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
              {{ cpu.mfr + " " + cpu.name }}
            </v-card-title>
            <v-card-text class="cpu-list__card__description">
              <div class="subtitle-1 red--text ellipsis">
                ₫ • {{ formatNumber(cpu.price) }}
              </div>
              <div class="subtitle-2 ellipsis">
                • Base Frequency: {{ cpu.base_freq }} MHz
              </div>
              <div v-if="cpu.turbo_freq" class="subtitle-2 ellipsis">
                • Turbo Frequency: {{ cpu.turbo_freq }} MHz
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
                  <div class="subtitle-2">• Manufacturer: {{ cpu.mfr }}</div>
                  <div class="subtitle-2">• Number of Cores: {{ cpu.core_num }}</div>
                  <div class="subtitle-2">
                    • Number of Threads: {{ cpu.thread_num }}
                    <div class="subtitle-2">
                      • Base Frequency: {{ cpu.base_freq }} MHz
                    </div>
                    <div v-if="cpu.turbo_freq" class="subtitle-2">
                      • Turbo Frequency: {{ cpu.turbo_freq }} MHz
                    </div>
                    <div class="subtitle-2">• Cache: {{ cpu.cache }} MB</div>
                    <div class="subtitle-2">• Socket: {{ cpu.socket }}</div>
                    <div class="subtitle-2">• TDP: {{ cpu.tdp }} W</div>
                    <div class="subtitle-2">
                      • Supported Memory: {{ cpu.memory_type }}-{{
                        cpu.memory_freq
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
      sortOrder: {},
      sortParam: "name",
      orderParam: "ASC",
      sortByRadios: [
        { label: "Name", value: "name" },
        { label: "Price", value: "price" },
        { label: "Number of Cores", value: "core_num" },
        { label: "Number of Threads", value: "thread_num" },
      ],
      sortInRadios: [
        { label: "Ascending", value: "ASC" },
        { label: "Descending", value: "DESC" },
      ],

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
        mfr: "",
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
      this.buildCpuList();
    },
  },
  created() {
    this.buildPage();
  },
  methods: {
    onClickSortButton() {
      this.sortOrder = {
        sort: this.sortParam,
        order: this.orderParam,
      };
      this.buildCpuList();
    },
    onClickSearchButton() {
      this.searchQuery = {
        mfr: this.selectedManufacturer,
        socket: this.selectedSocket,
        core_num: this.selectedCoreNum,
        thread_num: this.selectedThreadNum,
      };
      this.pagination.page = 0;
      this.currentPage = 1;
      this.buildCpuList();
    },
    onClickClearFilterButton() {
      this.selectedManufacturer = [];
      this.selectedSocket = [];
      this.selectedCoreNum = [];
      this.selectedThreadNum = [];
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
        mfr: cpu.mfr,
        socket: cpu.socket,
        coreNum: cpu.core_num,
        threadNum: cpu.thread_num,
        baseFrequency: cpu.base_freq,
        turboFrequency: cpu.turbo_freq,
        cache: cpu.cache,
        tdp: cpu.tdp,
        memoryType: cpu.memory_type,
        memoryFrequency: cpu.memory_freq,
        process: cpu.process,
        graphics: cpu.graphics,
        price: cpu.price,
        img: cpu.img,
      };
    },

    searchCpuList(url, pagination, query, sortOrder) {
      return this.$http
        .get(url, { params: { ...pagination, ...query, ...sortOrder } })
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
            if (this.cpuManufacturerList.indexOf(cpu.mfr) === -1) {
              this.cpuManufacturerList.push(cpu.mfr);
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
    buildCpuList() {
      this.searchCpuList(
        this.url.cpu,
        this.pagination,
        this.searchQuery,
        this.sortOrder
      );
    },
    buildPage() {
      this.buildSearchFilter();
      this.buildCpuList();
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
.cpu-list__search-sort-area {
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