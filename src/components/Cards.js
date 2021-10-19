import { useEffect, useState } from "react";
import styled from "styled-components";

const StyledMovie = styled.section`
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 10px;

  /* ---TODO: Kan man bruke background-image fra api her?-- */
  background-color: black;
  h2 {
    color: white;

    font-size: 1.4rem;
    text-align: center;
    width: auto;
  }
  p {
    color: white;
    margin: 0;
    padding: 0;
  }
  button {
    border: none;
    color: black;
    cursor: pointer;
    background: white;
    padding: 5px;
    margin-top: 5px;
    width: 50%;
    font-size: 1rem;
    :hover {
      font-size: 1.1rem;
      padding: 4px 2px;
    }
  }
`;

const NoItems = styled.section`
  width: 100%;
  height: 5vw;
  margin: 1rem 50%;
  padding: 2rem;
  background-color: black;
  color: white;
  p {
    text-align: center;
  }
`;

const StyledImg = styled.img`
  width: 100%;
  cursor: pointer;
`;

const Cards = ({ data, favorittMovie, spesificSearch }) => {
  /* usestate som setter staten til det som er lagret i localstorage. Data bevares dermed mellom hver render og refresh av siden */

  return (
    <>
      {data.Search?.length > 0 ? (
        data.Search.map((movies) => (
          <StyledMovie key={movies.imdbID}>
            <StyledImg
              alt="Filmplakat"
              src={movies.Poster}
              onClick={() => spesificSearch(movies)}
            />
            <h2>{movies.Title}</h2>
            <p>{movies.Year}</p>

            <button type="button" onClick={() => favorittMovie(movies)}>
              Min favoritt
            </button>
          </StyledMovie>
        ))
      ) : (
        <NoItems>
          <p>Søket ditt ga ingen resultater. Prøv igjen!</p>
        </NoItems>
      )}
    </>
  );
};

export default Cards;
