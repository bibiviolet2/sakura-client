import React from "react";
import { WithViewModel } from "@decorator/WithViewModel";
import { ArticleDetailViewModel } from "./ArticleDetailViewModel";

const ArticleDetail: React.FC<{ viewModel: ArticleDetailViewModel }> = ({ viewModel }) => {
  const { article, loading } = viewModel;

  if (loading) {
    return <h2>načítám</h2>;
  }

  return (
    article && <div>
      <h1>{article.name}</h1>
      <p>{article.content}</p>
    </div>
  );
};

export default WithViewModel(ArticleDetailViewModel)(ArticleDetail);
