import { h, ComponentProps } from "preact";
import { useState, useCallback, useEffect, useMemo } from "preact/hooks";
import "ojs/ojlistview";
import { ojListView } from "ojs/ojlistview";
import { KeySetImpl, KeySet } from "ojs/ojkeyset";
import { RESTDataProvider } from "ojs/ojrestdataprovider";

type Activity = {
  id: number;
  name: string;
  short_desc: string;
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
type Props = {
  data?: RESTDataProvider<Activity["id"], Activity>;
  value?: string;
  onActivityChanged: (value: Item) => void;
};

type ListViewProps = ComponentProps<"oj-list-view">;
const gridlinesItemVisible: ListViewProps["gridlines"] = { item: "visible" };
const scrollPolicyOpts: ListViewProps["scrollPolicyOptions"] = { fetchSize: 5 };

const listItemRenderer = (item: ojListView.ItemTemplateContext) => {
  let image = item.data.image.replace("css", "styles");
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

const ActivityContainer = (props: Props) => {
  const selectedActivityChanged = (
    event: ojListView.firstSelectedItemChanged<Item["id"], Item>
  ) => {
    props.onActivityChanged(event.detail.value.data);
  };

  const activityValue = useMemo(() => {
    return new KeySetImpl([props.value]) as KeySet<Activity["name"]>;
  }, [props.value]);

  return (
    <div
      id="activitiesContainer"
      class="oj-flex-item oj-sm-padding-4x-start oj-sm-only-text-align-start oj-md-4 oj-sm-12">
      <h3 id="activitiesHeader">Activities</h3>
      <oj-list-view
        id="activitiesList"
        class="item-display"
        aria-labelledby="activitiesHeader"
        data={props.data}
        gridlines={gridlinesItemVisible}
        selectionMode="single"
        selected={activityValue}
        onfirstSelectedItemChanged={selectedActivityChanged}
        scrollPolicy="loadMoreOnScroll"
        scrollPolicyOptions={scrollPolicyOpts}>
        <template slot="itemTemplate" render={listItemRenderer}></template>
      </oj-list-view>
    </div>
  );
};

export default ActivityContainer;
