<template>
  <v-container>
    <v-layout v-if="editRights" column wrap>
      <v-flex xs12 sm10 md8 lg6>
        <v-form @submit.prevent="updateUserInfo">
          <h2>編集可能なプロフィール</h2>
          <v-textarea v-model="selfIntroduction" label="自己紹介"></v-textarea>
          <v-combobox
            v-model="programmingLanguages"
            :items="programmingLanguageList"
            label="得意なプログラミング言語"
            multiple
            chips
          ></v-combobox>
          <v-text-field v-model="programmingExperience" label="プログラミング経験年数"></v-text-field>
          <v-text-field v-model="gitHubAccount" label="GitHubアカウント"></v-text-field>
          <v-text-field v-model="twitterAccount" label="Twitterアカウント"></v-text-field>
          <v-text-field v-model="otherURL" label="他のURL"></v-text-field>
          <v-text-field v-model="otherUrlDescription" label="他のURL 説明文"></v-text-field>
          <v-btn type="submit">ユーザー情報を更新</v-btn>
        </v-form>
        <v-btn depressed color="error" @click.stop="dialog = true">ユーザー情報を全て削除</v-btn>

        <v-dialog v-model="dialog" max-width="290">
          <v-card>
            <v-card-title>本当に削除しますか？</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" flat="flat" @click="deleteCurrentUser">はい</v-btn>
              <v-btn color="green darken-1" flat="flat" @click="dialog = false">いいえ</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {
  checkEditRights,
  deleteCurrentUser,
  updateUserInfo,
  getProgrammingLanguageList
} from "@/lib/api-service";
import firebase from "@/lib/firebase";

export default {
  data() {
    return {
      dialog: false,
      editRights: true,
      selfIntroduction: "",
      programmingLanguages: "",
      programmingExperience: "",
      gitHubAccount: "",
      twitterAccount: "",
      otherURL: "",
      otherUrlDescription: "",
      programmingLanguageList: []
    };
  },
  methods: {
    checkEditRights: async function() {
      const { userId } = this.$route.params;
      this.editRights = await checkEditRights(userId);
      if (!this.editRights) {
        this.$router.push({ name: "Home" });
        this.$emit("makeAlert", "編集権限がありません。");
      }
    },
    deleteCurrentUser: async function() {
      this.dialog = false;
      const { message } = await deleteCurrentUser();
      const firebaseUserInfo = firebase.auth().currentUser;
      await firebaseUserInfo.delete();
      this.$router.push({ name: "Home" });
      this.$emit("makeAlert", message);
    },
    updateUserInfo: async function() {
      const userInfo = {
        selfIntroduction: this.selfIntroduction,
        programmingLanguages: this.programmingLanguages,
        programmingExperience: this.programmingExperience,
        gitHubAccount: this.gitHubAccount,
        twitterAccount: this.twitterAccount,
        otherURL: this.otherURL,
        otherUrlDescription: this.otherUrlDescription
      };
      const { message } = await updateUserInfo(userInfo);
      this.$router.push({ name: "Home" });
      this.$emit("makeAlert", message);
    },
    getProgrammingLanguageList: async function() {
      const res = await getProgrammingLanguageList();
      this.programmingLanguageList = res.name;
    }
  },
  created() {
    this.checkEditRights();
    this.getProgrammingLanguageList();
  },
  watch: {
    $route() {
      this.checkEditRights();
    }
  }
};
</script>