import * as React from "react";
import {Link} from "react-router";

import AppProducts from "./appProducts";

//require("./../styles/index.scss");

export interface IHomeProps {
}

export default class Home extends React.Component<IHomeProps, any> {

	render() {
		return (
		<div className="home">
			<div className="home__splash">
				<div className="splash-promo">
          <h1>BEEEEEN WAAAAAS HEREEERE!</h1>
					<div className="splash-promo__title">UI components for Elasticsearch</div>
					<div className="splash-promo__blurb">The easiest way to build a great search experience with Elasticsearch.</div>
					<div className="splash-promo__example-site">
						  <AppProducts/>
					</div>
				</div>
			</div>
    </div>
		);
	}
}
