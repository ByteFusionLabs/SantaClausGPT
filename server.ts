/* eslint-disable @typescript-eslint/no-require-imports */
const openAI = require("openai");
const { SOCKET_ACTIONS } = require("./app_socket_constants.js");
const next = require("next");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const dotenv = require("dotenv");
const { v4: uuidv4 } = require("uuid");

dotenv.config();
const apiKey = process.env.OPENAI_API_KEY_SANTA;
const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
const model = "gpt-4o";

const openAIClient = new openAI({ apiKey });
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);
  const io = new Server(httpServer);

  const handleOnGenerateTextResponse = async (message) => {
    try {
      const fullPrompt = {
        model,
        messages: [
          {
            role: "system",
            content:
              "You are Santa Claus, filled with Christmas cheer. Respond with holiday magic, jokes, and kind words.",
          },
          { role: "user", content: message.text },
        ],
      };
      const textGenerationOutput =
        await openAIClient.chat.completions.create(fullPrompt);
      return textGenerationOutput;
    } catch (e) {
      // handle error
      console.log(e);
    }
  };

  io.on(SOCKET_ACTIONS.CONNECT, (socket) => {
    console.log("connected", socket.id);

    socket.on(SOCKET_ACTIONS.SEND_MESSAGE, async (message) => {
      console.log("message", message);
      socket.emit(SOCKET_ACTIONS.NEW_MESSAGE, message); // add current message to DB
      const response = await handleOnGenerateTextResponse(message);

      socket.emit(SOCKET_ACTIONS.NEW_MESSAGE, {
        text: response.choices[0].message.content,
        id: uuidv4(),
        isCurrentUser: false,
        roomId: message.roomId,
      });
    });

    socket.on(SOCKET_ACTIONS.DISCONNECT, () => {
      console.log("A user disconnected");
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
