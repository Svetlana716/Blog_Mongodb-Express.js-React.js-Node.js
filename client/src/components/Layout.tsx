import { FC, ReactNode } from "react";
import Header from "./Header";

export interface ILayoutProps {
  children: ReactNode;
}
const Layout: FC<ILayoutProps> = ({ children }) => {
  return (
    <div className="container mx-auto px-5">
      <Header />
      <main className="max-w-[1200px] mx-auto">{children}</main>
    </div>
  );
};
export default Layout;
