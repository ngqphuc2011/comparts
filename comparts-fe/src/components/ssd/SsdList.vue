<template>
  <v-container fluid class="ssd-list mb-8">
    <v-container fluid>
      <v-row class="ssd-list__row">
        <v-col
          class="ssd-list__col"
          v-for="(ssd, index) in ssdList"
          :key="index"
          md="2"
        >
          <v-card
            class="ssd-list__card"
            @click="onClickCard(ssd)"
            @mouseover="onMouseOverCard(ssd)"
            @mouseleave="onMouseLeaveCard(ssd)"
          >
            <v-img height="200" contain :src="getSsdImg(ssd.img)"></v-img>
            <v-card-title class="ellipsis">
              {{ ssd.mfr }} {{ ssd.name }}
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="ssd-list__card__description">
              <div class="subtitle-2 red--text ellipsis">
                ₫ • {{ formatNumber(ssd.price) }}
              </div>
              <div class="subtitle-2 ellipsis">
                • {{ $t("ssd.model") }}: {{ ssd.model }}
              </div>
              <div class="subtitle-2 ellipsis">
                • {{ $t("ssd.capacity") }}: {{ ssd.capacity }} GB
              </div>
              <div v-if="ssd.ecc === 'ecc'" class="subtitle-2 ellipsis">
                • {{ $t("ssd.memory_type") }}: {{ ssd.memory_type }} ECC
              </div>
              <div v-else class="subtitle-2 ellipsis">
                • {{ $t("ssd.memory_type") }}: {{ ssd.memory_type }}
              </div>
              <div class="subtitle-2 ellipsis">
                • {{ $t("ssd.memory_freq") }}: {{ ssd.memory_freq }} MHz
              </div>
            </v-card-text>

            <v-expand-transition>
              <v-card
                v-if="ssd.reveal"
                class="transition-fast-in-fast-out ssd-list__card--reveal"
              >
                <v-card-text class="pb-0">
                  <div class="title text--primary">
                    {{ $t("common.specs") }}
                  </div>
                  <v-divider class="mb-4"></v-divider>
                  <div class="subtitle-2">
                    • {{ $t("ssd.name") }}: {{ ssd.name }}
                  </div>
                  <div class="subtitle-2">
                    • {{ $t("ssd.model") }}: {{ ssd.model }}
                  </div>
                  <div class="subtitle-2">
                    • {{ $t("ssd.mfr") }}: {{ ssd.mfr }}
                  </div>
                  <div class="subtitle-2 ellipsis">
                    • {{ $t("ssd.capacity") }}: {{ ssd.capacity }} GB
                  </div>
                  <div v-if="ssd.ecc === 'ecc'" class="subtitle-2">
                    • {{ $t("ssd.memory_type") }}: {{ ssd.memory_type }} ECC
                  </div>
                  <div v-else class="subtitle-2">
                    • {{ $t("ssd.memory_type") }}: {{ ssd.memory_type }}
                  </div>
                  <div class="subtitle-2">
                    • {{ $t("ssd.memory_freq") }}: {{ ssd.memory_freq }} MHz
                  </div>
                  <div class="subtitle-2">
                    • {{ $t("ssd.stick_num") }}: {{ ssd.stick_num }}
                  </div>
                  <div class="subtitle-2">
                    • {{ $t("ssd.cas_latency") }}: {{ ssd.cas_latency }}
                  </div>
                  <div class="subtitle-2">
                    • {{ $t("ssd.voltage") }}: {{ ssd.voltage }} V
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
      class="ssd__floating-button"
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
    <ssd-cu
      v-if="showSsdCuForm"
      :visible="showSsdCuForm"
      :mode="this.mode"
      :originalSsd="selectedSsd"
      @close="showSsdCuForm = false"
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
                :items="ssdManufacturerList"
                :label="$t('ssd.mfr')"
                multiple
                chips
              ></v-select>
              <v-select
                dense
                v-model="selectedType"
                :items="ssdTypeList"
                :label="$t('ssd.memory_type')"
                multiple
                chips
              ></v-select>
              <v-select
                dense
                v-model="selectedFrequency"
                :items="ssdFrequencyList"
                :label="$t('ssd.memory_freq')"
                multiple
                chips
              ></v-select>
              <v-select
                dense
                v-model="selectedCapacity"
                :items="ssdCapacityList"
                :label="$t('ssd.capacity')"
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
            <v-radio-group :label="$t('common.sort_by')" v-model="sortPassd">
              <v-radio
                v-for="(item, index) in sortByRadios"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></v-radio>
            </v-radio-group>
            <v-radio-group :label="$t('common.sort_in')" v-model="orderPassd">
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
import SsdCu from "./SsdCu";
import UrlPathMixins from "../mixins//UrlPathMixins";
import UtilsMixins from "../mixins/UtilsMixins";

export default {
  name: "SsdList",
  mixins: [UrlPathMixins, UtilsMixins],
  components: { SsdCu },
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
      sortPassd: "name",
      orderPassd: "ASC",

      mode: "",
      fab: false,
      expansionPanel: "",

      showSsdCuForm: false,
      showSearchForm: false,

      ssdList: [],
      ssdManufacturerList: [],
      ssdTypeList: [],
      ssdFrequencyList: [],
      ssdCapacityList: [],

      selectedManufacturer: [],
      selectedType: [],
      selectedFrequency: [],
      selectedCapacity: [],

      selectedSsd: {},
    };
  },
  computed: {
    sortByRadios: function () {
      return [
        { label: this.$t("ssd.name"), value: "name" },
        { label: this.$t("ssd.price"), value: "price" },
        { label: this.$t("ssd.memory_freq"), value: "memory_freq" },
        { label: this.$t("ssd.capacity"), value: "capacity" },
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
      this.buildSsdList();
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
    getSsdImg(img) {
      if (img) {
        return `${this.url.ssdImg}/${img}`;
      } else {
        return "";
      }
    },
    onClickAddButton() {
      this.mode = "C";
      this.showSsdCuForm = true;
      this.selectedSsd = {
        name: "",
        model: "",
        mfr: "",
        capacity: null,
        stickNum: null,
        ecc: false,
        memoryType: "",
        memoryFreq: null,
        casLatency: null,
        voltage: null,
        price: null,
        img: "",
      };
    },
    onClickResetSortButton() {
      this.sortPassd = "name";
      this.orderPassd = "ASC";
    },
    onClickSortButton() {
      this.sortOrder = {
        sort: this.sortPassd,
        order: this.orderPassd,
      };
      this.currentPage = 1;
      this.buildSsdList();
      this.showSearchForm = false;
      this.toTopPage();
    },
    onClickSearchButton() {
      this.searchQuery = {
        mfr: this.selectedManufacturer,
        memory_type: this.selectedType,
        memory_freq: this.selectedFrequency,
        capacity: this.selectedCapacity,
      };
      this.currentPage = 1;
      this.buildSsdList();
      this.showSearchForm = false;
      this.toTopPage();
    },
    onClickResetSearchButton() {
      this.selectedManufacturer = [];
      this.selectedType = [];
      this.selectedFrequency = [];
      this.selectedCapacity = [];
    },
    onMouseOverCard(ssd) {
      ssd.reveal = true;
    },
    onMouseLeaveCard(ssd) {
      ssd.reveal = false;
    },
    onClickCard(ssd) {
      this.mode = "U";
      this.showSsdCuForm = true;
      this.selectedSsd = {
        id: ssd.id,
        name: ssd.name,
        model: ssd.model,
        mfr: ssd.mfr,
        capacity: ssd.capacity,
        stickNum: ssd.stick_num,
        ecc: ssd.ecc,
        memoryType: ssd.memory_type,
        memoryFreq: ssd.memory_freq,
        casLatency: ssd.cas_latency,
        voltage: ssd.voltage,
        price: ssd.price,
        img: ssd.img,
      };
    },

    searchSsdList(url, pagination, query, sortOrder) {
      return this.$http
        .get(url, { passds: { ...pagination, ...query, ...sortOrder } })
        .then((res) => {
          this.ssdList = [];
          this.totalPages = res.data.totalPages;
          res.data.items.forEach((ssd) => {
            ssd.reveal = false;
            this.ssdList.push(ssd);
          });
        });
    },
    buildSearchFilter() {
      this.ssdManufacturerList = [];
      this.ssdTypeList = [];
      this.ssdFrequencyList = [];
      this.ssdCapacityList = [];

      return this.$http
        .get(this.url.ssd, { passds: { size: 9999 } })
        .then((res) => {
          res.data.items.forEach((ssd) => {
            if (this.ssdManufacturerList.indexOf(ssd.mfr) === -1) {
              this.ssdManufacturerList.push(ssd.mfr);
            }
            if (this.ssdTypeList.indexOf(ssd.memory_type) === -1) {
              this.ssdTypeList.push(ssd.memory_type);
            }
            if (this.ssdFrequencyList.indexOf(ssd.memory_freq) === -1) {
              this.ssdFrequencyList.push(ssd.memory_freq);
            }
            if (this.ssdCapacityList.indexOf(ssd.capacity) === -1) {
              this.ssdCapacityList.push(ssd.capacity);
            }
          });
          this.ssdManufacturerList.sort();
          this.ssdTypeList.sort();
          this.ssdFrequencyList.sort((a, b) => a - b);
          this.ssdCapacityList.sort((a, b) => a - b);
        });
    },
    buildSsdList() {
      this.searchSsdList(
        this.url.ssd,
        this.pagination,
        this.searchQuery,
        this.sortOrder
      );
    },
    buildPage() {
      this.buildSearchFilter();
      this.buildSsdList();
    },
  },
};
</script>

<style scoped>
.ssd-list {
  display: flex;
}
.ssd-list__row {
  min-height: 874px;
}
.ssd-list__col {
  display: flex;
  justify-content: center;
}
.ssd-list__card {
  height: 400px;
  width: 275px;
  cursor: pointer;
}
.ssd-list__card--reveal {
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
.ssd-list__card__actions {
  position: absolute;
  width: 100%;
  bottom: 0;
}
.ssd__floating-button {
  position: fixed;
  bottom: 64px;
  right: 16px;
}
</style>