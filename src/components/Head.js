import styled from "styled-components";

const StyledHeader = styled.header`
  width: 90%;
  position: relative;
  max-width: 1200px;
  margin: 2rem auto;
  h1 {
    position: absolute;
    width: auto;
    z-index: 1;
    top: 25%;
    left: 18%;
    font-family: "Bangers", cursive;
    letter-spacing: 0.7rem;
    text-shadow: #fc0 1px 1px 15px;
    margin: auto;
    text-align: center;
    color: black;
    font-size: 9vw;
    @media screen and (min-width: 1200px) {
      font-size: 150px;
      top: 25%;
      left: 10%;
    }
    @media screen and (max-width: 600px) {
      font-size: 50px;
      top: 25%;
      left: 5%;
    }
  }
`;

const StyledHead = styled.section`
  display: grid;
  grid-template-columns: repeat(5, auto);
  gap: 5px;
  grid-template-rows: 1fr;
  width: 100%;
  opacity: 0.3;
  img {
    height: 100%;
    width: 100%;
    transform: rotate(0.02turn);
  }
  div {
    width: 100%;
    height: 250px;
  }
`;

const Head = ({ data, loading }) => {
  return (
    <>
      <StyledHeader>
        <h1>Finnfilmfort</h1>
        {loading ? <p>laster...</p> : null}
        <StyledHead>
          {data.Search?.length > 3 ? (
            data.Search.slice(0, 5).map((items) => (
              <img key={items.imdbID} alt="filmplakat" src={items.Poster} />
            ))
          ) : (
            <div></div>
          )}
        </StyledHead>
      </StyledHeader>
    </>
  );
};

export default Head;
