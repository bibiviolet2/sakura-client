import React from "react";
import "./Chapter.scss";
import Text from "@components/Text/Text";
import Page from "@components/Page";
import ChapterModel from "@models/ChapterModel";

type ChapterProps = {
  chapter: ChapterModel;
};

const Chapter: React.FC<ChapterProps> = ({ chapter }) => {
  return (
    <Page headlineText={chapter.name}>
      <div className="chapter__content">
        <Text>{chapter.content}</Text>
      </div>
    </Page>
  );
};

export default Chapter;
