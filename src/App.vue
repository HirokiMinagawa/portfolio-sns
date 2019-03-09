<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <router-link class="toolbar-title font-weight-light" to="/">
          <span>Look My Portfolio</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <p v-if="user">{{ "こんにちは、" + user.displayName + "さん" }}</p>
        <v-btn flat v-if="user">マイページ</v-btn>
        <v-btn flat v-if="user" @click="signOut">ログアウト</v-btn>
        <v-btn v-else flat @click.stop="dialog = true">
          <span>新規登録 or ログイン</span>
        </v-btn>
        <v-dialog v-model="dialog" max-width="290px">
          <v-card>
            <v-container>
              <v-layout justify-center>
                <Auth @signInComplete="signInComplete"></Auth>
              </v-layout>
            </v-container>
          </v-card>
        </v-dialog>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Auth from "@/components/Auth";
import firebase from "@/lib/firebase";

export default {
  name: "App",
  components: {
    Auth
  },
  data() {
    return {
      dialog: false,
      user: null
    };
  },
  created() {
    this.getLoginUser();
  },
  methods: {
    signInComplete: function() {
      this.dialog = false;
      this.user = firebase.auth().currentUser;
      //ここでuser情報をDBに書き込みたい
    },
    signOut() {
      firebase.auth().signOut();
    },
    getLoginUser: function() {
      firebase.auth().onAuthStateChanged(user => {
        this.user = user;
      });
    }
  }
};
</script>

<style scoped>
p {
  margin: auto 30px;
}
.toolbar-title {
  text-decoration: none;
  color: black;
}
</style>
