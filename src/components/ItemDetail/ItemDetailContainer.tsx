import { h } from "preact";
import { KeySetImpl, KeySet } from "ojs/ojkeyset";

type Props = {
  item?: KeySetImpl<string>;
};

const ItemDetailContainer = (props: Props) => {
  return (
    <div
      id="itemDetailsContainer"
      class="oj-flex-item oj-md-6 oj-sm-12"
    >
      <h3>Item Details</h3>
      {Array.from(props.item.values())[0]}
    </div>
  );
};

export default ItemDetailContainer;
