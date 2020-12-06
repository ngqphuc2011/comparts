<template>
  <v-dialog v-model="visible" persistent class="ram-cu-dialog">
    <v-card>
      <v-card-title v-if="mode === 'C'">
        <v-icon>mdi-database-plus-outline</v-icon>&nbsp;
        {{ $t("ram.add_ram") }}
      </v-card-title>
      <v-card-title v-if="mode === 'U'">
        <v-icon>mdi-database-edit-outline</v-icon>&nbsp;
        {{ $t("ram.edit_ram") }}
      </v-card-title>
      <v-form v-model="valid" ref="form">
        <v-container class="pl-8 pr-8">
          <v-row>
            <v-col md="6">
              <v-text-field
                dense
                v-model="ram.name"
                placeholder=" "
                :label="$t('ram.name')"
                :rules="validationRules.textRequiredRules"
                :counter="50"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
            <v-col md="6">
              <v-text-field
                dense
                v-model="ram.model"
                placeholder=" "
                :label="$t('ram.model')"
                :rules="validationRules.textRules"
                :counter="50"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="4">
              <v-text-field
                dense
                v-model="ram.mfr"
                placeholder=" "
                :label="$t('ram.mfr')"
                :rules="validationRules.textRequiredRules"
                :counter="50"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
            <v-col md="4">
              <v-text-field
                dense
                v-model="ram.capacity"
                placeholder=" "
                type="number"
                :label="$t('ram.capacity')"
                :rules="validationRules.numberRequiredRules"
                suffix="GB"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
            <v-col md="4">
              <v-text-field
                dense
                v-model="ram.memoryFreq"
                placeholder=" "
                type="number"
                :rules="validationRules.numberRequiredRules"
                suffix="MHz"
                :label="$t('ram.memory_freq')"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="6">
              <v-select
                dense
                v-model="ram.memoryType"
                placeholder=" "
                :items="ramMemoryTypeList"
                :label="$t('ram.memory_type')"
                :rules="validationRules.requiredRules"
                :disabled="!isEditable"
              >
              </v-select>
            </v-col>
            <v-col md="6">
              <v-select
                dense
                v-model="ram.ecc"
                placeholder=" "
                :items="ramEccList"
                :label="$t('ram.ecc')"
                :rules="validationRules.requiredRules"
                :disabled="!isEditable"
              >
              </v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="4">
              <v-text-field
                dense
                v-model="ram.casLatency"
                placeholder=" "
                type="number"
                :rules="validationRules.numberRules"
                :label="$t('ram.cas_latency')"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
            <v-col md="4">
              <v-text-field
                dense
                v-model="ram.voltage"
                placeholder=" "
                type="number"
                :rules="validationRules.numberRules"
                :label="$t('ram.voltage')"
                suffix="V"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
            <v-col md="4">
              <v-text-field
                dense
                v-model="ram.stickNum"
                placeholder=" "
                type="number"
                :rules="validationRules.numberRules"
                :label="$t('ram.stick_num')"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="12">
              <v-text-field
                dense
                v-model="ram.price"
                placeholder=" "
                type="number"
                :label="$t('ram.price')"
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
                  class="ram-cu-dialog__image-preview"
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
              @click="onClickAcceptDeleteButton(ram.id)"
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
  name: "RamCu",
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
    originalRam: {
      type: Object,
      default: () => {
        return {
          id: 0,
          name: "",
          model: "",
          mfr: "",
          capacity: null,
          stickNum: null,
          ecc: "",
          memoryType: "",
          memoryFreq: null,
          casLatency: null,
          voltage: null,
          price: null,
          img: "",
        };
      },
    },
  },
  data() {
    return {
      isEditable: false,
      ram: {},
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
    this.ram = { ...this.originalRam };
    this.originalUrlImg = this.ram.img
      ? `${this.url.ramImg}/${this.ram.img}`
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
      this.$http.delete(`${this.url.ram}/${id}`).then(() => {
        this.$http.delete(this.url.ramUploadImg, {
          data: [this.ram.img],
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
        this.ram = { ...this.originalRam };
        this.urlImg = this.originalUrlImg;
      } else {
        this.$emit("close");
      }
    },
    onClickCancelButton() {
      if (!this.compareObjects(this.originalRam, this.ram)) {
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
          name: this.ram.name || null,
          model: this.ram.model || null,
          mfr: this.ram.mfr || null,
          capacity: this.ram.capacity || null,
          stick_num: this.ram.stickNum || null,
          ecc: this.ram.ecc || null,
          memory_type: this.ram.memoryType || null,
          memory_freq: this.ram.memoryFreq || null,
          cas_latency: this.ram.casLatency || null,
          voltage: this.ram.voltage || null,
          price: this.ram.price || null,
        };
        if (this.ram.imgFile) {
          let formData = new FormData();
          formData.append("img", this.ram.imgFile);
          await this.$http.post(this.url.ramUploadImg, formData).then((res) => {
            body.img = res.data.filename;
          });
        }
        if (this.mode === "C") {
          this.$http
            .post(this.url.ram, body)
            .then((res) => {
              this.$emit("close");
              this.$emit("search");
            })
            .catch((err) => {
              this.$http.delete(this.url.ramUploadImg, { data: [body.img] });
            });
        } else if (this.mode === "U") {
          this.$http
            .put(`${this.url.ram}/${this.ram.id}`, body)
            .then((res) => {
              if (this.ram.imgFile) {
                this.$http.delete(this.url.ramUploadImg, {
                  data: [this.ram.img],
                });
              }
              this.$emit("close");
              this.$emit("search");
            })
            .catch((err) => {
              this.$http.delete(this.url.ramUploadImg, { data: [body.img] });
            });
        }
      }
    },
    onImageChange(img) {
      if (img) {
        this.ram.imgFile = img;
        this.setUrlImg(img);
      }
    },
    setUrlImg(img) {
      this.urlImg = URL.createObjectURL(img);
    },
    onImageClear() {
      this.ram.imgFile = "";
      this.urlImg = "";
    },
  },
};
</script>
<style scoped>
.ram-cu-dialog__image-preview {
  height: 250px;
}
</style>