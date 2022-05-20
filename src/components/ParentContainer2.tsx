import { h } from "preact";
import { ActivityItemContainer } from "./ActivityItem/ActivityItemContainer";
import { ItemDetailContainer } from "./ItemDetail/ItemDetailContainer";

type Props = {
  activity: string;
}

let itemSelected: string;

export function ParentContainer2(props:Props) {
  itemSelected = 'gloves'
  return (
    <div
      id="parentContainer2"
      class="oj-flex oj-flex-item oj-panel oj-bg-danger-30 oj-lg-padding-6x oj-md-8 oj-sm-12"
    >
      <ActivityItemContainer activity={props.activity} />
      { itemSelected && <ItemDetailContainer item={itemSelected} />}
    </div>
  );
}
