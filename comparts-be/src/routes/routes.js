const cpu = require("../controllers/cpu");
const mobo = require("../controllers/mobo")

module.exports = function (app) {
	app.route("/cpus").get(cpu.search).post(cpu.create);
	app.route("/cpus/upload").post(cpu.saveImage).delete(cpu.deleteImage);
	app
		.route("/cpus/:id(\\d+)")
		.get(cpu.detail)
		.delete(cpu.delete)
		.put(cpu.update);
	app.route("/public/cpus").get(cpu.getNullImage);

	app.route("/mobos").get(mobo.search).post(mobo.create);
	app.route("/mobos/upload").post(mobo.saveImage).delete(mobo.deleteImage);
	app
		.route("/mobos/:id(\\d+)")
		.get(mobo.detail)
		.delete(mobo.delete)
		.put(mobo.update);
	app.route("/public/mobos").get(mobo.getNullImage);
};
