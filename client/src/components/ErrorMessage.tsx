import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const ErrorMessage: FC<Props> = ({ children }) => {
  return <p className="text-red-500 p-1">{children}</p>;
};
export default ErrorMessage;
