import React from "react";
import "./Article.scss"; // ✅ Import SCSS bez modularity
import ArticleModel from "model/ArticleModel";

type ArticleProps = {
  article: ArticleModel;
};

const Article: React.FC<ArticleProps> = ({ article }) => {
  return (
    <article className="article">
      <h1 className="article__title">{article.title}</h1>
      <p className="article__content">{article.content}</p>
    </article>
  );
};

export default Article;
