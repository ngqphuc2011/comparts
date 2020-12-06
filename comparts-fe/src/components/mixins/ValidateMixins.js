export default {
    data() {
        return {
            validationRules: {
                requiredRules: [(v) => !!v || this.$t("message.required_rule_msg")],
                textRequiredRules: [
                    (v) => !!v || this.$t("message.required_rule_msg"),
                    (v) => v.length <= 50 || this.$t("message.text_rule_msg"),
                ],
                textRules: [(v) => v == "" ||
                    v == null || v.length <= 50 || this.$t("message.text_rule_msg")],
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
        }
    },
    methods: {

    }
}