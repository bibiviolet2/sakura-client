import React from "react";
import Header from "@components/Header/Header";

type PageProps = {
  children: React.ReactNode;
  header?: React.ReactNode;
  headlineText?: string;
  type?: string;
  aside?: React.ReactNode;
};

const Page: React.FC<PageProps> = ({ children, aside, header, headlineText, type = "dso" }) => {
  return (
    <div className={`page page--${type}`}>
		<div className="container container--main">
			{(header || headlineText) && <Header headlineText={headlineText}>{header}</Header>}

			<div className="layout">
				<main>{children}</main>
				<aside>
					{aside}
				</aside>
			</div>
		</div>
	</div>
  );
};

export default Page;
