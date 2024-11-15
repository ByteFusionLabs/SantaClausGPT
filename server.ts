/* eslint-disable @typescript-eslint/no-require-imports */
const { SOCKET_ACTIONS } = require("./app_socket_constants.js");
const next = require("next");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const { HfInference } = require("@huggingface/inference");
const { v4: uuidv4 } = require("uuid");

// TODO all these config props to 'env' file
const token = "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";
const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
const chatModel = "gpt2";
const chatParams = {
  max_new_tokens: 100,
  temperature: 0.7,
  top_p: 0.9,
};

const inference = new HfInference(token);
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);
  const io = new Server(httpServer);

  const handleOnGenerateTextResponse = async (message) => {
    try {
      const fullPrompt = message.text; // generate prompt here
      const textGenerationOutput = await inference.textGeneration({
        model: chatModel,
        inputs: fullPrompt,
        parameters: chatParams,
      });
      console.log(textGenerationOutput);
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
        text: response.generated_text,
        id: uuidv4(),
        isCurrentUser: false,
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
