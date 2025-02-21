import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "@pages/Home";
import Category from "@pages/Category";
import ArticleDetail from "@pages/ArticleDetail";

const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/">Domů</Link> | <Link to="/hodnoty">Hodnoty</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:categoryId" element={<Category />} />
        <Route path="/:categoryId/:articleId" element={<ArticleDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
