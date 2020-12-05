<template>
  <v-dialog v-model="visible" persistent class="mobo-cu-dialog">
    <v-card>
      <v-card-title v-if="mode === 'C'">
        <v-icon>mdi-database-plus-outline</v-icon>&nbsp;
        {{ $t("mobo.add_mobo") }}
      </v-card-title>
      <v-card-title v-if="mode === 'U'">
        <v-icon>mdi-database-edit-outline</v-icon>&nbsp;
        {{ $t("mobo.edit_mobo") }}
      </v-card-title>
      <v-form v-model="valid" ref="form">
        <v-container class="pl-8 pr-8">
          <v-row>
            <v-col md="12">
              <v-text-field
                dense
                v-model="mobo.name"
                :label="$t('mobo.name')"
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
                v-model="mobo.mfr"
                :label="$t('mobo.mfr')"
                :rules="validationRules.textRequiredRules"
                :counter="50"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
            <v-col md="6">
              <v-text-field
                dense
                v-model="mobo.moboSize"
                :label="$t('mobo.mobo_size')"
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
                v-model="mobo.socket"
                :label="$t('mobo.socket')"
                :rules="validationRules.textRequiredRules"
                :counter="50"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
            <v-col md="6">
              <v-text-field
                dense
                v-model="mobo.chipset"
                :rules="validationRules.textRequiredRules"
                :counter="50"
                :label="$t('mobo.chipset')"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="3">
              <v-text-field
                dense
                v-model="mobo.pcieX16SlotNum"
                type="number"
                :rules="validationRules.numberRules"
                :label="$t('mobo.pcie_x16_slot_num')"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
            <v-col md="3">
              <v-text-field
                dense
                v-model="mobo.pcieX8SlotNum"
                type="number"
                :rules="validationRules.numberRules"
                :label="$t('mobo.pcie_x8_slot_num')"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
            <v-col md="3">
              <v-text-field
                dense
                v-model="mobo.pcieX4SlotNum"
                type="number"
                :rules="validationRules.numberRules"
                :label="$t('mobo.pcie_x4_slot_num')"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
            <v-col md="3">
              <v-text-field
                dense
                v-model="mobo.pcieX2SlotNum"
                type="number"
                :label="$t('mobo.pcie_x2_slot_num')"
                :rules="validationRules.numberRules"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="3">
              <v-text-field
                dense
                v-model="mobo.pcieX1SlotNum"
                type="number"
                :label="$t('mobo.pcie_x1_slot_num')"
                :rules="validationRules.numberRules"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
            <v-col md="3">
              <v-text-field
                dense
                v-model="mobo.sataSlotNum"
                type="number"
                :label="$t('mobo.sata_slot_num')"
                :rules="validationRules.numberRules"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
            <v-col md="3">
              <v-text-field
                dense
                v-model="mobo.m2SlotNum"
                type="number"
                :label="$t('mobo.m2_slot_num')"
                :rules="validationRules.numberRules"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
            <v-col md="3">
              <v-text-field
                dense
                v-model="mobo.memorySlotNum"
                type="number"
                :label="$t('mobo.memory_slot_num')"
                :rules="validationRules.numberRules"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="6">
              <v-select
                dense
                v-model="mobo.memoryType"
                :items="moboMemoryTypeList"
                :label="$t('mobo.memory_type')"
                :rules="validationRules.requiredRules"
                :disabled="!isEditable"
              ></v-select>
            </v-col>
            <v-col md="6">
              <v-text-field
                dense
                v-model="mobo.memoryFreq"
                type="number"
                :rules="validationRules.numberRules"
                suffix="MHz"
                :label="$t('mobo.memory_freq')"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="12">
              <v-text-field
                dense
                v-model="mobo.price"
                type="number"
                :label="$t('mobo.price')"
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
                  class="mobo-cu-dialog__image-preview"
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
              @click="onClickAcceptDeleteButton(mobo.id)"
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
  name: "MoboCu",
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
    originalMobo: {
      type: Object,
      default: () => {
        return {
          id: 0,
          name: "",
          mfr: "",
          chipset: "",
          socket: "",
          moboSize: "",
          memoryType: "",
          memoryFreq: null,
          memorySlotNum: null,
          pcieX16SlotNum: null,
          pcieX8SlotNum: null,
          pcieX4SlotNum: null,
          pcieX2SlotNum: null,
          pcieX1SlotNum: null,
          sataSlotNum: null,
          m2SlotNum: null,
          price: null,
          img: "",
        };
      },
    },
  },
  data() {
    return {
      isEditable: false,
      mobo: {},
      moboMemoryTypeList: ["DDR2", "DDR3", "DDR4"],
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
    this.mobo = { ...this.originalMobo };
    this.originalUrlImg = this.mobo.img
      ? `${this.url.moboImg}/${this.mobo.img}`
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
      this.$http.delete(`${this.url.mobo}/${id}`).then(() => {
        this.$http.delete(this.url.moboUploadImg, {
          data: [this.mobo.img],
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
        this.mobo = { ...this.originalMobo };
        this.urlImg = this.originalUrlImg;
      } else {
        this.$emit("close");
      }
    },
    onClickCancelButton() {
      if (!this.compareObjects(this.originalMobo, this.mobo)) {
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
          name: this.mobo.name || null,
          mfr: this.mobo.mfr || null,
          chipset: this.mobo.chipset || null,
          socket: this.mobo.socket || null,
          mobo_size: this.mobo.moboSize || null,
          memory_type: this.mobo.memoryType || null,
          memory_freq: this.mobo.memoryFreq || null,
          memory_slot_num: this.mobo.memorySlotNum || null,
          pcie_x16_slot_num: this.mobo.pcieX16SlotNum || null,
          pcie_x8_slot_num: this.mobo.pcieX8SlotNum || null,
          pcie_x4_slot_num: this.mobo.pcieX4SlotNum || null,
          pcie_x2_slot_num: this.mobo.pcieX2SlotNum || null,
          pcie_x1_slot_num: this.mobo.pcieX1SlotNum || null,
          sata_slot_num: this.mobo.sataSlotNum || null,
          m2_slot_num: this.mobo.m2SlotNum || null,
          price: this.mobo.price || null,
        };
        if (this.mobo.imgFile) {
          let formData = new FormData();
          formData.append("img", this.mobo.imgFile);
          await this.$http
            .post(this.url.moboUploadImg, formData)
            .then((res) => {
              body.img = res.data.filename;
            });
        }
        if (this.mode === "C") {
          this.$http
            .post(this.url.mobo, body)
            .then((res) => {
              this.$emit("close");
              this.$emit("search");
            })
            .catch((err) => {
              this.$http.delete(this.url.moboUploadImg, { data: [body.img] });
            });
        } else if (this.mode === "U") {
          this.$http
            .put(`${this.url.mobo}/${this.mobo.id}`, body)
            .then((res) => {
              if (this.mobo.imgFile) {
                this.$http.delete(this.url.moboUploadImg, {
                  data: [this.mobo.img],
                });
              }
              this.$emit("close");
              this.$emit("search");
            })
            .catch((err) => {
              this.$http.delete(this.url.moboUploadImg, { data: [body.img] });
            });
        }
      }
    },
    onImageChange(img) {
      if (img) {
        this.mobo.imgFile = img;
        this.setUrlImg(img);
      }
    },
    setUrlImg(img) {
      this.urlImg = URL.createObjectURL(img);
    },
    onImageClear() {
      this.mobo.imgFile = "";
      this.urlImg = "";
    },
  },
};
</script>
<style scoped>
.mobo-cu-dialog__image-preview {
  height: 250px;
}
</style>