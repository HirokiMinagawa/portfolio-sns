<template>
  <v-layout row wrap>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-spacer></v-spacer>
        <v-btn v-show="editRights" class="edit" :to="{ name: 'UserInfoEdit'}" icon>
          <v-icon>edit</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-img :src="profPic" height="300px" alt="プロフィール画像"></v-img>
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

          <v-flex v-show="!!programmingLanguage">
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-sub-title>得意言語</v-list-tile-sub-title>
                <div>{{ programmingLanguage }}</div>
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

          <v-flex v-show="!!TwitterAccount">
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-sub-title>Twitterアカウント</v-list-tile-sub-title>
                <a :href="TwitterAccount">{{ TwitterAccount }}</a>
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

          <v-container fluid grid-list-xl v-show="cards.length">
            <v-layout column wrap justify-start>
              <v-list-tile>
                <v-list-tile-title>ポートフォリオ一覧</v-list-tile-title>
              </v-list-tile>
              <v-flex xs12 sm6 md4 lg3 v-for="card in cards" :key="card.id">
                <v-card :to="{ name: '#', params: { id: card.id } }">
                  <v-img :src="card.image" height="200px"></v-img>
                  <v-card-title primary-title>
                    <h3 class="headline">{{ cutWordsIfOver(card.title, 50) }}</h3>
                  </v-card-title>
                  <v-card-text>
                    <div>{{ cutWordsIfOver(card.description, 140) }}</div>
                    <h4>
                      使用言語：
                      <span
                        v-for="(language, i) in card.languages"
                        :key="i"
                      >{{ language + " " }}</span>
                    </h4>
                    <h4>{{ "作者：" + cutWordsIfOver(card.author, 30) }}</h4>
                    <h4>{{ "いいね：" + card.good }}</h4>
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
import { checkEditRights } from "@/lib/api-service";

export default {
  data() {
    return {
      editRights: false,
      name: "皆川ヒロキ",
      profPic: "https://cdn.vuetifyjs.com/images/lists/ali.png",
      selfIntroduction:
        "ああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ",
      programmingLanguage: "JavaScript",
      programmingExperience: "5",
      gitHubAccount: "https://github.com/",
      TwitterAccount: "https://twitter.com/osakana373",
      otherURL: "https://www.twitch.tv/",
      otherUrlDescription: "ツイッチです。",
      cards: [
        {
          id: 1,
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_R1q0635pY6k2PcnjB8LHydRlRfQNmdnWGBikXTlEGbVIvVpK4A",
          title:
            "ポートフォリオ SNSa twieifj saeifje wefjwoeij weojfwoie wefojwefoj",
          description:
            "普通の日本語の文章だったらどうだろう。さらに文字数を増やしていくとどうなるこれ以上はどこまでいけるのだろうか。まだまだ永遠にいけるのではないか",
          languages: [],
          good: 123,
          author: "オーサーが普通の文章だった場合はどうなる"
        },
        {
          id: 2,
          image:
            "https://www.pokemon.co.jp/ex/pika_vee/story/images/img_180713_08_01.png",
          title:
            "ポートフォリオ SNSうあああああああああああああああああああああああああああああああああ",
          description: "qqqqqqqqqqqqqqqqqqqqqqqqq",
          languages: ["JavaScript", "PHP"],
          good: 123,
          author: "2"
        },
        {
          id: 3,
          image:
            "https://img-eshop.cdn.nintendo.net/i/5f4d7a7761aef871411cbd4e5440bba2d748c23271b71f52c3675981f8fcc5ab.jpg?w=1000",
          title: "ポートフォリオ SNS",
          description: "qqqqqqqqqqqqqqqqqqqqqqqqq",
          languages: ["JavaScript", "PHP", "colob", "sdgw", "seerwt", "ewerwe"],
          good: 123,
          author: "3"
        },
        {
          id: 4,
          image:
            "https://external-preview.redd.it/JqDcC6cFjSC5i64mGLb3n0iK4QMdEreotGnc2aVFkXM.jpg?auto=webp&s=166b8a16013b79c69c03db23a7e3b9889fd0335c",
          title: "",
          description: "",
          languages: "",
          good: "",
          author: ""
        },
        {
          id: 5,
          image: "",
          title: "",
          description: "",
          languages: "",
          good: "",
          author: ""
        },
        {
          id: 6,
          image: "",
          title: "",
          description: "",
          languages: "",
          good: "",
          author: ""
        },
        {
          id: 7,
          image: "",
          title:
            "ポートフォリオ SNSうあああああああああああああああああああああああああああああああああ",
          description:
            "普通の日本語の文章だったらどうだろう。さらに文字数を増やしていくとどうなるこれ以上はどこまでいけるのだろうか。まだまだ永遠にいけるのではないか",
          languages: ["JavaScript", "PHP"],
          good: 123,
          author:
            "1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
        }
      ]
    };
  },
  methods: {
    checkEditRights: async function() {
      const { userId } = this.$route.params;
      this.editRights = await checkEditRights(userId);
    }
  },
  created() {
    this.checkEditRights();
  },
  watch: {
    $route() {
      this.checkEditRights();
    }
  }
};
</script>
