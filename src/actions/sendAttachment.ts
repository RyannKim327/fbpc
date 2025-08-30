import { existsSync } from "fs";
import { getToken, getVersion } from "..";
import { error } from "../utils/logs";

type fileType = "audio" | "image" | "video";

export default function sendAttachment(
	type: fileType,
	file: string,
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
	if (!event?.sender >.id) {
		if (callback) {
			return callback({
				error: "Sender ID is not defined in events"
			})
		}
	}
	if (!existsSync(file)) {
		if (callback) {
			return callback({
				error: "File not found"
			})
		}
		return error("Send Attachment", "File Not Found")
	}
	const data = {
		recipient: {
			id: event?.sender?.id
		},
		message: {
			attachment: {
				type: type,
				payload: {
					url: file,
					is_reusable: true
				}
			}
		}
	}

}
