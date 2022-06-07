import ActivityItemContainer from "./ActivityItem/ActivityItemContainer";
import ItemDetailContainer from "./ItemDetail/ItemDetailContainer";
import { h } from "preact";

type Props = {
  activity: string;
};

let itemSelected: string;

const ParentContainer2 = (props: Props) => {
  itemSelected = "gloves";
  return (
    <div
      id="parentContainer2"
      class="oj-flex oj-flex-item oj-panel oj-bg-danger-30 oj-lg-padding-6x oj-md-8 oj-sm-12"
    >
      <ActivityItemContainer activity={props.activity} />
      {itemSelected && <ItemDetailContainer item={itemSelected} />}
    </div>
  );
};

export default ParentContainer2;
