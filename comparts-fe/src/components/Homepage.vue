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
        <v-btn icon>
          <v-icon>mdi-help-circle</v-icon>
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
              v-for="item in menuItems"
              :key="item.title"
              @click="onClickItemTitle(item.value)"
              link
            >
              <!-- <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon> -->
              <v-img
                class="mr-4"
                max-width="24px"
                :src="'/static/assets/' + item.icon"
              >
              </v-img>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
        <v-speed-dial
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
            <v-icon>mdi-wrench</v-icon>
          </v-btn>
          <v-btn
            v-if="$router.currentRoute.path !== '/'"
            @click="onClickAddButton"
            fab
            dark
            color="grey"
          >
            <v-icon>mdi-plus-thick</v-icon>
          </v-btn>
          <v-btn @click="onClickToTopPage" fab dark color="grey">
            <v-icon>mdi-arrow-up-bold</v-icon>
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
    </v-app>
  </div>
</template>

<script>
import GettingStarted from "./GettingStarted";
import CpuList from "./cpu/CpuList";
import CpuCu from "./cpu/CpuCu";

export default {
  components: { CpuList, CpuCu, GettingStarted },
  name: "Homepage",
  data() {
    return {
      drawer: null,
      fab: false,
      cpuListFlag: true,
      menuItems: [
        { title: "Processor", icon: "chip.svg", value: "cpu" },
        { title: "Motherboard", icon: "motherboard.svg", value: "mb" },
        { title: "Memory", icon: "ram-memory.svg", value: "ram" },
        { title: "Hard Disk Drive", icon: "hard-drive.svg", value: "hdd" },
        { title: "Solid State Drive", icon: "ssd.svg", value: "ssd" },
        { title: "Video Card", icon: "video-card.svg", value: "gpu" },
        { title: "Power Supply", icon: "power-supply.svg", value: "psu" },
        { title: "Case", icon: "computer.svg", value: "case" },
      ],
      footerItems: [
        { title: "About Us", value: "aboutus" },
        { title: "Contact", value: "contact" },
        { title: "FAQ", value: "faq" },
      ],
      showCpuCuForm: false,
    };
  },
  methods: {
    rerenderCpuList() {
      this.cpuListFlag = false;
      this.$nextTick(() => {
        this.cpuListFlag = true;
      });
    },
    onClickToTopPage() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
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
        default:
          this.snackbar = true;
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
  height: 100%;
}
.homepage__floating-button {
  position: fixed;
  bottom: 64px;
  right: 16px;
}
</style>