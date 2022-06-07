import { h } from "preact";
import "ojs/ojlistview";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import { ListViewIntrinsicProps, ojListView } from "ojs/ojlistview";
import * as storeData from "text!./store_data.json";

let ListViewProps: ListViewIntrinsicProps;
let selectedActivity: any;
let firstSelectedActivity: any;


let activityDataProvider:MutableArrayDataProvider<string, {}> = new MutableArrayDataProvider(JSON.parse(storeData), {
  keyAttributes: "id",
});

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

const ActivityContainer = () => {
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
};

export default ActivityContainer;
