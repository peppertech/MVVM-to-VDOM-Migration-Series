import Content from "./Content/Content";
import Header from "./Header";
import { Component, ComponentChild, h, createContext } from "preact";
import { ExtendGlobalProps, customElement } from "ojs/ojvcomponent";
import Context = require("ojs/ojcontext");
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

const sampleReducer = (state = { message: "Hello, Redux!" }, action) => {
  // Check to see if the reducer cares about this action
  if (action.type === "message/update") {
    // If so, make a copy of `state`
    return { message: action.message };
  }
  // otherwise return the existing state unchanged
  return state;
};
const store = configureStore({ reducer: sampleReducer });

export const ThemeContext = createContext(null);

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

  state = {theme: 'dark'};

  updateTheme = () => {
    console.log('in update')
    this.setState({theme:'light'});
  }

  render(props: ExtendGlobalProps<Props>): ComponentChild {
    return (
      <div id="appContainer" class="oj-web-applayout-page">
        <Provider store={store}>
          <Header appName={props.appName} userLogin={props.userLogin} />
          <ThemeContext.Provider value={this.state.theme}>
            <oj-button onojAction={this.updateTheme}>Update Theme</oj-button>
          <Content />
          </ThemeContext.Provider>
        </Provider>
      </div>
    );
  }

  componentDidMount() {
    Context.getPageContext().getBusyContext().applicationBootstrapComplete();
  }
}
