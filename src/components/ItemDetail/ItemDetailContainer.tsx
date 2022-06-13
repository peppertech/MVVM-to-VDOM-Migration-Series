import { h } from "preact";
import { useContext} from "preact/hooks";
import { KeySetImpl } from "ojs/ojkeyset";
import { useSelector, useDispatch } from "react-redux";
import {ThemeContext} from "../App"

type Props = {
  item?: KeySetImpl<string>;
};


const ItemDetailContainer = (props: Props) => {
  const dispatch = useDispatch();
  const messageData = useSelector((state:any) => state.message);

  const theme = useContext(ThemeContext);


  const updateMessage = () => {
    dispatch({
      type: "message/update",
      message: "New message from Redux!",
    });
  };
  
  return (
    <div id="itemDetailsContainer" class="oj-flex-item oj-md-6 oj-sm-12">
      <h3>Item Details</h3>
      {messageData + " : "}<br/>
      {Array.from(props.item.values())[0]}<br/>
      <oj-button onojAction={updateMessage}>Update Message</oj-button><br/>
      {theme}
    </div>
  );
};

export default ItemDetailContainer;
