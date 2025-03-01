import React from "react";
import "./Article.scss"; // ✅ Import SCSS bez modularity
import ArticleModel from "model/ArticleModel";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSeparator from "@plugins/rehype/rehypeSeparator";

type ArticleProps = {
  article: ArticleModel;
};

const Article: React.FC<ArticleProps> = ({ article }) => {
  return (
    <article className="article">
          <h1 className="article__title">{article.title}</h1>
          <div className="article__content">
        <ReactMarkdown rehypePlugins={[rehypeRaw, rehypeSeparator]}>{article.content}</ReactMarkdown>
        </div>
    </article>
  );
};

export default Article;
