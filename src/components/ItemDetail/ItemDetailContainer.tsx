import { h } from "preact";
import { KeySetImpl, KeySet } from "ojs/ojkeyset";

type Props = {
  item?: string;
};

const ItemDetailContainer = (props: Props) => {
  return (
    <div
      id="itemDetailsContainer"
      class="oj-flex-item oj-sm-padding-4x-start oj-md-6 oj-sm-12"
    >
      <h3>Item Details</h3>
      {props.item}
    </div>
  );
};

export default ItemDetailContainer;
