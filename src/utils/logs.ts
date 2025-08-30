export function log(
  from: string,
  message: string | Record<string, any> | Record<string, any>,
) {
  if (typeof message !== "string") {
    message = JSON.stringify(message);
  }
  console.log(`LOG [${from}]: ${message}`);
}

export function error(
  from: string,
  message: string | Record<string, any> | Record<string, any>,
) {
  if (typeof message !== "string") {
    message = JSON.stringify(message);
  }
  console.log(`ERR [${from}]: ${message}`);
}
