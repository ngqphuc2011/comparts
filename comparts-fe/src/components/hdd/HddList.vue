<template>
  <v-container fluid class="hdd-list mb-8">
    <v-container fluid>
      <v-row class="hdd-list__row">
        <v-col
          class="hdd-list__col"
          v-for="(hdd, index) in hddList"
          :key="index"
          md="2"
          sm="4"
        >
          <v-card
            class="hdd-list__card"
            @click="onClickCard(hdd)"
            @mouseover="onMouseOverCard(hdd)"
            @mouseleave="onMouseLeaveCard(hdd)"
          >
            <v-img height="200" contain :src="getHddImg(hdd.img)"></v-img>
            <v-card-title class="ellipsis">
              {{ hdd.mfr }} {{ hdd.name }}
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="hdd-list__card__description">
              <div class="subtitle-2 red--text ellipsis">
                ₫ • {{ formatNumber(hdd.price) }}
              </div>
              <div class="subtitle-2 ellipsis">
                • {{ $t("hdd.capacity") }}: {{ hdd.capacity }} GB
              </div>
              <div class="subtitle-2 ellipsis">
                • {{ $t("hdd.interface") }}: {{ hdd.interface }} ({{
                  hdd.form_factor
                }})
              </div>
              <div class="subtitle-2 ellipsis">
                • {{ $t("hdd.rpm") }}: {{ hdd.rpm }} rpm
              </div>
              <div class="subtitle-2 ellipsis">
                • {{ $t("hdd.cache") }}: {{ hdd.cache }} MB
              </div>
            </v-card-text>

            <v-expand-transition>
              <v-card
                v-if="hdd.reveal"
                class="transition-fast-in-fast-out hdd-list__card--reveal"
              >
                <v-card-text class="pb-0">
                  <div class="title text--primary">
                    {{ $t("common.specs") }}
                  </div>
                  <v-divider class="mb-4"></v-divider>
                  <div class="subtitle-2">
                    • {{ $t("hdd.name") }}: {{ hdd.name }}
                  </div>
                  <div class="subtitle-2">
                    • {{ $t("hdd.model") }}: {{ hdd.model }}
                  </div>
                  <div class="subtitle-2">
                    • {{ $t("hdd.mfr") }}: {{ hdd.mfr }}
                  </div>
                  <div class="subtitle-2 ellipsis">
                    • {{ $t("hdd.capacity") }}: {{ hdd.capacity }} GB
                  </div>
                  <div class="subtitle-2">
                    • {{ $t("hdd.interface") }}: {{ hdd.interface }}
                  </div>
                  <div class="subtitle-2">
                    • {{ $t("hdd.form_factor") }}: {{ hdd.form_factor }}
                  </div>
                  <div class="subtitle-2">
                    • {{ $t("hdd.cache") }}: {{ hdd.cache }} MB
                  </div>
                  <div class="subtitle-2">
                    • {{ $t("hdd.rpm") }}: {{ hdd.rpm }}
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
      class="hdd__floating-button"
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
    <hdd-cu
      v-if="showHddCuForm"
      :visible="showHddCuForm"
      :mode="this.mode"
      :originalHdd="selectedHdd"
      @close="showHddCuForm = false"
      @search="buildPage"
    />
    <v-bottom-sheet v-model="showSearchForm" inset>
      <v-expansion-panels accordion v-model="expansionPanel">
        <v-expansion-panel>
          <v-expansion-panel-header>
            {{ $t("common.search") }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div class="mt-3">
              <v-combobox
                dense
                v-model="selectedName"
                :label="$t('hdd.name')"
                chips
              >
              </v-combobox>
              <v-select
                dense
                v-model="selectedManufacturer"
                :items="hddManufacturerList"
                :label="$t('hdd.mfr')"
                multiple
                chips
              ></v-select>
              <v-select
                dense
                v-model="selectedInterface"
                :items="hddInterfaceList"
                :label="$t('hdd.interface')"
                multiple
                chips
              ></v-select>
              <v-select
                dense
                v-model="selectedFormFactor"
                :items="hddFormFactorList"
                :label="$t('hdd.form_factor')"
                multiple
                chips
              ></v-select>
              <v-select
                dense
                v-model="selectedCapacity"
                :items="hddCapacityList"
                :label="$t('hdd.capacity')"
                suffix="GB"
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
            <v-radio-group :label="$t('common.sort_by')" v-model="sortParams">
              <v-radio
                v-for="(item, index) in sortByRadios"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></v-radio>
            </v-radio-group>
            <v-radio-group :label="$t('common.sort_in')" v-model="orderParams">
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
import HddCu from "./HddCu";
import UrlPathMixins from "../mixins//UrlPathMixins";
import UtilsMixins from "../mixins/UtilsMixins";

export default {
  name: "HddList",
  mixins: [UrlPathMixins, UtilsMixins],
  components: { HddCu },
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
      sortParams: "name",
      orderParams: "ASC",

      mode: "",
      fab: false,
      expansionPanel: "",

      showHddCuForm: false,
      showSearchForm: false,

      hddList: [],
      hddManufacturerList: [],
      hddInterfaceList: [],
      hddFormFactorList: [],
      hddCapacityList: [],

      selectedName: "",
      selectedManufacturer: [],
      selectedInterface: [],
      selectedFormFactor: [],
      selectedCapacity: [],

      selectedHdd: {},
    };
  },
  computed: {
    sortByRadios: function () {
      return [
        { label: this.$t("hdd.name"), value: "name" },
        { label: this.$t("hdd.price"), value: "price" },
        { label: this.$t("hdd.capacity"), value: "capacity" },
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
      this.buildHddList();
      this.toTopPage();
    },
    showSearchForm() {
      if (!this.showSearchForm) {
        this.searchAndSort();
      }
      this.expansionPanel = "";
    },
  },
  created() {
    this.buildPage();
  },
  methods: {
    getHddImg(img) {
      if (img) {
        return `${this.url.hddImg}/${img}`;
      } else {
        return "";
      }
    },
    onClickAddButton() {
      this.mode = "C";
      this.showHddCuForm = true;
      this.selectedHdd = {
        name: "",
        model: "",
        mfr: "",
        capacity: null,
        interface: "",
        formFactor: "",
        cache: null,
        rpm: null,
        price: null,
        img: "",
      };
    },
    onClickResetSortButton() {
      this.sortParams = "name";
      this.orderParams = "ASC";
    },
    searchAndSort() {
      this.searchQuery = {
        name: this.selectedName,
        mfr: this.selectedManufacturer,
        interface: this.selectedInterface,
        form_factor: this.selectedFormFactor,
        capacity: this.selectedCapacity,
      };
      this.sortOrder = {
        sort: this.sortParams,
        order: this.orderParams,
      };
      this.currentPage = 1;
      this.buildHddList();
      this.showSearchForm = false;
      this.toTopPage();
    },
    onClickResetSearchButton() {
      this.selectedManufacturer = [];
      this.selectedInterface = [];
      this.selectedFormFactor = [];
      this.selectedCapacity = [];
    },
    onMouseOverCard(hdd) {
      hdd.reveal = true;
    },
    onMouseLeaveCard(hdd) {
      hdd.reveal = false;
    },
    onClickCard(hdd) {
      this.mode = "U";
      this.showHddCuForm = true;
      this.selectedHdd = {
        id: hdd.id,
        name: hdd.name,
        model: hdd.model,
        mfr: hdd.mfr,
        capacity: hdd.capacity,
        interface: hdd.interface,
        formFactor: hdd.form_factor,
        cache: hdd.cache,
        rpm: hdd.rpm,
        price: hdd.price,
        img: hdd.img,
      };
    },

    searchHddList(url, pagination, query, sortOrder) {
      return this.$http
        .get(url, { params: { ...pagination, ...query, ...sortOrder } })
        .then((res) => {
          this.hddList = [];
          this.totalPages = res.data.totalPages;
          res.data.items.forEach((hdd) => {
            hdd.reveal = false;
            this.hddList.push(hdd);
          });
        });
    },
    buildSearchFilter() {
      this.hddManufacturerList = [];
      this.hddInterfaceList = [];
      this.hddFormFactorList = [];
      this.hddCapacityList = [];

      return this.$http
        .get(this.url.hdd, { params: { size: 9999 } })
        .then((res) => {
          res.data.items.forEach((hdd) => {
            if (this.hddManufacturerList.indexOf(hdd.mfr) === -1) {
              this.hddManufacturerList.push(hdd.mfr);
            }
            if (this.hddInterfaceList.indexOf(hdd.interface) === -1) {
              this.hddInterfaceList.push(hdd.interface);
            }
            if (this.hddFormFactorList.indexOf(hdd.form_factor) === -1) {
              this.hddFormFactorList.push(hdd.form_factor);
            }
            if (this.hddCapacityList.indexOf(hdd.capacity) === -1) {
              this.hddCapacityList.push(hdd.capacity);
            }
          });
          this.hddManufacturerList.sort();
          this.hddInterfaceList.sort();
          this.hddFormFactorList.sort();
          this.hddCapacityList.sort((a, b) => a - b);
        });
    },
    buildHddList() {
      this.searchHddList(
        this.url.hdd,
        this.pagination,
        this.searchQuery,
        this.sortOrder
      );
    },
    buildPage() {
      this.buildSearchFilter();
      this.buildHddList();
    },
  },
};
</script>

<style scoped>
.hdd-list {
  display: flex;
}
.hdd-list__row {
  min-height: 874px;
}
.hdd-list__col {
  display: flex;
  justify-content: center;
}
.hdd-list__card {
  height: 400px;
  width: 275px;
  cursor: pointer;
}
.hdd-list__card--reveal {
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
.hdd-list__card__actions {
  position: absolute;
  width: 100%;
  bottom: 0;
}
.hdd__floating-button {
  position: fixed;
  bottom: 64px;
  right: 16px;
}
</style>