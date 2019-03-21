<template>
  <v-container>
    <v-layout column wrap>
      <v-flex xs12 sm10 md8 lg6>
        <v-form ref="form" lazy-validation v-model="valid" @submit.prevent="submit">
          <v-text-field v-model="portfolioUrl" :rules="isUrl" required label="ポートフォリオURL"></v-text-field>
          <v-text-field v-model="title" label="タイトル" :counter="30" :rules="titleRules" required></v-text-field>
          <v-textarea
            v-model="description"
            label="説明文"
            :counter="140"
            :rules="descriptionRules"
            required
          ></v-textarea>
          <v-combobox
            v-model="programmingLanguages"
            :items="programmingLanguageList"
            label="使用言語"
            :rules="[v => v.length >= 1 || '入力必須項目です。']"
            required
            multiple
            chips
          ></v-combobox>
          <v-btn color="primary" :disabled="!valid" type="submit">更新</v-btn>
        </v-form>
        <v-btn depressed color="error" @click.stop="dialog = true">ポートフォリオを削除</v-btn>

        <v-dialog v-model="dialog" max-width="290">
          <v-card>
            <v-card-title>本当に削除しますか？</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" flat="flat" @click="deletePortfolio">はい</v-btn>
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
  getProgrammingLanguageList,
  createPortfolio,
  getThumbnailUrl,
  checkEditRights,
  getPortfolioInfo,
  deletePortfolio,
  deleteThumbnailOnFirebase
} from "@/lib/api-service";

export default {
  data() {
    return {
      valid: true,
      dialog: false,
      currentUserId: 0,
      portfolioUrl: "",
      title: "",
      titleAtLoadingPage:"",
      description: "",
      programmingLanguages: [],
      programmingLanguageList: [],
      userId: 0,
      thumbnailUrl: "",
      isUrl: [
        v => !!v || "入力必須項目です。",
        v => /http/.test(v) || "URLを入力してください。"
      ],
      titleRules: [
        v => !!v || "入力必須項目です。",
        v => (v && v.length <= 30) || "30文字以内で入力してください。"
      ],
      descriptionRules: [
        v => !!v || "入力必須項目です。",
        v => (v && v.length <= 140) || "140文字以内で入力してください。"
      ]
    };
  },
  methods: {
    checkEditRights: async function() {
      this.editRights = await checkEditRights(this.userId);
      if (!this.editRights) {
        this.$router.push({ name: "Home" });
        this.$emit("makeAlert", "編集権限がありません。");
      }
    },
    createPortfolio: async function() {
      this.valid = false;
      this.$emit("makeAlert", "登録処理をしています。少々お待ちください。");
      const portfolioInfo = {
        portfolioUrl: this.portfolioUrl,
        title: this.title,
        description: this.description,
        programmingLanguages: this.programmingLanguages,
        thumbnailUrl: await getThumbnailUrl(
          this.portfolioUrl,
          this.currentUserId,
          this.title
        )
      };
      const res = await createPortfolio(portfolioInfo);
      if (res.errors) {
        this.$emit("makeAlert", "入力内容にエラーがあります。");
        this.valid = true;
      } else {
        this.$router.push({ name: "Home" });
        this.$emit("makeAlert", res.message);
      }
    },
    getPortfolioInfo: async function() {
      const { portfolioId } = this.$route.params;
      const portfolioInfo = await getPortfolioInfo(portfolioId);
      this.portfolioUrl = portfolioInfo.url;
      this.title = portfolioInfo.title;
      this.titleAtLoadingPage = portfolioInfo.title;
      this.description = portfolioInfo.description;
      this.userId = portfolioInfo.created_by;
      this.programmingLanguages = portfolioInfo.programmingLanguages;
      this.thumbnailUrl = portfolioInfo.thumbnail_url;
      if (!this.portfolioUrl) {
        this.$router.push({ name: "Home" });
        this.$emit("makeAlert", "ポートフォリオが見つかりません。");
      }
      this.checkEditRights();
    },
    deletePortfolio: async function() {
      this.dialog = false;
      const { portfolioId } = this.$route.params;
      const { message } = await deletePortfolio(portfolioId);
      if (this.thumbnailUrl) {
        await deleteThumbnailOnFirebase(this.userId, this.titleAtLoadingPage);
      }
      this.$router.push({ name: "Home" });
      this.$emit("makeAlert", message);
    },
    getProgrammingLanguageList: async function() {
      const res = await getProgrammingLanguageList();
      this.programmingLanguageList = res.name;
    },
    submit: function() {
      this.createPortfolio();
    }
  },
  mounted() {
    this.getPortfolioInfo();
    this.getProgrammingLanguageList();
    this.$refs.form.resetValidation();
  },
  watch: {
    $route() {
      this.getPortfolioInfo();
    }
  }
};
</script>