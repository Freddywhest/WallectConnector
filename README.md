> [<img src="https://img.shields.io/badge/Telegram-%40Me-orange">](https://t.me/roddyfred)

# Use Node.Js 18 or greater

## Available Mini Games

| Games                   |
| ----------------------- |
| Tomarket                |
| More will be added soon |

## Functionality

| Functional                                                      | Supported |
| --------------------------------------------------------------- | :-------: |
| Auto creating and connecting ton wallets to telegram mini games |    ✅     |
| Multithreading                                                  |    ✅     |
| Binding a proxy to a session                                    |    ✅     |
| Binding a proxy to a session/query_id                           |    ✅     |

## [How to add query id](https://github.com/Freddywhest/RockyRabbitBot/blob/main/AddQueryId.md)

## [Settings](https://github.com/FreddyWhest/WallectConnector/blob/main/.env-example)

| Settings                       | Description                                                                        |
| ------------------------------ | ---------------------------------------------------------------------------------- |
| **API_ID / API_HASH**          | Platform data from which to launch a Telegram session (stock - Android)            |
| **AUTO_PLAY_GAME**             | Whether the bot play the games (True / False)                                      |
| **WORD_PHRASE_LENGTH**         | The lneght of the wallet phrase the bot should generate. (12 or 24)                |
| **MAX_CONCURRENT_ACCOUNT**     | Defines the maximum number of accounts that can run concurrently at a time (e.g 5) |
| **DELAY_BETWEEN_STARTING_BOT** | Delay between starting in seconds (eg. [20, 30])                                   |
| **USE_PROXY_FROM_JS_FILE**     | Whether to use proxy from the `bot/config/proxies.js` file (True / False)          |
| **USE_PROXY_FROM_TXT_FILE**    | Whether to use proxy from the `bot/config/proxies.txt` file (True / False)         |
| **TOKEN_FROM_BOT**             | Token generated from `freddy59_bot`                                                |

## Installation

You can download [**Repository**](https://github.com/FreddyWhest/WallectConnector) by cloning it to your system and installing the necessary dependencies:

```shell
~ >>> git clone https://github.com/FreddyWhest/WallectConnector.git
~ >>> cd WallectConnector

#Linux and MocOS
~/WallectConnector >>> chmod +x check_node.sh
~/WallectConnector >>> ./check_node.sh

OR

~/WallectConnector >>> npm install
~/WallectConnector >>> cp .env-example .env
~/WallectConnector >>> nano .env # Here you must specify your API_ID and API_HASH , the rest is taken by default
~/WallectConnector >>> node index.js

#Windows
1. Double click on INSTALL.bat in WallectConnector directory to install the dependencies
2. Double click on START.bat in WallectConnector directory to start the bot

OR

~/WallectConnector >>> npm install
~/WallectConnector >>> cp .env-example .env
~/WallectConnector >>> # Specify your API_ID and API_HASH, the rest is taken by default
~/WallectConnector >>> node index.js
```

Also for quick launch you can use arguments, for example:

```shell
~/WallectConnector >>> node index.js --action=1

OR

~/WallectConnector >>> node index.js --action=2

#1 - Create session
#2 - Run clicker
```
