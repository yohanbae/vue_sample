import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from "firebase/app"

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
      count: 0,
      names: [],
      loading: false
    },
    mutations: {
      increment (state) {
        state.count++
      },
      setLoading (state, payload) {
        state.loading = payload
      },
      addNewName (state, payload) {
        state.names.push({name: payload})
      },
      updateName (state, payload) {
        const {id, name} = payload
        state.names[id].name = name
      },
      deleteName (state, payload) {
        state.names = payload
      },
      refreshData (state, payload) {
        state.names = payload
      }
    },
    actions: {
      addNewName: ({commit, state}, payload) => {
        commit('setLoading', true)
        const newData = [...state.names, {name: payload}]
        firebase.firestore().collection("vuevue").doc("names").set({names: newData}).then(function() {
            console.log("Document successfully written!");
            commit('addNewName', payload )
        });
        commit('setLoading', false)
      },
      refreshData: (context) => {
        context.commit('setLoading', true)
        firebase.firestore().collection('vuevue').doc("names").get()
        .then(doc => {
            context.commit('refreshData', doc.data().names)
            context.commit('setLoading', false)
        })
        .catch(
            (error) => {
              console.log(error)
              context.commit('setLoading', false)
        })
      },
      updateName: ({commit, state}, payload) => {
        commit('setLoading', true)
        let newData = state.names.map((name, i) => {
          return (i == payload.id) ? {name: payload.name} : {name: name.name}
        })
        firebase.firestore().collection("vuevue").doc("names").set({names: newData}).then(function() {
            console.log("Document successfully written!");
            commit('updateName', payload)
        });
        commit('setLoading', false)
      },
      deleteName: ({commit, state}, payload) => {
        commit('setLoading', true)
        let newData = state.names.filter((val, index) => index !== payload.id);
        firebase.firestore().collection("vuevue").doc("names").set({names: newData}).then(function() {
          console.log("Document successfully deleted!");
          commit('deleteName', newData)
      });
        
        commit('setLoading', false)

      }
    }
  })
  