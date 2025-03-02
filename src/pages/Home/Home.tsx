import React from "react";
import Page from "@components/Page";
import Text from "@components/Text/Text";
import { WithViewModel } from "@decorator/WithViewModel";
import { removeIndentation } from "@utils/removeIndentation";
import { HomeViewModel } from "./HomeViewModel";

const Home: React.FC<{ viewModel: HomeViewModel }> = ({ viewModel }) => {
  return (
    <Page
      header={
        <>
          <h1 className="header__title">
            {viewModel.title} <span className="hidden-for-screen-readers">Online</span>
          </h1>
          <p>{viewModel.subtitle}</p>
        </>
      }
    >
      <Text>{removeIndentation(viewModel.content)}</Text>
    </Page>
  );
};

export default WithViewModel(HomeViewModel)(Home);
