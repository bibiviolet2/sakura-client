import React from "react";
import { WithViewModel } from "@decorator/WithViewModel";
import Loader from "@components/Loader/Loader";
import Page from "@components/Page";
import { observer } from "mobx-react";
import { ChapterDetailViewModel } from "./ChapterDetailViewModel";
import Chapter from "@components/Chapter/Chapter";

const ChapterDetail: React.FC<{ viewModel: ChapterDetailViewModel }> = observer(
  ({ viewModel }) => {
    const { chapter, loading } = viewModel;

    if (loading) {
      return (
        <Page headlineText="Načítám...">
          <Loader />
        </Page>
      );
    }

    if (!chapter) {
      return (
        <Page headlineText="Článek nenalezen">
          <p>Tento článek tady není.</p>
        </Page>
      );
    }

    return <Chapter chapter={chapter} />;
  }
);

export default WithViewModel(ChapterDetailViewModel)(ChapterDetail);
