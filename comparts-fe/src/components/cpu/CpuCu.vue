<template>
  <v-dialog v-model="visible" persistent class="cpu-cu-dialog">
    <v-card>
      <v-card-title v-if="mode === 'C'">
        <v-icon>mdi-database-plus-outline</v-icon>&nbsp;
        {{ $t("cpu.add_cpu") }}
      </v-card-title>
      <v-card-title v-if="mode === 'U'">
        <v-icon>mdi-database-edit-outline</v-icon>&nbsp;
        {{ $t("cpu.edit_cpu") }}
      </v-card-title>
      <v-form v-model="valid" ref="form">
        <v-container class="pl-8 pr-8">
          <v-row>
            <v-col md="12">
              <v-text-field
                dense
                v-model="cpu.name"
                placeholder=" "
                :label="$t('cpu.name')"
                :rules="validationRules.textRequiredRules"
                :counter="50"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="6">
              <v-text-field
                dense
                v-model="cpu.mfr"
                placeholder=" "
                :label="$t('cpu.mfr')"
                :rules="validationRules.textRequiredRules"
                :counter="50"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
            <v-col md="6">
              <v-text-field
                dense
                v-model="cpu.graphics"
                placeholder=" "
                :label="$t('cpu.graphics')"
                :rules="validationRules.textRules"
                :counter="50"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="6">
              <v-text-field
                dense
                v-model="cpu.socket"
                placeholder=" "
                :label="$t('cpu.socket')"
                :rules="validationRules.textRequiredRules"
                :counter="50"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
            <v-col md="6">
              <v-text-field
                dense
                v-model="cpu.process"
                placeholder=" "
                type="number"
                suffix="nm"
                :rules="validationRules.numberRules"
                :label="$t('cpu.process')"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="4">
              <v-text-field
                dense
                v-model="cpu.coreNum"
                placeholder=" "
                type="number"
                :rules="validationRules.numberRequiredRules"
                :label="$t('cpu.core_num')"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
            <v-col md="4">
              <v-text-field
                dense
                v-model="cpu.threadNum"
                placeholder=" "
                type="number"
                :rules="validationRules.numberRequiredRules"
                :label="$t('cpu.thread_num')"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
            <v-col md="4">
              <v-text-field
                dense
                v-model="cpu.cache"
                placeholder=" "
                type="number"
                :label="$t('cpu.cache')"
                :rules="validationRules.numberRules"
                suffix="MB"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="4">
              <v-text-field
                dense
                v-model="cpu.baseFreq"
                placeholder=" "
                type="number"
                :label="$t('cpu.base_freq')"
                :rules="validationRules.numberRequiredRules"
                suffix="GHz"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
            <v-col md="4">
              <v-text-field
                dense
                v-model="cpu.turboFreq"
                placeholder=" "
                type="number"
                :label="$t('cpu.turbo_freq')"
                :rules="validationRules.numberRules"
                suffix="GHz"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
            <v-col md="4">
              <v-text-field
                dense
                v-model="cpu.tdp"
                placeholder=" "
                type="number"
                :label="$t('cpu.tdp')"
                :rules="validationRules.numberRules"
                suffix="W"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="6">
              <v-select
                dense
                v-model="cpu.memoryType"
                placeholder=" "
                :items="ramMemoryTypeList"
                :label="$t('cpu.memory_type')"
                :rules="validationRules.requiredRules"
                :disabled="!isEditable"
              ></v-select>
            </v-col>
            <v-col md="6">
              <v-text-field
                dense
                v-model="cpu.memoryFreq"
                placeholder=" "
                type="number"
                :rules="validationRules.numberRules"
                :label="$t('cpu.memory_freq')"
                suffix="MHz"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="12">
              <v-text-field
                dense
                v-model="cpu.price"
                placeholder=" "
                type="number"
                :label="$t('cpu.price')"
                prefix="₫"
                :rules="validationRules.intRules"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-card class="pa-4">
                <v-img
                  contain
                  height="150"
                  class="cpu-cu-dialog__image-preview"
                  :src="urlImg"
                >
                  <v-file-input
                    dense
                    hide-input
                    prepend-icon="mdi-camera"
                    accept="image/*"
                    :label="$t('common.image')"
                    @change="onImageChange"
                    @click:clear="onImageClear"
                    :disabled="!isEditable"
                  >
                  </v-file-input>
                </v-img>
              </v-card>
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
          <v-card-title>{{ $t("common.confirm") }}</v-card-title>
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
          <v-card-title>{{ $t("common.confirm") }}</v-card-title>
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
import UrlPathMixins from "../mixins//UrlPathMixins";
import ValidateMixins from "../mixins/ValidateMixins";
import UtilsMixins from "../mixins/UtilsMixins";

export default {
  name: "CpuCu",
  mixins: [UrlPathMixins, ValidateMixins, UtilsMixins],
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
          baseFreq: null,
          turboFreq: null,
          cache: null,
          tdp: null,
          memoryType: "",
          memoryFreq: null,
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
      urlImg: "",
      originalUrlImg: "",
      valid: false,
      deleteConfirmDialog: false,
      discardConfirmDialog: false,
    };
  },
  created() {
    if (this.mode === "C") {
      this.isEditable = true;
    }
    this.cpu = { ...this.originalCpu };
    this.originalUrlImg = this.cpu.img
      ? `${this.url.cpuImg}/${this.cpu.img}`
      : "";
    this.urlImg = this.originalUrlImg;
  },
  methods: {
    onClickModifyButton() {
      this.isEditable = true;
    },
    onClickCancelDeleteButton() {
      this.deleteConfirmDialog = false;
    },
    onClickAcceptDeleteButton(id) {
      this.$http.delete(`${this.url.cpu}/${id}`).then(() => {
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
        this.urlImg = this.originalUrlImg;
      } else {
        this.$emit("close");
      }
    },
    onClickCancelButton() {
      if (!this.compareObjects(this.originalCpu, this.cpu)) {
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
          name: this.cpu.name || null,
          mfr: this.cpu.mfr || null,
          socket: this.cpu.socket || null,
          core_num: this.cpu.coreNum || null,
          thread_num: this.cpu.threadNum || null,
          base_freq: this.cpu.baseFreq || null,
          turbo_freq: this.cpu.turboFreq || null,
          cache: this.cpu.cache || null,
          tdp: this.cpu.tdp || null,
          memory_type: this.cpu.memoryType,
          memory_freq: this.cpu.memoryFreq || null,
          process: this.cpu.process || null,
          graphics: this.cpu.graphics || null,
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
            .put(`${this.url.cpu}/${this.cpu.id}`, body)
            .then((res) => {
              if (this.cpu.imgFile) {
                this.$http.delete(this.url.cpuUploadImg, {
                  data: [this.cpu.img],
                });
              }
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
  height: 250px;
}
</style>