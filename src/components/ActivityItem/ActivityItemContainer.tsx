import { h } from "preact";

type Props = {
  activity?: string;
};

const ActivityItemContainer = (props: Props) => {
  return (
    <div id="activityItemsContainer" class="oj-flex-item oj-md-6 oj-sm-12">
      <div id="container">
        <h3>Activity Items</h3>
        {props.activity}
      </div>
    </div>
  );
};

export default ActivityItemContainer;
