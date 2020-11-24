<template>
  <v-container class="mx-auto" style="display: flex">
    <v-row class="my-16">
      <v-col cols="3" v-for="(item, index) in gettingStartedItems" :key="index">
        <v-card
          class="mr-4 getting-started__card"
          @click="onClickGettingStartedItems(item.path)"
        >
          <v-img height="150" contain :src="item.img"></v-img>
          <v-card-title class="text-center getting-started__card__title">{{ item.title }}</v-card-title>
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
  data() {
    return {
      gettingStartedItems: [
        {
          title: "Processor",
          path: "/cpu",
          img: "/static/assets/chip.svg",
          desc:
            "Below you will find a list of the CPUs released in recent years.",
        },
        {
          title: "Motherboard",
          path: "/mb",
          img: "/static/assets/motherboard.svg",
          desc:
            "Below you will find a list of the Motherboards released in recent years.",
        },
        {
          title: "Memory",
          path: "/ram",
          img: "/static/assets/ram-memory.svg",
          desc:
            "Below you will find a list of the RAMs released in recent years.",
        },
        {
          title: "Video Card",
          path: "/gpu",
          img: "/static/assets/video-card.svg",
          desc:
            "Below you will find a list of the GPUs released in recent years.",
        },
        {
          title: "Hard Disk Drive",
          path: "/hdd",
          img: "/static/assets/hard-drive.svg",
          desc:
            "Below you will find a list of the HDDs released in recent years.",
        },
        {
          title: "Solid State Drive",
          path: "/ssd",
          img: "/static/assets/ssd.svg",
          desc:
            "Below you will find a list of the SSDs released in recent years.",
        },
        {
          title: "Power Supply",
          path: "/psu",
          img: "/static/assets/power-supply.svg",
          desc:
            "Below you will find a list of the PSUs released in recent years.",
        },
        {
          title: "Case",
          path: "/case",
          img: "/static/assets/computer.svg",
          desc: "Below you will find a list of the Cases released in recent years.",
        },
      ],
    };
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
.getting-started__card {
  cursor: pointer;
  max-width: 250px;
  min-height: 350px;
  height: 100%;
  padding-top: 50px
}
.getting-started__card__title {
    display: block;
}
</style>