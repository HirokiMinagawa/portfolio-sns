<template>
  <v-container fluid grid-list-xl>
    <v-layout row wrap justify-start>
      <v-flex xs12 sm6 md4 lg3 v-for="portfolio in portfolios" :key="portfolio.id">
        <v-card :to="{name: 'PortfolioInfo', params: { portfolioId: portfolio.id }}">
          <v-img :src="portfolio.thumbnail_url" height="200px"></v-img>
          <v-card-title primary-title>
            <h3 class="headline">{{ portfolio.title }}</h3>
          </v-card-title>
          <v-card-text>
            <div>{{ portfolio.description }}</div>
            <h4>
              使用言語：
              <v-chip
                v-for="(programmingLanguage, i) in portfolio.programmingLanguages"
                :key="i"
              >{{ programmingLanguage }}</v-chip>
            </h4>
            <h4>{{ "作者：" + portfolio.userName }}</h4>
            <h4>{{ "いいね：" + portfolio.good }}</h4>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { getAllPortfolioInfo } from "@/lib/api-service";

export default {
  data: function() {
    return {
      portfolios: []
    };
  },
  methods: {
    getPortfolioInfo: async function() {
      this.portfolios = await getAllPortfolioInfo();
    }
  },
  created() {
    this.getPortfolioInfo();
  }
};
</script>
