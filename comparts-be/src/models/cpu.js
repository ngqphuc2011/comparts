module.exports = (sequelize, DataTypes) =>
	sequelize.define("cpu", {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		name: { type: DataTypes.STRING },
		mfr: { type: DataTypes.STRING },
		core_num: { type: DataTypes.INTEGER },
		thread_num: { type: DataTypes.INTEGER },
		base_freq: { type: DataTypes.FLOAT },
		turbo_freq: { type: DataTypes.FLOAT },
		cache: { type: DataTypes.FLOAT },
		socket: { type: DataTypes.STRING },
		tdp: { type: DataTypes.INTEGER },
		memory_type: { type: DataTypes.STRING },
		memory_freq: { type: DataTypes.INTEGER },
		lithography: { type: DataTypes.INTEGER },
		graphics: { type: DataTypes.STRING },
		price: { type: DataTypes.INTEGER },
		img: { type: DataTypes.TEXT },
	});
