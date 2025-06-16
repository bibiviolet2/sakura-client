import React from "react";
import Page from "@components/Page";
import Text from "@components/Text/Text";
import { WithViewModel } from "@decorator/WithViewModel";
import { HomeViewModel } from "./HomeViewModel";
import { Link } from "react-router-dom";
import Loader from "@components/Loader/Loader";
import { observer } from "mobx-react";

const Home: React.FC<{ viewModel: HomeViewModel }> = observer(
  ({ viewModel }) => {
    const { chapter, loading } = viewModel.chapterService;

    if (loading) {
      return (
        <Page headlineText="Načítám...">
          <Loader />
        </Page>
      );
    }

    return (
      <Page
        type="home"
        header={
          <>
            <h1 className="header__title">{chapter?.name}</h1>
            <nav className="header__nav">
              <Link to={`/serial/${chapter?.nextChapterId}`}>
                Další epizoda &raquo;
              </Link>
            </nav>
          </>
        }
      >
        <Text>{chapter?.content || ""}</Text>
      </Page>
    );
  }
);

export default WithViewModel(HomeViewModel)(Home);
