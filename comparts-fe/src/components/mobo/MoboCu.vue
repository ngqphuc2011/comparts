<template>
  <v-dialog v-model="visible" max-width="50%" persistent class="mobo-cu-dialog">
    <v-card>
      <v-card-title v-if="mode === 'C'" class="headline">
        {{ $t("mobo.add_mobo") }}
      </v-card-title>
      <v-card-title v-if="mode === 'U'" class="headline">
        {{ $t("mobo.edit_mobo") }}
      </v-card-title>
      <v-form v-model="valid" ref="form">
        <v-container class="pl-8 pr-8">
          <v-row>
            <v-col>
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
            <v-col>
              <v-text-field
                dense
                v-model="mobo.mfr"
                :label="$t('mobo.mfr')"
                :rules="validationRules.textRequiredRules"
                :counter="50"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
            <v-col>
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
            <v-col>
              <v-text-field
                dense
                v-model="mobo.socket"
                :label="$t('mobo.socket')"
                :rules="validationRules.textRequiredRules"
                :counter="50"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
            <v-col>
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
            <v-col>
              <v-text-field
                dense
                v-model="mobo.pcieX16SlotNum"
                type="number"
                :rules="validationRules.numberRules"
                :label="$t('mobo.pcie_x16_slot_num')"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                dense
                v-model="mobo.pcieX8SlotNum"
                type="number"
                :rules="validationRules.numberRules"
                :label="$t('mobo.pcie_x8_slot_num')"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                dense
                v-model="mobo.pcieX4SlotNum"
                type="number"
                :rules="validationRules.numberRules"
                :label="$t('mobo.pcie_x4_slot_num')"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                dense
                v-model="mobo.pcieX2SlotNum"
                type="number"
                :label="$t('mobo.pcie_x2_slot_num')"
                :rules="validationRules.numberRules"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                dense
                v-model="mobo.pcieX1SlotNum"
                type="number"
                :label="$t('mobo.pcie_x1_slot_num')"
                :rules="validationRules.numberRules"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                dense
                v-model="mobo.sataSlotNum"
                type="number"
                :label="$t('mobo.sata_slot_num')"
                :rules="validationRules.numberRules"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                dense
                v-model="mobo.m2SlotNum"
                type="number"
                :label="$t('mobo.m2_slot_num')"
                :rules="validationRules.numberRules"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                dense
                v-model="mobo.memorySlotNum"
                type="number"
                :label="$t('mobo.memory_slot_num')"
                :rules="validationRules.numberRules"
                :disabled="!isEditable"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-select
                dense
                v-model="mobo.memoryType"
                :items="moboMemoryTypeList"
                :label="$t('mobo.memory_type')"
                :disabled="!isEditable"
              ></v-select>
            </v-col>
            <v-col>
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
            <v-col>
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
            <v-col cols="6">
              <v-card class="mobo-cu-dialog__image-preview">
                <v-list-item>
                  <v-list-item-content>
                    <v-img
                      contain
                      height="150"
                      class="mobo-cu-dialog__image-preview"
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
export default {
  name: "MoboCu",
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
          memoryType: "DDR4",
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
      url: {
        mobo: `${this.baseUrl}/mobos`,
        moboImg: `${this.baseUrl}/public/mobos/`,
        moboUploadImg: `${this.baseUrl}/mobos/upload/`,
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
      return JSON.stringify(this.originalMobo) !== JSON.stringify(this.mobo);
    },
  },
  created() {
    if (this.mode === "C") {
      this.isEditable = true;
    }
    this.mobo = { ...this.originalMobo };
    this.urlImg = this.mobo.img ? this.url.moboImg + this.mobo.img : "";
  },
  methods: {
    onClickModifyButton() {
      this.isEditable = true;
    },
    onClickCancelDeleteButton() {
      this.deleteConfirmDialog = false;
    },
    onClickAcceptDeleteButton(id) {
      this.$http.delete(this.url.mobo + id).then(() => {
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
          name: this.mobo.name,
          mfr: this.mobo.mfr,
          chipset: this.mobo.chipset,
          socket: this.mobo.socket,
          mobo_size: this.mobo.moboSize,
          memory_type: this.mobo.memoryType,
          memory_freq: this.mobo.memoryFreq,
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
            .put(this.url.mobo + this.mobo.id, body)
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
  min-height: 200px;
}
</style>