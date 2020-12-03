<template>
  <v-container fluid class="gpu-list mb-8">
    <v-container fluid>
      <v-row class="gpu-list__row">
        <v-col
          class="gpu-list__col"
          v-for="(gpu, index) in gpuList"
          :key="index"
          md="2"
        >
          <v-card
            class="gpu-list__card"
            @click="onClickCard(gpu)"
            @mouseover="onMouseOverCard(gpu)"
            @mouseleave="onMouseLeaveCard(gpu)"
          >
            <v-img height="200" contain :src="getGpuImg(gpu.img)"></v-img>
            <v-card-title class="ellipsis">
              {{ gpu.mfr }} {{ gpu.name }}
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="gpu-list__card__description">
              <div class="subtitle-2 red--text ellipsis">
                ₫ • {{ formatNumber(gpu.price) }}
              </div>
              <div class="subtitle-2 ellipsis">
                • {{ $t("gpu.engine") }}: {{ gpu.engine_mfr }}
                {{ gpu.engine_name }}
              </div>
              <div class="subtitle-2 ellipsis">
                • {{ $t("gpu.memory") }}: {{ gpu.memory_size }}GB
                {{ gpu.memory_type }}
              </div>
              <div class="subtitle-2 ellipsis">
                • {{ $t("gpu.boost_speed") }}: {{ gpu.boost_speed }} MHz
              </div>
              <div class="subtitle-2 ellipsis">
                • {{ $t("gpu.cuda_core") }}: {{ gpu.cuda_core }}
              </div>
            </v-card-text>

            <v-expand-transition>
              <v-card
                v-if="gpu.reveal"
                class="transition-fast-in-fast-out gpu-list__card--reveal"
              >
                <v-card-text class="pb-0">
                  <div class="title text--primary">
                    {{ $t("common.specs") }}
                  </div>
                  <v-divider class="mb-4"></v-divider>
                  <div class="subtitle-2">
                    • {{ $t("gpu.name") }}: {{ gpu.name }}
                  </div>
                  <div class="subtitle-2">
                    • {{ $t("gpu.mfr") }}: {{ gpu.mfr }}
                  </div>
                  <div class="subtitle-2">
                    • {{ $t("gpu.engine") }}: {{ gpu.engine_mfr }}
                    {{ gpu.engine_name }}
                  </div>
                  <div class="subtitle-2">
                    • {{ $t("gpu.memory") }}: {{ gpu.memory_size }}GB
                    {{ gpu.memory_type }}
                  </div>
                  <div class="subtitle-2">
                    • {{ $t("gpu.memory_freq") }}: {{ gpu.memory_freq }} MHz
                  </div>
                  <div class="subtitle-2">
                    • {{ $t("gpu.memory_interface") }}:
                    {{ gpu.memory_interface }}-bit
                  </div>
                  <div class="subtitle-2">
                    • {{ $t("gpu.cuda_core") }}: {{ gpu.cuda_core }}
                  </div>
                  <div v-if="gpu.dp_port_num" class="subtitle-2">
                    • {{ $t("gpu.dp_port_num") }}: {{ gpu.dp_port_num }}
                  </div>
                  <div v-if="gpu.hdmi_port_num" class="subtitle-2">
                    • {{ $t("gpu.hdmi_port_num") }}: {{ gpu.hdmi_port_num }}
                  </div>
                  <div v-if="gpu.dvi_port_num" class="subtitle-2">
                    • {{ $t("gpu.dvi_port_num") }}: {{ gpu.dvi_port_num }}
                  </div>
                  <div v-if="gpu.vga_port_num" class="subtitle-2">
                    • {{ $t("gpu.vga_port_num") }}: {{ gpu.vga_port_num }}
                  </div>
                  <div class="subtitle-2">
                    • {{ $t("gpu.tdp") }}: {{ gpu.tdp }} W
                  </div>
                  <div class="subtitle-2">
                    • {{ $t("gpu.psu_wattage") }}: {{ gpu.psu_wattage }} W
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
        :total-visible="10"
      ></v-pagination>
    </v-container>
    <v-speed-dial
      v-model="fab"
      class="gpu__floating-button"
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
    <gpu-cu
      v-if="showGpuCuForm"
      :visible="showGpuCuForm"
      :mode="this.mode"
      :originalGpu="selectedGpu"
      @close="showGpuCuForm = false"
      @search="buildPage"
    />
    <v-bottom-sheet v-model="showSearchForm" inset>
      <v-expansion-panels accordion v-model="expansionPanel">
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
                :items="gpuManufacturerList"
                :label="$t('gpu.mfr')"
                multiple
                chips
              ></v-select>
              <v-select
                dense
                v-model="selectedSocket"
                :items="gpuSocketList"
                :label="$t('gpu.engine_mfr')"
                multiple
                chips
              ></v-select>
              <v-select
                dense
                v-model="selectedCoreNum"
                :items="gpuCoreNumList"
                :label="$t('gpu.engine_name')"
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
import GpuCu from "./GpuCu";
import UrlPathMixins from "../mixins//UrlPathMixins";
import UtilsMixins from "../mixins/UtilsMixins";

export default {
  name: "GpuList",
  mixins: [UrlPathMixins, UtilsMixins],
  components: { GpuCu },
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
      expansionPanel: "",

      showGpuCuForm: false,
      showSearchForm: false,

      gpuList: [],
      gpuManufacturerList: [],
      gpuSocketList: [],
      gpuCoreNumList: [],
      gpuThreadNumList: [],

      selectedManufacturer: [],
      selectedSocket: [],
      selectedCoreNum: [],
      selectedThreadNum: [],

      selectedGpu: {},
    };
  },
  computed: {
    sortByRadios: function () {
      return [
        { label: this.$t("gpu.name"), value: "name" },
        { label: this.$t("gpu.price"), value: "price" },
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
      this.buildGpuList();
      this.toTopPage();
    },
    showSearchForm() {
      this.expansionPanel = "";
    },
  },
  created() {
    this.buildPage();
  },
  methods: {
    getGpuImg(img) {
      if (img) {
        return `${this.url.gpuImg}/${img}`;
      } else {
        return "";
      }
    },
    onClickAddButton() {
      this.mode = "C";
      this.showGpuCuForm = true;
      this.selectedGpu = {
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
      this.currentPage = 1;
      this.buildGpuList();
      this.showSearchForm = false;
      this.toTopPage();
    },
    onClickSearchButton() {
      this.searchQuery = {
        mfr: this.selectedManufacturer,
        socket: this.selectedSocket,
        core_num: this.selectedCoreNum,
        thread_num: this.selectedThreadNum,
      };
      this.currentPage = 1;
      this.buildGpuList();
      this.showSearchForm = false;
      this.toTopPage();
    },
    onClickResetSearchButton() {
      this.selectedManufacturer = [];
      this.selectedSocket = [];
      this.selectedCoreNum = [];
      this.selectedThreadNum = [];
    },
    onMouseOverCard(gpu) {
      gpu.reveal = true;
    },
    onMouseLeaveCard(gpu) {
      gpu.reveal = false;
    },
    onClickCard(gpu) {
      this.mode = "U";
      this.showGpuCuForm = true;
      this.selectedGpu = {
        id: gpu.id,
        name: gpu.name,
        mfr: gpu.mfr,
        socket: gpu.socket,
        coreNum: gpu.core_num,
        threadNum: gpu.thread_num,
        baseFreq: gpu.base_freq,
        turboFreq: gpu.turbo_freq,
        cache: gpu.cache,
        tdp: gpu.tdp,
        memoryType: gpu.memory_type,
        memoryFreq: gpu.memory_freq,
        process: gpu.process,
        graphics: gpu.graphics,
        price: gpu.price,
        img: gpu.img,
      };
    },
    searchGpuList(url, pagination, query, sortOrder) {
      return this.$http
        .get(url, { params: { ...pagination, ...query, ...sortOrder } })
        .then((res) => {
          this.gpuList = [];
          this.totalPages = res.data.totalPages;
          res.data.items.forEach((gpu) => {
            gpu.reveal = false;
            this.gpuList.push(gpu);
          });
        });
    },
    buildSearchFilter() {
      this.gpuManufacturerList = [];
      this.gpuSocketList = [];
      this.gpuCoreNumList = [];
      this.gpuThreadNumList = [];

      return this.$http
        .get(this.url.gpu, { params: { size: 9999 } })
        .then((res) => {
          res.data.items.forEach((gpu) => {
            if (this.gpuManufacturerList.indexOf(gpu.mfr) === -1) {
              this.gpuManufacturerList.push(gpu.mfr);
            }
            if (this.gpuSocketList.indexOf(gpu.socket) === -1) {
              this.gpuSocketList.push(gpu.socket);
            }
            if (this.gpuCoreNumList.indexOf(gpu.core_num) === -1) {
              this.gpuCoreNumList.push(gpu.core_num);
            }
            if (this.gpuThreadNumList.indexOf(gpu.thread_num) === -1) {
              this.gpuThreadNumList.push(gpu.thread_num);
            }
          });
          this.gpuManufacturerList.sort();
          this.gpuSocketList.sort();
          this.gpuCoreNumList.sort((a, b) => a - b);
          this.gpuThreadNumList.sort((a, b) => a - b);
        });
    },
    buildGpuList() {
      this.searchGpuList(
        this.url.gpu,
        this.pagination,
        this.searchQuery,
        this.sortOrder
      );
    },
    buildPage() {
      this.buildSearchFilter();
      this.buildGpuList();
    },
  },
};
</script>

<style scoped>
.gpu-list {
  display: flex;
}
.gpu-list__row {
  min-height: 874px;
}
.gpu-list__col {
  display: flex;
  justify-content: center;
}
.gpu-list__card {
  height: 400px;
  width: 275px;
  cursor: pointer;
}
.gpu-list__card--reveal {
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
.gpu-list__card__actions {
  position: absolute;
  width: 100%;
  bottom: 0;
}
.gpu__floating-button {
  position: fixed;
  bottom: 64px;
  right: 16px;
}
</style>