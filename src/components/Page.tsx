import React from "react";
import Header from "@components/Header/Header";

type PageProps = {
  children: React.ReactNode;
  header?: React.ReactNode;
  headlineText?: string;
  type?: string;
};

const Page: React.FC<PageProps> = ({ children, header, headlineText, type = "dso" }) => {
  return (
    <div className={`page page--${type}`}>
		<div className="container container--main">
			{(header || headlineText) && <Header headlineText={headlineText}>{header}</Header>}

			<div className="layout">
				<main>{children}</main>
				<aside>
					{/* <section>
					<h2>Prozkoumej kategorie</h2>
					<ul>
						<li>
						<a href="/hodnoty">💖 Hodnoty</a>
						</li>
						<li>
						<a href="/filozofie">📖 Filozofie</a>
						</li>
					</ul>
					</section> */}
				</aside>
			</div>
		</div>
	</div>
  );
};

export default Page;
