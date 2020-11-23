const ctrl = require("../controller/controller");

module.exports = function (app) {
	app.route("/cpus").get(ctrl.search).post(ctrl.create);
	app.route("/cpus/upload").post(ctrl.saveImage).delete(ctrl.deleteImage);
	app.route("/cpus/:id(\\d+)").get(ctrl.detail).delete(ctrl.delete).put(ctrl.update);
	app.route("/public/cpus").get(ctrl.getDummyImage)
};
