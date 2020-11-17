<template>
  <v-dialog v-model="visible" persistent max-width="40%" class="cpu-cu-dialog">
    <v-card>
      <v-card-title class="headline"> Add CPU </v-card-title>
      <v-form v-model="valid" ref="form">
        <v-container class="pl-8 pr-8">
          <v-row>
            <v-col>
              <v-text-field
                v-model="cpu.name"
                label="Name"
                :rules="textRules"
                :counter="50"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="cpu.manufacturer"
                label="Manufacturer"
                :rules="textRules"
                :counter="50"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="cpu.graphics"
                label="Graphics"
                :counter="50"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="cpu.socket"
                label="Socket"
                :rules="textRules"
                :counter="50"
              >
              </v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="cpu.process"
                type="number"
                suffix="nm"
                label="Process"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="cpu.coreNum"
                type="number"
                :rules="numberRules"
                label="Number of Cores"
              >
              </v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="cpu.threadNum"
                type="number"
                :rules="numberRules"
                label="Number of Threads"
              >
              </v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="cpu.baseFrequency"
                type="number"
                label="Base Frequency"
                :rules="numberRules"
                suffix="MHz"
              >
              </v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="cpu.turboFrequency"
                type="number"
                label="Turbo Frequency"
                suffix="MHz"
              >
              </v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                v-model="cpu.cache"
                type="number"
                label="Cache"
                suffix="MB"
              >
              </v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="cpu.tdp"
                type="number"
                label="TDP"
                suffix="W"
              >
              </v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="cpu.memoryType"
                label="Memory Type"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="cpu.memoryFrequency"
                type="number"
                label="Memory Frequency"
                suffix="MHz"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="cpu.price"
                type="number"
                label="Price"
                prefix="₫"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-file-input
                prepend-icon="mdi-camera"
                accept="image/*"
                label="Image"
                @change="onImageChange"
                @click:clear="onImageClear"
              ></v-file-input>
            </v-col>
            <v-col cols="6">
              <v-card class="cpu-cu-dialog__image-preview">
                <v-list-item>
                  <v-list-item-content>
                    <v-img
                      contain
                      height="150"
                      class="cpu-cu-dialog__image-preview"
                      :src="urlImg"
                    ></v-img>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="onClickCancelButton">Cancel</v-btn>
        <v-btn text @click="onClickSaveButton">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "CpuCu",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    mode: {
      type: String,
      default: "C",
    },
    cpu: {
      type: Object,
      default: () => {
        return {
          name: "",
          manufacturer: "",
          socket: "",
          coreNum: 0,
          threadNum: 0,
          baseFrequency: 0,
          turboFrequency: 0,
          cache: 0,
          tdp: 0,
          memoryType: "",
          memoryFrequency: 0,
          process: 0,
          graphics: "",
          price: 0,
          img: "",
        };
      },
    },
  },
  data() {
    return {
      urlImg: "",
      url: {
        cpu: "http://localhost:3000/cpu/",
        cpuImg: "http://localhost:3000/public/cpu/",
        cpuUploadImg: "http://localhost:3000/cpu/upload/",
      },
      valid: false,
      textRules: [
        (v) => !!v || "This field is required",
        (v) =>
          v.length <= 50 ||
          "This field must be equal or less than 50 characters",
      ],
      numberRules: [
        (v) => !!v || "This field is required",
        (v) =>
          (v <= 66536 && v > 0) || "This field must be between 0 and 66536",
      ],
    };
  },
  methods: {
    onClickCancelButton() {
      this.$emit("close");
    },
    onClickSaveButton() {
      if (this.$refs.form.validate()) {
        let formData = new FormData();
        formData.append("img", this.cpu.img);
        this.$http.post(this.url.cpuUploadImg, formData).then((res) => {
          let body = {
            name: this.cpu.name,
            manufacturer: this.cpu.manufacturer,
            socket: this.cpu.socket,
            core_num: this.cpu.coreNum,
            thread_num: this.cpu.threadNum,
            base_frequency: this.cpu.baseFrequency,
            turbo_frequency: this.cpu.turboFrequency,
            cache: this.cpu.cache,
            tdp: this.cpu.tdp,
            memory_type: this.cpu.memoryType,
            memory_frequency: this.cpu.memoryFrequency,
            process: this.cpu.process,
            graphics: this.cpu.graphics,
            price: this.cpu.price,
            img: res.data.filename,
          };
          this.$http
            .post(this.url.cpu, body)
            .then((res) => {
              this.$emit("close");
              this.$emit("search");
            })
            .catch((err) => {
              this.$http.delete(this.url.cpuUploadImg, res.data.filename);
            });
        });
      }
    },
    onImageChange(img) {
      if (img) {
        this.cpu.img = img;
        this.urlImg = URL.createObjectURL(img);
      }
    },
    onImageClear() {
      this.cpu.img = "";
      this.urlImg = "";
    },
  },
};
</script>
<style scoped>
.cpu-cu-dialog__image-preview {
  min-height: 200px;
}
</style>