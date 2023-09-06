import { useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FindCharQueryHookResult,
  CharResponse,
  useAddFavouriteMutation,
  useDelFavouriteMutation,
} from "../../generated/graphql";
import * as React from "react";
import { Delayed } from "../../utility/Delayed";
import styles from "../../styles/index.module.scss";
import Image from "next/future/image";
import FavSVG from "../../assets/icons/star-outline.svg";
import { useAuth } from "../../utility/AuthProvider";
export enum Options {
  characters = "characters",
  words = "words",
  sentences = "sentences",
}

type Cursor = {
  cursorChar: null | number;
  cursorWord: null | number;
  cursorSent: null | number;
};

export type QueryOptions = {
  [Options.characters]: boolean;
  [Options.words]: boolean;
  [Options.sentences]: boolean;
};

export const Results: React.FC<{
  openmodalHandler: () => void;
  ismodalOpen: boolean;
  charQuery: FindCharQueryHookResult;
  queryOptions: QueryOptions;
}> = ({
  openmodalHandler,
  ismodalOpen,
  charQuery: { data, error, loading, fetchMore },
  queryOptions,
}) => {
  const favourites = useAuth();

  const [AddFavourites] = useAddFavouriteMutation();
  const [DelFavourites] = useDelFavouriteMutation();

  const favChars =
    favourites.data?.isLogged?.id &&
    favourites.data.isLogged.favChars.length > 0
      ? favourites.data.isLogged.favChars.map((v) => v.id)
      : null;
  const favWords =
    favourites.data?.isLogged?.id &&
    favourites.data.isLogged.favWords.length > 0
      ? favourites.data.isLogged.favWords.map((v) => v.id)
      : null;
  const favSentences =
    favourites.data?.isLogged?.id &&
    favourites.data.isLogged.favSentences.length > 0
      ? favourites.data.isLogged.favSentences.map((v) => v.id)
      : null;

  const itemRef = useRef<Array<HTMLDivElement | null>>([]);
  let modalResults = useRef<JSX.Element>();
  const optionsArray: string[] = [];
  let hasMore = false;
  const cursor = useRef<Cursor>({
    cursorChar: null,
    cursorWord: null,
    cursorSent: null,
  });
  for (const key in queryOptions) {
    if (queryOptions[key as Options] === true)
      switch (key) {
        case "characters":
          if (data?.findChar.hasMoreChar) hasMore = true;
          break;
        case "words":
          if (data?.findChar.hasMoreWord) hasMore = true;
          break;
        case "sentences":
          if (data?.findChar.hasMoreSentence) hasMore = true;
          break;
      }
  }

  const openItemHandler = (index: number, isFav: boolean, option: string) => {
    openmodalHandler();
    const charID = itemRef.current[index]?.dataset.id!;
    const char = itemRef.current[index]!.children[0].children[0].textContent;
    const pinyin = itemRef.current[index]!.children[0].children[1].textContent;
    const meaning =
      itemRef.current[index]!.children[0].children[2].textContent?.split(
        /(?=\d)/
      );

    const addFavHandler = () =>
      AddFavourites({ variables: { id: parseInt(charID), option: option } });
    const delFavHandler = () =>
      DelFavourites({ variables: { id: parseInt(charID), option: option } });

    const favButton = isFav ? (
      <button
        type="button"
        onClick={delFavHandler}
        className={styles.main__box__results__container__modal__button}
      >
        Unfavourite
      </button>
    ) : (
      <button
        type="button"
        onClick={addFavHandler}
        className={styles.main__box__results__container__modal__button}
      >
        Favourite
      </button>
    );
    modalResults.current = (
      <div className={styles.main__box__results__container__modal}>
        <motion.div
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className={styles.main__box__results__container__modal__item}
        >
          <span>{char} </span>

          <span>pinyin: {pinyin}</span>
          <div
            className={
              styles.main__box__results__container__modal__item__meaning
            }
          >
            <h1> Meaning </h1>
            {meaning!.map((v) => (
              <span>{v}</span>
            ))}
          </div>
        </motion.div>
      </div>
    );
  };

  const dataResults = useMemo(() => {
    for (const [key, boolean] of Object.entries(queryOptions)) {
      if (boolean) optionsArray.push(key);
    }
    if (!loading && data && data.findChar.charResponse[0] !== undefined) {
      const filterResults = data!.findChar.charResponse.filter((v) =>
        optionsArray.includes(v.__typename!.toLowerCase())
      );

      const sortedFilterResults = filterResults.sort((curr, next) => {
        switch (curr.__typename!) {
          case "Characters":
            return -1;
          case "Words":
            return next.__typename === "Characters" ? 1 : -1;
          case "Sentences":
            return next.__typename === "Sentences" ? -1 : 1;
        }
      });

      const cursorReducer = (type: Options) => {
        return (acc: CharResponse, next: CharResponse) => {
          if (acc.__typename!.toLowerCase() === type) {
            if (
              acc.__typename!.toLowerCase() === type &&
              next.__typename!.toLowerCase() === type
            ) {
              return acc.id > next.id ? acc : next;
            }
            return acc;
          }

          return next;
        };
      };

      const optionFind = (type: Options) => {
        return (val: CharResponse) =>
          val.__typename!.toLowerCase() === type || false;
      };

      if (sortedFilterResults.length > 0) {
        cursor.current.cursorChar =
          optionsArray.includes(Options.characters) &&
          sortedFilterResults.find(optionFind(Options.characters))
            ? sortedFilterResults.reduce(cursorReducer(Options.characters)).id
            : cursor.current.cursorChar;
        cursor.current.cursorWord =
          optionsArray.includes(Options.words) &&
          sortedFilterResults.find(optionFind(Options.words))
            ? sortedFilterResults.reduce(cursorReducer(Options.words)).id
            : cursor.current.cursorWord;
        cursor.current.cursorSent =
          optionsArray.includes(Options.sentences) &&
          sortedFilterResults.find(optionFind(Options.sentences))
            ? sortedFilterResults.reduce(cursorReducer(Options.sentences)).id
            : cursor.current.cursorSent;
      }

      return sortedFilterResults.map((v, i) => {
        let isFav = false;
        const typeOption = v.__typename?.toLowerCase() as string;
        switch (v.__typename) {
          case "Characters":
            isFav = favChars?.includes(v.id) ? true : false;
            break;
          case "Words":
            isFav = favWords?.includes(v.id) ? true : false;
            break;
          case "Sentences":
            isFav = favSentences?.includes(v.id) ? true : false;
            break;
        }

        return (
          <motion.div
            transition={{ duration: 0.3 }}
            key={v.char_detail.character + optionsArray.join("")}
            exit={{ opacity: 0 }}
          >
            <motion.div
              ref={(ref) => {
                if (ref) itemRef.current[i] = ref;
              }}
              className={styles.main__box__results__container__item}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              data-id={v.id}
              onClick={() => openItemHandler(i, isFav, typeOption)}
            >
              <div className={styles.main__box__results__container__item__text}>
                <span
                  className={
                    styles[
                      `main__box__results__container__item__${v.__typename!.toLowerCase()}`
                    ]
                  }
                >
                  {v.char_detail.character}
                </span>
                <span>{v.char_detail.pinyin}</span>
                <span>{v.char_detail.meaning}</span>
                {isFav ? (
                  <Image
                    src={FavSVG}
                    height={15}
                    width={15}
                    className={
                      styles.main__box__results__container__item__favsvg
                    }
                    alt="a star to favourite your characters"
                  />
                ) : null}
              </div>
            </motion.div>
          </motion.div>
        );
      });
    } else if (!loading && data && data.findChar.charResponse[0] === undefined)
      return (
        <motion.h1
          key="no-results"
          exit={{ opacity: 0, x: -20 }}
          style={{ color: "white" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          No results were found
        </motion.h1>
      );
  }, [queryOptions, data?.findChar.charResponse]);

  return (
    <div className={styles.main__box__results__container}>
      <Delayed key="delayMain" time={200}>
        <AnimatePresence>
          {dataResults as JSX.Element}
          {ismodalOpen ? modalResults.current : null}
          {hasMore ? (
            <Delayed key="delayButton" time={200}>
              <motion.div
                key="loadMore"
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={styles.main__box__results__container__button}
              >
                {queryOptions.characters && data?.findChar.hasMoreChar}
                <button
                  onClick={() =>
                    fetchMore({
                      variables: {
                        cursorChar: cursor.current.cursorChar,
                        cursorWord: cursor.current.cursorWord,
                        cursorSent: cursor.current.cursorSent,
                      },
                    })
                  }
                >
                  Load More
                </button>
              </motion.div>
            </Delayed>
          ) : null}
        </AnimatePresence>
      </Delayed>
    </div>
  );
};
