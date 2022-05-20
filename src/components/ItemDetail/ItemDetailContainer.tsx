import { h } from "preact";

type Props = {
  item?:string;
}

export function ItemDetailContainer(props:Props) {
  return (
    <div
      id="itemDetailsContainer"
      class="oj-flex-item oj-panel oj-bg-neutral-30 oj-md-6 oj-sm-12"
    >
      <h3>Item Details</h3>
      {props.item}
    </div>
  );
}
