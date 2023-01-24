import React from "react";
import { useAppContext } from "../context/appContext";
import { FormRow, FormSelect } from "./index.js";
import Wrapper from "../assets/wrappers/SearchContainer.js";

function Search() {
  const {
    isLoading,
    search,
    searchStatus,
    searchType,
    sort,
    sortOptions,
    clearSearchQueries,
    handleChange,
    taskTypes,
    statusOptions,
  } = useAppContext();

  const handleSearch = (e) => {
    if (isLoading) return;
    handleChange({ name: e.target.name, value: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearSearchQueries();
  };

  return (
    <Wrapper>
      <form className="form">
        <h4>Søg</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="search"
            value={search}
            handleChange={handleSearch}
            labelText="Søg efter navn"
          />
          <FormSelect
            labelText="Opgavens type"
            name="searchType"
            value={searchType}
            handleChange={handleSearch}
            items={["alle", ...taskTypes]}
          />
          <FormSelect
            labelText="Opgavens status"
            name="searchStatus"
            value={searchStatus}
            handleChange={handleSearch}
            items={["alle", ...statusOptions]}
          />
          <FormSelect
            labelText="Sorter"
            name="sort"
            value={sort}
            handleChange={handleSearch}
            items={sortOptions}
          />
          <button
            className="btn btn-block"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            Nulstil søgning
          </button>
        </div>
      </form>
    </Wrapper>
  );
}

export default Search;
