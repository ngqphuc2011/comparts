module.exports = (sequelize, DataTypes) =>
    sequelize.define("mobo", {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING },
        mfr: { type: DataTypes.STRING },
        chipset: { type: DataTypes.STRING },
        socket: { type: DataTypes.STRING },
        size: { type: DataTypes.STRING },
        memory_type: { type: DataTypes.STRING },
        memory_freq: { type: DataTypes.INTEGER },
        memory_slot_num: { type: DataTypes.INTEGER },
        pcie_x16_slot_num: { type: DataTypes.INTEGER },
        pcie_x8_slot_num: { type: DataTypes.INTEGER },
        pcie_x4_slot_num: { type: DataTypes.INTEGER },
        pcie_x2_slot_num: { type: DataTypes.INTEGER },
        pcie_x1_slot_num: { type: DataTypes.INTEGER },
        sata_slot_num: { type: DataTypes.INTEGER },
        m2_slot_num: { type: DataTypes.INTEGER },
        price: { type: DataTypes.INTEGER },
        img: { type: DataTypes.TEXT },
    });
