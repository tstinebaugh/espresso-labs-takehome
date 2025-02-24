describe("Local Storage", () => {
  const STORAGE_KEY = "agents_data";

  beforeEach(() => {
    localStorage.clear();
  });

  it("should save agents to localStorage", () => {
    const testAgents = [
      {
        id: "1",
        name: "Test Agent",
        email: "test@test.com",
        status: "Active",
        lastSeen: new Date().toISOString(),
      },
    ];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(testAgents));
    const savedAgents = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

    expect(savedAgents).toHaveLength(1);
    expect(savedAgents[0].name).toBe("Test Agent");
  });

  it("should load agents from localStorage", () => {
    const testAgents = [
      {
        id: "1",
        name: "Test Agent",
        email: "test@test.com",
        status: "Active",
        lastSeen: new Date().toISOString(),
      },
    ];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(testAgents));
    const loadedAgents = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

    expect(loadedAgents).toEqual(testAgents);
  });

  it("should handle empty localStorage", () => {
    const loadedAgents = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    expect(loadedAgents).toEqual([]);
  });
});
