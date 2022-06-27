import ActivityContainer from "./Activity/ActivityContainer";
import ParentContainer2 from "./ParentContainer2";
import { h } from "preact";
import { useState } from "preact/hooks";
import { KeySetImpl, KeySet } from "ojs/ojkeyset";

type Activity = {
  id: number;
  name: string;
  short_desc: string;
};

let INIT_SELECTEDACTIVITY = new KeySetImpl([]) as KeySet<Activity["name"]>;

const ParentContainer1 = () => {
  const [selectedActivity, setSelectedActivity] = useState(
    INIT_SELECTEDACTIVITY
  );

  const showActiveItems = () => {
    return (selectedActivity as KeySetImpl<string>).values().size > 0
      ? true
      : false;
  };

  const activityChangedHandler = (value: KeySet<string>) => {
    if ((value as KeySetImpl<string>).values().size > 0) {
      console.log(
        (value as KeySetImpl<string>).values().entries().next().value[0]
      );
    } else {
      console.log("Nothing selected");
    }
    setSelectedActivity(value);
  };

  return (
    <div id="parentContainer1" class="oj-flex oj-flex-init">
      <ActivityContainer onActivityChanged={activityChangedHandler} />
      {showActiveItems() && (
        <ParentContainer2
          activity={
            (selectedActivity as KeySetImpl<string>).values().entries().next()
              .value[0]
          }
        />
      )}
      {!showActiveItems() && (
        <h4 class="oj-typography-subheading-sm">
          Select activity to view items
        </h4>
      )}
    </div>
  );
};

export default ParentContainer1;
