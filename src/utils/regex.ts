export default function textToRegex(text: string) {
  return new RegExp(text, "i");
}
