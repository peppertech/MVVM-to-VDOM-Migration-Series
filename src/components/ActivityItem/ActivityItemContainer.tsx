import { h, ComponentProps } from "preact";
import { useState } from "preact/hooks";
import { KeySetImpl, KeySet } from "ojs/ojkeyset";
import "ojs/ojlistview";
import { ojListView } from "ojs/ojlistview";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");

type Props = {
  selectedActivity?: string;
  data?: string;
  onItemChanged?: (value: string) => void;
};
type Item = {
  id: number;
  name: string;
  short_desc: string;
  price: number;
  quantity: number;
  quantity_shipped: number;
  quantity_instock: number;
  activity_id: number;
  image: string;
};

type ActivityItem = {
  id: number;
  name: string;
  items: Array<Item>;
  short_desc: string;
  image: string;
};

type ListViewProps = ComponentProps<"oj-list-view">;
const gridlinesItemVisible: ListViewProps["gridlines"] = { item: "visible" };
const scrollPolicyOpts: ListViewProps["scrollPolicyOptions"] = { fetchSize: 5 };
const data = [
  {
    id: 10,
    name: "Louisville Slugger bat",
    short_desc: "Ash wood bat",
    price: 28.8,
    quantity: 34,
    quantity_shipped: 22,
    quantity_instock: 12,
    activity_id: 1,
    image: "styles/images/product_images/pucbat.jpg",
  },
  {
    id: 11,
    name: "SureCatch Baseball Glove",
    short_desc: "All-purpose baseball glove",
    price: 25.55,
    quantity: 36,
    quantity_shipped: 12,
    quantity_instock: 24,
    activity_id: 1,
    image: "styles/images/product_images/alglove.jpg",
  },
  {
    id: 12,
    name: "Baseball",
    short_desc: "Official game ball",
    price: 16.95,
    quantity: 100,
    quantity_shipped: 60,
    quantity_instock: 40,
    activity_id: 1,
    image: "styles/images/product_images/baseball.jpg",
  },
  {
    id: 13,
    name: "Western R16 Helmet",
    short_desc: "Two-tone batter's helmet",
    price: 30.29,
    quantity: 50,
    quantity_shipped: 12,
    quantity_instock: 38,
    activity_id: 1,
    image: "styles/images/product_images/batterhelm.jpg",
  },
  {
    id: 14,
    name: "Western C1 Helmet",
    short_desc: "Blue catcher's helmet",
    price: 38.5,
    quantity: 60,
    quantity_shipped: 25,
    quantity_instock: 35,
    activity_id: 1,
    image: "styles/images/product_images/chaphelm.jpg",
  },
  {
    id: 19183,
    name: "Sure Fire Ball (Set of 4)",
    short_desc: "Canvas balls for practice",
    price: 25.5,
    quantity: 96,
    quantity_shipped: 61,
    quantity_instock: 35,
    activity_id: 1,
    image: "styles/images/product_images/jet_logo_256.png",
  },
];
const activityDataProvider: MutableArrayDataProvider<
  ActivityItem["name"],
  ActivityItem
> = new MutableArrayDataProvider(data, {
  keyAttributes: "name",
});

const listItemRenderer = (item: ojListView.ItemTemplateContext) => {
  return (
    <div class="oj-flex no-wrap">
      <span
        class="demo-thumbnail oj-flex-item"
        style={"background-image:url(" + item.data.image + ")"}></span>
      <div class="demo-content oj-flex-item">
        <div>
          <strong>{item.data.name}</strong>
        </div>
        <span class="demo-metadata">{item.data.short_desc}</span>
      </div>
    </div>
  );
};

const DEFAULT_ACTIVITY_ITEM_STATE = new KeySetImpl([]) as KeySet<string>;

const ActivityItemContainer = (props: Props) => {
  const [activityItemValue, setActivityItemValue] = useState(
    DEFAULT_ACTIVITY_ITEM_STATE
  );
  const selectedActivityItemChanged = (
    event: ojListView.selectedChanged<ActivityItem["name"], ActivityItem>
  ) => {
    if ((event.detail.value as KeySetImpl<string>).values().size > 0) {
      props.onItemChanged(
        Array.from((event.detail.value as KeySetImpl<string>).values())[0]
      );
    } else {
      props.onItemChanged("Nothing selected");
    }
    setActivityItemValue(event.detail.value);
  };

  return (
    <div
      id="activityItemsContainer"
      class="oj-flex-item oj-sm-padding-4x-start oj-md-6 oj-sm-12">
      <div id="container">
        <h3>Activity Items</h3>
        {"This: " + props.selectedActivity}
        <oj-list-view
          id="activitiesList"
          class="item-display"
          aria-labelledby="activitiesHeader"
          data={activityDataProvider}
          gridlines={gridlinesItemVisible}
          selectionMode="single"
          selected={activityItemValue}
          onselectedChanged={selectedActivityItemChanged}
          scrollPolicy="loadMoreOnScroll"
          scrollPolicyOptions={scrollPolicyOpts}>
          <template slot="itemTemplate" render={listItemRenderer}></template>
        </oj-list-view>
      </div>
    </div>
  );
};

export default ActivityItemContainer;
