import ActivityItemContainer from "./ActivityItem/ActivityItemContainer";
import ItemDetailContainer from "./ItemDetail/ItemDetailContainer";
import { h } from "preact";
import {useState, useEffect, useCallback} from "preact/hooks";
import { KeySetImpl, KeySet } from "ojs/ojkeyset";

type Props = {
  activity?: string;
}


const ParentContainer2 = (props:Props) => {
  const [selectedItemVal,setSelectedItemVal] = useState('Nothing selected');

  const activityItemChangeHandler = useCallback((item:string) => {
    setSelectedItemVal(item);
  },[selectedItemVal])

  let showItems = selectedItemVal !== 'Nothing selected' ? true : false;
  
  return (
    <div
      id="parentContainer2"
      class="oj-flex oj-flex-item oj-lg-padding-6x-horizontal oj-md-8 oj-sm-12"
    >
      <ActivityItemContainer selectedActivity={props.activity} onItemChanged={activityItemChangeHandler} />
      { showItems && <ItemDetailContainer item={selectedItemVal} />}
    </div>
  );
};

export default ParentContainer2;
