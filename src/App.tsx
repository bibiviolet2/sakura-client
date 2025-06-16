import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@pages/Home/Home";
import Footer from "@components/Footer/Footer";
import { AnimatePresence } from "framer-motion";
import MainHeader from "@components/MainHeader/MainHeader";
import ChapterDetail from "@pages/ChapterDetail/ChapterDetail";

const App = () => {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <MainHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:bookSlug/:chapterSlug" element={<ChapterDetail />} />
        </Routes>
        <Footer />
      </AnimatePresence>
    </Router>
  );
};

export default App;
