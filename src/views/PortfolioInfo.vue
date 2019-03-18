<template>
  <v-layout row wrap>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-spacer></v-spacer>
        <v-btn v-show="editRights" class="edit" :to="{ name: 'PortfolioInfoEdit'}" icon>
          <v-icon>edit</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-img :src="thumbnail" height="300px" alt="サムネイル"></v-img>
        <v-card-title>
          <div class="display-1 pl-5 pt-5">{{ title }}</div>
        </v-card-title>

        <v-container class="pl-5">
          <v-layout row>
            <v-flex>
              <v-btn flat icon color="pink">
                <v-icon>favorite</v-icon>
              </v-btn>
              <span>{{ like }}</span>
            </v-flex>
          </v-layout>
        </v-container>

        <v-list two-line class="pl-5 pr-5">
          <v-card-title v-show="!!userName">
            <div>
              <span class="grey--text">製作者</span>
              <br>
              <span>{{ userName }}</span>
            </div>
          </v-card-title>
          <v-divider></v-divider>

          <v-card-title v-show="!!description">
            <div>
              <span class="grey--text">説明文</span>
              <br>
              <span>{{ description }}</span>
            </div>
          </v-card-title>
          <v-divider></v-divider>

          <v-card-title v-show="!!programmingLanguages.length">
            <div>
              <span class="grey--text">使用技術</span>
              <br>
              <v-chip
                v-for="(programmingLanguage, i) in programmingLanguages"
                :key="i"
              >{{ programmingLanguage }}</v-chip>
            </div>
          </v-card-title>

          <v-divider></v-divider>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { checkEditRights, getPortfolioInfo } from "@/lib/api-service";

export default {
  data() {
    return {
      editRights: false,
      description:
        "あああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ",
      portfolioUrl: "https://vuejsexamples.com/",
      title: "ポートフォリオタイトル",
      programmingLanguages: ["C"],
      userName: "あいう",
      like: 123,
      thumbnail: ""
    };
  },
  methods: {
    checkEditRights: async function() {
      const { userId } = this.$route.params;
      this.editRights = await checkEditRights(userId);
    },
    getPortfolioInfo: async function() {
      //処理を書く
      //ポートフォリオ テーブルの情報と、ユーザーIDと名前を取得。現在のユーザーと一致した場合は編集ボタンを表示。
    }
  },
  created() {
    this.checkEditRights();
    this.getPortfolioInfo();
  },
  watch: {
    $route() {
      this.checkEditRights();
      this.getPortfolioInfo();
    }
  }
};
</script>
