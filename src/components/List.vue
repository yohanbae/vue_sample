<template>
    <div v-if="loading">
        <div class="text-center">
        <v-progress-circular
        indeterminate
        color="primary"
        ></v-progress-circular>       
        <h6>Now Loading.. </h6>
        </div>
    </div>
    <div v-else>
        <v-card
            class="mx-auto"
            tile
        >
        <v-list dense>
        <v-subheader>Name List</v-subheader>
        <v-list-item-group color="primary">
            <v-list-item v-for="(data, index) in pagedData" v-bind:key="index">
                <v-menu top :offset-x="true">
                <template v-slot:activator="{ on, attrs }">
                    <v-list-item v-bind="attrs" v-on="on">
                    <v-list-item-icon>
                        <v-icon>mdi-checkbox-marked-circle</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title v-text="data.name"></v-list-item-title>
                    </v-list-item-content>
                    </v-list-item>
                </template>
                      <v-list>
                        <v-list-item v-on:click="dialog=true;onUpdateClick(index)">
                            <v-list-item-title>Update</v-list-item-title>
                        </v-list-item>
                        <v-list-item v-on:click="onDeleteClick(index)">
                            <v-list-item-title>Delete</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-list-item>
        </v-list-item-group>
        </v-list>
    </v-card>
    
    <v-dialog v-model="dialog">
    <v-card>
        <v-card-title>
          <span class="headline">Manage Names</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Update Name" v-model="chosenName" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false;onSubmitUpdate()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <div class="text-center">
        <v-pagination
        v-model="page"
        :length="getTotalPage()"
        circle
        ></v-pagination>
    </div>
    </div>

</template>

<script>
export default {
   name: 'List',
   props: {

   },
   data: () => ({
    chosenId: 0,
    dialog: false,
    chosenName: "",
    page: 1,
    totalPage: 3
  }),
  computed: {
    myData() { return this.$store.state.names },
    loading() {
        return this.$store.state.loading
    },
    pagedData() {
        let meme = []
        for (var i = (this.page-1) * 3; i < (this.page * 3); i++) {
            if(i < this.$store.state.names.length){
                meme.push(this.$store.state.names[i])
            }
        }
        return meme
    }
  },
  methods: {
    onBtn: function() {
      this.myData[0].name = "KKK"
    },
    getTotalPage: function() {
        console.log('paging')
        return this.totalPage = Math.ceil(this.$store.state.names.length / 3)
    },
    onUpdateClick: function(index) {
        this.chosenName = this.myData[index].name
        this.chosenId = index
    },
    onSubmitUpdate: function() {
        this.$store.dispatch({type: 'updateName', id: this.chosenId, name: this.chosenName})
        this.chosenName = ""
    },
    onDeleteClick: function(index) {
        this.$store.dispatch({type: 'deleteName', id: index})
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>
