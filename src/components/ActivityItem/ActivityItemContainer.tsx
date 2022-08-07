import ItemActionsContainer from "./ItemActionsContainer";
import { h, ComponentProps } from "preact";
import { useState } from "preact/hooks";
import "ojs/ojlistview";
import { ojListView } from "ojs/ojlistview";
import { RESTDataProvider } from "ojs/ojrestdataprovider";

type Props = {
  selectedActivity?: Item;
  data: RESTDataProvider<any, any>;
  onItemChanged?: (item: any) => void;
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

type ActivityItem = {
  id: string;
  name: string;
  items: Array<Item>;
  short_desc: string;
  image: string;
};

type ListViewProps = ComponentProps<"oj-list-view">;
const gridlinesItemVisible: ListViewProps["gridlines"] = { item: "visible" };
const scrollPolicyOpts: ListViewProps["scrollPolicyOptions"] = {
  fetchSize: 15,
};

const listItemRenderer = (item: ojListView.ItemTemplateContext) => {
  const image = item.data.image.replace("css", "styles");
  return (
    <div class="oj-flex no-wrap">
      <span
        class="demo-thumbnail oj-flex-item"
        style={"background-image:url(" + image + ")"}></span>
      <div class="demo-content oj-flex-item">
        <div>
          <strong>{item.data.name}</strong>
        </div>
        <span class="demo-metadata">{item.data.short_desc}</span>
      </div>
    </div>
  );
};

const DEFAULT_ACTIVITY_ITEM_STATE:any = {};

const ActivityItemContainer = (props: Props) => {
  const activityItemDataProvider = props.data;

  const [activityItemValue, setActivityItemValue] = useState(
    DEFAULT_ACTIVITY_ITEM_STATE
  );
  const selectedActivityItemChanged = (
    event: ojListView.firstSelectedItemChanged<Item['id'],Item>
  ) => {
    if (event.detail.updatedFrom === "internal") {
      let tempItem = event.detail.value.data;
      if (tempItem != null) {
        props.onItemChanged(tempItem);
        // console.log("Item change: " + tempItem);
      } else {
        props.onItemChanged(null);
      }
      setActivityItemValue(tempItem);
    }
  };

  return (
    <div
      id="activityItemsContainer"
      class="oj-flex-item oj-sm-padding-4x-start oj-md-6 oj-sm-12">
      <div id="container">
        <h3>Activity Items</h3>
        <ItemActionsContainer/>
        <oj-list-view
          id="activitiesList"
          class="item-display"
          aria-labelledby="activitiesHeader"
          data={activityItemDataProvider}
          gridlines={gridlinesItemVisible}
          selectionMode="single"
          // selected={activityItemValue}
          onfirstSelectedItemChanged={selectedActivityItemChanged}
          scrollPolicy="loadMoreOnScroll"
          scrollPolicyOptions={scrollPolicyOpts}>
          <template slot="itemTemplate" render={listItemRenderer}></template>
        </oj-list-view>
      </div>
    </div>
  );
};

export default ActivityItemContainer;
