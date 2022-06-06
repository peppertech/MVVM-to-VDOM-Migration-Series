import { h } from "preact";
import {useState, useCallback, useEffect} from "preact/hooks";
import "ojs/ojlistview";
import { KeySetImpl, KeySet } from "ojs/ojkeyset";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import { ListViewIntrinsicProps, ojListView } from "ojs/ojlistview";
import * as storeData from "text!./store_data.json";

type Activity = {
  "id": number;
  "name": string;
  "short_desc": string;
}

let ListViewProps: ListViewIntrinsicProps;
let firstSelectedActivity: any;
let activityValue: KeySet<Activity['name']>;
type Props = {
  value: string
  onActivityChanged: (value:string) => void;
}

let activityDataProvider:MutableArrayDataProvider<string, {}> = new MutableArrayDataProvider(JSON.parse(storeData), {
  keyAttributes: "id",
});

const listItemRenderer = (item: ojListView.ItemTemplateContext) => {
  return (
    <div class="oj-flex no-wrap">
      <span class="demo-thumbnail oj-flex-item" style={'background-image:url('+ item.data.image+')'}></span>
      <div class="demo-content oj-flex-item">
        <div>
          <strong>{item.data.name}</strong>
        </div>
        <span class="demo-metadata">{item.data.short_desc}</span>
      </div>
    </div>
  );
};

export function ActivityContainer(props:Props) {
  
const selectedActivityChanged = useCallback((event) => {
  console.log(event.detail.value.data?.name)
  if(event.detail){}
  props.onActivityChanged(event.detail.value.data?.name);

},[]);

useEffect(() => {
  activityValue = new KeySetImpl([props.value]) as KeySet<Activity['name']>;
})

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
        onfirstSelectedItemChanged={selectedActivityChanged}
        firstSelectedItem={firstSelectedActivity}
        scroll-policy="loadMoreOnScroll"
        scrollPolicyOptions={{ fetchSize: 5 }}>
        <template slot="itemTemplate" render={listItemRenderer}></template>
      </oj-list-view>
    </div>
  );
}
