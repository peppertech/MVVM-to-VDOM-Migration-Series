import { h } from "preact";
import {useState} from "preact/hooks";
import { KeySetImpl, KeySet } from "ojs/ojkeyset";
import { ActivityItemContainer } from "./ActivityItem/ActivityItemContainer";
import { ItemDetailContainer } from "./ItemDetail/ItemDetailContainer";

type Props = {
  activity?: KeySetImpl<string>;
}

export function ParentContainer2(props:Props) {
  let showItems = true;
  return (
    <div
      id="parentContainer2"
      class="oj-flex oj-flex-item oj-lg-padding-6x oj-md-8 oj-sm-12"
    >
      <ActivityItemContainer activity={props.activity} />
      { showItems && <ItemDetailContainer item={props.activity} />}
    </div>
  );
}
