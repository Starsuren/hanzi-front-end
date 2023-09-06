import Head from "next/head";
import styles from "../styles/index.module.scss";
import withApollo from "../utility/withApollo";
import Spinner from "../components/spinner/Spinner";
import { useDebounce } from "../utility/useDebounce";
import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFindCharLazyQuery, useLoggedQuery } from "../generated/graphql";
import Modal from "../components/UI/Modal";
import * as React from "react";
import { Results, Options, QueryOptions } from "../components/results/Results";
import { useAuth } from "../utility/AuthProvider";

const variants = {
  visible: {
    display: "block",
    y: 0,
    opacity: 1,
    transition: { duration: 0.3, delay: 0.5, type: "tween" },
  },
  hidden: { display: "none", y: 400, opacity: 0 },
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
      variables: {
        char: prevQuery.current.char,
        options: { ...queryOptions },
        limit: 5,
        cursorChar: null,
        cursorWord: null,
        cursorSent: null,
      },
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
      variables: {
        char: inputQuery,
        options: queryOptions,
        limit: 5,
        cursorChar: null,
        cursorWord: null,
        cursorSent: null,
      },
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
                  </a>
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
