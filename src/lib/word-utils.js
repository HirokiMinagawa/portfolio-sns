export default {
  methods: {
    cutWordsIfOver: function(words, cutNum) {
      let results = "";
      if (words.length > cutNum) {
        results = words.slice(0, cutNum) + "...";
      } else {
        results = words;
      }
      return results;
    }
  }
};
