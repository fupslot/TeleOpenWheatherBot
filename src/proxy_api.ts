import ngrok from "ngrok";

const { NGROK_AUTH_TOKEN } = process.env;

if (!NGROK_AUTH_TOKEN) {
  throw new Error("NGROK_AUTH_TOKEN_ERROR");
}

export default {
  connect: async (): Promise<string> => {
    const url = await ngrok
      .authtoken(NGROK_AUTH_TOKEN)
      .then(() => ngrok.connect(3000));

    console.log("proxy url (ngrok)", url);

    return Promise.resolve(url);
  },
};
