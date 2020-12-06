const cpu = require("../controllers/cpu");
const mobo = require("../controllers/mobo");
const gpu = require("../controllers/gpu");
const ram = require("../controllers/ram");
const hdd = require("../controllers/hdd");
const ssd = require("../controllers/ssd");

module.exports = function (app) {
	//CPU API
	app.route("/cpus").get(cpu.search).post(cpu.create);
	app.route("/cpus/upload").post(cpu.saveImage).delete(cpu.deleteImage);
	app
		.route("/cpus/:id(\\d+)")
		.get(cpu.detail)
		.delete(cpu.delete)
		.put(cpu.update);
	app.route("/public/cpus").get(cpu.getNullImage);

	//MOBO API
	app.route("/mobos").get(mobo.search).post(mobo.create);
	app.route("/mobos/upload").post(mobo.saveImage).delete(mobo.deleteImage);
	app
		.route("/mobos/:id(\\d+)")
		.get(mobo.detail)
		.delete(mobo.delete)
		.put(mobo.update);
	app.route("/public/mobos").get(mobo.getNullImage);

	//GPU API
	app.route("/gpus").get(gpu.search).post(gpu.create);
	app.route("/gpus/upload").post(gpu.saveImage).delete(gpu.deleteImage);
	app
		.route("/gpus/:id(\\d+)")
		.get(gpu.detail)
		.delete(gpu.delete)
		.put(gpu.update);
	app.route("/public/gpus").get(gpu.getNullImage);

	//RAM API
	app.route("/rams").get(ram.search).post(ram.create);
	app.route("/rams/upload").post(ram.saveImage).delete(ram.deleteImage);
	app
		.route("/rams/:id(\\d+)")
		.get(ram.detail)
		.delete(ram.delete)
		.put(ram.update);
	app.route("/public/rams").get(ram.getNullImage);

	//HDD API
	app.route("/hdds").get(hdd.search).post(hdd.create);
	app.route("/hdds/upload").post(hdd.saveImage).delete(hdd.deleteImage);
	app
		.route("/hdds/:id(\\d+)")
		.get(hdd.detail)
		.delete(hdd.delete)
		.put(hdd.update);
	app.route("/public/hdds").get(hdd.getNullImage);

	//SSD API
	app.route("/ssds").get(ssd.search).post(ssd.create);
	app.route("/ssds/upload").post(ssd.saveImage).delete(ssd.deleteImage);
	app
		.route("/ssds/:id(\\d+)")
		.get(ssd.detail)
		.delete(ssd.delete)
		.put(ssd.update);
	app.route("/public/ssds").get(ssd.getNullImage);
};
