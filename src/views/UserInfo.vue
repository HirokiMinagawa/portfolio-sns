<template>
  <v-layout row wrap>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-spacer></v-spacer>
        <v-btn v-show="editRights" class="edit" :to="{ name: 'UserInfoEdit'}" icon>
          <v-icon>edit</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-img :src="profImgUrl" height="300px" alt="プロフィール画像"></v-img>
        <v-card-title>
          <div class="display-1 pl-5 pt-5">{{ name }}</div>
        </v-card-title>

        <v-list two-line class="pl-5 pr-5">
          <v-flex v-show="!!selfIntroduction">
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-sub-title>自己紹介</v-list-tile-sub-title>
                <div>{{ selfIntroduction }}</div>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>
          </v-flex>

          <v-flex v-show="!!programmingLanguages.length">
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-sub-title>得意言語</v-list-tile-sub-title>
                <div>
                  <v-chip
                    v-for="(programmingLanguage, i) in programmingLanguages"
                    :key="i"
                  >{{ programmingLanguage }}</v-chip>
                </div>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>
          </v-flex>

          <v-flex v-show="!!programmingExperience">
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-sub-title>エンジニア歴 (年)</v-list-tile-sub-title>
                <div>{{ programmingExperience }}</div>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>
          </v-flex>

          <v-flex v-show="!!gitHubAccount">
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-sub-title>GitHubアカウント</v-list-tile-sub-title>
                <a :href="gitHubAccount">{{ gitHubAccount }}</a>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>
          </v-flex>

          <v-flex v-show="!!twitterAccount">
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-sub-title>Twitterアカウント</v-list-tile-sub-title>
                <a :href="twitterAccount">{{ twitterAccount }}</a>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>
          </v-flex>

          <v-flex v-show="!!otherURL">
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-sub-title>その他URL</v-list-tile-sub-title>
                <div>{{ otherUrlDescription }}</div>
                <a :href="otherURL">{{ otherURL }}</a>
              </v-list-tile-content>
            </v-list-tile>
          </v-flex>

          <v-divider></v-divider>

          <v-container fluid grid-list-xl v-show="!!portfolios">
            <v-layout column wrap justify-start>
              <v-list-tile>
                <v-list-tile-title>ポートフォリオ一覧</v-list-tile-title>
              </v-list-tile>
              <v-flex xs12 sm6 md4 lg3 v-for="portfolio in portfolios" :key="portfolio.id">
                <v-card :href="portfolio.url">
                  <v-img :src="portfolio.thumbnail_url" height="200px"></v-img>
                  <v-card-title primary-title>
                    <h3 class="headline">{{ portfolio.title }}</h3>
                  </v-card-title>
                  <v-card-text>
                    <div>{{ portfolio.description }}</div>
                    <h4>
                      使用言語：
                      <span
                        v-for="(language, i) in portfolio.portfolioProgrammingLanguages"
                        :key="i"
                      >{{ language + " " }}</span>
                    </h4>
                    <h4>{{ "いいね：" + portfolio.good }}</h4>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { checkEditRights, getUserInfo } from "@/lib/api-service";

export default {
  data() {
    return {
      editRights: false,
      name: "",
      profImgUrl: "",
      selfIntroduction: "",
      programmingLanguages: "",
      programmingExperience: "",
      gitHubAccount: "",
      twitterAccount: "",
      otherURL: "",
      otherUrlDescription: "",
      portfolios: []
    };
  },
  methods: {
    checkEditRights: async function() {
      const { userId } = this.$route.params;
      this.editRights = await checkEditRights(userId);
    },
    getUserInfo: async function() {
      const { userId } = this.$route.params;
      const userInfo = await getUserInfo(userId);
      this.name = userInfo.name;
      this.profImgUrl = userInfo.prof_img_url;
      this.selfIntroduction = userInfo.self_introduction;
      this.programmingLanguages = userInfo.userProgrammingLanguages;
      this.programmingExperience = userInfo.programming_experience;
      this.gitHubAccount = userInfo.github_account;
      this.twitterAccount = userInfo.twitter_account;
      this.otherURL = userInfo.other_url;
      this.otherUrlDescription = userInfo.other_url_comment;
      this.portfolios = userInfo.portfolios;
      if (!this.name) {
        this.$router.push({ name: "Home" });
        this.$emit("makeAlert", "ユーザーが見つかりません。");
      }
    }
  },
  created() {
    this.checkEditRights();
    this.getUserInfo();
  },
  watch: {
    $route() {
      this.checkEditRights();
      this.getUserInfo();
    }
  }
};
</script>
