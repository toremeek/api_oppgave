import { useState, useEffect } from "react";
import axios from "axios";
import Cards from "./components/Cards";
import styled from "styled-components";
import { uuid } from "uuidv4";
import "./styles.css";
import Head from "./components/Head";
import Modal from "./components/Modal";
import Stats from "./components/Stats";

const MoviesSection = styled.section`
  display: grid;
  grid-template-columns: repeat(4, auto);
  gap: 10px;
  grid-template-rows: 1fr;
  margin: auto;
  width: 100%;
  max-width: 1200px;
  @media screen and (max-width: 800px) {
    grid-template-columns: repeat(3, auto);
  }
  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(2, auto);
  }
`;

const StyledSearchSection = styled.section`
  width: 50%;
  margin: 1rem auto 3rem auto;
  text-align: center;
  p {
    font-size: 1.5rem;
    padding: 1rem;
    width: 40%;
    margin: auto;
    color: white;
  }
`;

const StyledForm = styled.form`
  width: 60%;
  display: flex;
  justify-content: space-evenly;
  margin: auto;
  input {
    width: 100%;
    min-width: 250px;
    padding: 13px;
    margin: 0 0.5rem;
    cursor: pointer;
    border: none;
  }
  button {
    width: 100%;
    cursor: pointer;
    color: white;
    background-color: black;
    text-decoration: none;
    border: none;
    padding: 0.3rem 2rem;
    :hover {
      font-size: 1.1rem;
      padding: 0.2rem 1.75rem;
    }
  }
`;

const StyledButtonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, auto);
  gap: 10px;
  grid-template-rows: 1fr;
  margin: auto;
  width: 100%;
  max-width: 1000px;
  @media screen and (max-width: 800px) {
    grid-template-columns: repeat(3, auto);
  }
  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(2, auto);
  }
`;
const FavoriteWrapper = styled.div`
  position: sticky;
  z-index: 0;
  top: 0;
  margin: 0;
  padding: 10px;
  background-color: rgba(11, 68, 70, 0.8);
  text-align: center;
  p {
    color: white;
    font-size: 1.3rem;
    padding: 0.5rem;
  }
`;
const StyledFavorites = styled.section`
  display: grid;
  justify-content: space-evenly;
  grid-template-columns: repeat(10, auto);
  justify-content: left;
  gap: 3px;
  opacity: 1;
  grid-template-rows: 1fr;
  margin: 0;
  padding: 0;
  width: 100%;
  max-height: 170px;
  height: 100%;
  max-width: 1200px;
  @media screen and (max-width: 800px) {
    grid-template-columns: repeat(5, auto);
    max-height: 325px;
  }

  img {
    display: block;
    max-width: 100%;
    max-height: 170px;
    margin: 0;
    padding: 0;
  }

  i {
    position: absolute;
    top: 10px;

    font-size: 3rem;
    color: white;
    background: black;
    padding: 5px;
    opacity: 0.8;
    cursor: pointer;
  }
  i:hover {
    opacity: 1;
  }
`;

const StyledP = styled.p`
  background: red;
  color: white;
  text-align: center;
  margin: 0 auto 5px auto;
  width: 100%;
`;
const StyledPWhite = styled.p`
  color: white;
  text-align: left;
  margin: 10px auto 10px auto;
  width: 100%;
`;
const ButtonDiv = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  button {
    width: 100%;
    max-height: 80px;
    height: 100%;
    padding: 0 15px 0 15px;
    width: 100%;
    cursor: pointer;
    border: none;
    background: black;
    color: white;
    font-size: 1rem;
  }
  button:hover {
    font-size: 1.1rem;
    padding: 0 10px 0 10px;
  }
`;

const FilmP = styled.p`
  font-size: 1rem;
  text-align: left;
  margin: 0;
  padding: 0;
`;
function App() {
  const [search, setSearch] = useState("Star Wars");
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [extendedMovie, setExtendedMovie] = useState([]);
  const [modal, setModal] = useState(false);
  const [statsModal, setStatsModal] = useState(false);
  const [finnes, setFinnes] = useState(false);

  const [searchHistory, setSearchHistory] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("searchHistory");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });

  const doSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=a994c928&s=${search}&plot=full`
      );
      const apiData = await response?.data;
      setData(apiData);

      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  const spesificSearch = async (movies) => {
    setModal(true);
    setLoadingModal(true);
    const searchId = movies.imdbID;
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=a994c928&i=${searchId}`
      );
      const apiData = await response?.data;
      setExtendedMovie(apiData);
      setLoadingModal(false);
    } catch (error) {
      setError(error);
    }
  };

  const handleSearchWord = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
  };

  const newSearch = (event) => {
    event.preventDefault();
    setSearchHistory([...searchHistory, search]);
    doSearch();
  };

  const triggerSearch = async (search) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=a994c928&s=${search}`
      );
      const apiData = await response?.data;
      setData(apiData);

      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    doSearch();
  }, []);

  /* alt som har med favorittliste og local storage */
  const [favoritt, setFavoritt] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("favoritt");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });

  const deleteFavorites = () => {
    setFinnes(false);
    setFavoritt([]);
  };

  const deleteSearchHistory = () => {
    setSearchHistory([]);
  };

  const favorittMovie = async (movies) => {
    const searchId = movies.imdbID;
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=a994c928&i=${searchId}&plot="full`
      );
      const apiData = await response?.data;

      if (favoritt.length > 0) {
        if (favoritt.some((movie) => movie.imdbID === apiData.imdbID)) {
          setFinnes(true);
        } else {
          setFinnes(false);
          setFavoritt([apiData, ...favoritt]);
        }
      } else {
        setFinnes(false);
        setFavoritt([apiData, ...favoritt]);
      }
    } catch (error) {
      setError(error);
    }
  };

  const removeFavorite = (oneFavoritter) => {
    const newList = favoritt.filter(
      (favoritt) => favoritt.imdbID !== oneFavoritter.imdbID
    );
    setFavoritt(newList);
  };

  const closeModal = () => {
    setModal(false);
  };

  const showStatistics = () => {
    statsModal ? setStatsModal(false) : setStatsModal(true);
  };
  /*useffectsom kjører localstorage*/
  useEffect(() => {
    localStorage.setItem("favoritt", JSON.stringify(favoritt));
    localStorage.setItem("searhHistory", JSON.stringify(searchHistory));
  }, [favoritt, searchHistory]);

  return (
    <>
      {modal ? (
        <Modal
          extendedMovie={extendedMovie}
          closeModal={closeModal}
          favorittMovie={favorittMovie}
          loadingModal={loadingModal}
        />
      ) : null}
      <Head data={data} loading={loading} />
      <StyledSearchSection>
        <p>Finn din favorittfilm</p>
        <StyledForm onSubmit={newSearch}>
          <label htmlFor="søk" />
          <input
            type="text"
            placeholder="Finn din film"
            onChange={handleSearchWord}
            name="søk"
          />
          <button type="submit">Søk</button>
        </StyledForm>
        <p>Dine søk:</p>
        <StyledButtonContainer>
          <>
            {searchHistory?.length > 0
              ? searchHistory.map((search) => (
                  <button
                    type="button"
                    className="searchButton"
                    key={uuid()}
                    onClick={() => triggerSearch(search)}
                  >
                    {search}
                  </button>
                ))
              : null}
            {searchHistory?.length > 0 ? (
              <button
                className="deleteButton"
                type="button"
                onClick={deleteSearchHistory}
              >
                slett søk
              </button>
            ) : null}
          </>
        </StyledButtonContainer>
      </StyledSearchSection>
      <FavoriteWrapper>
        {favoritt?.length === 0 ? (
          <p>Her kan du lage din egen favorittliste!</p>
        ) : null}

        <>
          {favoritt?.length > 0 ? (
            <StyledFavorites>
              <ButtonDiv>
                <button type="button" onClick={deleteFavorites}>
                  Tøm listen
                </button>
                <button type="button" onClick={showStatistics}>
                  Se statistikk
                </button>
              </ButtonDiv>
              {favoritt
                .reverse()
                .slice(0, 9)

                .map((oneFavoritter) => (
                  <div key={oneFavoritter.imdbID}>
                    <img alt="filmplakater" src={oneFavoritter.Poster} />
                    <span>
                      <i
                        className="fas fa-times"
                        onClick={() => removeFavorite(oneFavoritter)}
                      ></i>
                    </span>
                  </div>
                ))}
            </StyledFavorites>
          ) : null}

          {favoritt.length > 0 ? (
            <FilmP>Du har {favoritt.length} filmer i listen din</FilmP>
          ) : null}

          {finnes ? <StyledP>Filmen finnes i listen allerede!</StyledP> : null}
        </>
      </FavoriteWrapper>
      {statsModal ? (
        <Stats
          favoritt={favoritt}
          search={search}
          showStatistics={showStatistics}
        />
      ) : null}
      <StyledPWhite>
        Ditt søk ga {data?.totalResults} treff. Her vises {""}
        {data?.Search?.length} av dem.
      </StyledPWhite>
      <MoviesSection>
        {loading ? <p>Laster...</p> : null}
        {error ? <p>Noe gikk galt</p> : null}
        <Cards
          data={data}
          favorittMovie={favorittMovie}
          spesificSearch={spesificSearch}
        />
      </MoviesSection>
    </>
  );
}

export default App;
