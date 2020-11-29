<template>
  <v-container fluid class="mobo-list">
    <div class="mt-3 mobo-list__search-sort-area">
      <v-expansion-panels accordion :value="0">
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
                :items="moboSizeList"
                :label="$t('mobo.size')"
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
    </div>
    <div class="ml-6 mobo-list__grid-page">
      <v-row class="mobo-list__grid-page__row">
        <v-col v-for="(mobo, index) in moboList" :key="index" cols="2">
          <v-card
            class="mobo-list__card"
            @click="onClickCard(mobo)"
            @mouseover="onMouseOverCard(mobo)"
            @mouseleave="onMouseLeaveCard(mobo)"
          >
            <v-img
              height="200"
              contain
              :src="mobo.img ? url.moboImg + '/' + mobo.img : ''"
            ></v-img>
            <v-card-title class="ellipsis">
              {{ mobo.mfr + " " + mobo.name }}
            </v-card-title>
            <v-card-text class="mobo-list__card__description">
              <div class="subtitle-1 red--text ellipsis">
                ₫ • {{ formatNumber(mobo.price) }}
              </div>
              <div class="subtitle-2 ellipsis">
                • {{ $t("mobo.chipset") }}: {{ mobo.chipset }}
              </div>
              <div class="subtitle-2 ellipsis">
                • {{ $t("mobo.socket") }}: {{ mobo.socket }}
              </div>
              <div class="subtitle-2 ellipsis">
                • {{ $t("mobo.size") }}: {{ mobo.size }}
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
                    • {{ $t("mobo.size") }}: {{ mobo.size }}
                  </div>
                  <div class="subtitle-2">
                    • {{ $t("mobo.supported_memory") }}:
                    {{ mobo.memory_type }}-{{ mobo.memory_freq }}
                    MHz
                  </div>
                  <div v-if="mobo.pcie_x16_slot_num" class="subtitle-2">
                    • {{ $t("mobo.pcie_x16_slot_num") }}: {{ mobo.pcie_x16_slot_num }}
                  </div>
                  <div v-if="mobo.pcie_x8_slot_num" class="subtitle-2">
                    • {{ $t("mobo.pcie_x8_slot_num") }}: {{ mobo.pcie_x8_slot_num }}
                  </div>
                  <div v-if="mobo.pcie_x4_slot_num" class="subtitle-2">
                    • {{ $t("mobo.pcie_x4_slot_num") }}: {{ mobo.pcie_x4_slot_num }}
                  </div>
                  <div v-if="mobo.pcie_x2_slot_num" class="subtitle-2">
                    • {{ $t("mobo.pcie_x2_slot_num") }}: {{ mobo.pcie_x2_slot_num }}
                  </div>
                  <div v-if="mobo.pcie_x1_slot_num" class="subtitle-2">
                    • {{ $t("mobo.pcie_x1_slot_num") }}: {{ mobo.pcie_x1_slot_num }}
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
    <mobo-cu
      v-if="showMoboCuForm"
      :visible="showMoboCuForm"
      mode="U"
      :originalMobo="selectedMobo"
      @close="showMoboCuForm = false"
      @search="buildPage"
    />
  </v-container>
</template>

<script>
import MoboCu from "./MoboCu";
export default {
  name: "MoboList",
  components: { MoboCu },
  data() {
    return {
      url: {
        mobo: "http://localhost:3000/mobos",
        moboImg: "http://localhost:3000/public/mobos",
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

      moboList: [],
      moboManufacturerList: [],
      moboSocketList: [],
      moboChipsetList: [],
      moboSizeList: [],

      selectedManufacturer: [],
      selectedSocket: [],
      selectedChipset: [],
      selectedSize: [],

      showMoboCuForm: false,
      selectedMobo: {
        name: "",
        mfr: "",
        chipset: "",
        socket: "",
        size: "",
        memory_type: "",
        memory_freq: null,
        memory_slot_num: null,
        pcie_x16_slot_num: null,
        pcie_x8_slot_num: null,
        pcie_x4_slot_num: null,
        pcie_x2_slot_num: null,
        pcie_x1_slot_num: null,
        sata_slot_num: null,
        m2_slot_num: null,
        price: null,
        img: "",
      },
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
    },
  },
  created() {
    this.buildPage();
  },
  methods: {
    onClickResetSortButton() {
      this.sortParam = "name";
      this.orderParam = "ASC";
    },
    onClickSortButton() {
      this.sortOrder = {
        sort: this.sortParam,
        order: this.orderParam,
      };
      this.buildMoboList();
    },
    onClickSearchButton() {
      this.searchQuery = {
        mfr: this.selectedManufacturer,
        socket: this.selectedSocket,
        chipset: this.selectedChipset,
        size: this.selectedSize
      };
      this.pagination.page = 0;
      this.currentPage = 1;
      this.buildMoboList();
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
      this.showMoboCuForm = true;
      this.selectedMobo = {
        id: mobo.id,
        name: mobo.name,
        mfr: mobo.mfr,
        chipset: mobo.chipset,
        socket: mobo.socket,
        size: mobo.size,
        memory_type: mobo.memory_type,
        memory_freq: mobo.memory_freq,
        memory_slot_num: mobo.memory_slot_num,
        pcie_x16_slot_num: mobo.pcie_x16_slot_num,
        pcie_x8_slot_num: mobo.pcie_x8_slot_num,
        pcie_x4_slot_num: mobo.pcie_x4_slot_num,
        pcie_x2_slot_num: mobo.pcie_x2_slot_num,
        pcie_x1_slot_num: mobo.pcie_x1_slot_num,
        sata_slot_num: mobo.sata_slot_num,
        m2_slot_num: mobo.m2_slot_num,
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
      this.moboSizeList = [];

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
            if (this.moboSizeList.indexOf(mobo.size) === -1) {
              this.moboSizeList.push(mobo.size);
            }
          });
          this.moboManufacturerList.sort();
          this.moboSocketList.sort();
          this.moboChipsetList.sort((a, b) => a - b);
          this.moboSizeList.sort((a, b) => a - b);
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
.mobo-list__card {
  height: 100%;
  max-height: 400px;
  max-width: 250px;
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
.mobo-list__search-sort-area {
  position: sticky;
  top: 64px;
  min-width: 250px;
  max-width: 250px;
  height: fit-content;
}
.mobo-list__grid-page {
  width: 100%;
}
.mobo-list__grid-page__row {
  min-height: 840px;
}
</style>