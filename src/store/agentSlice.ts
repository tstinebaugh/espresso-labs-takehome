import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Agent } from "../models/Agent";
import { RootState } from "./store";

const STORAGE_KEY = "agents_data";

interface AgentState {
  agents: Agent[];
  searchTerm: string;
}

const loadInitialState = (): Agent[] => {
  try {
    const storedAgents = localStorage.getItem(STORAGE_KEY);
    return storedAgents ? JSON.parse(storedAgents) : [];
  } catch (error) {
    console.error("Error loading agents from localStorage:", error);
    return [];
  }
};

interface AgentState {
  agents: Agent[];
}

const initialState: AgentState = {
  agents: loadInitialState(),
  searchTerm: "",
};

const agentSlice = createSlice({
  name: "agents",
  initialState,
  reducers: {
    addAgent: (
      state,
      action: PayloadAction<Omit<Agent, "id" | "lastSeen">>
    ) => {
      const newAgent: Agent = {
        ...action.payload,
        id: Date.now().toString(),
        lastSeen: new Date().toISOString(),
      };
      state.agents.push(newAgent);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.agents));
    },
    updateAgent: (state, action: PayloadAction<Agent>) => {
      state.agents = state.agents.map((agent) =>
        agent.id === action.payload.id
          ? { ...action.payload, lastSeen: new Date().toISOString() }
          : agent
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.agents));
    },
    deleteAgent: (state, action: PayloadAction<string>) => {
      state.agents = state.agents.filter(
        (agent) => agent.id !== action.payload
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.agents));
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});

export const selectFilteredAgents = (state: RootState) => {
  const searchTerm = state.agents.searchTerm.toLowerCase();
  return state.agents.agents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchTerm) ||
      agent.email.toLowerCase().includes(searchTerm)
  );
};

export const { addAgent, updateAgent, deleteAgent, setSearchTerm } =
  agentSlice.actions;
export default agentSlice.reducer;
