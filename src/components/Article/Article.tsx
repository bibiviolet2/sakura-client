import React from "react";
import "./Article.scss"; // ✅ Import SCSS bez modularity
import ArticleModel from "@models/ArticleModel";
import Text from "@components/Text/Text";
import Page from "@components/Page";
import LineHighlighter from "@components/LineHighligher";
import BookmarkManager from "@components/BookmarkManager/BookmarkManager";

type ArticleProps = {
  article: ArticleModel;
  type?: string;
};

const Article: React.FC<ArticleProps> = ({ article, type = "dso" }) => {
  return (
    <Page
        headlineText={article.title}
        type={type}
    >
          <BookmarkManager />
        <div className="article__content">
          <LineHighlighter />
            <Text>{article.content}</Text>
            </div>
    </Page>
  );
};

export default Article;
