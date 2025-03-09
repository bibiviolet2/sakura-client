import React from "react";
import { WithViewModel } from "@decorator/WithViewModel";
import { ArticleDetailViewModel } from "./ArticleDetailViewModel";
import Loader from "@components/Loader/Loader"; // ✅ Importujeme Loader
import Article from "@components/Article/Article";

type ArticleDetailProps = {
  type?: string;
};

const ArticleDetail: React.FC<ArticleDetailProps & { viewModel: ArticleDetailViewModel }> = ({ viewModel, type = "dso" }) => {
  const { article, loading } = viewModel;

  if (loading) {
    return <Loader />; // ✅ Použití Loader komponenty
  }

  if (!article) {
    return <h2>Článek nenalezen</h2>;
  }

  return (
    <Article article={article} type={type} />
  );
};

export default WithViewModel(ArticleDetailViewModel)(ArticleDetail);
