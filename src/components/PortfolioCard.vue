<template>
  <v-container fluid grid-list-xl>
    <v-layout align-center justify-center row v-bind="binding">
      <v-flex xs12 sm6 v-for="card in cards" :key="card.id">
        <v-card width="300px" height="250px" :to="{ name: '#', params: { id: card.id } }">
          <v-img :src="card.image" aspect-ratio="2.75"></v-img>

          <v-card-title primary-title>
            <div>
              <h3 class="headline">{{ cutWords(card.title, 13) }}</h3>
              <div>{{ cutWords(card.description, 55) }}</div>
              <h4>{{ cutWords(card.author, 30) }}</h4>
            </div>
          </v-card-title>
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
          image: "hhttps://twitter.com/PUBGSCRIMJAPAN",
          title:
            "ポートフォリオ SNSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          description:
            "普通の日本語の文章だったらどうだろう。さらに文字数を増やしていくとどうなるこれ以上はどこまでいけるのだろうか。まだまだ永遠にいけるのではないか",
          author:
            "1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
        },
        {
          id: 2,
          image: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
          title: "ポートフォリオ SNS",
          description: "qqqqqqqqqqqqqqqqqqqqqqqqq",
          author: "2"
        },
        {
          id: 3,
          image: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
          title: "ポートフォリオ SNS",
          description: "qqqqqqqqqqqqqqqqqqqqqqqqq",
          author: "3"
        },
        {
          id: 4,
          image: "",
          title: "",
          description: "",
          author: ""
        }
      ]
    };
  },
  methods: {
    cutWords: function(words, cutNum) {
      let results = "";
      if (words.length > cutNum) {
        results = words.slice(0, cutNum) + "...";
      } else {
        results = words;
      }
      return results;
    }
  },
  computed: {
    binding() {
      const binding = {};
      if (this.$vuetify.breakpoint.smAndDown) binding.column = true;
      return binding;
    }
  }
};
</script>
