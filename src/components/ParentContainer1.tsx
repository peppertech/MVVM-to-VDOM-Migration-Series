import ActivityContainer from "./Activity/ActivityContainer";
import ParentContainer2 from "./ParentContainer2";
import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { RESTDataProvider } from "ojs/ojrestdataprovider";
import { KeySetImpl, KeySet } from "ojs/ojkeyset";

type Activity = {
  id: number;
  name: string;
  short_desc: string;
};
let INIT_SELECTEDACTIVITY = new KeySetImpl([]) as KeySet<Activity["name"]>;

// Activity key attribute that you'll pass as a parameter when creating
// RESTDataProvider instance
let keyAttributes: string = "id";
// REST endpoint that returns Activity data
const restServerURLActivities: string =
  "https://apex.oracle.com/pls/apex/oraclejet/lp/activities/";

const activityDataProvider = new RESTDataProvider<Activity['id'],Activity>({
  keyAttributes: keyAttributes,
  url: restServerURLActivities,
  transforms: {
    fetchFirst: {
      request: async (options) => {
        const url = new URL(options.url);
        const { size, offset } = options.fetchParameters;
        url.searchParams.set("limit", String(size));
        url.searchParams.set("offset", String(offset));
        return new Request(url.href);
      },
      response: async ({ body }) => {
        const { items, totalSize, hasMore } = body;
        return { data: items, totalSize, hasMore };
      },
    },
  },
});

const ParentContainer1 = () => {
  const [selectedActivity, setSelectedActivity] = useState(
    INIT_SELECTEDACTIVITY
  );

  const showActivityItems = () => {
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
      <ActivityContainer
        data={activityDataProvider}
        onActivityChanged={activityChangedHandler}
      />
      {showActivityItems() && (
        <ParentContainer2
          activity={
            (selectedActivity as KeySetImpl<string>).values().entries().next()
              .value[0]
          }
        />
      )}
      {!showActivityItems() && (
        <h4 class="oj-typography-subheading-sm">
          Select activity to view items
        </h4>
      )}
    </div>
  );
};

export default ParentContainer1;
