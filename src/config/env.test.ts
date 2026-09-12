import { assertDistinctTestDatabase } from "./env";

describe("assertDistinctTestDatabase", () => {
  const developmentUrl = "postgres://postgres:postgres@localhost:5432/washticket";

  it("acepta una base de test con nombre distinto", () => {
    expect(() =>
      assertDistinctTestDatabase(
        developmentUrl,
        "postgres://postgres:postgres@localhost:5432/washticket_test",
      ),
    ).not.toThrow();
  });

  it("rechaza la misma URL de desarrollo", () => {
    expect(() => assertDistinctTestDatabase(developmentUrl, developmentUrl)).toThrow(
      /base distinta/,
    );
  });

  it("rechaza el nombre washticket", () => {
    expect(() =>
      assertDistinctTestDatabase(
        developmentUrl,
        "postgres://postgres:postgres@localhost:5432/washticket",
      ),
    ).toThrow(/base distinta|desarrollo/);
  });
});
