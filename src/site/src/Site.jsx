import * as React from "react";
import {Link} from "react-router";

//require("./../styles/index.scss");

export interface ISiteProps {
  children:any
}

export default class Site extends React.Component<ISiteProps, any> {
  render() {
		return (
      <div className="site">
        <div className="site__menu menu">
          <div className="menu-inner">
            <Link className="menu__title" to="/">Searchkit</Link>
            <a href="https://blog.searchkit.co" className="menu__tab menu__tab--blog">Blog</a>
            <Link to="/demos" className="menu__tab menu__tab--demo" activeClassName="is-active">Demos</Link>
            <a href="https://gitter.im/searchkit/searchkit" className="menu__tab menu__tab--chat">Chat</a>
            <a href="http://docs.searchkit.co/stable" className="menu__tab menu__tab--documentation">Documentation</a>
            <a href="http://github.com/searchkit/searchkit" className="menu__tab menu__tab--github"></a>
          </div>
        </div>
        <div className="site__content content">
          {this.props.children}
        </div>
      </div>
    )
	}
}
