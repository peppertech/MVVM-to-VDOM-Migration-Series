import { h } from "preact";
import { KeySetImpl, KeySet } from "ojs/ojkeyset";
import { useStore, useSelector } from "react-redux";

type Props = {
  item?: KeySetImpl<string>;
};

const ItemDetailContainer = (props: Props) => {
  const store: any = useStore();
  const state = store.getState();
  const messageState = useSelector(() => {
    return {...state, 
      message:state.message
    }
  });

  const updateMessage = () => {
    store.dispatch({
      type: "message/update",
      message: "New message from Redux!",
    });
  };
  
  return (
    <div id="itemDetailsContainer" class="oj-flex-item oj-md-6 oj-sm-12">
      <h3>Item Details</h3>
      {messageState.message + " : "}
      {Array.from(props.item.values())[0]}
      <br />
      <oj-button onojAction={updateMessage}>Update Message</oj-button>
    </div>
  );
};

export default ItemDetailContainer;
