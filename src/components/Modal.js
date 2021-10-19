import { AnimatePresence, motion } from "framer-motion";

const Modal = ({ extendedMovie, closeModal, favorittMovie, loadingModal }) => {
  return (
    <>
      <section className="modal" onClick={closeModal}>
        {loadingModal ? (
          <p>Laster..</p>
        ) : (
          <AnimatePresence>
            <motion.section
              className="inner-modal"
              initial={{ scale: 1.3, rotate: 45, opacity: 0 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              transition={{
                duration: 0.5,
                stiffness: 200,
                damping: 20
              }}
              key={extendedMovie.imdbID}
            >
              <img
                alt={`Plakat fra filmen ${extendedMovie.Title}`}
                className="modal-poster"
                src={extendedMovie.Poster}
              />
              <h2>{extendedMovie.Title}</h2>

              <p>Skuespillere: {extendedMovie.Actors}</p>
              <p>Sjanger: {extendedMovie.Genre}</p>
              <p>IMDB-rating: {extendedMovie.imdbRating}</p>

              <p>Stemmer (IMDB): {extendedMovie.imdbVotes}</p>
              <p>{extendedMovie.Plot}</p>
              <button
                type="button"
                className="onemovie2"
                onClick={() => favorittMovie(extendedMovie)}
              >
                Min favoritt
              </button>
              <button className="onemovie2" type="button" onClick={closeModal}>
                Lukk
              </button>
            </motion.section>
          </AnimatePresence>
        )}
      </section>
    </>
  );
};

export default Modal;
