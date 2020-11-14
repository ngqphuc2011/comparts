<template>
  <div class="comparts-homepage">
    <v-app id="inspire">
      <v-toolbar dense dark>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>ComParts</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card
        color="grey lighten-4"
      >
        <v-sheet style="display: flex" color="grey lighten-4">
          <cpu-search-filter />
          <cpu-list />
        </v-sheet>
        <v-navigation-drawer v-model="drawer" absolute temporary dark>
          <v-list-item>
            <v-list-item-avatar>
              <v-img
                src="http://www.afacebook.group/images/2018/03/23/600px-pica1.jpg"
              ></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>User</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list dense>
            <v-list-item v-for="item in items" :key="item.title" link>
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title @click="onClickItemTitle(item.value)">{{
                  item.title
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-card>
    </v-app>
  </div>
</template>

<script>
import CpuSearchFilter from "./CpuSearchFilter";
import CpuList from "./CpuList";
export default {
  components: { CpuSearchFilter, CpuList },
  name: "Homepage",
  data() {
    return {
      drawer: null,
      items: [
        { title: "Processor", icon: "mdi-cpu-64-bit", value: "cpu" },
        { title: "Motherboard", icon: "mdi-forum", value: "mb" },
      ],
      links: [
      'Home',
      'About Us',
      'Team',
      'Services',
      'Blog',
      'Contact Us',
    ],
    };
  },
  methods: {
    onClickItemTitle(val) {
      console.log(val);
    },
    onClickCpuManufacturer(item) {
      axios.get(`${this.url.cpu}?manufacturer=${item}`).then((res) => {
        this.cpuList.length = 0;
        res.data.forEach((item) => {
          this.cpuList.push(item);
        });
      });
    },
  },
};
</script>

<style scoped>
</style>
