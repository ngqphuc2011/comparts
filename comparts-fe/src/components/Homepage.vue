<template>
  <div class="homepage">
    <v-app>
      <v-toolbar dense dark class="homepage__navbar">
        <v-app-bar-nav-icon @click.stop="onToggleDrawer"></v-app-bar-nav-icon>
        <v-toolbar-title
          class="homepage__toolbar-title"
          @click="onClickGoToHomepage"
          >ComParts
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          v-if="$store.state.lang === 'vi'"
          @click="onClickChangeLanguageButton"
          icon
        >
          <v-icon>mdi-translate</v-icon>
        </v-btn>
        <v-btn v-else icon @click="onClickChangeLanguageButton">
          <v-icon>mdi-translate-off</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card class="homepage__main-page" color="grey lighten-4">
        <v-container fluid>
          <getting-started v-if="$router.currentRoute.path === '/'" />
          <cpu-list v-if="$router.currentRoute.path === '/cpu'" />
          <mobo-list v-if="$router.currentRoute.path === '/mobo'" />
          <gpu-list v-if="$router.currentRoute.path === '/gpu'" />
          <ram-list v-if="$router.currentRoute.path === '/ram'" />
          <hdd-list v-if="$router.currentRoute.path === '/hdd'" />
          <ssd-list v-if="$router.currentRoute.path === '/ssd'" />
        </v-container>
        <v-navigation-drawer
          class="homepage__navdrawer"
          v-model="drawer"
          absolute
          temporary
          dark
        >
          <v-list-item>
            <v-list-item-avatar>
              <v-img src="/static/assets/user.jpg"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ $t("common.user") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list dense>
            <v-list-item
              :class="{
                'homepage__navdrawer__item--active':
                  $router.currentRoute.path === `/${item.value}`,
              }"
              :disabled="$router.currentRoute.path === `/${item.value}`"
              v-for="item in menuItems"
              :key="item.title"
              @click="onClickItemTitle(item.value)"
              link
            >
              <v-list-item-icon>
                <v-img
                  class="mr-4"
                  max-width="24px"
                  :src="`/static/assets/${item.icon}`"
                >
                </v-img>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-card>
      <v-footer class="homepage__footer" color="grey darken-4" padless fixed>
        <v-row justify="center" no-gutters>
          <v-btn
            v-for="(item, index) in footerItems"
            :key="index"
            color="white"
            text
            rounded
            class="my-2"
          >
            {{ item.title }}
          </v-btn>
        </v-row>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import GettingStarted from "./GettingStarted";
import UtilsMixins from "./mixins/UtilsMixins";
import CpuList from "./cpu/CpuList";
import MoboList from "./mobo/MoboList";
import GpuList from "./gpu/GpuList";
import RamList from "./ram/RamList";
import HddList from "./hdd/HddList";
import SsdList from "./ssd/SsdList";

export default {
  components: {
    GettingStarted,
    CpuList,
    MoboList,
    GpuList,
    RamList,
    HddList,
    SsdList,
  },
  mixins: [UtilsMixins],
  name: "Homepage",
  data() {
    return {
      drawer: false,
      cpuListFlag: true,
      moboListFlag: true,
    };
  },
  computed: {
    menuItems: function () {
      return [
        {
          title: this.$t("getting_started.cpu_label"),
          icon: "chip.svg",
          value: "cpu",
        },
        {
          title: this.$t("getting_started.mobo_label"),
          icon: "motherboard.svg",
          value: "mobo",
        },
        {
          title: this.$t("getting_started.ram_label"),
          icon: "ram-memory.svg",
          value: "ram",
        },
        {
          title: this.$t("getting_started.gpu_label"),
          icon: "video-card.svg",
          value: "gpu",
        },
        {
          title: this.$t("getting_started.hdd_label"),
          icon: "hard-drive.svg",
          value: "hdd",
        },
        {
          title: this.$t("getting_started.ssd_label"),
          icon: "ssd.svg",
          value: "ssd",
        },
        {
          title: this.$t("getting_started.psu_label"),
          icon: "power-supply.svg",
          value: "psu",
        },
        {
          title: this.$t("getting_started.case_label"),
          icon: "computer.svg",
          value: "case",
        },
        {
          title: this.$t("getting_started.pc_builder_label"),
          icon: "pc.svg",
          value: "pc-builder",
        },
      ];
    },
    footerItems: function () {
      return [
        { title: this.$t("common.about_us"), value: "about-us" },
        { title: this.$t("common.contact"), value: "contact" },
        { title: this.$t("common.faq"), value: "faq" },
      ];
    },
  },
  created() {
    this.setDefaultLanguage();
  },
  methods: {
    setDefaultLanguage() {
      this.$store.dispatch("setLang", window.localStorage.getItem("language"));
    },
    onClickChangeLanguageButton() {
      if (this.$store.state.lang === "vi") {
        this.$store.dispatch("setLang", "en");
        this.$nextTick(() => {});
      } else {
        this.$store.dispatch("setLang", "vi");
      }
    },
    onClickGoToHomepage() {
      this.$router
        .push({ path: "/" })
        .then(() => {
          this.$router.go(0);
        })
        .catch(() => {});
    },
    onToggleDrawer() {
      this.drawer = !this.drawer;
    },
    onClickItemTitle(val) {
      this.$router.push({ path: val }).catch(() => {});
    },
  },
};
</script>

<style scoped>
.homepage__toolbar-title {
  cursor: pointer;
}
.homepage__navdrawer {
  position: fixed;
  top: 48px;
}
.homepage__navdrawer__item--active {
  background-color: grey;
}
.homepage__navbar {
  position: sticky;
  top: 0;
  z-index: 1;
}
.homepage__main-page {
  display: flex;
  background-image: url("~/static/assets/background.png");
  background-repeat: repeat-y;
  background-size: 100%;
  height: 100%;
}
</style>