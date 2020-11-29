<template>
  <div class="homepage">
    <v-app>
      <v-toolbar dense dark class="homepage__navbar">
        <v-app-bar-nav-icon @click.stop="onToggleDrawer"></v-app-bar-nav-icon>
        <v-toolbar-title
          class="homepage__toolbar-title"
          @click="onClickGoToHomepage"
          >ComParts</v-toolbar-title
        >
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
        <v-container
          fluid
          v-if="$router.currentRoute.path === '/'"
          color="grey lighten-4"
        >
          <getting-started />
        </v-container>
        <v-container
          fluid
          style="display: flex"
          v-if="$router.currentRoute.path === '/cpu'"
          color="grey lighten-4"
        >
          <cpu-list v-if="cpuListFlag" />
        </v-container>
        <v-container
          fluid
          style="display: flex"
          v-if="$router.currentRoute.path === '/mobo'"
          color="grey lighten-4"
        >
          <mobo-list v-if="moboListFlag" />
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
              <v-list-item-title>User</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list dense>
            <v-list-item
              :class="{
                'homepage__navdrawer__item--active':
                  $router.currentRoute.path === '/' + item.value,
              }"
              :disabled="$router.currentRoute.path === '/' + item.value"
              v-for="item in menuItems"
              :key="item.title"
              @click="onClickItemTitle(item.value)"
              link
            >
              <v-list-item-icon>
                <v-img
                  class="mr-4"
                  max-width="24px"
                  :src="'/static/assets/' + item.icon"
                >
                </v-img>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
        <v-speed-dial
          v-if="$router.currentRoute.path !== '/'"
          v-model="fab"
          class="homepage__floating-button"
          transition="slide-y-reverse-transition"
          open-on-hover
        >
          <template v-slot:activator>
            <v-btn v-model="fab" color="grey darken-3" dark fab large>
              <v-icon v-if="fab">mdi-close</v-icon>
              <v-icon v-else>mdi-menu</v-icon>
            </v-btn>
          </template>
          <v-btn fab dark color="grey">
            <v-icon>mdi-export-variant</v-icon>
          </v-btn>
          <v-btn @click="onClickAddButton" fab dark color="grey">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-speed-dial>
      </v-card>
      <v-footer class="homepage__footer" color="grey darken-4" padless>
        <v-row justify="center" no-gutters>
          <v-btn
            v-for="(item, index) in footerItems"
            :key="index"
            color="white"
            text
            rounded
            class="my-2"
            >{{ item.title }}
          </v-btn>
        </v-row>
      </v-footer>
      <cpu-cu
        v-if="showCpuCuForm"
        :visible="showCpuCuForm"
        mode="C"
        @close="showCpuCuForm = false"
        @search="rerenderCpuList"
      />
      <mobo-cu
        v-if="showMoboCuForm"
        :visible="showMoboCuForm"
        mode="C"
        @close="showMoboCuForm = false"
        @search="rerenderMoboList"
      />
    </v-app>
  </div>
</template>

<script>
import GettingStarted from "./GettingStarted";
import CpuList from "./cpu/CpuList";
import CpuCu from "./cpu/CpuCu";
import MoboList from "./mobo/MoboList";
import MoboCu from "./mobo/MoboCu";

export default {
  components: { GettingStarted, CpuList, CpuCu, MoboList, MoboCu },
  name: "Homepage",
  data() {
    return {
      drawer: false,
      fab: false,
      cpuListFlag: true,
      moboListFlag: true,
      showCpuCuForm: false,
      showMoboCuForm: false,
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
          title: this.$t("getting_started.gpu_label"),
          icon: "video-card.svg",
          value: "gpu",
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
    rerenderCpuList() {
      this.cpuListFlag = false;
      this.$nextTick(() => {
        this.cpuListFlag = true;
      });
    },
    rerenderMoboList() {
      this.moboListFlag = false;
      this.$nextTick(() => {
        this.moboListFlag = true;
      });
    },
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
    onClickAddButton() {
      switch (this.$router.currentRoute.path) {
        case "/cpu":
          this.showCpuCuForm = true;
          break;
        case "/mobo":
          this.showMoboCuForm = true;
          break;
      }
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
  background-image: url(~/static/assets/background.jpg);
  height: 100%;
}
.homepage__floating-button {
  position: fixed;
  bottom: 64px;
  right: 16px;
}
</style>