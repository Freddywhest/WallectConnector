const { default: axios } = require("axios");
const logger = require("../../utils/logger");
const { HttpsProxyAgent } = require("https-proxy-agent");
const settings = require("../../config/config");
const user_agents = require("../../config/userAgents");
const fs = require("fs");
const sleep = require("../../utils/sleep");
const parser = require("../../utils/parser");
const _ = require("lodash");
const moment = require("moment");
const path = require("path");
const { WC } = require("../../utils/helper");

class NonSession {
  constructor(query_id, query_name, game) {
    this.bot_name = "wallet-connector";
    this.session_name = query_name;
    this.query_id = query_id;
    this.session_user_agents = this.#load_session_data();
    this.user_agent = this.#get_user_agent();
    this.game = game;
  }

  #load_session_data() {
    try {
      const filePath = path.join(process.cwd(), "session_user_agents.json");
      const data = fs.readFileSync(filePath, "utf8");
      return JSON.parse(data);
    } catch (error) {
      if (error.code === "ENOENT") {
        return {};
      } else {
        throw error;
      }
    }
  }

  #get_random_user_agent() {
    const randomIndex = Math.floor(Math.random() * user_agents.length);
    return user_agents[randomIndex];
  }

  #get_user_agent() {
    if (this.session_user_agents[this.session_name]) {
      return this.session_user_agents[this.session_name];
    }

    logger.info(
      `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Generating new user agent...`
    );

    const newUserAgent = this.#get_random_user_agent();
    this.session_user_agents[this.session_name] = newUserAgent;
    this.#save_session_data(this.session_user_agents);
    return newUserAgent;
  }

  #save_session_data(session_user_agents) {
    const filePath = path.join(process.cwd(), "session_user_agents.json");
    fs.writeFileSync(filePath, JSON.stringify(session_user_agents, null, 2));
  }

  #proxy_agent(proxy) {
    try {
      if (!proxy) return null;
      let proxy_url;
      if (!proxy.password && !proxy.username) {
        proxy_url = `${proxy.protocol}://${proxy.ip}:${proxy.port}`;
      } else {
        proxy_url = `${proxy.protocol}://${proxy.username}:${proxy.password}@${proxy.ip}:${proxy.port}`;
      }
      return new HttpsProxyAgent(proxy_url);
    } catch (e) {
      logger.error(
        `<ye>[${this.bot_name}]</ye> | ${
          this.session_name
        } | Proxy agent error: ${e}\nProxy: ${JSON.stringify(proxy, null, 2)}`
      );
      return null;
    }
  }

  async #get_tg_web_data() {
    try {
      return this.query_id;
    } catch (error) {
      logger.error(
        `<ye>[${this.bot_name}]</ye> | ${this.session_name} | ❗️Unknown error during Authorization: ${error}`
      );
      throw error;
    } finally {
      await sleep(1);
      logger.info(
        `<ye>[${this.bot_name}]</ye> | ${this.session_name} | 🚀 Starting session...`
      );
    }
  }

  async #check_proxy(http_client, proxy) {
    try {
      const response = await http_client.get("https://httpbin.org/ip");
      const ip = response.data.origin;
      logger.info(
        `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Proxy IP: ${ip}`
      );
    } catch (error) {
      if (
        error.message.includes("ENOTFOUND") ||
        error.message.includes("getaddrinfo") ||
        error.message.includes("ECONNREFUSED")
      ) {
        logger.error(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Error: Unable to resolve the proxy address. The proxy server at ${proxy.ip}:${proxy.port} could not be found. Please check the proxy address and your network connection.`
        );
        logger.error(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | No proxy will be used.`
        );
      } else {
        logger.error(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Proxy: ${proxy.ip}:${proxy.port} | Error: ${error.message}`
        );
      }

      return false;
    }
  }

  async run(proxy) {
    try {
      let http_client, tg_web_data, result;
      if (!this.game) {
        logger.error(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Game is not defined. Restart the bot.`
        );
        return;
      }
      if (
        (settings.USE_PROXY_FROM_TXT_FILE || settings.USE_PROXY_FROM_JS_FILE) &&
        proxy
      ) {
        http_client = axios.create({
          httpsAgent: this.#proxy_agent(proxy),
          headers: this.headers,
          withCredentials: true,
        });
        const proxy_result = await this.#check_proxy(http_client, proxy);
        if (!proxy_result) {
          http_client = axios.create({
            headers: this.headers,
            withCredentials: true,
          });
        }
      } else {
        http_client = axios.create({
          headers: this.headers,
          withCredentials: true,
        });
      }

      tg_web_data = await this.#get_tg_web_data();

      if (
        _.isNull(tg_web_data) ||
        _.isUndefined(tg_web_data) ||
        !tg_web_data ||
        _.isEmpty(tg_web_data)
      ) {
        logger.info(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | No tg_web_data found or tg_web_data is empty.`
        );
        return;
      }

      const Wallet = await WC();
      if (!_.isNull(Wallet)) {
        const wallet = new Wallet(
          this.game,
          http_client,
          settings,
          tg_web_data,
          this.session_name,
          logger,
          this.bot_name,
          parser
        );

        result = await wallet.run();
      }
      if (!result) {
        logger.info(
          `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Could not link wallet for session name [<la>${this.session_name}</la>]. Skipping...`
        );
      }
    } catch (error) {
      logger.error(
        `<ye>[${this.bot_name}]</ye> | ${this.session_name} | Error: ${error.message}`
      );
    }
  }
}

module.exports = NonSession;
