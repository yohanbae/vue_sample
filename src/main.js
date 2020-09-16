import Vue from 'vue'
import App from './App.vue'
// import Vuex from 'vuex'
import router from './router'
import {store} from "../Store"
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false


let firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: "https://izgym-c8569.firebaseio.com",
  projectId: "izgym-c8569",
  storageBucket: "izgym-c8569.appspot.com",
  messagingSenderId: "914604649889",
  appId: "1:914604649889:web:7613ada195c7694f03efe0",
  measurementId: "G-H09VWD76TE"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


let app;

firebase.auth().onAuthStateChanged(user => {
  console.log("user", user);
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount("#app");
  }
});

// new Vue({
//   store: store,
//   router,
//   render: h => h(App)
// }).$mount('#app')
