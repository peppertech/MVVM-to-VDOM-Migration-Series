import { h } from "preact";
import { KeySetImpl, KeySet } from "ojs/ojkeyset";

type Props = {
  activity?: KeySetImpl<string>;
} 

export function ActivityItemContainer(props:Props) {
  return (
    <div id="activityItemsContainer" class="oj-flex-item oj-md-6 oj-sm-12">
      <div id="container">
        <h3>Activity Items</h3>
        {Array.from(props.activity.values())[0]}
      </div>
    </div>
  );
}
