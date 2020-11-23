<template>
  <v-dialog v-model="visible" max-width="50%" persistent class="cpu-cu-dialog">
    <v-card>
      <v-card-title v-if="mode === 'C'" class="headline">Add CPU</v-card-title>
      <v-card-title v-if="mode === 'U'" class="headline">Edit CPU</v-card-title>
      <v-form v-model="valid" ref="form">
        <v-container class="pl-8 pr-8">
          <v-row>
            <v-col>
              <v-text-field
                dense
                v-model="cpu.name"
                label="Name"
                :rules="validationRules.textRequiredRules"
                :counter="50"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                dense
                v-model="cpu.manufacturer"
                label="Manufacturer"
                :rules="validationRules.textRequiredRules"
                :counter="50"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                dense
                v-model="cpu.graphics"
                label="Graphics"
                :rules="validationRules.textRules"
                :counter="50"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                dense
                v-model="cpu.socket"
                label="Socket"
                :rules="validationRules.textRequiredRules"
                :counter="50"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                dense
                v-model="cpu.process"
                type="number"
                suffix="nm"
                :rules="validationRules.numberRules"
                label="Process"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                dense
                v-model="cpu.coreNum"
                type="number"
                :rules="validationRules.numberRequiredRules"
                label="Number of Cores"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                dense
                v-model="cpu.threadNum"
                type="number"
                :rules="validationRules.numberRequiredRules"
                label="Number of Threads"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                dense
                v-model="cpu.baseFrequency"
                type="number"
                label="Base Frequency"
                :rules="validationRules.numberRequiredRules"
                suffix="MHz"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                dense
                v-model="cpu.turboFrequency"
                type="number"
                label="Turbo Frequency"
                :rules="validationRules.numberRules"
                suffix="MHz"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                dense
                v-model="cpu.cache"
                type="number"
                label="Cache"
                :rules="validationRules.numberRules"
                suffix="MB"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                dense
                v-model="cpu.tdp"
                type="number"
                label="TDP"
                :rules="validationRules.numberRules"
                suffix="W"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                dense
                v-model="cpu.memoryType"
                :rules="validationRules.textRules"
                label="Memory Type"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                dense
                v-model="cpu.memoryFrequency"
                type="number"
                :rules="validationRules.numberRules"
                label="Memory Frequency"
                suffix="MHz"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                dense
                v-model="cpu.price"
                type="number"
                label="Price"
                prefix="₫"
                :rules="validationRules.intRules"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
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
            <v-col>
              <v-file-input
                prepend-icon="mdi-camera"
                accept="image/*"
                label="Image"
                @change="onImageChange"
                @click:clear="onImageClear"
                :disabled="!isEditable"
              ></v-file-input>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
      <v-card-actions>
        <v-btn
          v-if="mode === 'U'"
          color="error"
          @click="onClickDeleteButton"
          text
          >Delete</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn v-if="isEditable" text @click="onClickCancelButton"
          >Cancel</v-btn
        >

        <v-btn v-if="!isEditable" text @click="onClickCancelDetailButton"
          >Cancel</v-btn
        >
        <v-btn
          color="primary"
          v-if="!isEditable"
          text
          @click="onClickModifyButton"
          >Modify</v-btn
        >
        <v-btn color="primary" v-if="isEditable" text @click="onClickSaveButton"
          >Save</v-btn
        >
      </v-card-actions>
      <v-dialog v-model="discardConfirmDialog" persistent max-width="250">
        <v-card>
          <v-card-title class="headline">Confirm</v-card-title>
          <v-card-text>Unsaved changes will be lost. Are you sure?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="onClickCancelDiscardButton">Cancel</v-btn>
            <v-btn color="error" text @click="onClickAcceptDiscardButton"
              >Discard</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog
        v-if="mode === 'U'"
        v-model="deleteConfirmDialog"
        persistent
        max-width="250"
      >
        <v-card>
          <v-card-title class="headline">Confirm</v-card-title>
          <v-card-text>Are you sure to delete this item?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="onClickCancelDeleteButton">Cancel</v-btn>
            <v-btn color="error" text @click="onClickAcceptDeleteButton(cpu.id)"
              >Delete</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
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
    originalCpu: {
      type: Object,
      default: () => {
        return {
          id: 0,
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
      isEditable: false,
      cpu: {},
      urlImg: "",
      url: {
        cpu: "http://localhost:3000/cpus/",
        cpuImg: "http://localhost:3000/public/cpus/",
        cpuUploadImg: "http://localhost:3000/cpus/upload/",
      },
      validationRules: {
        textRequiredRules: [
          (v) => !!v || "This field is required",
          (v) =>
            v.length <= 50 ||
            "This field must be equal or less than 50 characters",
        ],
        textRules: [
          (v) =>
            v.length <= 50 ||
            "This field must be equal or less than 50 characters",
        ],
        numberRequiredRules: [
          (v) => !!v || "This field is required",
          (v) =>
            (v <= 66536 && v > 0) || "This field must be between 0 and 66,536",
        ],
        numberRules: [
          (v) =>
            (v <= 66536 && v > 0) || "This field must be between 0 and 66,536",
        ],
        intRules: [
          (v) =>
            v <= 2147483647 ||
            "This field must be equal or less than 2,147,483,647",
        ],
      },
      valid: false,
      deleteConfirmDialog: false,
      discardConfirmDialog: false,
    };
  },
  computed: {
    isEdited() {
      return JSON.stringify(this.originalCpu) !== JSON.stringify(this.cpu);
    },
  },
  created() {
    if (this.mode === "C") {
      this.isEditable = true;
    }
    this.cpu = { ...this.originalCpu };
    this.urlImg = this.url.cpuImg + this.cpu.img;
  },
  methods: {
    onClickModifyButton() {
      this.isEditable = true;
    },
    onClickCancelDeleteButton() {
      this.deleteConfirmDialog = false;
    },
    onClickAcceptDeleteButton(id) {
      this.$http.delete(this.url.cpu + id).then(() => {
        this.deleteConfirmDialog = false;
        this.$emit("close");
        this.$emit("search");
      });
    },
    onClickDeleteButton() {
      this.deleteConfirmDialog = true;
    },
    onClickCancelDiscardButton() {
      this.discardConfirmDialog = false;
    },
    onClickAcceptDiscardButton() {
      if (this.mode === "U") {
        this.isEditable = false;
        this.discardConfirmDialog = false;
        this.cpu = { ...this.originalCpu };
      } else {
        this.$emit("close");
      }
    },
    onClickCancelButton() {
      if (this.isEdited) {
        this.discardConfirmDialog = true;
      } else {
        this.onClickAcceptDiscardButton();
      }
    },
    onClickCancelDetailButton() {
      this.$emit("close");
    },
    onClickSaveButton() {
      if (this.$refs.form.validate()) {
        if (this.mode === "C") {
          let formData = new FormData();
          formData.append("img", this.cpu.imgFile);
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
                this.$http.delete(this.url.cpuUploadImg, res.data.filename);

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
        } else if (this.mode === "U") {
          let formData = new FormData();
          formData.append("img", this.cpu.imgFile);
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
              .put(this.url.cpu + this.cpu.id, body)
              .then((res) => {
                this.$emit("close");
                this.$emit("search");
              })
              .catch((err) => {
                this.$http.delete(this.url.cpuUploadImg, res.data.filename);
              });
          });
        }
      }
    },
    onImageChange(img) {
      if (img) {
        this.cpu.imgFile = img;
        this.setUrlImg(img);
      }
    },
    setUrlImg(img) {
      this.urlImg = URL.createObjectURL(img);
    },
    onImageClear() {
      this.cpu.imgFile = "";
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