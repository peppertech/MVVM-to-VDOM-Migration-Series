import { Component, ComponentChild, h } from "preact";
import { ExtendGlobalProps, customElement } from "ojs/ojvcomponent";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit"

const sampleReducer = (state = {message: "Hello, Redux!"}, action) => {
  // Check to see if the reducer cares about this action
  if (action.type === 'message/update') {
    // If so, make a copy of `state`
    console.log('in the action type of message update')
    return {
      ...state,
      // and update the copy with the new value
      message: action.payload
    }
  }
  // otherwise return the existing state unchanged
  return state
}
const store = configureStore({ reducer: sampleReducer });

import Content from "./Content/Content";
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
        <Provider store={store}>
          <Header appName={props.appName} userLogin={props.userLogin} />
          <Content />
          {/* <Footer /> */}
        </Provider>
      </div>
    );
  }

  componentDidMount() {
    Context.getPageContext().getBusyContext().applicationBootstrapComplete();
  }
}
