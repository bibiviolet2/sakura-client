import { BookType } from "@models/BookModel";
import { ArticleDetailViewModel } from "@pages/ArticleDetail/ArticleDetailViewModel";
import React from "react";
import ArticleDSOAside from "./ArticleDSOAside";
import { observer } from "mobx-react";

type ArticleAsideProps = {
  vm: ArticleDetailViewModel;
};

const ArticleAside: React.FC<ArticleAsideProps> = observer(({ vm }) => {
  return (
    <div>{vm.book?.type === BookType.DSO && <ArticleDSOAside vm={vm} />}</div>
  );
});

export default ArticleAside;
