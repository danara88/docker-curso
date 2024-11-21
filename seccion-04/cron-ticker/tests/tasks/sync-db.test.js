const { syncDB } = require("../../tasks/sync-db");

describe("SyncDB tests", () => {
  test("should execute the progress twice", () => {
    // Act
    syncDB();
    const times = syncDB();
    console.log("Actualizado!, ", times);
    // Assert
    expect(times).toBe(2);
  });
});
