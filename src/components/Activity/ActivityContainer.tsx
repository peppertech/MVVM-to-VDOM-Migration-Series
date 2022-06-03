import { h } from "preact";
import "ojs/ojlistview";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import { ListViewIntrinsicProps, ojListView } from "ojs/ojlistview";
import * as storeData from "text!./store_data.json";

// let activityDataProvider: MutableArrayDataProvider<string, {}>;
let ListViewProps: ListViewIntrinsicProps;
let selectedActivity: any;
let firstSelectedActivity: any;


const chartData = [
  { id: 0, series: "Baseball", group: "Group A", value: 42 },
  { id: 1, series: "Baseball", group: "Group B", value: 34 },
  { id: 2, series: "Bicycling", group: "Group A", value: 55 },
  { id: 3, series: "Bicycling", group: "Group B", value: 30 },
  { id: 4, series: "Skiing", group: "Group A", value: 36 },
  { id: 5, series: "Skiing", group: "Group B", value: 50 },
  { id: 6, series: "Soccer", group: "Group A", value: 22 },
  { id: 7, series: "Soccer", group: "Group B", value: 46 },
];

let activityDataProvider:MutableArrayDataProvider<string, {}> = new MutableArrayDataProvider(JSON.parse(storeData), {
  keyAttributes: "id",
});

{
  /* <template slot="itemTemplate">
<div class="oj-flex no-wrap">
  <span class="demo-thumbnail oj-flex-item"
    :style.background-image="[[' url('+$current.data.image+')']]"></span>
  <div class="demo-content oj-flex-item">
    <div>
      <strong>
        <oj-bind-text value="[[$current.data.name]]"></oj-bind-text>
      </strong>
    </div>
    <span class="demo-metadata">
      <oj-bind-text value="[[$current.data.short_desc]]"></oj-bind-text>
    </span>
  </div>
</div>
</template> */
}

const selectedActivityChanged = (event) => {};
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

export function ActivityContainer() {
  return (
    <div
      id="activitiesContainer"
      class="oj-flex-item oj-bg-info-30 oj-sm-padding-4x-start oj-sm-only-text-align-start oj-md-4 oj-sm-12">
      <h3 id="activitiesHeader">Activities</h3>
      <oj-list-view
        id="activitiesList"
        class="item-display"
        aria-labelledby="activitiesHeader"
        data={activityDataProvider}
        gridlines={{ item: "visible" }}
        selectionMode="single"
        selected={selectedActivity}
        onfirstSelectedItemChanged={selectedActivityChanged}
        firstSelectedItem={firstSelectedActivity}
        scroll-policy="loadMoreOnScroll"
        scrollPolicyOptions={{ fetchSize: 5 }}>
        <template slot="itemTemplate" render={listItemRenderer}></template>
      </oj-list-view>
    </div>
  );
}
