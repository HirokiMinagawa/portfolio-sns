<template>
  <v-container fluid grid-list-xl>
    <v-flex xs12 sm6 d-flex>
      <v-select
        @change="searchPortfolio"
        v-model="selectedItem"
        :items="programmingLanguageList"
        box
        label="使用言語"
      >
        <template v-slot:prepend-item>
          <v-list-tile ripple @click="resetItems">
            <v-list-tile-content>
              <v-list-tile-title>条件なし</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider class="mt-2"></v-divider>
        </template>
      </v-select>
    </v-flex>
    <v-layout row wrap justify-start>
      <v-flex xs12 sm6 md4 lg3 v-for="portfolio in filteredPortfolios" :key="portfolio.id">
        <v-card :to="{name: 'PortfolioInfo', params: { portfolioId: portfolio.id }}">
          <v-img :src="portfolio.thumbnail_url" height="200px"></v-img>
          <v-card-title primary-title>
            <h3 class="headline">{{ portfolio.title }}</h3>
          </v-card-title>
          <v-flex>
            <v-btn flat icon color="pink">
              <v-icon>favorite</v-icon>
            </v-btn>
            <span>{{ portfolio.like }}</span>
          </v-flex>
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
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { getAllPortfolioInfo } from "@/lib/api-portfolio";
import { getProgrammingLanguageList } from "@/lib/api-programmingLanguage";

export default {
  data: function() {
    return {
      programmingLanguageList: [],
      selectedItem: [],
      portfolios: [],
      filteredPortfolios: []
    };
  },
  methods: {
    getPortfolioInfo: async function() {
      this.portfolios = await getAllPortfolioInfo();
      this.filteredPortfolios = this.portfolios.slice();
    },
    getProgrammingLanguageList: async function() {
      const res = await getProgrammingLanguageList();
      this.programmingLanguageList = res.name;
    },
    searchPortfolio: function() {
      if (!this.selectedItem) return null;
      this.filteredPortfolios = this.portfolios.filter(portfolio => {
        return portfolio.programmingLanguages.indexOf(this.selectedItem) >= 0;
      });
    },
    resetItems: function() {
      this.selectedItem = "";
      this.filteredPortfolios = this.portfolios.slice();
    }
  },
  created() {
    this.getPortfolioInfo();
    this.getProgrammingLanguageList();
  }
};
</script>
