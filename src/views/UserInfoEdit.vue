<template>
  <v-container>
    <v-layout v-if="editRights" column wrap>
      <v-flex xs12 sm10 md8 lg6>
        <v-text-field disabled v-model="name" label="名前"></v-text-field>
        <v-text-field disabled v-model="profImgUrl" label="プロフィール画像URL"></v-text-field>
        <v-form ref="form" lazy-validation v-model="valid" @submit.prevent="submit">
          <v-textarea
            v-model="selfIntroduction"
            label="自己紹介"
            :counter="50"
            :rules="selfIntroductionRules"
            required
          ></v-textarea>
          <v-combobox
            v-model="programmingLanguages"
            :items="programmingLanguageList"
            label="得意なプログラミング言語"
            :rules="[v => v.length >= 1 || '入力必須項目です。']"
            required
            multiple
            chips
          ></v-combobox>
          <v-text-field
            v-model="programmingExperience"
            label="プログラミング経験年数"
            :rules="programmingExperienceRules"
          ></v-text-field>
          <v-text-field v-model="gitHubAccount" label="GitHubアカウント" :rules="isNullOrUrl"></v-text-field>
          <v-text-field v-model="twitterAccount" label="Twitterアカウント" :rules="isNullOrUrl"></v-text-field>
          <v-text-field v-model="otherURL" label="他のURL" :rules="isNullOrUrl"></v-text-field>
          <v-text-field v-model="otherUrlDescription" label="他のURL 説明文"></v-text-field>
          <v-btn :disabled="!valid" type="submit">更新</v-btn>
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
  getProgrammingLanguageList,
  getUserInfo
} from "@/lib/api-service";
import firebase from "@/lib/firebase";

export default {
  data() {
    return {
      valid: true,
      dialog: false,
      editRights: true,
      name: "",
      profImgUrl: "",
      selfIntroduction: "",
      programmingLanguages: "",
      programmingExperience: "",
      gitHubAccount: "",
      twitterAccount: "",
      otherURL: "",
      otherUrlDescription: "",
      programmingLanguageList: [],
      selfIntroductionRules: [
        v => !!v || "入力必須項目です。",
        v => (v && v.length <= 50) || "50文字以内で入力してください。"
      ],
      programmingExperienceRules: [
        v => !!v || "入力必須項目です。",
        v =>
          (parseFloat(v) && v >= 0.1 && v <= 99) ||
          "0.1より大きく、99より小さい数値を入力してください。"
      ],
      isNullOrUrl: [v => !v || /http/.test(v) || "URLを入力してください。"]
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
      const res = await updateUserInfo(userInfo);
      if (res.errors) {
        this.$emit("makeAlert", "入力内容にエラーがあります。");
      } else {
        this.$router.push({ name: "UserInfo" });
        this.$emit("makeAlert", res.message);
      }
    },
    getProgrammingLanguageList: async function() {
      const res = await getProgrammingLanguageList();
      this.programmingLanguageList = res.name;
    },
    getUserInfo: async function() {
      const { userId } = this.$route.params;
      const userInfo = await getUserInfo(userId);
      //ポートフォリオも出来しだい
      this.name = userInfo.name;
      this.profImgUrl = userInfo.prof_img_url;
      this.selfIntroduction = userInfo.self_introduction;
      this.programmingLanguages = userInfo.userProgrammingLanguages;
      this.programmingExperience = userInfo.programming_experience;
      this.gitHubAccount = userInfo.github_account;
      this.twitterAccount = userInfo.twitter_account;
      this.otherURL = userInfo.other_url;
      this.otherUrlDescription = userInfo.other_url_comment;
      if (!this.name) {
        this.$router.push({ name: "Home" });
        this.$emit("makeAlert", "ユーザーが見つかりません。");
      }
    },
    submit: function() {
      this.updateUserInfo();
    }
  },
  mounted() {
    this.checkEditRights();
    this.getProgrammingLanguageList();
    this.getUserInfo();
    this.$refs.form.resetValidation();
  },
  watch: {
    $route() {
      this.checkEditRights();
      this.getUserInfo();
    }
  }
};
</script>