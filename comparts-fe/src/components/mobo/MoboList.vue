<template>
  <v-container fluid class="mobo-list mb-8">
    <v-container fluid>
      <v-row class="mobo-list__row">
        <v-col
          class="mobo-list__col"
          v-for="(mobo, index) in moboList"
          :key="index"
          md="2"
        >
          <v-card
            class="mobo-list__card"
            @click="onClickCard(mobo)"
            @mouseover="onMouseOverCard(mobo)"
            @mouseleave="onMouseLeaveCard(mobo)"
          >
            <v-img height="200" contain :src="getMoboImg(mobo.img)"></v-img>
            <v-card-title class="ellipsis">
              {{ mobo.mfr }} {{ mobo.name }}
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="mobo-list__card__description">
              <div class="subtitle-2 red--text ellipsis">
                ₫ • {{ formatNumber(mobo.price) }}
              </div>
              <div class="subtitle-2 ellipsis">
                • {{ $t("mobo.chipset") }}: {{ mobo.chipset }}
              </div>
              <div class="subtitle-2 ellipsis">
                • {{ $t("mobo.socket") }}: {{ mobo.socket }}
              </div>
              <div class="subtitle-2 ellipsis">
                • {{ $t("mobo.form_factor") }}: {{ mobo.form_factor }}
              </div>
              <div class="subtitle-2 ellipsis">
                • {{ $t("mobo.memory_slot_num") }}: {{ mobo.memory_slot_num }}
              </div>
            </v-card-text>

            <v-expand-transition>
              <v-card
                v-if="mobo.reveal"
                class="transition-fast-in-fast-out mobo-list__card--reveal"
              >
                <v-card-text class="pb-0">
                  <div class="title text--primary">
                    {{ $t("common.specs") }}
                  </div>
                  <v-divider class="mb-4"></v-divider>
                  <div class="subtitle-2">
                    • {{ $t("mobo.name") }}: {{ mobo.name }}
                  </div>
                  <div class="subtitle-2">
                    • {{ $t("mobo.mfr") }}: {{ mobo.mfr }}
                  </div>
                  <div class="subtitle-2">
                    • {{ $t("mobo.chipset") }}: {{ mobo.chipset }}
                  </div>
                  <div class="subtitle-2">
                    • {{ $t("mobo.socket") }}: {{ mobo.socket }}
                  </div>
                  <div class="subtitle-2">
                    • {{ $t("mobo.form_factor") }}: {{ mobo.form_factor }}
                  </div>
                  <div class="subtitle-2">
                    • {{ $t("mobo.supported_memory") }}:
                    {{ mobo.memory_type }}-{{ mobo.memory_freq }}
                    MHz
                  </div>
                  <div v-if="mobo.pcie_x16_slot_num" class="subtitle-2">
                    • {{ $t("mobo.pcie_x16_slot_num") }}:
                    {{ mobo.pcie_x16_slot_num }}
                  </div>
                  <div v-if="mobo.pcie_x8_slot_num" class="subtitle-2">
                    • {{ $t("mobo.pcie_x8_slot_num") }}:
                    {{ mobo.pcie_x8_slot_num }}
                  </div>
                  <div v-if="mobo.pcie_x4_slot_num" class="subtitle-2">
                    • {{ $t("mobo.pcie_x4_slot_num") }}:
                    {{ mobo.pcie_x4_slot_num }}
                  </div>
                  <div v-if="mobo.pcie_x2_slot_num" class="subtitle-2">
                    • {{ $t("mobo.pcie_x2_slot_num") }}:
                    {{ mobo.pcie_x2_slot_num }}
                  </div>
                  <div v-if="mobo.pcie_x1_slot_num" class="subtitle-2">
                    • {{ $t("mobo.pcie_x1_slot_num") }}:
                    {{ mobo.pcie_x1_slot_num }}
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
      class="mobo__floating-button"
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
    <mobo-cu
      v-if="showMoboCuForm"
      :visible="showMoboCuForm"
      :mode="this.mode"
      :originalMobo="selectedMobo"
      @close="showMoboCuForm = false"
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
              <v-select
                dense
                v-model="selectedManufacturer"
                :items="moboManufacturerList"
                :label="$t('mobo.mfr')"
                multiple
                chips
              ></v-select>
              <v-select
                dense
                v-model="selectedSocket"
                :items="moboSocketList"
                :label="$t('mobo.socket')"
                multiple
                chips
              ></v-select>
              <v-select
                dense
                v-model="selectedChipset"
                :items="moboChipsetList"
                :label="$t('mobo.chipset')"
                multiple
                chips
              ></v-select>
              <v-select
                dense
                v-model="selectedSize"
                :items="moboFormFactorList"
                :label="$t('mobo.form_factor')"
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
import MoboCu from "./MoboCu";
import UrlPathMixins from "../mixins//UrlPathMixins";
import UtilsMixins from "../mixins/UtilsMixins";

export default {
  name: "MoboList",
  mixins: [UrlPathMixins, UtilsMixins],
  components: { MoboCu },
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

      showMoboCuForm: false,
      showSearchForm: false,

      moboList: [],
      moboManufacturerList: [],
      moboSocketList: [],
      moboChipsetList: [],
      moboFormFactorList: [],

      selectedManufacturer: [],
      selectedSocket: [],
      selectedChipset: [],
      selectedSize: [],

      selectedMobo: {},
    };
  },
  computed: {
    sortByRadios: function () {
      return [
        { label: this.$t("mobo.name"), value: "name" },
        { label: this.$t("mobo.price"), value: "price" },
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
      this.buildMoboList();
      this.toTopPage();
    },
    showSearchForm() {
      if (!this.showSearchForm) {
        this.onSearchAndSort();
      }
      this.expansionPanel = "";
    },
  },
  created() {
    this.buildPage();
  },
  methods: {
    getMoboImg(img) {
      if (img) {
        return `${this.url.moboImg}/${img}`;
      } else {
        return "";
      }
    },
    onClickAddButton() {
      this.mode = "C";
      this.showMoboCuForm = true;
      this.selectedMobo = {
        name: "",
        mfr: "",
        chipset: "",
        socket: "",
        formFactor: "",
        memoryType: "",
        memoryFreq: null,
        memorySlotNum: null,
        pcieX16SlotNum: null,
        pcieX8SlotNum: null,
        pcieX4SlotNum: null,
        pcieX2SlotNum: null,
        pcieX1SlotNum: null,
        sataSlotNum: null,
        m2SlotNum: null,
        price: null,
        img: "",
      };
    },
    onClickResetSortButton() {
      this.sortParam = "name";
      this.orderParam = "ASC";
    },
    onSearchAndSort() {
      this.searchQuery = {
        mfr: this.selectedManufacturer,
        socket: this.selectedSocket,
        chipset: this.selectedChipset,
        form_factor: this.selectedSize,
      };
      this.sortOrder = {
        sort: this.sortParam,
        order: this.orderParam,
      };
      this.currentPage = 1;
      this.buildMoboList();
      this.showSearchForm = false;
      this.toTopPage();
    },
    onClickResetSearchButton() {
      this.selectedManufacturer = [];
      this.selectedSocket = [];
      this.selectedChipset = [];
      this.selectedSize = [];
    },
    onMouseOverCard(mobo) {
      mobo.reveal = true;
    },
    onMouseLeaveCard(mobo) {
      mobo.reveal = false;
    },
    onClickCard(mobo) {
      this.mode = "U";
      this.showMoboCuForm = true;
      this.selectedMobo = {
        id: mobo.id,
        name: mobo.name,
        mfr: mobo.mfr,
        chipset: mobo.chipset,
        socket: mobo.socket,
        formFactor: mobo.form_factor,
        memoryType: mobo.memory_type,
        memoryFreq: mobo.memory_freq,
        memorySlotNum: mobo.memory_slot_num,
        pcieX16SlotNum: mobo.pcie_x16_slot_num,
        pcieX8SlotNum: mobo.pcie_x8_slot_num,
        pcieX4SlotNum: mobo.pcie_x4_slot_num,
        pcieX2SlotNum: mobo.pcie_x2_slot_num,
        pcieX1SlotNum: mobo.pcie_x1_slot_num,
        sataSlotNum: mobo.sata_slot_num,
        m2SlotNum: mobo.m2_slot_num,
        price: mobo.price,
        img: mobo.img,
      };
    },

    searchMoboList(url, pagination, query, sortOrder) {
      return this.$http
        .get(url, { params: { ...pagination, ...query, ...sortOrder } })
        .then((res) => {
          this.moboList = [];
          this.totalPages = res.data.totalPages;
          res.data.items.forEach((mobo) => {
            mobo.reveal = false;
            this.moboList.push(mobo);
          });
        });
    },
    buildSearchFilter() {
      this.moboManufacturerList = [];
      this.moboSocketList = [];
      this.moboChipsetList = [];
      this.moboFormFactorList = [];

      return this.$http
        .get(this.url.mobo, { params: { size: 9999 } })
        .then((res) => {
          res.data.items.forEach((mobo) => {
            if (this.moboManufacturerList.indexOf(mobo.mfr) === -1) {
              this.moboManufacturerList.push(mobo.mfr);
            }
            if (this.moboSocketList.indexOf(mobo.socket) === -1) {
              this.moboSocketList.push(mobo.socket);
            }
            if (this.moboChipsetList.indexOf(mobo.chipset) === -1) {
              this.moboChipsetList.push(mobo.chipset);
            }
            if (this.moboFormFactorList.indexOf(mobo.form_factor) === -1) {
              this.moboFormFactorList.push(mobo.form_factor);
            }
          });
          this.moboManufacturerList.sort();
          this.moboSocketList.sort();
          this.moboChipsetList.sort((a, b) => a - b);
          this.moboFormFactorList.sort((a, b) => a - b);
        });
    },
    buildMoboList() {
      this.searchMoboList(
        this.url.mobo,
        this.pagination,
        this.searchQuery,
        this.sortOrder
      );
    },
    buildPage() {
      this.buildSearchFilter();
      this.buildMoboList();
    },
  },
};
</script>

<style scoped>
.mobo-list {
  display: flex;
}
.mobo-list__row {
  min-height: 874px;
}
.mobo-list__col {
  display: flex;
  justify-content: center;
}
.mobo-list__card {
  height: 400px;
  width: 275px;
  cursor: pointer;
}
.mobo-list__card--reveal {
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
.mobo-list__card__actions {
  position: absolute;
  width: 100%;
  bottom: 0;
}
.mobo__floating-button {
  position: fixed;
  bottom: 64px;
  right: 16px;
}
</style>