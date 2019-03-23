const fetch = require("node-fetch");

const getThumbnailBase64 = async (req, res, next) => {
  try {
    const { portfolioUrl } = req.body;
    const base64 = await fetchScreenShotApi(portfolioUrl);
    return res.status(200).json({ base64 });
  } catch (error) {
    next(error);
  }
};

const fetchScreenShotApi = async url => {
  try {
    return await fetch(
      `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?screenshot=true&strategy=desktop&url=${url}`
    )
      .then(res => res.json())
      .then(json => {
        const base64 =
          json["lighthouseResult"]["audits"]["final-screenshot"]["details"][
            "data"
          ];
        return base64;
      });
  } catch (errot) {
    return { message: "サムネイルはありません" };
  }
};

module.exports = {
  getThumbnailBase64
};
