module.exports = (sequelize, DataTypes) =>
    sequelize.define("ram", {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING },
        mfr: { type: DataTypes.STRING },
        capacity: { type: DataTypes.INTEGER },
        stick_num: { type: DataTypes.INTEGER },
        ecc: { type: DataTypes.BOOLEAN },
        memory_type: { type: DataTypes.STRING },
        memory_freq: { type: DataTypes.INTEGER },
        cas_latency: { type: DataTypes.INTEGER },
        voltage: { type: DataTypes.FLOAT },
        price: { type: DataTypes.INTEGER },
        img: { type: DataTypes.TEXT },
    });
