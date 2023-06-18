import { nanoid } from "nanoid";

export function randomString(size = 21): string {
  return nanoid(size);
}
