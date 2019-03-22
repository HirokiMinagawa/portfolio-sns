export const increaseLike = async function(portfolioId) {
  const res = await fetch(`/api/increaselike/${portfolioId}`, {
    method: "get"
  });
  return res.json();
};

export const decreaseLike = async function(portfolioId) {
  const res = await fetch(`/api/decreaselike/${portfolioId}`, {
    method: "get"
  });
  return res.json();
};
