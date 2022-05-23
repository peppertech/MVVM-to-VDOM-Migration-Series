import { Component, ComponentChild, h } from "preact";
import { ExtendGlobalProps, customElement } from "ojs/ojvcomponent";

import { Content } from "./Content/Content";
import Footer from "./Footer";
import Header from "./Header";

import Context = require("ojs/ojcontext");

type Props = {
  appName?: string;
  userLogin?: string;
};

@customElement("app-root")
export class App extends Component<ExtendGlobalProps<Props>> {
  static defaultProps: Props = {
    appName: "Learning Path VDOM",
    userLogin: "john.hancock@oracle.com",
  };

  render(props: ExtendGlobalProps<Props>): ComponentChild {
    return (
      <div id="appContainer" class="oj-web-applayout-page">
        <Header appName={props.appName} userLogin={props.userLogin} />
        <Content />
        <Footer />
      </div>
    );
  }

  componentDidMount() {
    Context.getPageContext().getBusyContext().applicationBootstrapComplete();
  }
}
