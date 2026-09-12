import { Client } from "pg";
import { env } from "../config/env";

function isSafeDatabaseName(name: string): boolean {
  return /^[A-Za-z0-9_]+$/.test(name);
}

function getConnectionCode(error: unknown): string {
  if (typeof error === "object" && error && "code" in error && error.code) {
    return String(error.code);
  }

  if (error instanceof AggregateError) {
    const nested = error.errors[0];
    if (typeof nested === "object" && nested && "code" in nested && nested.code) {
      return String(nested.code);
    }
  }

  return "unknown";
}

export async function ensureTestDatabase(): Promise<void> {
  const testUrl = new URL(env.databaseUrlTest);
  const databaseName = decodeURIComponent(testUrl.pathname.replace(/^\//, ""));

  if (!isSafeDatabaseName(databaseName)) {
    throw new Error("Nombre de base de datos de test inválido");
  }

  const adminUrl = new URL(env.databaseUrlTest);
  adminUrl.pathname = "/postgres";

  const client = new Client({ connectionString: adminUrl.toString() });

  try {
    await client.connect();
  } catch (error) {
    throw new Error(
      `No se pudo conectar a PostgreSQL para preparar washticket_test (${getConnectionCode(error)}). Verifica que el servicio local esté en ejecución y que DATABASE_URL_TEST sea correcto.`,
      { cause: error },
    );
  }

  try {
    const existing = await client.query("SELECT 1 FROM pg_database WHERE datname = $1", [
      databaseName,
    ]);

    if (existing.rowCount === 0) {
      await client.query(`CREATE DATABASE ${databaseName}`);
    }
  } finally {
    await client.end();
  }
}
