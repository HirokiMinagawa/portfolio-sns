import { getUserToken } from "./api-user";

export const createPortfolio = async function(portfolioInfo) {
  const idToken = await getUserToken();
  if (!idToken) return false;
  const res = await fetch(`/api/portfolio`, {
    method: "post",
    body: JSON.stringify(portfolioInfo),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + idToken
    }
  });
  return res.json();
};

export const getPortfolioInfo = async function(portfolioId) {
  const res = await fetch(`/api/portfolioinfo/${portfolioId}`, {
    method: "get"
  });
  return res.json();
};

export const getAllPortfolioInfo = async function() {
  const res = await fetch(`/api/portfolioinfo`, {
    method: "get"
  });
  return res.json();
};

export const deletePortfolio = async function(portfolioId) {
  const idToken = await getUserToken();
  if (!idToken) return false;
  const res = await fetch(`/api/deleteportfolio/${portfolioId}`, {
    headers: {
      Authorization: "Bearer " + idToken
    }
  });
  return res.json();
};

export const editPortfolio = async function(portfolioInfo) {
  const idToken = await getUserToken();
  if (!idToken) return false;
  const res = await fetch(`/api/portfolio/edit`, {
    method: "post",
    body: JSON.stringify(portfolioInfo),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + idToken
    }
  });
  return res.json();
};
