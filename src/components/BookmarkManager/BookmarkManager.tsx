import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import "./BookmarkManager.scss"; 
import { BookmarksIcon } from "@components/Icons";

const BookmarkManager = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["bookmark"]);
  const [savedBookmark, setSavedBookmark] = useState<string | null>(null);
  const [isBookmarkVisible, setIsBookmarkVisible] = useState(false);

  const currentPage = window.location.pathname; // Aktuální stránka

  const bookmarkIcon = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1.1" viewBox="0 0 16 16" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><path d="M3 0v16l5-5 5 5v-16z"></path></svg>`;

  const makeParagraphs = () => {
    const main = document.querySelector("main");
    if (!main) return;
    const paragraphs = main.querySelectorAll("p");

    paragraphs.forEach((p, index) => {
      if (!p.id) {
        p.id = `paragraph-${index}`;
      }

      if (p.id === savedBookmark) {
        p.classList.add("saved-bookmark");
      } else {
        p.classList.remove("saved-bookmark");
      }

      if (!p.querySelector(".bookmark-btn")) {
        const btn = document.createElement("button");
        btn.innerHTML = bookmarkIcon;
        btn.className = "bookmark-btn";
        btn.title = "Uložit záložku - příště mě upozorni, že jsem zde skončil."

        btn.onclick = () => {
          const bookmarkData = JSON.stringify({ page: currentPage, id: p.id });
          setCookie("bookmark", bookmarkData, { path: "/", maxAge: 604800 });

          setSavedBookmark(p.id);
          setIsBookmarkVisible(true);
        };

        p.prepend(btn);
      }
    });
  }

  useEffect(() => {

    if (cookies.bookmark && cookies.bookmark.page === currentPage) {
      setSavedBookmark(cookies.bookmark.id);
      setIsBookmarkVisible(true);
    }

    makeParagraphs();

  }, []);

  const goToBookmark = () => {
    if (savedBookmark) {
      const savedElement = document.getElementById(savedBookmark);
      if (savedElement) {
        savedElement.scrollIntoView({ behavior: "smooth", block: "center" });

        setTimeout(() => {
          removeCookie("bookmark", { path: "/" });
          setSavedBookmark(null);
          setIsBookmarkVisible(false);
        }, 2000);

        savedElement.classList.add("saved-bookmark");
      }
    }
  };

  return isBookmarkVisible && savedBookmark ? (
    <div className="bookmark-notification" onClick={goToBookmark}>
      <BookmarksIcon /> Máš uloženou záložku! Klikni pro pokračování.
    </div>
  ) : null;
};

export default BookmarkManager;
