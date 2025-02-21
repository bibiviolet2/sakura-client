import { useParams } from "react-router-dom";

// Definujeme typy pro články
type Article = {
  title: string;
  content: string;
};

// Definujeme typ struktury kategorií
type ArticlesData = {
  [category: string]: {
    [article: string]: Article;
  };
};

// Data článků (prozatím statická)
const articles: ArticlesData = {
  hodnoty: {
    laskavost: { title: "Laskavost", content: "Laskavost je základ harmonie..." },
    pravda: { title: "Pravda", content: "Pravda je světlem na cestě..." },
    harmonie: { title: "Harmonie", content: "Harmonie je propojení se světem..." },
  },
  filozofie: {
    nirvana: { title: "Nirvána", content: "Nirvána je stav osvobození..." },
    samsara: { title: "Samsára", content: "Samsára je cyklus života..." },
  },
};

const ArticleDetail = () => {
  const { categoryId, articleId } = useParams<{ categoryId: string; articleId: string }>();

  // Ověříme, zda kategorie existuje
  const category = articles[categoryId as keyof ArticlesData];
  
  // Ověříme, zda článek existuje v kategorii
  const article = category ? category[articleId as keyof typeof category] : undefined;

  if (!article) {
    return <h2>Článek nenalezen</h2>;
  }

  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.content}</p>
    </div>
  );
};

export default ArticleDetail;
