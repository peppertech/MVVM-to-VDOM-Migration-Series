import ActivityItemContainer from "./ActivityItem/ActivityItemContainer";
import ItemDetailContainer from "./ItemDetail/ItemDetailContainer";
import { h } from "preact";
import { useState, useEffect, useCallback } from "preact/hooks";
import { RESTDataProvider } from "ojs/ojrestdataprovider";

type Props = {
  activity?: Item;
};

type ActivityItem = {
  id: string;
  name: string;
};
type Item = {
  id: number;
  name: string;
  short_desc?: string;
  price?: number;
  quantity?: number;
  quantity_shipped?: number;
  quantity_instock?: number;
  activity_id?: number;
  image?: string;
};

const baseServiceUrl =
  "https://apex.oracle.com/pls/apex/oraclejet/lp/activities/";
let INIT_DATAPROVIDER = new RESTDataProvider<ActivityItem["id"], ActivityItem>({
  keyAttributes: "id",
  url: baseServiceUrl,
  transforms: {
    fetchFirst: {
      request: null,
      response: (): any => {
        return { data: [] };
      },
    },
  },
});

const ParentContainer2 = (props: Props) => {
  const [selectedItemVal, setSelectedItemVal] = useState(null);
  const [activityItemDP, setactivityItemDP] = useState(INIT_DATAPROVIDER);

  const activityItemChangeHandler = useCallback(
    (item: Item) => {
      setSelectedItemVal(item);
    },
    [selectedItemVal]
  );

  const showItems = useCallback(() => {
    return selectedItemVal === null ? false : true;
  },[selectedItemVal]);

  useEffect(() => {
    //setSelectedItemVal(null);
    setactivityItemDP(
      new RESTDataProvider<ActivityItem["id"], ActivityItem>({
        keyAttributes: "id",
        url: baseServiceUrl + "/" + props.activity.id + "/items/",
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
      })
    );
  }, [props.activity]);

  return (
    <div
      id="parentContainer2"
      class="oj-flex oj-flex-item oj-lg-padding-6x-horizontal oj-md-8 oj-sm-12">
      <ActivityItemContainer
        selectedActivity={props.activity}
        data={activityItemDP}
        onItemChanged={activityItemChangeHandler}
      />
      {showItems() && (
        <ItemDetailContainer item={selectedItemVal}/>
      )}
      {!showItems() && (
        <h4 class="oj-typography-subheading-sm">
          Select activity item to see details
        </h4>
      )}
    </div>
  );
};

export default ParentContainer2;
