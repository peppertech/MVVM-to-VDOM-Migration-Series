import { h } from "preact";
import { ActivityContainer } from "./Activity/ActivityContainer";
import { ParentContainer2 } from "./ParentContainer2";

let activitySelected: boolean;
let activity: string;
let selectedItem: string;

export function ParentContainer1() {
  activitySelected = true;
  selectedItem = "soccer";
  return (
    <div
      id="parentContainer1"
      class="oj-flex oj-flex-init oj-panel oj-bg-warning-20"
    >
      <ActivityContainer />
     { activitySelected && <ParentContainer2 activity={selectedItem}/> }
    </div>
  );
}
