import React from "react";
import "./Article.scss"; // ✅ Import SCSS bez modularity
import ArticleModel from "model/ArticleModel";
import Text from "@components/Text/Text";

type ArticleProps = {
  article: ArticleModel;
};

const Article: React.FC<ArticleProps> = ({ article }) => {
  return (
    <article className="article">
        <h1 className="article__title">{article.title}</h1>
        <div className="article__content">
            <Text>{article.content}</Text>
        </div>
    </article>
  );
};

export default Article;
