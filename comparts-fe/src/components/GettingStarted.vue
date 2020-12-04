<template>
  <v-container class="getting-started__container mb-8">
    <v-row>
      <v-col
        class="getting-started__container__col"
        v-for="(item, index) in gettingStartedItems"
        :key="index"
        md="3"
      >
        <v-card
          class="getting-started__card"
          @click="onClickGettingStartedItems(item.path)"
        >
          <v-img height="150" contain :src="item.img"></v-img>
          <v-card-title class="text-center getting-started__card__title">
            {{ item.title }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div>
              {{ item.desc }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "GettingStarted",
  computed: {
    gettingStartedItems: function () {
      return [
        {
          title: this.$t("getting_started.cpu_label"),
          path: "/cpu",
          img: "/static/assets/chip.svg",
          desc: this.$t("getting_started.cpu_desc"),
        },
        {
          title: this.$t("getting_started.mobo_label"),
          path: "/mobo",
          img: "/static/assets/motherboard.svg",
          desc: this.$t("getting_started.mobo_desc"),
        },
        {
          title: this.$t("getting_started.ram_label"),
          path: "/ram",
          img: "/static/assets/ram-memory.svg",
          desc: this.$t("getting_started.ram_desc"),
        },
        {
          title: this.$t("getting_started.gpu_label"),
          path: "/gpu",
          img: "/static/assets/video-card.svg",
          desc: this.$t("getting_started.gpu_desc"),
        },
        {
          title: this.$t("getting_started.hdd_label"),
          path: "/hdd",
          img: "/static/assets/hard-drive.svg",
          desc: this.$t("getting_started.hdd_desc"),
        },
        {
          title: this.$t("getting_started.ssd_label"),
          path: "/ssd",
          img: "/static/assets/ssd.svg",
          desc: this.$t("getting_started.ssd_desc"),
        },
        {
          title: this.$t("getting_started.psu_label"),
          path: "/psu",
          img: "/static/assets/power-supply.svg",
          desc: this.$t("getting_started.psu_desc"),
        },
        {
          title: this.$t("getting_started.case_label"),
          path: "/case",
          img: "/static/assets/computer.svg",
          desc: this.$t("getting_started.case_desc"),
        },
      ];
    },
  },
  methods: {
    onClickGettingStartedItems(val) {
      this.$router
        .push({ path: val })
        .then(() => {
          this.$router.go(0);
        })
        .catch(() => {});
    },
  },
};
</script>

<style scoped>
.getting-started__container__col {
  display: flex;
  justify-content: center;
}
.getting-started__card {
  cursor: pointer;
  width: 275px;
  height: 400px;
  padding-top: 50px;
}
.getting-started__card__title {
  display: block;
}
</style>