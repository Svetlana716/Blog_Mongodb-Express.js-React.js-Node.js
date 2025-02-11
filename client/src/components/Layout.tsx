import { FC, ReactNode } from "react";
import Navbar from "./Navbar";

export interface ILayoutProps {
  children: ReactNode;
}
const Layout: FC<ILayoutProps> = ({ children }) => {
  return (
    <div className="container mx-auto px-10">
      <Navbar />
      {children}
    </div>
  );
};
export default Layout;
