import unnamed from "unnamed-js";
import { log } from "./utils/logs";
import { command } from "./utils/interfaces";
import api from "./actions";

interface commandList {
  title: string;
  description?: string;
  command: string;
  maintenance?: boolean;
  unprefix?: boolean;
  script: string;
}

// TODO: Initiation of Variables
const TOKEN = "";
const VERSION = "";
const $commands: commandList[] = [];
let $webhook = "/webhook";
let hostname = "";

// TODO: Core functions
function _processor(event: Record<string, any>) {
  let done = true;
}

// TODO: Export Functions
export function addCommand(script: string, command: command) {
  $commands.push({
    ...command,
    script: script,
  });
}

export function getToken() {
  return TOKEN;
}

export function getVersion() {
  return VERSION;
}

export function setWebhook(webhook: string) {
  if (!webhook.startsWith("/")) {
    webhook = `/${webhook}`;
  }
  if (webhook.endsWith("/")) {
    webhook = webhook.substring(1);
  }
  $webhook = webhook;
}

export default function start(callback?: Function, port?: number) {
  if (!port) {
    port = 3000;
  }
  if (!callback) {
    callback = function () {
      log("INIT", `Server initiated with port: ${port}`);
    };
  }
  const app = unnamed();
  app.startServer(port, callback);

  app.GET("/", (req, res) => {
    res.send("I miss you");
  });

  app.GET($webhook, (req, res) => {
    hostname = req.hostname;
    if (req.query) {
      const query = req.query;
      const mode = query["hub.mode"];
      const token = query["hub.verify_token"];
      const challenge = query["hub.challenge"];
      if (token && mode) {
        if (mode === "subscribe" && token === TOKEN) {
          res.code(200).send(challenge);
        }
      }
    }
    res.code(403).send("Amaterasu");
  });

  app.POST($webhook, (req, res) => {
    hostname = req.hostname;
    if (req.body) {
      const body = req.body;
      if (body.object === "page") {
        body.entry.forEarch((entry) => {
          entry.messaging.forEarch((event) => {
            if (event.message) {
              if (event.message.text) {
                _processor(event);
              }
            }
          });
        });
      }
    }
    res.code(403).send("Forbidden");
  });
}

export { api };
