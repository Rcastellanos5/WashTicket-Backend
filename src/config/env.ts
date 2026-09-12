import dotenv from "dotenv";
import path from "node:path";

dotenv.config({ path: path.resolve(__dirname, "../../.env"), quiet: true });

export type NodeEnv = "development" | "test" | "production";

export type AppEnv = {
  nodeEnv: NodeEnv;
  port: number;
  databaseUrl: string;
  databaseUrlTest: string;
  frontendUrl: string;
};

function readNodeEnv(value: string | undefined): NodeEnv {
  if (value === "development" || value === "test" || value === "production") {
    return value;
  }

  return "development";
}

function requireEnv(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`La variable de entorno ${name} es obligatoria`);
  }

  return value;
}

function databaseNameFromUrl(url: string): string {
  const parsed = new URL(url);
  return decodeURIComponent(parsed.pathname.replace(/^\//, ""));
}

export function assertDistinctTestDatabase(databaseUrl: string, databaseUrlTest: string): void {
  const developmentName = databaseNameFromUrl(databaseUrl);
  const testName = databaseNameFromUrl(databaseUrlTest);

  if (!testName) {
    throw new Error("DATABASE_URL_TEST debe incluir el nombre de una base de datos");
  }

  if (databaseUrl === databaseUrlTest || developmentName === testName) {
    throw new Error("DATABASE_URL_TEST debe apuntar a una base distinta de DATABASE_URL");
  }

  if (testName === "washticket" || testName === "postgres") {
    throw new Error("Los tests no pueden usarse contra la base de desarrollo ni contra postgres");
  }
}

function loadEnv(): AppEnv {
  const nodeEnv = readNodeEnv(process.env.NODE_ENV);
  const databaseUrl = requireEnv("DATABASE_URL", process.env.DATABASE_URL);
  const databaseUrlTest = requireEnv("DATABASE_URL_TEST", process.env.DATABASE_URL_TEST);

  assertDistinctTestDatabase(databaseUrl, databaseUrlTest);

  return {
    nodeEnv,
    port: Number(process.env.PORT) || 4000,
    databaseUrl,
    databaseUrlTest,
    frontendUrl: requireEnv("FRONTEND_URL", process.env.FRONTEND_URL),
  };
}

export const env = loadEnv();

export function getActiveDatabaseUrl(): string {
  return env.nodeEnv === "test" ? env.databaseUrlTest : env.databaseUrl;
}
