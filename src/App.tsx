import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "@pages/Home";
import ArticleDetail from "@pages/ArticleDetail/ArticleDetail";

const App = () => {
  return (
    <Router>
      <nav className="nav--main">
        <div className="container">
          <Link to="/">Domů</Link> | <Link to="/hodnoty">Hodnoty</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:categoryId/:articleId" element={<ArticleDetail/>} />
      </Routes>
    </Router>
  );
};

export default App;
