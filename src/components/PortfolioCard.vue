<template>
  <v-container fluid grid-list-xl>
    <v-layout row wrap justify-start>
      <v-flex xs12 sm6 md4 lg3 v-for="card in cards" :key="card.id">
        <v-card :to="{ name: '#', params: { id: card.id } }">
          <v-img :src="card.image" height="200px"></v-img>
          <v-card-title primary-title>
            <h3 class="headline">{{ cutWordsIfOver(card.title, 30) }}</h3>
          </v-card-title>
          <v-card-text>
            <div>{{ cutWordsIfOver(card.description, 140) }}</div>
            <h4>
              使用言語：
              <span v-for="(language, i) in card.languages" :key="i">
                {{ language + " " }}
              </span>
            </h4>
            <h4>{{ "作者：" + cutWordsIfOver(card.author, 30) }}</h4>
            <h4>{{ "いいね：" + card.good }}</h4>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: function() {
    return {
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
};
</script>
