<template>
  <v-container fluid class="cpu-list pa-8">
    <v-container fluid>
      <v-row class="cpu-list__row">
        <v-col
          class="cpu-list__col"
          v-for="(cpu, index) in cpuList"
          :key="index"
          md="2"
        >
          <v-card
            class="cpu-list__card"
            @click="onClickCard(cpu)"
            @mouseover="onMouseOverCard(cpu)"
            @mouseleave="onMouseLeaveCard(cpu)"
          >
            <v-img height="200" contain :src="getCpuImg(cpu.img)"></v-img>
            <v-card-title class="ellipsis">
              {{ cpu.mfr + " " + cpu.name }}
            </v-card-title>
            <v-card-text class="cpu-list__card__description">
              <div class="subtitle-1 red--text ellipsis">
                ₫ • {{ formatNumber(cpu.price) }}
              </div>
              <div class="subtitle-2 ellipsis">
                • {{ $t("cpu.base_freq") }}: {{ cpu.base_freq }} MHz
              </div>
              <div v-if="cpu.turbo_freq" class="subtitle-2 ellipsis">
                • {{ $t("cpu.turbo_freq") }}: {{ cpu.turbo_freq }} MHz
              </div>
              <div class="subtitle-2 ellipsis">
                • {{ $t("cpu.core_num") }}: {{ cpu.core_num }}
              </div>
              <div class="subtitle-2 ellipsis">
                • {{ $t("cpu.thread_num") }}: {{ cpu.thread_num }}
              </div>
            </v-card-text>

            <v-expand-transition>
              <v-card
                v-if="cpu.reveal"
                class="transition-fast-in-fast-out cpu-list__card--reveal"
              >
                <v-card-text class="pb-0">
                  <div class="title text--primary">
                    {{ $t("common.specs") }}
                  </div>
                  <v-divider class="mb-4"></v-divider>
                  <div class="subtitle-2">
                    • {{ $t("cpu.name") }}: {{ cpu.name }}
                  </div>
                  <div class="subtitle-2">
                    • {{ $t("cpu.mfr") }}: {{ cpu.mfr }}
                  </div>
                  <div class="subtitle-2">
                    • {{ $t("cpu.core_num") }}: {{ cpu.core_num }}
                  </div>
                  <div class="subtitle-2">
                    • {{ $t("cpu.thread_num") }}: {{ cpu.thread_num }}
                  </div>
                  <div class="subtitle-2">
                    • {{ $t("cpu.base_freq") }}: {{ cpu.base_freq }} MHz
                  </div>
                  <div v-if="cpu.turbo_freq" class="subtitle-2">
                    • {{ $t("cpu.turbo_freq") }}: {{ cpu.turbo_freq }} MHz
                  </div>
                  <div class="subtitle-2">
                    • {{ $t("cpu.cache") }}: {{ cpu.cache }} MB
                  </div>
                  <div class="subtitle-2">
                    • {{ $t("cpu.socket") }}: {{ cpu.socket }}
                  </div>
                  <div class="subtitle-2">
                    • {{ $t("cpu.tdp") }}: {{ cpu.tdp }} W
                  </div>
                  <div class="subtitle-2">
                    • {{ $t("cpu.supported_memory") }}: {{ cpu.memory_type }}-{{
                      cpu.memory_freq
                    }}
                    MHz
                  </div>
                  <div v-if="cpu.process" class="subtitle-2">
                    • {{ $t("cpu.process") }}: {{ cpu.process }} nm
                  </div>
                  <div v-if="cpu.graphics" class="subtitle-2">
                    • {{ $t("cpu.graphics") }}: {{ cpu.graphics }}
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
    </v-container>
    <v-speed-dial
      v-model="fab"
      class="cpu__floating-button"
      transition="slide-y-reverse-transition"
    >
      <template v-slot:activator>
        <v-btn v-model="fab" color="grey darken-3" dark fab large>
          <v-icon v-if="fab">mdi-close</v-icon>
          <v-icon v-else>mdi-menu</v-icon>
        </v-btn>
      </template>
      <v-btn fab dark color="grey">
        <v-icon>mdi-database-export-outline</v-icon>
      </v-btn>
      <v-btn @click="onClickAddButton" fab dark color="grey">
        <v-icon>mdi-database-plus-outline </v-icon>
      </v-btn>
      <v-btn @click="showSearchForm = true" fab dark color="grey">
        <v-icon>mdi-database-search-outline</v-icon>
      </v-btn>
    </v-speed-dial>
    <cpu-cu
      v-if="showCpuCuForm"
      :visible="showCpuCuForm"
      :mode="this.mode"
      :originalCpu="selectedCpu"
      @close="showCpuCuForm = false"
      @search="buildPage"
    />
    <v-bottom-sheet v-model="showSearchForm" inset>
      <v-expansion-panels accordion>
        <v-expansion-panel>
          <v-expansion-panel-header>
            {{ $t("common.search") }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-btn color="primary" block text @click="onClickSearchButton">
              {{ $t("common.search") }}
            </v-btn>
            <div class="mt-3">
              <v-select
                dense
                v-model="selectedManufacturer"
                :items="cpuManufacturerList"
                :label="$t('cpu.mfr')"
                multiple
                chips
              ></v-select>
              <v-select
                dense
                v-model="selectedSocket"
                :items="cpuSocketList"
                :label="$t('cpu.socket')"
                multiple
                chips
              ></v-select>
              <v-select
                dense
                v-model="selectedCoreNum"
                :items="cpuCoreNumList"
                :label="$t('cpu.core_num')"
                multiple
                chips
              ></v-select>
              <v-select
                dense
                v-model="selectedThreadNum"
                :items="cpuThreadNumList"
                :label="$t('cpu.thread_num')"
                multiple
                chips
              ></v-select>
            </div>
            <v-btn color="error" block text @click="onClickResetSearchButton">
              {{ $t("common.reset") }}
            </v-btn>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            {{ $t("common.sort") }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-btn color="primary" block text @click="onClickSortButton">
              {{ $t("common.sort") }}
            </v-btn>
            <v-radio-group :label="$t('common.sort_by')" v-model="sortParam">
              <v-radio
                v-for="(item, index) in sortByRadios"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></v-radio>
            </v-radio-group>
            <v-radio-group :label="$t('common.sort_in')" v-model="orderParam">
              <v-radio
                v-for="(item, index) in sortInRadios"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></v-radio>
            </v-radio-group>
            <v-btn color="error" block text @click="onClickResetSortButton">
              {{ $t("common.reset") }}
            </v-btn>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-bottom-sheet>
  </v-container>
</template>

<script>
import CpuCu from "./CpuCu";
import UrlPathMixins from "../mixins//UrlPathMixins";
import UtilsMixins from "../mixins/UtilsMixins";

export default {
  name: "CpuList",
  mixins: [UrlPathMixins, UtilsMixins],
  components: { CpuCu },
  data() {
    return {
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

      mode: "",
      fab: false,
      showCpuCuForm: false,
      showSearchForm: false,

      cpuList: [],
      cpuManufacturerList: [],
      cpuSocketList: [],
      cpuCoreNumList: [],
      cpuThreadNumList: [],

      selectedManufacturer: [],
      selectedSocket: [],
      selectedCoreNum: [],
      selectedThreadNum: [],

      selectedCpu: {},
    };
  },
  computed: {
    sortByRadios: function () {
      return [
        { label: this.$t("cpu.name"), value: "name" },
        { label: this.$t("cpu.price"), value: "price" },
        { label: this.$t("cpu.core_num"), value: "core_num" },
        { label: this.$t("cpu.thread_num"), value: "thread_num" },
      ];
    },
    sortInRadios: function () {
      return [
        { label: this.$t("common.asc"), value: "ASC" },
        { label: this.$t("common.desc"), value: "DESC" },
      ];
    },
  },
  watch: {
    currentPage(page) {
      this.pagination.page = page - 1;
      this.buildCpuList();
      this.toTopPage();
    },
  },
  created() {
    this.buildPage();
  },
  methods: {
    getCpuImg(img) {
      if (img) {
        return `${this.url.cpuImg}/${img}`;
      } else {
        return "";
      }
    },
    onClickAddButton() {
      this.mode = "C";
      this.showCpuCuForm = true;
      this.selectedCpu = {
        name: "",
        mfr: "",
        socket: "",
        coreNum: null,
        threadNum: null,
        baseFreq: null,
        turboFreq: null,
        cache: null,
        tdp: null,
        memoryType: "DDR4",
        memoryFreq: null,
        process: null,
        graphics: "",
        price: null,
        img: "",
      };
    },
    onClickResetSortButton() {
      this.sortParam = "name";
      this.orderParam = "ASC";
    },
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
    onClickResetSearchButton() {
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
      this.mode = "U";
      this.showCpuCuForm = true;
      this.selectedCpu = {
        id: cpu.id,
        name: cpu.name,
        mfr: cpu.mfr,
        socket: cpu.socket,
        coreNum: cpu.core_num,
        threadNum: cpu.thread_num,
        baseFreq: cpu.base_freq,
        turboFreq: cpu.turbo_freq,
        cache: cpu.cache,
        tdp: cpu.tdp,
        memoryType: cpu.memory_type,
        memoryFreq: cpu.memory_freq,
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
.cpu-list__row {
  min-height: 874px;
}
.cpu-list__col {
  display: flex;
  justify-content: center;
}
.cpu-list__card {
  height: 400px;
  width: 250px;
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
.cpu__floating-button {
  position: fixed;
  bottom: 64px;
  right: 16px;
}
</style>