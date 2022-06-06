import { h } from "preact";
import { useState, useCallback, useEffect, useMemo } from "preact/hooks";
import "ojs/ojlistview";
import { KeySetImpl, KeySet } from "ojs/ojkeyset";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import { ListViewIntrinsicProps, ojListView } from "ojs/ojlistview";
import * as storeData from "text!./store_data.json";

type Activity = {
  id: number;
  name: string;
  short_desc: string;
};

type Props = {
  value: string;
  onActivityChanged: (value: KeySet<string>) => void;
};

let activityDataProvider: MutableArrayDataProvider<string, {}> =
  new MutableArrayDataProvider(JSON.parse(storeData), {
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

const ActivityContainer = (props: Props) => {
  const selectedActivityChanged = useCallback(
    (event: ojListView.selectedChanged<Activity["name"], Activity>) => {
      props.onActivityChanged(event.detail.value);
    },
    [props.onActivityChanged]
  );

const activityValue = useMemo(() => {
  return new KeySetImpl([props.value]) as KeySet<Activity['name']>
},[props.value])

  return (
    <div
      id="activitiesContainer"
      class="oj-flex-item oj-sm-padding-4x-start oj-sm-only-text-align-start oj-md-4 oj-sm-12">
      <h3 id="activitiesHeader">Activities</h3>
      <oj-list-view
        id="activitiesList"
        class="item-display"
        aria-labelledby="activitiesHeader"
        data={activityDataProvider}
        gridlines={{ item: "visible" }}
        selectionMode="single"
        selected={activityValue}
        onselectedChanged={selectedActivityChanged}
        scroll-policy="loadMoreOnScroll"
        scrollPolicyOptions={{ fetchSize: 5 }}>
        <template slot="itemTemplate" render={listItemRenderer}></template>
      </oj-list-view>
    </div>
  );
};

export default ActivityContainer;
