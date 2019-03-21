<template>
  <v-layout row wrap>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-spacer></v-spacer>
        <v-btn v-show="editRights" class="edit" :to="{ name: 'PortfolioInfoEdit'}" icon>
          <v-icon>edit</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <a class="pl-5" :href="portfolioUrl">
          <v-img :src="thumbnailUrl" height="300px" alt="サムネイル"></v-img>
        </a>
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
      description: "",
      portfolioUrl: "",
      title: "",
      programmingLanguages: [],
      userName: "",
      userId: 0,
      like: 0,
      thumbnailUrl: ""
    };
  },
  methods: {
    checkEditRights: async function() {
      this.editRights = await checkEditRights(this.userId);
    },
    getPortfolioInfo: async function() {
      //ライクも実装
      const { portfolioId } = this.$route.params;
      const portfolioInfo = await getPortfolioInfo(portfolioId);
      this.portfolioUrl = portfolioInfo.url;
      this.title = portfolioInfo.title;
      this.description = portfolioInfo.description;
      this.userId = portfolioInfo.created_by;
      this.userName = portfolioInfo.userName;
      this.programmingLanguages = portfolioInfo.programmingLanguages;
      if (portfolioInfo.thumbnail_url) {
        this.thumbnailUrl = portfolioInfo.thumbnail_url;
      } else {
        this.thumbnailUrl =
          "https://haishin.ebookjapan.jp/contents/release/image/noimage_m.png";
      }
      this.checkEditRights();
      if (!this.portfolioUrl) {
        this.$router.push({ name: "Home" });
        this.$emit("makeAlert", "ポートフォリオが見つかりません。");
      }
    }
  },
  created() {
    this.getPortfolioInfo();
  },
  watch: {
    $route() {
      this.getPortfolioInfo();
    }
  }
};
</script>
