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
            :rules="[v => (v && v.length >= 1) || '入力必須項目です。']"
            required
            multiple
            chips
          ></v-combobox>
          <v-btn color="primary" :disabled="!valid" type="submit">投稿</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { getProgrammingLanguageList } from "@/lib/api-programmingLanguage";
import { createPortfolio } from "@/lib/api-portfolio";
import { getcurrentUserId } from "@/lib/api-user";
import { getThumbnailUrl } from "@/lib/api-image";

export default {
  data() {
    return {
      valid: true,
      currentUserId: 0,
      portfolioUrl: "",
      title: "",
      description: "",
      programmingLanguages: [],
      programmingLanguageList: [],
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
    checkCreateRights: async function() {
      const { currentUserId } = await getcurrentUserId();
      if (!currentUserId) {
        this.$router.push({ name: "Home" });
        this.$emit("makeAlert", "ログインしてください。");
      } else {
        this.currentUserId = currentUserId;
      }
    },
    createPortfolio: async function() {
      this.valid = false;
      this.$emit("makeAlert", "登録処理をしています。画面が変わるまでお待ちください。");
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
    getProgrammingLanguageList: async function() {
      const res = await getProgrammingLanguageList();
      this.programmingLanguageList = res.name;
    },
    submit: function() {
      this.createPortfolio();
    }
  },
  mounted() {
    this.checkCreateRights();
    this.getProgrammingLanguageList();
    this.$refs.form.resetValidation();
  },
  watch: {
    $route() {
      this.checkCreateRights();
    }
  }
};
</script>
