import Head from "next/head";
import styles from "../styles/index.module.scss";
import withApollo from "../utility/withApollo";
import Spinner from "../components/spinner/Spinner";
import { useDebounce } from "../utility/useDebounce";
import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FindCharQueryHookResult,
  useFindCharLazyQuery,
} from "../generated/graphql";
import Modal from "../components/UI/Modal";
import * as React from "react";
import { Delayed } from "../utility/Delayed";

enum Options {
  characters = "characters",
  words = "words",
  sentences = "sentences",
}

type QueryOptions = {
  [Options.characters]: boolean;
  [Options.words]: boolean;
  [Options.sentences]: boolean;
};

const variants = {
  visible: {
    display: "block",
    y: 0,
    opacity: 1,
    transition: { duration: 0.3, delay: 0.5, type: "tween" },
  },
  hidden: { display: "none", y: 400, opacity: 0 },
};

const Results: React.FC<{
  openmodalHandler: () => void;
  ismodalOpen: boolean;
  charQuery: FindCharQueryHookResult;
  queryOptions: QueryOptions;
}> = ({
  openmodalHandler,
  ismodalOpen,
  charQuery: { data, error, loading },
  queryOptions,
}) => {
  const itemRef = useRef<Array<HTMLDivElement | null>>([]);
  let modalResults = useRef<JSX.Element>();

  const optionsArray: string[] = [];

  const openItemHandler = (index: number) => {
    openmodalHandler();
    const char = itemRef.current[index]!.children[0].children[0].textContent;
    const pinyin = itemRef.current[index]!.children[0].children[1].textContent;
    const meaning =
      itemRef.current[index]!.children[0].children[2].textContent?.split(
        /(?=\d)/
      );
    modalResults.current = (
      <motion.div
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.5 }}
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className={styles.main__box__results__container__modal}
      >
        <span>{char} </span>

        <span>pinyin: {pinyin}</span>
        <div className={styles.main__box__results__container__modal__meaning}>
          <h1> Meaning </h1>
          {meaning!.map((v) => (
            <span>{v}</span>
          ))}
        </div>
      </motion.div>
    );
  };

  const dataResults = useMemo(() => {
    for (const [key, boolean] of Object.entries(queryOptions)) {
      if (boolean) optionsArray.push(key);
    }
    if (!loading && data && data.findChar[0] !== undefined) {
      const filterResults = data!.findChar.filter((v) =>
        optionsArray.includes(v.__typename.toLowerCase())
      );
      return filterResults.map((v, i) => (
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
            onClick={() => openItemHandler(i)}
          >
            <div className={styles.main__box__results__container__item__text}>
              <span
                className={
                  styles[
                    `main__box__results__container__item__${v.__typename.toLowerCase()}`
                  ]
                }
              >
                {v.char_detail.character}
              </span>
              <span>{v.char_detail.pinyin}</span>
              <span>{v.char_detail.meaning}</span>
            </div>
          </motion.div>
        </motion.div>
      ));
    } else if (!loading && data && data.findChar[0] === undefined)
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
  }, [queryOptions, data]);

  return (
    <div className={styles.main__box__results__container}>
      <Delayed time={200}>
        <AnimatePresence>
          {dataResults}
          {ismodalOpen ? modalResults.current : null}
        </AnimatePresence>
      </Delayed>
    </div>
  );
};

const index = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const mainSearchBox = useRef(false);
  const [ismodalOpen, setmodalOpen] = useState(false);
  const [queryOptions, setQueryOptions] = useState<QueryOptions>({
    [Options.characters]: true,
    [Options.words]: true,
    [Options.sentences]: true,
  });
  const prevQuery = useRef<{ char: string[]; options: QueryOptions }>({
    char: [],
    options: {
      [Options.characters]: true,
      [Options.words]: true,
      [Options.sentences]: true,
    },
  });
  const [findChar, queryResults] = useFindCharLazyQuery();
  const debounceFindChar = useCallback(useDebounce(findChar, 500, false), []);
  const navStyles = {
    [Options.characters]: [styles.main__box__results__nav__characters],
    [Options.words]: [styles.main__box__results__nav__words],
    [Options.sentences]: [styles.main__box__results__nav__sentences],
  };
  const navStylesKeys = Object.keys(navStyles) as Options[];
  for (let i = 0; i < navStylesKeys.length; i += 1) {
    !queryOptions[navStylesKeys[i]] &&
      navStyles[navStylesKeys[i]].push(
        styles[`main__box__results__nav__${navStylesKeys[i]}--text-darken`]
      );
  }

  const requeryOptions = () => {
    debounceFindChar({
      variables: { char: prevQuery.current.char, options: { ...queryOptions } },
    });
    prevQuery.current = {
      char: prevQuery.current.char,
      options: { ...queryOptions },
    };
  };
  const runFindChar = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputQuery =
      e.currentTarget.value.match(
        /[a-zA-Z]+|[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]+/g
      ) || [];
    debounceFindChar({
      variables: { char: inputQuery, options: queryOptions },
    });
    prevQuery.current = { char: inputQuery, options: { ...queryOptions } };
  };

  const setOptionsHandler = (option: Options) => {
    setQueryOptions({ ...queryOptions, [option]: !queryOptions[option] });
  };

  useEffect(() => {
    if (mainSearchBox.current) {
      setTimeout(() => inputRef.current!.focus(), 1000);
    }

    (Object.keys(queryOptions) as Options[])
      .map((v) => {
        return (
          prevQuery.current.options[v] === false && queryOptions[v] === true
        );
      })
      .includes(true) && requeryOptions();
  }, [mainSearchBox.current, queryOptions]);

  const openmodalHandler = () => setmodalOpen(!ismodalOpen);
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className={styles.container}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
        <title>Hanzi</title>
      </Head>
      <main className={styles.main}>
        <AnimatePresence>
          {!mainSearchBox.current && (
            <motion.div
              exit={{
                opacity: 0,
                width: 0,
                height: 0,
                transition: { duration: 0.4, delay: 0.3, type: "tween" },
              }}
              className={styles.main__box}
            >
              <motion.div
                exit={{ opacity: 0, transition: { type: "tween" } }}
                className={styles.main__intro}
              >
                <h1>Hanzi</h1>
                <p>
                  A comprehensive Chinese dictionary for English translations of
                  common Chinese words and phrases.
                </p>
              </motion.div>
              <motion.div
                exit={{
                  opacity: 0,
                  transition: { duration: 0.2, type: "tween" },
                }}
                className={styles.search}
              >
                <input
                  placeholder=" "
                  className={styles.search__input}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      setInputValue(e.currentTarget.value),
                        (mainSearchBox.current = true),
                        runFindChar(e);
                    }
                  }}
                  type="search"
                  id="search"
                  name="search"
                />
                <label className={styles.search__label} htmlFor="search">
                  Search
                </label>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {mainSearchBox.current && (
          <motion.div
            className={styles["main__box--open"]}
            variants={variants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              initial=""
              animate=""
              className={styles["search--box-open"]}
            >
              <input
                placeholder=" Search"
                value={inputValue}
                className={[
                  styles.search__input,
                  styles.search__input__open,
                ].join(" ")}
                onChange={(e) => {
                  onChangeHandler(e), runFindChar(e);
                }}
                type="search"
                id="search"
                name="search"
                ref={inputRef}
                autoFocus
              />
            </motion.div>
            <div className={styles.main__box__results}>
              <div className={styles.main__box__results__nav}>
                <h1>
                  <a
                    className={navStyles[Options.characters].join(" ")}
                    onClick={() => setOptionsHandler(Options.characters)}
                  >
                    Characters
                  </a>{" "}
                </h1>
                <h1>
                  <a
                    className={navStyles[Options.words].join(" ")}
                    onClick={() => setOptionsHandler(Options.words)}
                  >
                    Words
                  </a>
                </h1>
                <h1>
                  <a
                    className={navStyles[Options.sentences].join(" ")}
                    onClick={() => setOptionsHandler(Options.sentences)}
                  >
                    Sentences
                  </a>
                </h1>
              </div>
              {queryResults.loading ? (
                <Spinner />
              ) : (
                <Results
                  queryOptions={queryOptions}
                  openmodalHandler={openmodalHandler}
                  ismodalOpen={ismodalOpen}
                  charQuery={queryResults}
                />
              )}
              <Modal
                showModal={ismodalOpen}
                setModal={() => setmodalOpen(!ismodalOpen)}
              />
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};
export default withApollo({ ssr: false })(index);
