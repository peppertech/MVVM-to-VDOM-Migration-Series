import { h } from "preact";
import { useState, useCallback } from "preact/hooks";
import { KeySetImpl, KeySet } from "ojs/ojkeyset";
import { ActivityContainer } from "./Activity/ActivityContainer";
import { ParentContainer2 } from "./ParentContainer2";

type Activity = {
  id: number;
  name: string;
  short_desc: string;
};

let activitySelected: boolean = true;
let INIT_SELECTEDACTIVITY = new KeySetImpl(["Soccer"]) as KeySet<
  Activity["name"]
>;
let defaultActivity: string = "Soccer";

export function ParentContainer1() {
  const [selectedActivity, setSelectedActivity] = useState(
    INIT_SELECTEDACTIVITY
  );

  const showActivityItems = () => {
    let show = (selectedActivity as KeySetImpl<string>).values().size;
    return show > 0 ? true : false;
  };

  const activityChangedHandler = useCallback((value: KeySet<string>) => {
    if ((value as KeySetImpl<string>).values().size > 0) {
      console.log(
        (value as KeySetImpl<string>).values()?.entries().next().value[0]
      );
    }else {
      console.log('nothing selected');
    }
    setSelectedActivity(value);
  }, []);

  return (
    <div id="parentContainer1" class="oj-flex oj-flex-init">
      <ActivityContainer
        value={defaultActivity}
        onActivityChanged={activityChangedHandler}
      />
      {showActivityItems() && (
        <ParentContainer2 activity={selectedActivity as KeySetImpl<string>} />
      )}
    </div>
  );
}
