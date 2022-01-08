import dotenv from "dotenv";
dotenv.config();

import BotApi from "./bot_api";
import http from "./http";
import proxy from "./proxy_api";

async function main() {
  const url = await proxy.connect();
  const bot = BotApi({ proxyUrl: url });

  const app = http(bot);

  return bot.init().then(() => {
    app.listen(3000, () => {
      console.log("Listening on port 3000");
    });
  });
}

main().catch(console.error);
