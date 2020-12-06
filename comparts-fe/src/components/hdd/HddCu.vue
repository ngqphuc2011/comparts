<template>
  <v-dialog v-model="visible" persistent class="hdd-cu-dialog">
    <v-card>
      <v-card-title v-if="mode === 'C'">
        <v-icon>mdi-database-plus-outline</v-icon>&nbsp;
        {{ $t("hdd.add_hdd") }}
      </v-card-title>
      <v-card-title v-if="mode === 'U'">
        <v-icon>mdi-database-edit-outline</v-icon>&nbsp;
        {{ $t("hdd.edit_hdd") }}
      </v-card-title>
      <v-form v-model="valid" ref="form">
        <v-container class="pl-8 pr-8">
          <v-row>
            <v-col md="6">
              <v-text-field
                dense
                v-model="hdd.name"
                placeholder=" "
                :label="$t('hdd.name')"
                :rules="validationRules.textRequiredRules"
                :counter="50"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
            <v-col md="6">
              <v-text-field
                dense
                v-model="hdd.model"
                placeholder=" "
                :label="$t('hdd.model')"
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
                v-model="hdd.mfr"
                placeholder=" "
                :label="$t('hdd.mfr')"
                :rules="validationRules.textRequiredRules"
                :counter="50"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
            <v-col md="4">
              <v-text-field
                dense
                v-model="hdd.capacity"
                placeholder=" "
                type="number"
                :label="$t('hdd.capacity')"
                :rules="validationRules.numberRequiredRules"
                suffix="GB"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
            <v-col md="4">
              <v-text-field
                dense
                v-model="hdd.memoryFreq"
                placeholder=" "
                type="number"
                :rules="validationRules.numberRequiredRules"
                suffix="MHz"
                :label="$t('hdd.memory_freq')"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="6">
              <v-select
                dense
                v-model="hdd.memoryType"
                placeholder=" "
                :items="hddMemoryTypeList"
                :label="$t('hdd.memory_type')"
                :rules="validationRules.requiredRules"
                :disabled="!isEditable"
              >
              </v-select>
            </v-col>
            <v-col md="6">
              <v-select
                dense
                v-model="hdd.ecc"
                placeholder=" "
                :items="hddEccList"
                :label="$t('hdd.ecc')"
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
                v-model="hdd.casLatency"
                placeholder=" "
                type="number"
                :rules="validationRules.numberRules"
                :label="$t('hdd.cas_latency')"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
            <v-col md="4">
              <v-text-field
                dense
                v-model="hdd.voltage"
                placeholder=" "
                type="number"
                :rules="validationRules.numberRules"
                :label="$t('hdd.voltage')"
                suffix="V"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
            <v-col md="4">
              <v-text-field
                dense
                v-model="hdd.stickNum"
                placeholder=" "
                type="number"
                :rules="validationRules.numberRules"
                :label="$t('hdd.stick_num')"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="12">
              <v-text-field
                dense
                v-model="hdd.price"
                placeholder=" "
                type="number"
                :label="$t('hdd.price')"
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
                  class="hdd-cu-dialog__image-preview"
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
              @click="onClickAcceptDeleteButton(hdd.id)"
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
  name: "HddCu",
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
    originalHdd: {
      type: Object,
      default: () => {
        return {
          id: 0,
          name: "",
          model: "",
          mfr: "",
          capacity: null,
          stickNum: null,
          ecc: false,
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
      hdd: {},
      hddMemoryTypeList: ["DDR2", "DDR3", "DDR4"],
      hddEccList: [
        { text: "ECC", value: "ecc" },
        { text: "Non-ECC", value: "non-ecc" },
      ],
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
    this.hdd = { ...this.originalHdd };
    this.originalUrlImg = this.hdd.img
      ? `${this.url.hddImg}/${this.hdd.img}`
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
      this.$http.delete(`${this.url.hdd}/${id}`).then(() => {
        this.$http.delete(this.url.hddUploadImg, {
          data: [this.hdd.img],
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
        this.hdd = { ...this.originalHdd };
        this.urlImg = this.originalUrlImg;
      } else {
        this.$emit("close");
      }
    },
    onClickCancelButton() {
      if (!this.compareObjects(this.originalHdd, this.hdd)) {
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
          name: this.hdd.name || null,
          model: this.hdd.model || null,
          mfr: this.hdd.mfr || null,
          capacity: this.hdd.capacity || null,
          stick_num: this.hdd.stickNum || null,
          ecc: this.hdd.ecc || null,
          memory_type: this.hdd.memoryType || null,
          memory_freq: this.hdd.memoryFreq || null,
          cas_latency: this.hdd.casLatency || null,
          voltage: this.hdd.voltage || null,
          price: this.hdd.price || null,
        };
        if (this.hdd.imgFile) {
          let formData = new FormData();
          formData.append("img", this.hdd.imgFile);
          await this.$http.post(this.url.hddUploadImg, formData).then((res) => {
            body.img = res.data.filename;
          });
        }
        if (this.mode === "C") {
          this.$http
            .post(this.url.hdd, body)
            .then((res) => {
              this.$emit("close");
              this.$emit("search");
            })
            .catch((err) => {
              this.$http.delete(this.url.hddUploadImg, { data: [body.img] });
            });
        } else if (this.mode === "U") {
          this.$http
            .put(`${this.url.hdd}/${this.hdd.id}`, body)
            .then((res) => {
              if (this.hdd.imgFile) {
                this.$http.delete(this.url.hddUploadImg, {
                  data: [this.hdd.img],
                });
              }
              this.$emit("close");
              this.$emit("search");
            })
            .catch((err) => {
              this.$http.delete(this.url.hddUploadImg, { data: [body.img] });
            });
        }
      }
    },
    onImageChange(img) {
      if (img) {
        this.hdd.imgFile = img;
        this.setUrlImg(img);
      }
    },
    setUrlImg(img) {
      this.urlImg = URL.createObjectURL(img);
    },
    onImageClear() {
      this.hdd.imgFile = "";
      this.urlImg = "";
    },
  },
};
</script>
<style scoped>
.hdd-cu-dialog__image-preview {
  height: 250px;
}
</style>