import {
  bottomLineVariants,
  listVariant,
  middleLineVariants,
  topLineVariants,
  containerVariants,
} from "./navBarBurgerVariant";
import { useApolloClient } from "@apollo/client";
import Modal from "../UI/Modal";
import { useRouter } from "next/router";
import {
  LoggedQuery,
  useLoggedQuery,
  useLogoutMutation,
} from "../../generated/graphql";
import ActiveLink from "./ActiveLink";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import styles from "./navbar.module.scss";
import Spinner from "../spinner/Spinner";
import { Dispatch, SetStateAction } from "react";

const BurgerMenu: React.FC<{ showModal: boolean; setModal: () => void }> = ({
  showModal,
  setModal,
}) => (
  <motion.div
    onClick={setModal}
    variants={containerVariants}
    whileHover={showModal ? "openHover" : "hover"}
    initial={showModal ? "openHidden" : "hidden"}
    animate={showModal ? "openVisible" : "visible"}
    className={styles.nav__menu__burger}
  >
    <motion.div
      variants={middleLineVariants}
      className={styles.nav__menu__burger__line}
    ></motion.div>
    <motion.div
      variants={topLineVariants}
      className={styles.nav__menu__burger__line2}
    ></motion.div>
    <motion.div
      variants={bottomLineVariants}
      className={styles.nav__menu__burger__line3}
    ></motion.div>
  </motion.div>
);

const MainLinks: React.FC<{
  setUserMenu: Dispatch<SetStateAction<boolean>>;
  showModal: boolean;
  setModal: () => void;
  data: { loading: boolean; logged: LoggedQuery | undefined };
}> = ({ setModal, showModal, data, setUserMenu }) => {
  let loggedUser = null;
  if (data?.logged?.isLogged !== undefined) {
    loggedUser = data.logged.isLogged?.username;
  }
  function closeModal() {
    showModal && setModal();
  }

  const BaseLinks = (
    <>
      <li>
        <ActiveLink href="/" activeClassName={styles.active}>
          <a onClick={closeModal}>Home</a>
        </ActiveLink>
      </li>
      {loggedUser ? (
        <li className={styles.nav__menu__username}>
          <a
            onClick={() => {
              closeModal();
              if (!showModal) setUserMenu(true);
            }}
          >
            {loggedUser}
          </a>
        </li>
      ) : (
        <>
          <li>
            <ActiveLink href="/login" activeClassName={styles.active}>
              <a onClick={closeModal}>Login</a>
            </ActiveLink>
          </li>
          <li>
            <ActiveLink
              href="/sign-up"
              activeClassName={styles["active--button"]}
            >
              {showModal ? (
                <a onClick={closeModal}>Sign-up</a>
              ) : (
                <button>Sign-up</button>
              )}
            </ActiveLink>
          </li>
        </>
      )}
    </>
  );

  const AniLinks = (
    <AnimatePresence>
      {showModal ? (
        <motion.ul
          key="open"
          exit={{ x: 400 }}
          initial="hidden"
          variants={listVariant}
          transition={{ duration: 0.4 }}
          animate="visible"
        >
          {BaseLinks}
        </motion.ul>
      ) : (
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key="closed"
        >
          {BaseLinks}
        </motion.ul>
      )}
    </AnimatePresence>
  );

  return data.loading ? <Spinner /> : AniLinks;
};

export const Navbar: React.FC = () => {
  const [isModelOpen, setModelOpen] = useState(false);
  const [logout, { loading: logoutLoading }] = useLogoutMutation();
  const { data, loading } = useLoggedQuery({ ssr: false });
  const router = useRouter();
  const apolloClient = useApolloClient();
  const [userMenu, setUserMenu] = useState(false);
  const logoutHandler = async () => {
    await logout();
    await apolloClient.clearStore();
    router.push("/", "refresh");
  };

  const openHandler = () => setModelOpen(!isModelOpen);

  const nav = (
    <nav className={styles.nav}>
      <div className={styles.nav__menu}>
        <MainLinks
          showModal={isModelOpen}
          setModal={openHandler}
          data={{ loading, logged: data }}
          setUserMenu={setUserMenu}
        />
        <AnimatePresence>
          {userMenu ? (
            <>
              <motion.div
                exit={{ display: "none" }}
                onClick={() => {
                  setUserMenu(false);
                }}
                className={styles.nav__menu__userMenuBG}
              ></motion.div>
              <motion.div
                exit={{ x: 120 }}
                initial={{ x: 200 }}
                animate={{ x: 0 }}
                className={styles.nav__menu__userMenu}
                transition={{
                  type: "spring",
                  velocity: 200,
                }}
              >
                <ul>
                  <motion.li
                    initial={{ x: 300 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <ActiveLink href="/user">
                      <a>Profile</a>
                    </ActiveLink>
                  </motion.li>
                  <motion.li
                    initial={{ x: 300 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 1 }}
                  >
                    <a onClick={logoutHandler}>Logout</a>
                  </motion.li>
                </ul>
              </motion.div>
            </>
          ) : null}
        </AnimatePresence>
        <BurgerMenu showModal={isModelOpen} setModal={openHandler} />
        <div className={styles.nav__modal}></div>
        <Modal showModal={isModelOpen} setModal={openHandler} />
      </div>
    </nav>
  );

  return nav;
};
