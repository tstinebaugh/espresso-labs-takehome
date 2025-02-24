// components/AgentList.tsx
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { deleteAgent, selectFilteredAgents } from "../store/agentSlice";
import { Agent } from "../models/Agent";
import { AgentForm } from "./AgentForm";
import { SearchBar } from "./SearchBar";

export const AgentList = () => {
  const filteredAgents = useAppSelector(selectFilteredAgents);
  const dispatch = useAppDispatch();
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString();
  };

  const handleDelete = (id: string) => {
    dispatch(deleteAgent(id));
  };

  const handleEdit = (agent: Agent) => {
    setEditingAgent(agent);
  };

  const handleEditComplete = () => {
    setEditingAgent(null);
  };

  return (
    <div className="agent-list">
      <h2>Agents</h2>
      <SearchBar />

      {editingAgent ? (
        <div className="edit-form">
          <h3>Edit Agent</h3>
          <AgentForm agentToEdit={editingAgent} onSubmit={handleEditComplete} />
          <button
            className="cancel-button"
            onClick={() => setEditingAgent(null)}
          >
            Cancel
          </button>
        </div>
      ) : (
        <>
          {filteredAgents.length === 0 ? (
            <p className="no-results">No agents found</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Last Seen</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAgents.map((agent: Agent) => (
                  <tr key={agent.id}>
                    <td>{agent.name}</td>
                    <td>{agent.email}</td>
                    <td>{agent.status}</td>
                    <td>{formatDate(agent.lastSeen)}</td>
                    <td>
                      <button
                        className="edit-button"
                        onClick={() => handleEdit(agent)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(agent.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};
