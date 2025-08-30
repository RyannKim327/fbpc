import axios from "axios";
import { error } from "../utils/logs";
import { getToken, getVersion } from "..";

export default function sendMessage(
  text: string,
  event: Record<string, any>,
  callback?: Function,
) {
  const TOKEN = getToken();
  const VERSION = getVersion();
  if (!TOKEN) {
    if (callback) {
      return callback(
        {
          error: "TOKEN is undefined",
        },
        null,
      );
    }
    return error("Send Message", "TOKEN is undefined");
  }
  if (!event.sender.id) {
    if (callback) {
      return callback(
        {
          error: "Sender ID is not existed",
        },
        null,
      );
    }
    return error("Send Message", "Sender ID is not existed");
  }
  axios
    .post(
      `https://graph.facebook.com/${VERSION}/me/messages?access_token=${TOKEN}`,
      {
        message: {
          text: text,
        },
        recipient: {
          id: event.sender.id,
        },
      },
    )
    .then((response) => {
      if (callback) {
        callback(null, response);
      }
    })
    .catch((error) => {
      callback(error, null);
    });
}
