import { h, ComponentProps } from "preact";
import "ojs/ojchart";
import "ojs/ojselectsingle";
import "ojs/ojavatar";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import { ojChart } from "ojs/ojchart";

type Props = {
  item?: Item;
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

type ChartProps = ComponentProps<"oj-chart">;

type ChartItem = {
  id: number;
  series: string;
  group: string;
  value: number;
};


const ItemDetailContainer = (props: Props) => {
  // console.log("in Detail: " + JSON.stringify(props.item));

  const pieDataProvider: MutableArrayDataProvider<
    ChartItem["id"],
    ChartItem
  > = new MutableArrayDataProvider([{series:'Quantity in Stock',value: props.item.quantity_instock},{series:'Quantity shipped',value:props.item.quantity_shipped}], { keyAttributes: "id" });
  
  const chartItemTemplate = (
    item: ojChart.ItemTemplateContext<ChartItem["id"], ChartItem>
  ) => {
    // console.log('item: ' +item)
    return (
      <oj-chart-item
        value={item.data.value}
        groupId={[0]}
        seriesId={item.data.series}
      ></oj-chart-item>
    );
  };
  return (
    <div
      id="itemDetailsContainer"
      class="oj-flex-item oj-sm-padding-4x-start oj-md-6 oj-sm-12"
    >
      <h3>Item Details</h3>
      <hr class="hr-margin" />
      <oj-avatar
        role="img"
        size="lg"
        aria-label={"product image for" + props.item.name}
        src={props.item?.image?.replace('css','styles')}
        class="float-right"
      ></oj-avatar>
      <div id="itemName" class="data-name">
        {props.item.name}
      </div>
      <div id="itemDesc" class="data-desc">
        {props.item.short_desc}
      </div>
      <div id="itemPrice">{"Price: " + props.item.price + " each"}</div>
      <div id="itemId">{"Item Id: " + props.item.id}</div>
      <div>
        <oj-chart
          type="pie"
          data={pieDataProvider}
          animationOnDisplay="auto"
          animationOnDataChange="auto"
          hoverBehavior="dim"
          class="chartStyle"
        >
          <template slot="itemTemplate" render={chartItemTemplate}></template>
        </oj-chart>
      </div>
    </div>
  );
};

export default ItemDetailContainer;
