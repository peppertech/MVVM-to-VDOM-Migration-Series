import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import "ojs/ojbutton";
import { KeySetImpl } from "ojs/ojkeyset";

type Props = {
  edit: () => void;
  create: () => void;
  delete: () => void;
  itemSelected: any;
};

const ItemActionsContainer = (props: Props) => {
  const [hideActions, setHideActions] = useState<boolean>(true);
  if (props.itemSelected?.id) {
    console.log("Selected: " + JSON.stringify(props.itemSelected));
  }

  useEffect(() => {
    if (props.itemSelected?.id) {
      setHideActions(false);
    } else {
      setHideActions(true);
    }
  }, [props.itemSelected]);

  return (
    <div>
      <oj-button id="createButton" onojAction={props.create}>
        Create
      </oj-button>
      <oj-button
        id="updateButton"
        disabled={hideActions}
        onojAction={props.edit}>
        Update
      </oj-button>
      <oj-button
        id="deleteButton"
        disabled={hideActions}
        onojAction={props.delete}>
        Delete
      </oj-button>
    </div>
  );
};
export default ItemActionsContainer;
