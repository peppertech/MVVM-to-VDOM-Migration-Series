import ActivityContainer from "./Activity/ActivityContainer";
import ParentContainer2 from "./ParentContainer2";
import { h } from "preact";

let activitySelected: boolean;
let activity: string;
let selectedItem: string;

const ParentContainer1 = () => {
  activitySelected = true;
  selectedItem = "soccer";
  return (
    <div
      id="parentContainer1"
      class="oj-flex oj-flex-init oj-panel oj-bg-warning-20"
    >
      <ActivityContainer />
      {activitySelected && <ParentContainer2 activity={selectedItem} />}
    </div>
  );
};

export default ParentContainer1;
