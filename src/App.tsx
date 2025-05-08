import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@pages/Home/Home";
import ArticleDetail from "@pages/ArticleDetail/ArticleDetail";
import Footer from "@components/Footer/Footer";
import MainNav from "@components/MainNav/MainNav";
import { AnimatePresence } from "framer-motion";

const App = () => {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <MainNav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:categoryId/:articleId" element={<ArticleDetail/>} />
          </Routes>
        <Footer />
      </AnimatePresence>
    </Router>
  );
};

export default App;
