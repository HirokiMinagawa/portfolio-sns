export const getProgrammingLanguageList = async function() {
    const res = await fetch(`/api/programminglanguage`);
    return res.json();
  };
  