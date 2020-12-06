<template>
  <v-dialog v-model="visible" persistent class="ssd-cu-dialog">
    <v-card>
      <v-card-title v-if="mode === 'C'">
        <v-icon>mdi-database-plus-outline</v-icon>&nbsp;
        {{ $t("ssd.add_ssd") }}
      </v-card-title>
      <v-card-title v-if="mode === 'U'">
        <v-icon>mdi-database-edit-outline</v-icon>&nbsp;
        {{ $t("ssd.edit_ssd") }}
      </v-card-title>
      <v-form v-model="valid" ref="form">
        <v-container class="pl-8 pr-8">
          <v-row>
            <v-col md="6">
              <v-text-field
                dense
                v-model="ssd.name"
                placeholder=" "
                :label="$t('ssd.name')"
                :rules="validationRules.textRequiredRules"
                :counter="50"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
            <v-col md="6">
              <v-text-field
                dense
                v-model="ssd.model"
                placeholder=" "
                :label="$t('ssd.model')"
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
                v-model="ssd.mfr"
                placeholder=" "
                :label="$t('ssd.mfr')"
                :rules="validationRules.textRequiredRules"
                :counter="50"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
            <v-col md="6">
              <v-text-field
                dense
                v-model="ssd.capacity"
                placeholder=" "
                type="number"
                :label="$t('ssd.capacity')"
                :rules="validationRules.numberRequiredRules"
                suffix="GB"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="6">
              <v-select
                dense
                v-model="ssd.interface"
                placeholder=" "
                :items="ssdInterfaceList"
                :label="$t('ssd.interface')"
                :rules="validationRules.requiredRules"
                :disabled="!isEditable"
              >
              </v-select>
            </v-col>
            <v-col md="6">
              <v-select
                dense
                v-model="ssd.formFactor"
                placeholder=" "
                :items="ssdFormFactorList"
                :label="$t('ssd.form_factor')"
                :rules="validationRules.requiredRules"
                :disabled="!isEditable"
              >
              </v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="6">
              <v-text-field
                dense
                v-model="ssd.readSpeed"
                placeholder=" "
                type="number"
                :rules="validationRules.numberRules"
                :label="$t('ssd.read_speed')"
                suffix="MB/s"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
            <v-col md="6">
              <v-text-field
                dense
                v-model="ssd.writeSpeed"
                placeholder=" "
                type="number"
                :rules="validationRules.numberRules"
                :label="$t('ssd.write_speed')"
                suffix="MB/s"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="12">
              <v-text-field
                dense
                v-model="ssd.price"
                placeholder=" "
                type="number"
                :label="$t('ssd.price')"
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
                  class="ssd-cu-dialog__image-preview"
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
              @click="onClickAcceptDeleteButton(ssd.id)"
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
  name: "SsdCu",
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
    originalSsd: {
      type: Object,
      default: () => {
        return {
          id: 0,
          name: "",
          model: "",
          mfr: "",
          capacity: null,
          interface: "",
          formFactor: "",
          readSpeed: null,
          writeSpeed: null,
          price: null,
          img: "",
        };
      },
    },
  },
  data() {
    return {
      isEditable: false,
      ssd: {},
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
    this.ssd = { ...this.originalSsd };
    this.originalUrlImg = this.ssd.img
      ? `${this.url.ssdImg}/${this.ssd.img}`
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
      this.$http.delete(`${this.url.ssd}/${id}`).then(() => {
        this.$http.delete(this.url.ssdUploadImg, {
          data: [this.ssd.img],
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
        this.ssd = { ...this.originalSsd };
        this.urlImg = this.originalUrlImg;
      } else {
        this.$emit("close");
      }
    },
    onClickCancelButton() {
      if (!this.compareObjects(this.originalSsd, this.ssd)) {
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
          name: this.ssd.name || null,
          model: this.ssd.model || null,
          mfr: this.ssd.mfr || null,
          capacity: this.ssd.capacity || null,
          interface: this.ssd.interface || null,
          form_factor: this.ssd.formFactor || null,
          read_speed: this.ssd.readSpeed || null,
          write_speed: this.ssd.writeSpeed || null,
          price: this.ssd.price || null,
        };
        if (this.ssd.imgFile) {
          let formData = new FormData();
          formData.append("img", this.ssd.imgFile);
          await this.$http.post(this.url.ssdUploadImg, formData).then((res) => {
            body.img = res.data.filename;
          });
        }
        if (this.mode === "C") {
          this.$http
            .post(this.url.ssd, body)
            .then((res) => {
              this.$emit("close");
              this.$emit("search");
            })
            .catch((err) => {
              this.$http.delete(this.url.ssdUploadImg, { data: [body.img] });
            });
        } else if (this.mode === "U") {
          this.$http
            .put(`${this.url.ssd}/${this.ssd.id}`, body)
            .then((res) => {
              if (this.ssd.imgFile) {
                this.$http.delete(this.url.ssdUploadImg, {
                  data: [this.ssd.img],
                });
              }
              this.$emit("close");
              this.$emit("search");
            })
            .catch((err) => {
              this.$http.delete(this.url.ssdUploadImg, { data: [body.img] });
            });
        }
      }
    },
    onImageChange(img) {
      if (img) {
        this.ssd.imgFile = img;
        this.setUrlImg(img);
      }
    },
    setUrlImg(img) {
      this.urlImg = URL.createObjectURL(img);
    },
    onImageClear() {
      this.ssd.imgFile = "";
      this.urlImg = "";
    },
  },
};
</script>
<style scoped>
.ssd-cu-dialog__image-preview {
  height: 250px;
}
</style>