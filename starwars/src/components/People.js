import React, { useState } from "react";
import { usePaginatedQuery } from "react-query";
import Person from "./Person";

const fetchPeople = async (key, page) => {
  const res = await fetch(`http://swapi.dev/api/people/?page=${page}`);
  return res.json();
};

const People = () => {
  const [page, setPage] = useState(1);
  const { resolvedData, latestData, status } = usePaginatedQuery(
    ["planets", page],
    fetchPeople
  );

  return (
    <div>
      <h2> People </h2> {status === "loading" && <div> Loading data </div>}{" "}
      {status === "error" && <div> Error fetching data </div>}{" "}
      {status === "success" && (
        <>
          <button
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            disabled={page === 1}
          >
            Previous page{" "}
          </button>{" "}
          <button> {page} </button>{" "}
          <button
            disabled={!latestData || !latestData.next}
            onClick={() =>
              setPage((old) =>
                !latestData || !latestData.next ? old : old + 1
              )
            }
          >
            {" "}
            Next page{" "}
          </button>
          <div>
            {" "}
            {resolvedData.results.map((person) => (
              <Person key={person.name} person={person} />
            ))}{" "}
          </div>{" "}
        </>
      )}{" "}
    </div>
  );
};

export default People;
