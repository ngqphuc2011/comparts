let ctrl = require("./controller");

module.exports = function (app) {
  app.route("/cpu").get(ctrl.search).post(ctrl.insert);
  app.route("/cpu/:id").get(ctrl.detail).delete(ctrl.delete).put(ctrl.update);
};
