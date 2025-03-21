import { BookmarkIcon } from "@components/Icons";
import Loader from "@components/Loader/Loader";
import { ArticleDetailViewModel } from "@pages/ArticleDetail/ArticleDetailViewModel";
import { observer } from "mobx-react";
import React from "react";
import { Link } from "react-router-dom";

type ArticleDSOAsideProps = {
  vm: ArticleDetailViewModel;
};

const ArticleDSOAside: React.FC<ArticleDSOAsideProps> = observer(({ vm }) => {
  const { book } = vm;

  if (vm.loadingArticles) {
    return <Loader />;
  }

  return (
    <nav>
      <h2>
        <BookmarkIcon /> {book?.name}
      </h2>
      <ul>
        {vm.articles?.map((article) => (
          <li key={article.slug}>
            <Link
              to={`/${book?.slug}/${article.slug}`}
              className={article.slug === vm.articleId ? "active" : ""}
            >
              {article.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
});

export default ArticleDSOAside;
