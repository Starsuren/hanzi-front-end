import { Navbar } from "./navbar/Navbar";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { useRouter } from "next/router";

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  return (
    <div className="allContent">
      <div id="portal"></div>
      <Header>
        <Navbar key={router.asPath} />
      </Header>
      {children}
      <Footer />
    </div>
  );
};
