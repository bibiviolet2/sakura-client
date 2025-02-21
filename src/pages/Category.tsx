import { Link, useParams } from "react-router-dom";

const categories = {
  hodnoty: [
    { id: "laskavost", title: "Laskavost" },
    { id: "pravda", title: "Pravda" },
    { id: "harmonie", title: "Harmonie" },
  ],
  filozofie: [
    { id: "nirvana", title: "Nirvána" },
    { id: "samsara", title: "Samsára" },
  ],
};

const Category = () => {
  const { categoryId } = useParams();
  const articles = categories[categoryId as keyof typeof categories];

  if (!articles) {
    return <h2>Kategorie nenalezena</h2>;
  }

  return (
    <div>
      <h1>Kategorie: {categoryId}</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <Link to={`/${categoryId}/${article.id}`}>{article.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
