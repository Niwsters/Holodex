import Vue from "vue";
import Vuetify from "vuetify/lib";
import { primary_color, secondary_color } from "@/utils/consts";
import VueI18n from "vue-i18n";

Vue.use(Vuetify);

// ====== i18n setup ======
Vue.use(VueI18n);

import vuetifyEn from "vuetify/es5/locale/en";
import vuetifyJa from "vuetify/es5/locale/ja";
import vuetifyZh from "vuetify/es5/locale/zh-Hant";
import vuetifyEs from "vuetify/es5/locale/es";
import vuetifyId from "vuetify/es5/locale/id";
import enTL from "@/locales/en.yml";
import jaTL from "@/locales/ja.yml";
import esTL from "@/locales/es.yml";
import msTL from "@/locales/ms.yml";
import zhTL from "@/locales/zhtw.yml";
import idTL from "@/locales/id.yml";
import ruTL from "@/locales/ru.yml";

const messages = {
    en: { $vuetify: vuetifyEn, ...enTL },
    ja: { $vuetify: vuetifyJa, ...jaTL },
    ms: { $vuetify: vuetifyEn, ...msTL },
    es: { $vuetify: vuetifyEs, ...esTL },
    id: { $vuetify: vuetifyId, ...idTL },
    zh: { $vuetify: vuetifyZh, ...zhTL },
    ru: { $vuetify: vuetifyEn, ...ruTL },
};

export const langs = [
    { val: "en", display: "English", credit: "@Holodex" },
    { val: "ja", display: "日本語", credit: "Yourein#3960" },
    { val: "zh", display: "漢語", credit: "angel84326#7887" },
    { val: "es", display: "Español", credit: "Aldo#3682" },
    { val: "ms", display: "Bahasa Melayu", credit: "Admiy#8261" },
    { val: "id", display: "Bahasa Indonesia", credit: "alcyneous#2803" },
    { val: "ru", display: "русский язык", credit: "kirillbarnaul#8499" },
];

export const i18n = new VueI18n({
    locale: "en", // set locale
    messages, // set locale messages,
    pluralizationRules: {
        /**
         * @param choice {number} a choice index given by the input to $tc: `$tc('path.to.rule', choiceIndex)`
         * @param choicesLength {number} an overall amount of available choices
         * @returns a final choice index to select plural word by
         */
        ru: function(choice, choicesLength) {
            // this === VueI18n instance, so the locale property also exists here
            if (choice === 0) {
                return 0;
            }

            choice = choice
                .toString()
                .toLowerCase()
                .endsWith("k")
                ? parseInt(choice)
                : choice;

            const teen = choice > 10 && choice < 20;
            const endsWithOne = choice % 10 === 1;

            if (choicesLength < 4) {
                return !teen && endsWithOne ? 1 : 2;
            }
            if (!teen && endsWithOne) {
                return 1;
            }
            if (!teen && choice % 10 >= 2 && choice % 10 <= 4) {
                return 2;
            }

            return choicesLength < 4 ? 2 : 3;
        },
    },
});
// ====== end i18n setup ======

export const vuetify = new Vuetify({
    treeShake: true,
    icons: {
        iconfont: "mdiSvg",
    },
    theme: {
        themes: {
            dark: {
                primary: primary_color,
                secondary: secondary_color,
            },
            light: {
                primary: primary_color,
                secondary: secondary_color,
            },
        },
    },
    lang: {
        t: (key, ...params) => i18n.t(key, params),
    },
    // breakpoint: {
    //     thresholds: {
    //         xs: 0,
    //         sm: 476,
    //         md: 668,
    //         lg: 1000,
    //         xl: 1300,
    //     },
    // },
});
