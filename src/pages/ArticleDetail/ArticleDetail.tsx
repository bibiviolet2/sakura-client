import React from "react";
import { WithViewModel } from "@decorator/WithViewModel";
import { ArticleDetailViewModel } from "./ArticleDetailViewModel";
import Loader from "@components/Loader/Loader"; // ✅ Importujeme Loader
import Article from "@components/Article/Article";
import Page from "@components/Page";
import ArticleAside from "@components/ArticleAside/ArticleAside";
import { observer } from "mobx-react";

const ArticleDetail: React.FC<{ viewModel: ArticleDetailViewModel }> = observer(
  ({ viewModel }) => {
    const { article, loading, book } = viewModel;

  if (loading) {
    return <Page
    headlineText="Načítám..."
  >
    <Loader />
  </Page>;
  }

    if (!article) {
      return (
        <Page headlineText="Článek nenalezen">
          <p>Tento článek tady není.</p>
        </Page>
      );
    }

    return (
      <Article
        article={article}
        type={book?.type}
        aside={<ArticleAside vm={viewModel} />}
      />
    );
  }
);

export default WithViewModel(ArticleDetailViewModel)(ArticleDetail);
