import Vue from "vue";
import Vuex from "vuex";
import i18n from "./i18n";

Vue.use(Vuex);
const initLang = () => {
  let lang = window.localStorage.getItem("language");
  return lang || "vi";
};
export default new Vuex.Store({
  state: {
    lang: initLang()
  },
  mutations: {
    SET_LANG(state, payload) {
      window.localStorage.setItem("language", payload);
      i18n.locale = payload;
      state.lang = i18n.locale;
    }
  },
  actions: {
    setLang({ commit }, payload) {
      commit("SET_LANG", payload);
    }
  }
});
