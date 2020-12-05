<template>
  <v-dialog v-model="visible" persistent class="gpu-cu-dialog">
    <v-card>
      <v-card-title v-if="mode === 'C'">
        <v-icon>mdi-database-plus-outline</v-icon>&nbsp;
        {{ $t("gpu.add_gpu") }}
      </v-card-title>
      <v-card-title v-if="mode === 'U'">
        <v-icon>mdi-database-edit-outline</v-icon>&nbsp;
        {{ $t("gpu.edit_gpu") }}
      </v-card-title>
      <v-form v-model="valid" ref="form">
        <v-container class="pl-8 pr-8">
          <v-row>
            <v-col md="12">
              <v-text-field
                dense
                v-model="gpu.name"
                placeholder=" "
                :label="$t('gpu.name')"
                :rules="validationRules.textRequiredRules"
                :counter="50"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="4">
              <v-text-field
                dense
                v-model="gpu.mfr"
                placeholder=" "
                :label="$t('gpu.mfr')"
                :rules="validationRules.textRequiredRules"
                :counter="50"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
            <v-col md="4">
              <v-text-field
                dense
                v-model="gpu.engineMfr"
                placeholder=" "
                :label="$t('gpu.engine_mfr')"
                :rules="validationRules.textRequiredRules"
                :counter="50"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
            <v-col md="4">
              <v-text-field
                dense
                v-model="gpu.engineName"
                placeholder=" "
                :label="$t('gpu.engine_name')"
                :rules="validationRules.textRequiredRules"
                :counter="50"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="4">
              <v-text-field
                dense
                v-model="gpu.coreSpeed"
                placeholder=" "
                type="number"
                suffix="MHz"
                :rules="validationRules.numberRules"
                :label="$t('gpu.core_speed')"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
            <v-col md="4">
              <v-text-field
                dense
                v-model="gpu.boostSpeed"
                placeholder=" "
                type="number"
                suffix="MHz"
                :rules="validationRules.numberRules"
                :label="$t('gpu.boost_speed')"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
            <v-col md="4">
              <v-text-field
                dense
                v-model="gpu.cudaCore"
                placeholder=" "
                type="number"
                :label="$t('gpu.cuda_core')"
                :rules="validationRules.numberRules"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="6">
              <v-select
                dense
                v-model="gpu.memoryType"
                placeholder=" "
                :items="gpuMemoryTypeList"
                :label="$t('gpu.memory_type')"
                :rules="validationRules.requiredRules"
                :disabled="!isEditable"
              ></v-select>
            </v-col>
            <v-col md="6">
              <v-text-field
                dense
                v-model="gpu.memorySize"
                placeholder=" "
                type="number"
                suffix="GB"
                :rules="validationRules.numberRequiredRules"
                :label="$t('gpu.memory_size')"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="6">
              <v-text-field
                dense
                v-model="gpu.memoryInterface"
                placeholder=" "
                type="number"
                :label="$t('gpu.memory_interface')"
                :rules="validationRules.numberRules"
                suffix="bit"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
            <v-col md="6">
              <v-text-field
                dense
                v-model="gpu.memoryFreq"
                placeholder=" "
                type="number"
                :rules="validationRules.numberRules"
                :label="$t('gpu.memory_freq')"
                suffix="MHz"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="3">
              <v-text-field
                dense
                v-model="gpu.dpPortNum"
                placeholder=" "
                type="number"
                :label="$t('gpu.dp_port_num')"
                :rules="validationRules.numberRules"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
            <v-col md="3">
              <v-text-field
                dense
                v-model="gpu.hdmiPortNum"
                placeholder=" "
                type="number"
                :label="$t('gpu.hdmi_port_num')"
                :rules="validationRules.numberRules"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
            <v-col md="3">
              <v-text-field
                dense
                v-model="gpu.dviPortNum"
                placeholder=" "
                type="number"
                :label="$t('gpu.dvi_port_num')"
                :rules="validationRules.numberRules"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
            <v-col md="3">
              <v-text-field
                dense
                v-model="gpu.vgaPortNum"
                placeholder=" "
                type="number"
                :label="$t('gpu.vga_port_num')"
                :rules="validationRules.numberRules"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="6">
              <v-text-field
                dense
                v-model="gpu.tdp"
                placeholder=" "
                type="number"
                :label="$t('gpu.tdp')"
                :rules="validationRules.numberRules"
                suffix="W"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
            <v-col md="6">
              <v-text-field
                dense
                v-model="gpu.psuWattage"
                placeholder=" "
                type="number"
                :label="$t('gpu.psu_wattage')"
                :rules="validationRules.numberRules"
                suffix="W"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row> </v-row>
          <v-row>
            <v-col md="12">
              <v-text-field
                dense
                v-model="gpu.price"
                placeholder=" "
                type="number"
                :label="$t('gpu.price')"
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
                  class="gpu-cu-dialog__image-preview"
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
              @click="onClickAcceptDeleteButton(gpu.id)"
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
  name: "GpuCu",
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
    originalGpu: {
      type: Object,
      default: () => {
        return {
          id: 0,
          name: "",
          mfr: "",
          engineMfr: "",
          engineName: "",
          coreSpeed: null,
          boostSpeed: null,
          memorySize: null,
          memoryType: "",
          memoryFreq: null,
          memoryInterface: null,
          cudaCore: null,
          dpPortNum: null,
          hdmiPortNum: null,
          dviPortNum: null,
          vgaPortNum: null,
          tdp: null,
          psuWattage: null,
          price: null,
          img: "",
        };
      },
    },
  },
  data() {
    return {
      isEditable: false,
      gpu: {},
      gpuMemoryTypeList: [
        "DDR3",
        "GDDR3",
        "GDDR5",
        "GDDR5X",
        "GDDR6",
        "GDDR6X",
        "HBM",
        "HBM2",
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
    this.gpu = { ...this.originalGpu };
    this.originalUrlImg = this.gpu.img
      ? `${this.url.gpuImg}/${this.gpu.img}`
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
      this.$http.delete(`${this.url.gpu}/${id}`).then(() => {
        this.$http.delete(this.url.gpuUploadImg, {
          data: [this.gpu.img],
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
        this.gpu = { ...this.originalGpu };
        this.urlImg = this.originalUrlImg;
      } else {
        this.$emit("close");
      }
    },
    onClickCancelButton() {
      if (!this.compareObjects(this.originalGpu, this.gpu)) {
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
          name: this.gpu.name || null,
          mfr: this.gpu.mfr || null,
          engine_mfr: this.gpu.engineMfr || null,
          engine_name: this.gpu.engineName || null,
          core_speed: this.gpu.coreSpeed || null,
          boost_speed: this.gpu.boostSpeed || null,
          memory_size: this.gpu.memorySize || null,
          memory_type: this.gpu.memoryType || null,
          memory_freq: this.gpu.memoryFreq || null,
          memory_interface: this.gpu.memoryInterface || null,
          cuda_core: this.gpu.cudaCore || null,
          dp_port_num: this.gpu.dpPortNum || null,
          hdmi_port_num: this.gpu.hdmiPortNum || null,
          dvi_port_num: this.gpu.dviPortNum || null,
          vga_port_num: this.gpu.vgaPortNum || null,
          tdp: this.gpu.tdp || null,
          psu_wattage: this.gpu.psuWattage || null,
          price: this.gpu.price || null,
        };
        if (this.gpu.imgFile) {
          let formData = new FormData();
          formData.append("img", this.gpu.imgFile);
          await this.$http.post(this.url.gpuUploadImg, formData).then((res) => {
            body.img = res.data.filename;
          });
        }
        if (this.mode === "C") {
          this.$http
            .post(this.url.gpu, body)
            .then((res) => {
              this.$emit("close");
              this.$emit("search");
            })
            .catch((err) => {
              this.$http.delete(this.url.gpuUploadImg, { data: [body.img] });
            });
        } else if (this.mode === "U") {
          this.$http
            .put(`${this.url.gpu}/${this.gpu.id}`, body)
            .then((res) => {
              if (this.gpu.imgFile) {
                this.$http.delete(this.url.gpuUploadImg, {
                  data: [this.gpu.img],
                });
              }
              this.$emit("close");
              this.$emit("search");
            })
            .catch((err) => {
              this.$http.delete(this.url.gpuUploadImg, { data: [body.img] });
            });
        }
      }
    },
    onImageChange(img) {
      if (img) {
        this.gpu.imgFile = img;
        this.setUrlImg(img);
      }
    },
    setUrlImg(img) {
      this.urlImg = URL.createObjectURL(img);
    },
    onImageClear() {
      this.gpu.imgFile = "";
      this.urlImg = "";
    },
  },
};
</script>
<style scoped>
.gpu-cu-dialog__image-preview {
  height: 250px;
}
</style>