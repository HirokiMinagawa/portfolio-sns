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
        <v-btn flat @click="toPortfolioCreate">ポートフォリオ投稿</v-btn>
        <v-btn flat v-if="user" @click="toMyPage">マイページ</v-btn>
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
      <v-alert v-model="alert" color="info" icon="info" @click="alert = false">{{ alertMessage }}</v-alert>
      <router-view @makeAlert="makeAlert"></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Auth from "@/components/Auth";
import firebase from "@/lib/firebase";
import { saveLoginUser } from "@/lib/api-service";
import { getcurrentUserId } from "@/lib/api-service";

export default {
  name: "App",
  components: {
    Auth
  },
  data() {
    return {
      dialog: false,
      user: null,
      alertMessage: "",
      alert: false
    };
  },
  created() {
    this.getLoginUser();
  },
  methods: {
    signInComplete: async function() {
      this.dialog = false;
      this.user = firebase.auth().currentUser;
      const { message } = await saveLoginUser();
      this.makeAlert(message);
    },
    signOut: function() {
      firebase.auth().signOut();
      this.$router.push({ name: "Home" });
      this.makeAlert("ログアウトしました。");
    },
    getLoginUser: function() {
      firebase.auth().onAuthStateChanged(user => {
        this.user = user;
      });
    },
    makeAlert: function(message) {
      this.alertMessage = message;
      this.alert = true;
      setTimeout(() => {
        this.alert = false;
      }, 3000);
    },
    toMyPage: async function() {
      const { currentUserId } = await getcurrentUserId();
      this.$router.push({
        name: "UserInfo",
        params: { userId: currentUserId }
      });
    },
    toPortfolioCreate: function() {
      this.$router.push({ name: "PortfolioCreate" });
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

@media (max-width: 768px) {
  p {
    display: none;
  }
  .toolbar-title {
    display: none;
  }
}
</style>
