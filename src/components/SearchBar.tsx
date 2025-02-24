import React from "react";
import { useAppDispatch } from "../app/hooks";
import { setSearchTerm } from "../store/agentSlice";

export const SearchBar = () => {
  const dispatch = useAppDispatch();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search agents by name or email..."
        onChange={handleSearch}
        className="search-input"
      />
    </div>
  );
};
