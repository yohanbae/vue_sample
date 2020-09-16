<template>
  <div>
      <h5>Login</h5>
      <input type="text" placeholder="username" v-model="username" />
      <input type="text" placeholder="password" v-model="password" />

      <button v-on:click="onBtn(username, password)">Click</button>

      <button v-on:click="onOut">log out</button>
        <div>{{ theuser }}</div>
  </div>
</template>

<script>
import firebase from "firebase"

export default {
  name: 'Login',
  components: {
    // HelloWorld
  },
  data: function() {
    return {  
        username: "",
        password: "",
        theuser: "dd",
        visi: false
    }
  },
  created: function() {
    console.log("INITTT", this.theuser)
  },
  mounted: function () {
      console.log('mounted')

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            // var displayName = user.displayName;
            // var uid = user.uid;
            console.log(user.email)
        } else {
            // User is signed out.
            // ...
            console.log('not logged in yet')
        }
    })

    var user = firebase.auth().currentUser;

    if (user) {
    // User is signed in.
        this.theuser = user.email
    } else {
    // No user is signed in.
    }

  },

  methods: {
      onBtn: function(username, password) {
            console.log("HOI", username, password)

            firebase.auth().signInWithEmailAndPassword(username, password)
            .then(function() {
                console.log("login success")
            })
            .catch(function(error) {
            // Handle Errors here.
                console.log("ERROR", error)
            // ...
            });
      },
      onOut: function() {
        firebase.auth().signOut().then(function() {
            console.log('signed out')
        })
      }
  }
}
</script>
