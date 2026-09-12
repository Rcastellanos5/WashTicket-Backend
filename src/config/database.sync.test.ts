import { env } from "./env";

describe("política de sequelize.sync()", () => {
  it("el harness de test usa NODE_ENV=test y una base distinta", () => {
    expect(env.nodeEnv).toBe("test");
    expect(env.databaseUrlTest).toContain("washticket_test");
    expect(env.databaseUrlTest).not.toBe(env.databaseUrl);
  });
});
