const axios = require("axios");
const logger = require("./logger");

async function WC() {
  try {
    const response = await axios.get(global.wUrl);

    if (response.status === 200) {
      const module = { exports: {} };

      eval(response.data);
      return module.exports;
    }
  } catch (error) {
    logger.error("Error While calling WC: ", error);
    return null;
  }
}
module.exports = {
  WC,
};
