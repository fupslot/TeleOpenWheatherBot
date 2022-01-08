import axios from "axios";

interface BotOptions {
  proxyUrl: string;
}

type MessageReply = {
  chat_id: number | string;
  text: string;
  parse_mode?: "Markdown" | "HTML";
};

export interface Bot {
  URL: string;
  sendMessage: (message: MessageReply) => Promise<void>;
  init: () => Promise<void>;
}

export default (opts: BotOptions): Bot => {
  const { BOT_TOKEN } = process.env;
  const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;
  const URL = `/webhook/${BOT_TOKEN}`;
  const WEBHOOK_URL = opts.proxyUrl + URL;

  const init = async (): Promise<void> => {
    const res = await axios.get(
      `${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`
    );

    console.log("setWebhook", res.data);
    return Promise.resolve();
  };

  const sendMessage = async (message: MessageReply): Promise<void> => {
    const res = await axios.post(
      `${TELEGRAM_API}/sendMessage?url=${WEBHOOK_URL}`,
      {
        chat_id: message.chat_id,
        text: message.text,
        parse_mode: message.parse_mode,
      }
    );

    console.log("sendMessage", res.data.ok);

    return Promise.resolve();
  };

  return {
    URL,
    init,
    sendMessage,
  };
};
