export default {
    data() {
        return {
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
            ramMemoryTypeList: ["DDR2", "DDR3", "DDR4"],
            ramEccList: [
                { text: "ECC", value: "ecc" },
                { text: "Non-ECC", value: "non-ecc" },
            ],
            moboFormFactorList: ["E-ATX", "ATX", "mATX", "Mini-ITX"]
        }
    },
    methods: {
        toTopPage() {
            document.body.scrollTop = 0
            document.documentElement.scrollTop = 0;
        },
        compareObjects(a, b) {
            return JSON.stringify(a) === JSON.stringify(b);
        }
    }
}