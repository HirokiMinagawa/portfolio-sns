<template>
  <v-container>
    <v-layout column wrap>
      <v-flex xs12 sm10 md8 lg6>
        <v-form ref="form" lazy-validation v-model="valid" @submit.prevent="submit">
          <v-text-field v-model="portfolioUrl" label="ポートフォリオURL"></v-text-field>
          <v-text-field v-model="title" label="タイトル"></v-text-field>
          <v-textarea v-model="description" label="説明文"></v-textarea>
          <v-combobox
            v-model="programmingLanguages"
            :items="programmingLanguageList"
            label="使用言語"
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
import {
  getProgrammingLanguageList,
  getcurrentUserId,
  createPortfolio
} from "@/lib/api-service";

export default {
  data() {
    return {
      valid: true,
      currentUserId: 0,
      portfolioUrl: "",
      title: "",
      description: "",
      programmingLanguages: [],
      programmingLanguageList: []
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
      const portfolioInfo = {
        portfolioUrl: this.portfolioUrl,
        title: this.title,
        description: this.description,
        programmingLanguages: this.programmingLanguages
      };
      const res = await createPortfolio(portfolioInfo);
      if (res.errors) {
        this.$emit("makeAlert", "入力内容にエラーがあります。");
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
    // this.$refs.form.resetValidation();
  },
  watch: {
    $route() {
      this.checkCreateRights();
    }
  }
};
</script>
