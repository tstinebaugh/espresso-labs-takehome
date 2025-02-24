import React, { useState, useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import { addAgent, updateAgent } from "../store/agentSlice";
import { Agent } from "../models/Agent";
import { ValidEmail } from "../utils/validation";

interface AgentFormProps {
  agentToEdit?: Agent | null;
  onSubmit?: () => void;
}

export const AgentForm = ({ agentToEdit, onSubmit }: AgentFormProps) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    status: "Active" as "Active" | "Inactive",
  });
  const [errors, setErrors] = useState<Partial<typeof formData>>({});

  useEffect(() => {
    if (agentToEdit) {
      setFormData({
        name: agentToEdit.name,
        email: agentToEdit.email,
        status: agentToEdit.status,
      });
    } else {
      // Reset form when not editing
      setFormData({
        name: "",
        email: "",
        status: "Active",
      });
    }
  }, [agentToEdit]);

  const validateForm = () => {
    const newErrors: Partial<typeof formData> = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!ValidEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (agentToEdit) {
      dispatch(
        updateAgent({
          ...agentToEdit,
          ...formData,
        })
      );
    } else {
      dispatch(addAgent(formData));
    }

    setFormData({ name: "", email: "", status: "Active" });
    if (onSubmit) onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="agent-form">
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div>
        <label htmlFor="status">Status:</label>
        <select
          id="status"
          value={formData.status}
          onChange={(e) =>
            setFormData({
              ...formData,
              status: e.target.value as "Active" | "Inactive",
            })
          }
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <button type="submit">
        {agentToEdit ? "Update Agent" : "Add Agent"}
      </button>
    </form>
  );
};
