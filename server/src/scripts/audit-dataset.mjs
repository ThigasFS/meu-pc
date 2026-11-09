
import fs from "node:fs";
import path from "node:path";

const file = path.resolve(
  "server/src/data/dataset.jsonl"
);

const lines = fs.readFileSync(file, "utf-8")
  .split(/\r?\n/)
  .filter(Boolean);

const categories = {
  cpu: [],
  "video-card": [],
  memory: [],
  "internal-hard-drive": [],
};

function hasPrice(item) {
  return Number.isFinite(Number(item.price_eur))
    && Number(item.price_eur) > 0;
}

function hasValue(value) {
  return value !== undefined
    && value !== null
    && String(value).trim() !== "";
}

function validCPU(item) {
  const s = item.specs;

  return hasPrice(item)
    && hasValue(s["Core Count"])
    && hasValue(s["Performance Core Clock"])
    && hasValue(s["Performance Core Boost Clock"]);
}

function validGPU(item) {
  const s = item.specs;

  return hasPrice(item)
    && hasValue(s["Memory"])
    && hasValue(s["Core Clock"])
    && hasValue(s["Boost Clock"]);
}

function validRAM(item) {
  const s = item.specs;

  return hasPrice(item)
    && hasValue(s["Modules"])
    && hasValue(s["Speed"])
    && hasValue(s["First Word Latency"]);
}

function validStorage(item) {
  const s = item.specs;

  return hasPrice(item)
    && hasValue(s["Capacity"])
    && hasValue(s["Interface"])
    && hasValue(s["Type"]);
}

const validators = {
  cpu: validCPU,
  "video-card": validGPU,
  memory: validRAM,
  "internal-hard-drive": validStorage,
};

for (const line of lines) {
  try {
    const item = JSON.parse(line);

    if (categories[item.category]) {
      categories[item.category].push(item);
    }
  } catch {
    console.warn("Linha JSON inválida:", line.slice(0, 100));
  }
}

console.log("\n===== AUDITORIA DO DATASET =====");
console.log("Total de registros:", lines.length);

for (const [category, products] of Object.entries(categories)) {
  const valid = products.filter(validators[category]);
  const withoutPrice = products.filter(item => !hasPrice(item));

  console.log(`\n${category}`);
  console.log("Total:", products.length);
  console.log("Válidos:", valid.length);
  console.log("Sem preço:", withoutPrice.length);
  console.log("Descartados:", products.length - valid.length);

  console.log("Exemplos válidos:",
    valid.slice(0, 3).map(item => item.name)
  );
}
