import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src/data/db.json");

export function readDb() {
  const jsonRaw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(jsonRaw);
}

export function writeDb(data: any) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}
