<template>
  <v-container fluid class="ssd-list mb-8">
    <v-container fluid>
      <v-row class="ssd-list__row">
        <v-col
          class="ssd-list__col"
          v-for="(ssd, index) in ssdList"
          :key="index"
          md="2"
          sm="4"
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
                • {{ $t("ssd.capacity") }}: {{ ssd.capacity }} GB
              </div>
              <div class="subtitle-2 ellipsis">
                • {{ $t("ssd.interface") }}: {{ ssd.interface }} ({{
                  ssd.form_factor
                }})
              </div>
              <div class="subtitle-2 ellipsis">
                • {{ $t("ssd.read_speed") }}: {{ ssd.read_speed }} MB/s
              </div>
              <div class="subtitle-2 ellipsis">
                • {{ $t("ssd.write_speed") }}: {{ ssd.write_speed }} MB/s
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
                  <div class="subtitle-2">
                    • {{ $t("ssd.interface") }}: {{ ssd.interface }}
                  </div>
                  <div class="subtitle-2">
                    • {{ $t("ssd.form_factor") }}: {{ ssd.form_factor }}
                  </div>
                  <div class="subtitle-2">
                    • {{ $t("ssd.read_speed") }}: {{ ssd.read_speed }} MB/s
                  </div>
                  <div class="subtitle-2">
                    • {{ $t("ssd.write_speed") }}: {{ ssd.write_speed }} MB/s
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
            <div class="mt-3">
              <v-combobox
                dense
                v-model="selectedName"
                :label="$t('ssd.name')"
                chips
              >
              </v-combobox>
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
                v-model="selectedInterface"
                :items="ssdInterfaceList"
                :label="$t('ssd.interface')"
                multiple
                chips
              ></v-select>
              <v-select
                dense
                v-model="selectedFormFactor"
                :items="ssdFormFactorList"
                :label="$t('ssd.form_factor')"
                multiple
                chips
              ></v-select>
              <v-select
                dense
                v-model="selectedCapacity"
                :items="ssdCapacityList"
                :label="$t('ssd.capacity')"
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
      sortParams: "name",
      orderParams: "ASC",

      mode: "",
      fab: false,
      expansionPanel: "",

      showSsdCuForm: false,
      showSearchForm: false,

      ssdList: [],
      ssdManufacturerList: [],
      ssdInterfaceList: [],
      ssdFormFactorList: [],
      ssdCapacityList: [],

      selectedName: "",
      selectedManufacturer: [],
      selectedInterface: [],
      selectedFormFactor: [],
      selectedCapacity: [],

      selectedSsd: {},
    };
  },
  computed: {
    sortByRadios: function () {
      return [
        { label: this.$t("ssd.name"), value: "name" },
        { label: this.$t("ssd.price"), value: "price" },
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
        interface: "",
        formFactor: "",
        readSpeed: null,
        writeSpeed: null,
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
      this.buildSsdList();
      this.showSearchForm = false;
      this.toTopPage();
    },
    onClickResetSearchButton() {
      this.selectedManufacturer = [];
      this.selectedInterface = [];
      this.selectedFormFactor = [];
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
        interface: ssd.interface,
        formFactor: ssd.form_factor,
        readSpeed: ssd.read_speed,
        writeSpeed: ssd.write_speed,
        price: ssd.price,
        img: ssd.img,
      };
    },

    searchSsdList(url, pagination, query, sortOrder) {
      return this.$http
        .get(url, { params: { ...pagination, ...query, ...sortOrder } })
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
      this.ssdInterfaceList = [];
      this.ssdFormFactorList = [];
      this.ssdCapacityList = [];

      return this.$http
        .get(this.url.ssd, { params: { size: 9999 } })
        .then((res) => {
          res.data.items.forEach((ssd) => {
            if (ssd.mfr && this.ssdManufacturerList.indexOf(ssd.mfr) === -1) {
              this.ssdManufacturerList.push(ssd.mfr);
            }
            if (
              ssd.interface &&
              this.ssdInterfaceList.indexOf(ssd.interface) === -1
            ) {
              this.ssdInterfaceList.push(ssd.interface);
            }
            if (
              ssd.form_factor &&
              this.ssdFormFactorList.indexOf(ssd.form_factor) === -1
            ) {
              this.ssdFormFactorList.push(ssd.form_factor);
            }
            if (
              ssd.capacity &&
              this.ssdCapacityList.indexOf(ssd.capacity) === -1
            ) {
              this.ssdCapacityList.push(ssd.capacity);
            }
          });
          this.ssdManufacturerList.sort();
          this.ssdInterfaceList.sort();
          this.ssdFormFactorList.sort((a, b) => a - b);
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