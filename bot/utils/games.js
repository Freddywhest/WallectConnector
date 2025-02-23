module.exports = [
  {
    name: "ToMarket",
    apiUrl: "https://api-web.tomarket.ai",
    peer: "Tomarket_ai_bot",
    bot: "Tomarket_ai_bot",
    webviewUrl: "https://mini-app.tomarket.ai/",
    origin: "https://mini-app.tomarket.ai",
    referer: "https://mini-app.tomarket.ai/",
    id: "tomarket",
    description: "",
    disabled: false,
    headers: {
      "content-type": "application/json",
      accept: "application/json, text/plain, */*",
      "sec-fetch-site": "same-site",
      "accept-encoding": "gzip, deflate",
      "accept-language": "en-US,en;q=0.9",
      "sec-fetch-mode": "cors",
      origin: "https://mini-app.tomarket.ai",
      "user-agent":
        "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
      referer: "https://mini-app.tomarket.ai/",
      "sec-fetch-dest": "empty",
    },
  },
  /* {
    name: "Not Pixel",
    apiUrl: "https://notpx.app",
    pageUrl: "https://plausaible.joincommunity.xyz",
    peer: "notpixel",
    bot: "notpixel",
    webviewUrl: "https://app.notpx.app/",
    origin: "https://app.notpx.app/",
    referer: "https://app.notpx.app/",
    headers: {},
    id: "notpixel",
    description: "",
  }, */
];
