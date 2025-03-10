import { FC, ReactNode, useState } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

const Accordion: FC<Props> = ({ title, children }) => {
  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <div className="md:w-3/4 lg:w-3/5 mx-auto">
      <button
        onClick={() => setAccordionOpen(!accordionOpen)}
        className="flex justify-between w-full p-5 hover:bg-gray-700 rounded-2xl"
      >
        <span className="font-semibold text-primary text-lg">{title}</span>
        <svg
          className="fill-indigo-500 shrink-0 ml-8"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center transition duration-200 ease-out ${
              accordionOpen && "!rotate-180"
            }`}
          />
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center rotate-90 transition duration-200 ease-out ${
              accordionOpen && "!rotate-180"
            }`}
          />
        </svg>
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600 text-sm ${
          accordionOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
