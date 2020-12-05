<template>
  <v-container fluid class="ram-list mb-8">
    <v-container fluid>
      <v-row class="ram-list__row">
        <v-col
          class="ram-list__col"
          v-for="(ram, index) in ramList"
          :key="index"
          md="2"
        >
          <v-card
            class="ram-list__card"
            @click="onClickCard(ram)"
            @mouseover="onMouseOverCard(ram)"
            @mouseleave="onMouseLeaveCard(ram)"
          >
            <v-img height="200" contain :src="getRamImg(ram.img)"></v-img>
            <v-card-title class="ellipsis">
              {{ ram.mfr }} {{ ram.name }}
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="ram-list__card__description">
              <div class="subtitle-2 red--text ellipsis">
                ₫ • {{ formatNumber(ram.price) }}
              </div>
              <div class="subtitle-2 ellipsis">
                • {{ $t("ram.chipset") }}: {{ ram.chipset }}
              </div>
              <div class="subtitle-2 ellipsis">
                • {{ $t("ram.socket") }}: {{ ram.socket }}
              </div>
              <div class="subtitle-2 ellipsis">
                • {{ $t("ram.ram_size") }}: {{ ram.ram_size }}
              </div>
              <div class="subtitle-2 ellipsis">
                • {{ $t("ram.memory_slot_num") }}: {{ ram.memory_slot_num }}
              </div>
            </v-card-text>

            <v-expand-transition>
              <v-card
                v-if="ram.reveal"
                class="transition-fast-in-fast-out ram-list__card--reveal"
              >
                <v-card-text class="pb-0">
                  <div class="title text--primary">
                    {{ $t("common.specs") }}
                  </div>
                  <v-divider class="mb-4"></v-divider>
                  <div class="subtitle-2">
                    • {{ $t("ram.name") }}: {{ ram.name }}
                  </div>
                  <div class="subtitle-2">
                    • {{ $t("ram.mfr") }}: {{ ram.mfr }}
                  </div>
                  <div class="subtitle-2">
                    • {{ $t("ram.chipset") }}: {{ ram.chipset }}
                  </div>
                  <div class="subtitle-2">
                    • {{ $t("ram.socket") }}: {{ ram.socket }}
                  </div>
                  <div class="subtitle-2">
                    • {{ $t("ram.ram_size") }}: {{ ram.ram_size }}
                  </div>
                  <div class="subtitle-2">
                    • {{ $t("ram.supported_memory") }}:
                    {{ ram.memory_type }}-{{ ram.memory_freq }}
                    MHz
                  </div>
                  <div v-if="ram.pcie_x16_slot_num" class="subtitle-2">
                    • {{ $t("ram.pcie_x16_slot_num") }}:
                    {{ ram.pcie_x16_slot_num }}
                  </div>
                  <div v-if="ram.pcie_x8_slot_num" class="subtitle-2">
                    • {{ $t("ram.pcie_x8_slot_num") }}:
                    {{ ram.pcie_x8_slot_num }}
                  </div>
                  <div v-if="ram.pcie_x4_slot_num" class="subtitle-2">
                    • {{ $t("ram.pcie_x4_slot_num") }}:
                    {{ ram.pcie_x4_slot_num }}
                  </div>
                  <div v-if="ram.pcie_x2_slot_num" class="subtitle-2">
                    • {{ $t("ram.pcie_x2_slot_num") }}:
                    {{ ram.pcie_x2_slot_num }}
                  </div>
                  <div v-if="ram.pcie_x1_slot_num" class="subtitle-2">
                    • {{ $t("ram.pcie_x1_slot_num") }}:
                    {{ ram.pcie_x1_slot_num }}
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
      class="ram__floating-button"
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
    <ram-cu
      v-if="showRamCuForm"
      :visible="showRamCuForm"
      :mode="this.mode"
      :originalRam="selectedRam"
      @close="showRamCuForm = false"
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
                :items="ramManufacturerList"
                :label="$t('ram.mfr')"
                multiple
                chips
              ></v-select>
              <v-select
                dense
                v-model="selectedSocket"
                :items="ramSocketList"
                :label="$t('ram.socket')"
                multiple
                chips
              ></v-select>
              <v-select
                dense
                v-model="selectedChipset"
                :items="ramChipsetList"
                :label="$t('ram.chipset')"
                multiple
                chips
              ></v-select>
              <v-select
                dense
                v-model="selectedSize"
                :items="ramSizeList"
                :label="$t('ram.ram_size')"
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
import RamCu from "./RamCu";
import UrlPathMixins from "../mixins//UrlPathMixins";
import UtilsMixins from "../mixins/UtilsMixins";

export default {
  name: "RamList",
  mixins: [UrlPathMixins, UtilsMixins],
  components: { RamCu },
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

      showRamCuForm: false,
      showSearchForm: false,

      ramList: [],
      ramManufacturerList: [],
      ramSocketList: [],
      ramChipsetList: [],
      ramSizeList: [],

      selectedManufacturer: [],
      selectedSocket: [],
      selectedChipset: [],
      selectedSize: [],

      selectedRam: {},
    };
  },
  computed: {
    sortByRadios: function () {
      return [
        { label: this.$t("ram.name"), value: "name" },
        { label: this.$t("ram.price"), value: "price" },
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
      this.buildRamList();
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
    getRamImg(img) {
      if (img) {
        return `${this.url.ramImg}/${img}`;
      } else {
        return "";
      }
    },
    onClickAddButton() {
      this.mode = "C";
      this.showRamCuForm = true;
      this.selectedRam = {
        name: "",
        mfr: "",
        chipset: "",
        socket: "",
        ramSize: "",
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
    onClickSortButton() {
      this.sortOrder = {
        sort: this.sortParam,
        order: this.orderParam,
      };
      this.currentPage = 1;
      this.buildRamList();
      this.showSearchForm = false;
      this.toTopPage();
    },
    onClickSearchButton() {
      this.searchQuery = {
        mfr: this.selectedManufacturer,
        socket: this.selectedSocket,
        chipset: this.selectedChipset,
        ram_size: this.selectedSize,
      };
      this.currentPage = 1;
      this.buildRamList();
      this.showSearchForm = false;
      this.toTopPage();
    },
    onClickResetSearchButton() {
      this.selectedManufacturer = [];
      this.selectedSocket = [];
      this.selectedChipset = [];
      this.selectedSize = [];
    },
    onMouseOverCard(ram) {
      ram.reveal = true;
    },
    onMouseLeaveCard(ram) {
      ram.reveal = false;
    },
    onClickCard(ram) {
      this.mode = "U";
      this.showRamCuForm = true;
      this.selectedRam = {
        id: ram.id,
        name: ram.name,
        mfr: ram.mfr,
        chipset: ram.chipset,
        socket: ram.socket,
        ramSize: ram.ram_size,
        memoryType: ram.memory_type,
        memoryFreq: ram.memory_freq,
        memorySlotNum: ram.memory_slot_num,
        pcieX16SlotNum: ram.pcie_x16_slot_num,
        pcieX8SlotNum: ram.pcie_x8_slot_num,
        pcieX4SlotNum: ram.pcie_x4_slot_num,
        pcieX2SlotNum: ram.pcie_x2_slot_num,
        pcieX1SlotNum: ram.pcie_x1_slot_num,
        sataSlotNum: ram.sata_slot_num,
        m2SlotNum: ram.m2_slot_num,
        price: ram.price,
        img: ram.img,
      };
    },

    searchRamList(url, pagination, query, sortOrder) {
      return this.$http
        .get(url, { params: { ...pagination, ...query, ...sortOrder } })
        .then((res) => {
          this.ramList = [];
          this.totalPages = res.data.totalPages;
          res.data.items.forEach((ram) => {
            ram.reveal = false;
            this.ramList.push(ram);
          });
        });
    },
    buildSearchFilter() {
      this.ramManufacturerList = [];
      this.ramSocketList = [];
      this.ramChipsetList = [];
      this.ramSizeList = [];

      return this.$http
        .get(this.url.ram, { params: { size: 9999 } })
        .then((res) => {
          res.data.items.forEach((ram) => {
            if (this.ramManufacturerList.indexOf(ram.mfr) === -1) {
              this.ramManufacturerList.push(ram.mfr);
            }
            if (this.ramSocketList.indexOf(ram.socket) === -1) {
              this.ramSocketList.push(ram.socket);
            }
            if (this.ramChipsetList.indexOf(ram.chipset) === -1) {
              this.ramChipsetList.push(ram.chipset);
            }
            if (this.ramSizeList.indexOf(ram.ram_size) === -1) {
              this.ramSizeList.push(ram.ram_size);
            }
          });
          this.ramManufacturerList.sort();
          this.ramSocketList.sort();
          this.ramChipsetList.sort((a, b) => a - b);
          this.ramSizeList.sort((a, b) => a - b);
        });
    },
    buildRamList() {
      this.searchRamList(
        this.url.ram,
        this.pagination,
        this.searchQuery,
        this.sortOrder
      );
    },
    buildPage() {
      this.buildSearchFilter();
      this.buildRamList();
    },
  },
};
</script>

<style scoped>
.ram-list {
  display: flex;
}
.ram-list__row {
  min-height: 874px;
}
.ram-list__col {
  display: flex;
  justify-content: center;
}
.ram-list__card {
  height: 400px;
  width: 275px;
  cursor: pointer;
}
.ram-list__card--reveal {
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
.ram-list__card__actions {
  position: absolute;
  width: 100%;
  bottom: 0;
}
.ram__floating-button {
  position: fixed;
  bottom: 64px;
  right: 16px;
}
</style>