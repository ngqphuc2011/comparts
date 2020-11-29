const cpu = require("./cpu/controller");

module.exports = function (app) {
	app.route("/cpu").get(cpu.search).post(cpu.create);
	app.route("/cpu/upload").post(cpu.saveImage).delete(cpu.deleteImage);
	app
		.route("/cpu/:id(\\d+)")
		.get(cpu.detail)
		.delete(cpu.delete)
		.put(cpu.update);
	app.route("/public/cpu").get(cpu.getDummyImage);
};
