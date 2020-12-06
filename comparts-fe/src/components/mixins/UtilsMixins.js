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
            ramEccList: ["ECC", "Non-ECC"],
            moboFormFactorList: ["E-ATX", "ATX", "mATX", "Mini-ITX"],
            hddFormFactorList: ["3.5-inch", "2.5-inch"],
            hddInterfaceList: ["SATA-II", "SATA-III"],
            ssdFormFactorList: ["M.2 2280", "M.2 2260", "M.2 2242", "M.2 2230", "2.5-inch", "U.2"],
            ssdInterfaceList: ["SATA-II", "SATA-III", "PCIe 3.0 x4", "PCIe 4.0 x4"]
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