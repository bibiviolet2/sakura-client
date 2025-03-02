import React from "react";
import "./Article.scss"; // ✅ Import SCSS bez modularity
import ArticleModel from "@models/ArticleModel";
import Text from "@components/Text/Text";
import Page from "@components/Page";

type ArticleProps = {
  article: ArticleModel;
};

const Article: React.FC<ArticleProps> = ({ article }) => {
  return (
    <Page
        headlineText={article.title}
    >
        <div className="article__content">
            <Text>{article.content}</Text>
            </div>
    </Page>
  );
};

export default Article;
