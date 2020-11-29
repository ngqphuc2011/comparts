<template>
  <v-dialog v-model="visible" max-width="50%" persistent class="cpu-cu-dialog">
    <v-card>
      <v-card-title v-if="mode === 'C'" class="headline">
        {{ $t("cpu.add_cpu") }}
      </v-card-title>
      <v-card-title v-if="mode === 'U'" class="headline">
        {{ $t("cpu.edit_cpu") }}
      </v-card-title>
      <v-form v-model="valid" ref="form">
        <v-container class="pl-8 pr-8">
          <v-row>
            <v-col>
              <v-text-field
                dense
                v-model="cpu.name"
                :label="$t('cpu.name')"
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
                v-model="cpu.mfr"
                :label="$t('cpu.mfr')"
                :rules="validationRules.textRequiredRules"
                :counter="50"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                dense
                v-model="cpu.graphics"
                :label="$t('cpu.graphics')"
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
                :label="$t('cpu.socket')"
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
                :label="$t('cpu.process')"
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
                :label="$t('cpu.core_num')"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                dense
                v-model="cpu.threadNum"
                type="number"
                :rules="validationRules.numberRequiredRules"
                :label="$t('cpu.thread_num')"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                dense
                v-model="cpu.baseFrequency"
                type="number"
                :label="$t('cpu.base_freq')"
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
                :label="$t('cpu.turbo_freq')"
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
                :label="$t('cpu.cache')"
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
                :label="$t('cpu.tdp')"
                :rules="validationRules.numberRules"
                suffix="W"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-select
                dense
                v-model="cpu.memoryType"
                :items="cpuMemoryTypeList"
                :label="$t('cpu.memory_type')"
                :disabled="!isEditable"
              ></v-select>
            </v-col>
            <v-col>
              <v-text-field
                dense
                v-model="cpu.memoryFrequency"
                type="number"
                :rules="validationRules.numberRules"
                :label="$t('cpu.memory_freq')"
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
                :label="$t('cpu.price')"
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
                :label="$t('common.image')"
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
        >
          {{ $t("common.delete") }}
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn v-if="isEditable" text @click="onClickCancelButton">
          {{ $t("common.cancel") }}
        </v-btn>
        <v-btn v-if="!isEditable" text @click="onClickCancelDetailButton">
          {{ $t("common.cancel") }}
        </v-btn>
        <v-btn
          color="primary"
          v-if="!isEditable"
          text
          @click="onClickModifyButton"
        >
          {{ $t("common.modify") }}
        </v-btn>
        <v-btn color="primary" v-if="isEditable" text @click="onClickSaveButton"
          >{{ $t("common.save") }}
        </v-btn>
      </v-card-actions>
      <v-dialog v-model="discardConfirmDialog" persistent max-width="250">
        <v-card>
          <v-card-title class="headline">{{
            $t("common.confirm")
          }}</v-card-title>
          <v-card-text>{{ $t("message.discard_msg") }}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="onClickCancelDiscardButton">
              {{ $t("common.cancel") }}
            </v-btn>
            <v-btn color="error" text @click="onClickAcceptDiscardButton">
              {{ $t("common.discard") }}
            </v-btn>
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
          <v-card-title class="headline">{{
            $t("common.confirm")
          }}</v-card-title>
          <v-card-text>{{ $t("message.delete_msg") }}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="onClickCancelDeleteButton">
              {{ $t("common.cancel") }}
            </v-btn>
            <v-btn
              color="error"
              text
              @click="onClickAcceptDeleteButton(cpu.id)"
            >
              {{ $t("common.delete") }}
            </v-btn>
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
          mfr: "",
          socket: "",
          coreNum: null,
          threadNum: null,
          baseFrequency: null,
          turboFrequency: null,
          cache: null,
          tdp: null,
          memoryType: "DDR4",
          memoryFrequency: null,
          process: null,
          graphics: "",
          price: null,
          img: "",
        };
      },
    },
  },
  data() {
    return {
      isEditable: false,
      cpu: {},
      cpuMemoryTypeList: ["DDR2", "DDR3", "DDR4"],
      urlImg: "",
      url: {
        cpu: "http://localhost:3000/cpu/",
        cpuImg: "http://localhost:3000/public/cpu/",
        cpuUploadImg: "http://localhost:3000/cpu/upload/",
      },
      validationRules: {
        requireRules: [(v) => !!v || this.$t("message.required_rule_msg")],
        textRequiredRules: [
          (v) => !!v || this.$t("message.required_rule_msg"),
          (v) => v.length <= 50 || this.$t("message.text_rule_msg"),
        ],
        textRules: [(v) => v.length <= 50 || this.$t("message.text_rule_msg")],
        numberRequiredRules: [
          (v) => !!v || this.$t("message.required_rule_msg"),
          (v) => (v <= 65536 && v > 0) || this.$t("message.number_rule_msg"),
        ],
        numberRules: [
          (v) =>
            (v <= 65536 && v > 0) ||
            v == "" ||
            v == null ||
            this.$t("message.number_rule_msg"),
        ],
        intRules: [
          (v) =>
            (v <= 2147483647 && v > 0) ||
            v == "" ||
            v == null ||
            this.$t("message.int_rule_msg"),
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
        this.$http.delete(this.url.cpuUploadImg, {
          data: [this.cpu.img],
        });
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
    async onClickSaveButton() {
      if (this.$refs.form.validate()) {
        let body = {
          name: this.cpu.name,
          mfr: this.cpu.mfr,
          socket: this.cpu.socket,
          core_num: this.cpu.coreNum,
          thread_num: this.cpu.threadNum,
          base_freq: this.cpu.baseFrequency,
          turbo_freq: this.cpu.turboFrequency || null,
          cache: this.cpu.cache || null,
          tdp: this.cpu.tdp || null,
          memory_type: this.cpu.memoryType,
          memory_freq: this.cpu.memoryFrequency,
          process: this.cpu.process || null,
          graphics: this.cpu.graphics,
          price: this.cpu.price || null,
        };
        if (this.cpu.imgFile) {
          let formData = new FormData();
          formData.append("img", this.cpu.imgFile);
          await this.$http.post(this.url.cpuUploadImg, formData).then((res) => {
            body.img = res.data.filename;
          });
        }
        if (this.mode === "C") {
          this.$http
            .post(this.url.cpu, body)
            .then((res) => {
              this.$emit("close");
              this.$emit("search");
            })
            .catch((err) => {
              this.$http.delete(this.url.cpuUploadImg, { data: [body.img] });
            });
        } else if (this.mode === "U") {
          this.$http
            .put(this.url.cpu + this.cpu.id, body)
            .then((res) => {
              this.$http.delete(this.url.cpuUploadImg, {
                data: [this.cpu.img],
              });
              this.$emit("close");
              this.$emit("search");
            })
            .catch((err) => {
              this.$http.delete(this.url.cpuUploadImg, { data: [body.img] });
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