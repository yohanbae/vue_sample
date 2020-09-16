<template>
  <v-form
    ref="form"
    lazy-validation
  >
    <v-text-field
      v-model="thename"
      :counter="30"
      label="add new name"
      required
    ></v-text-field>

    <v-btn
      color="success"
      class="mr-4"
      v-on:click="onSubmit(thename)"
    >
      Submit
    </v-btn>

  </v-form>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'AddForm',
  props: {
    // msg: String,
  },
  data: function() {
    return {  
        thename: ""
    }
  },
  methods: {
    // addNewName: function(newName) {
    //     this.$store.dispatch({type: 'addNewName', newName: newName})
    //     this.thename=""
    // },
    ...mapActions({
        onSubmit: 'addNewName'
    })
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
