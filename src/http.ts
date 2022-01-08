import express, { Express } from "express";
import bodyParser from "body-parser";

import weatherApi from "./weather_api";
import { Message } from "./types";
import { Bot } from "./bot_api";
const app = express();

// const result = await weatherApi.fetch("Tel Aviv")
app.use(bodyParser.json({ strict: true }));
export default (bot: Bot): Express => {
  app.post(bot.URL, (req, res) => {
    if (req.body.message.photo) {
      console.log(req.body.message.photo);
    }

    const message = req.body.message as Message;

    const cityName = message.text;
    console.log("message text", message.text);

    weatherApi
      .fetch(cityName)
      .then((forecast) => {
        if (!forecast) {
          return bot.sendMessage({
            chat_id: message.chat.id,
            text: "city not found",
          });
        }

        return bot
          .sendMessage({
            chat_id: message.chat.id,
            text: `*city: ${forecast.city} wind: ${forecast.wind_speed}*`,
            parse_mode: "Markdown",
          })
          .catch(console.error);
      })
      .finally(() => res.send());
  });

  return app;
};
