import agentReducer, {
  addAgent,
  updateAgent,
  deleteAgent,
} from "../store/agentSlice";

describe("Agent Reducer", () => {
  const initialState = {
    agents: [],
    searchTerm: "",
  };

  it("should handle initial state", () => {
    expect(agentReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle addAgent", () => {
    const newAgent = {
      name: "Test Agent",
      email: "test@test.com",
      status: "Active" as "Active" | "Inactive",
    };

    const state = agentReducer(initialState, addAgent(newAgent));
    expect(state.agents).toHaveLength(1);
    expect(state.agents[0].name).toBe("Test Agent");
    expect(state.agents[0].email).toBe("test@test.com");
  });

  it("should handle updateAgent", () => {
    // First add an agent
    let state = agentReducer(
      initialState,
      addAgent({
        name: "Test Agent",
        email: "test@test.com",
        status: "Active",
      })
    );

    const agentId = state.agents[0].id;

    // Then update the agent
    state = agentReducer(
      state,
      updateAgent({
        id: agentId,
        name: "Updated Agent",
        email: "test@test.com",
        status: "Active",
        lastSeen: state.agents[0].lastSeen,
      })
    );

    expect(state.agents[0].name).toBe("Updated Agent");
  });

  it("should handle deleteAgent", () => {
    // First add an agent
    let state = agentReducer(
      initialState,
      addAgent({
        name: "Test Agent",
        email: "test@test.com",
        status: "Active",
      })
    );

    const agentId = state.agents[0].id;

    // Then delete the agent
    state = agentReducer(state, deleteAgent(agentId));
    expect(state.agents).toHaveLength(0);
  });

  it("should handle search filtering", () => {
    // Add multiple agents
    let state = agentReducer(
      initialState,
      addAgent({
        name: "John Doe",
        email: "john@test.com",
        status: "Active",
      })
    );

    state = agentReducer(
      state,
      addAgent({
        name: "Jane Smith",
        email: "jane@test.com",
        status: "Active",
      })
    );

    // Test search by name
    const filteredByName = state.agents.filter((agent) =>
      agent.name.toLowerCase().includes("john")
    );
    expect(filteredByName).toHaveLength(1);
    expect(filteredByName[0].name).toBe("John Doe");

    // Test search by email
    const filteredByEmail = state.agents.filter((agent) =>
      agent.email.toLowerCase().includes("jane")
    );
    expect(filteredByEmail).toHaveLength(1);
    expect(filteredByEmail[0].name).toBe("Jane Smith");
  });
});
