import ngrok from "ngrok"
import dotenv from "dotenv"
dotenv.config()

const { NGROK_AUTH_TOKEN } = process.env

if (!NGROK_AUTH_TOKEN) {
    throw new Error("NGROK_AUTH_TOKEN_ERROR")
}

ngrok.authtoken(NGROK_AUTH_TOKEN).then(() => {
    return ngrok.connect(3000).then((url) => {
        console.log(url)
    })
})