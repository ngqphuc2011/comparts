module.exports = (sequelize, DataTypes) =>
	sequelize.define("cpu", {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		name: { type: DataTypes.STRING },
		manufacturer: { type: DataTypes.STRING },
		core_num: { type: DataTypes.INTEGER },
		thread_num: { type: DataTypes.INTEGER },
		base_frequency: { type: DataTypes.FLOAT },
		turbo_frequency: { type: DataTypes.FLOAT },
		cache: { type: DataTypes.FLOAT },
		socket: { type: DataTypes.STRING },
		tdp: { type: DataTypes.INTEGER },
		memory_type: { type: DataTypes.STRING },
		memory_frequency: { type: DataTypes.INTEGER },
		process: { type: DataTypes.INTEGER },
		graphics: { type: DataTypes.STRING },
		price: { type: DataTypes.INTEGER },
		img: { type: DataTypes.TEXT },
	});
