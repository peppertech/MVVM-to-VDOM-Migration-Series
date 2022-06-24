import { h, ComponentProps } from "preact";
import { useState, useCallback } from "preact/hooks";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import "ojs/ojchart";
import "ojs/ojselectsingle";
import { ojChart } from "ojs/ojchart";
import { ojSelectSingle } from "ojs/ojselectsingle";

type Props = {
  item?: string;
};

type TChartProps = ComponentProps<"oj-chart">;

type TChartItem = {
  id: number;
  series: string;
  group: string;
  value: number;
};

type TChartType = {
  id: number;
  value: string;
  label: string;
};

const data = [
  {
    id: 0,
    series: "Series 1",
    group: "Group A",
    value: 42,
  },
  {
    id: 1,
    series: "Series 1",
    group: "Group B",
    value: 34,
  },
  {
    id: 2,
    series: "Series 2",
    group: "Group A",
    value: 55,
  },
  {
    id: 3,
    series: "Series 2",
    group: "Group B",
    value: 30,
  },
  {
    id: 4,
    series: "Series 3",
    group: "Group A",
    value: 36,
  },
  {
    id: 5,
    series: "Series 3",
    group: "Group B",
    value: 50,
  },
  {
    id: 6,
    series: "Series 4",
    group: "Group A",
    value: 22,
  },
  {
    id: 7,
    series: "Series 4",
    group: "Group B",
    value: 46,
  },
  {
    id: 8,
    series: "Series 5",
    group: "Group A",
    value: 22,
  },
  {
    id: 9,
    series: "Series 5",
    group: "Group B",
    value: 46,
  },
];

const chartTypeData = [
  { value: "line", label: "Line" },
  { value: "bar", label: "Bar" },
  { value: "pie", label: "Pie" },
  { value: "area", label: "Area" },
  { value: "combo", label: "Combo" },
];
const dataProvider: MutableArrayDataProvider<TChartItem["id"], TChartItem> =
  new MutableArrayDataProvider(data, { keyAttributes: "id" });

const chartTypesDP: MutableArrayDataProvider<TChartType["value"], TChartType> =
  new MutableArrayDataProvider(chartTypeData, { keyAttributes: "value" });

const ItemDetailContainer = (props: Props) => {
  const [val, setVal] = useState("bar" as TChartProps["type"]);

  const valChangeHandler = useCallback(
    (event: ojSelectSingle.valueChanged<TChartType["value"], TChartType>) => {
      setVal(event.detail.value as TChartProps["type"]);
    },
    [val, setVal]
  );

  const chartItemTemplate = (
    item: ojChart.ItemTemplateContext<TChartItem["id"], TChartItem>
  ) => {
    return (
      <oj-chart-item
        value={item.data.value}
        groupId={[item.data.group]}
        seriesId={item.data.series}></oj-chart-item>
    );
  };
  return (
    <div
      id="itemDetailsContainer"
      class="oj-flex-item oj-sm-padding-4x-start oj-md-6 oj-sm-12">
      <h3>Item Details</h3>
      {props.item}

      <oj-select-single
        data={chartTypesDP}
        value={val}
        class="oj-md-width-1/3"
        onvalueChanged={valChangeHandler}></oj-select-single>
      <oj-chart
        id="barChart"
        type={val}
        data={dataProvider}
        animationOnDisplay="auto"
        animationOnDataChange="auto"
        hoverBehavior="dim"
        class="chart-sizing">
        <template slot="itemTemplate" render={chartItemTemplate}></template>
      </oj-chart>
    </div>
  );
};

export default ItemDetailContainer;
