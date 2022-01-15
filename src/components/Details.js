import styles from "../styles/details.module.css";
import Loading from "../components/Loading";
import { useState, useEffect } from "react";

const Details = (props) => {
  const { showing, stopShowing, characters, title } = props;
  const [loading, setLoading] = useState(true);
  const [filmCharacters, setFilmCharacters] = useState([]);

  useEffect(() => {
    setLoading(true);
    const characterNames = characters.map((character) =>
      fetch(character).then((res) => res.json())
    );
    Promise.all(characterNames).then((data) => {
      setFilmCharacters(data);
      setLoading(false);
    });
  }, [characters]);
filmCharacters.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  if (!showing) return null;

  return (
    <div className={styles.details_style}>
      <button className={styles.button_style} onClick={stopShowing}>
        X
      </button>
      <h3 style={{ margin: "1rem" }}>Characters in {title}</h3>
      <div className={styles.characters_wrapper}>
        <Loading loading={loading} color={"black"} />
        <ul className={styles.ullist_style}>
          {filmCharacters.map((character) => (
            <li className={styles.listitem_style} key={character.name}>
              {character.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Details;