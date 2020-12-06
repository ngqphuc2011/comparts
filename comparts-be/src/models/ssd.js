module.exports = (sequelize, DataTypes) =>
    sequelize.define("ssd", {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING },
        model: { type: DataTypes.STRING},
        mfr: { type: DataTypes.STRING },
        capacity: { type: DataTypes.INTEGER },
        interface: { type: DataTypes.STRING },
        form_factor: { type: DataTypes.STRING },
        read_speed: { type: DataTypes.INTEGER },
        write_speed: { type: DataTypes.INTEGER },
        price: { type: DataTypes.INTEGER },
        img: { type: DataTypes.TEXT },
    });
