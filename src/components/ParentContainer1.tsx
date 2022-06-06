import { h } from "preact";
import { useState, useEffect, useCallback } from "preact/hooks";
import { KeySetImpl, KeySet } from "ojs/ojkeyset";
import { ActivityContainer } from "./Activity/ActivityContainer";
import { ParentContainer2 } from "./ParentContainer2";

type Activity = {
  id: number;
  name: string;
  short_desc: string;
};

let activitySelected: boolean = true;
let INIT_SELECTEDACTIVITY = new KeySetImpl(['Soccer']) as KeySet<Activity['name']>;
let defaultActivity:string = 'Soccer';

export function ParentContainer1() {
  const [selectedActivity, setSelectedActivity] = useState(INIT_SELECTEDACTIVITY);
  // const [activitySelected, setActivitySelected] = useState(false);

  const activityChangedHandler = useCallback((value: KeySet<string>) => {
    console.log(value)
    setSelectedActivity(value);
    activitySelected = value != undefined ? true : false;
  },[]);

  return (
    <div id="parentContainer1" class="oj-flex oj-flex-init">
      <ActivityContainer
        value={defaultActivity}
        onActivityChanged={activityChangedHandler}
      />
      {(selectedActivity as KeySetImpl<string>).values().size && <ParentContainer2 activity={selectedActivity as KeySetImpl<string>} />}
    </div>
  );
}
