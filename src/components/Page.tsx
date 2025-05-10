import React from "react";
import Header from "@components/Header/Header";
import { motion } from "framer-motion";

type PageProps = {
  children: React.ReactNode;
  header?: React.ReactNode;
  headlineText?: string;
  type?: string;
  aside?: React.ReactNode;
};

const Page: React.FC<PageProps> = ({
  children,
  aside,
  header,
  headlineText,
  type = "dso",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`page page--${type}`}>
        <div className="container container--main">
          {(header || headlineText) && (
            <Header headlineText={headlineText}>{header}</Header>
          )}

          <div className="layout">
            <main>{children}</main>
            <aside>{aside}</aside>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Page;
