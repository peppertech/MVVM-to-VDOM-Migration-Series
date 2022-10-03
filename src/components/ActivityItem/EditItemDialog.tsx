import { h } from "preact";
import { useState, useRef, useEffect } from "preact/hooks";
import "ojs/ojdialog";
import { ojDialog } from "ojs/ojdialog";

type Props = {
  isOpened: boolean;
  closeDialog: (ref, type:string) => void;
  editItem: (data:Partial<Item>,ref) => void;
  itemData: Partial<Item>;
};

type Item = {
  id: number;
  name: string | undefined;
  short_desc?: string;
  price?: number;
  quantity?: number;
  quantity_shipped?: number;
  quantity_instock?: number;
  activity_id?: number;
  image?: string;
};

const EditItemDialog = (props: Props) => {
  const editDialogRef = useRef<ojDialog>(null);
  const [editFormData, setEditFormData] = useState<Partial<Item>>();

  const onChangeHandler = (event) => {
    if (event.detail.updatedFrom === "internal") {
      setEditFormData({
        ...editFormData,
        [event.currentTarget.id]: event.detail.value,
      });
    }
  };

  const closeDialog = () => {
    props.closeDialog(editDialogRef, "edit");
  };

  const editItem = () => {
    console.log("data: " + JSON.stringify(editFormData));
    props.editItem(editFormData, editDialogRef);
  };

  useEffect(() => {
    setEditFormData(props.itemData);
    props.isOpened
      ? editDialogRef.current?.open()
      : editDialogRef.current?.close();
  }, [props.isOpened]);

  return (
    <span>
      <oj-dialog
        id="editDialog"
        ref={editDialogRef}
        dialogTitle="Update Item Details"
        onojClose={closeDialog}
        cancelBehavior="icon">
        <div slot="body">
          <oj-label-value labelEdge="inside">
            <oj-label for="itemid" slot="label">
              Item ID
            </oj-label>
            <div id="itemid" slot="value" class="slot-line">
              {editFormData?.id}
            </div>
          </oj-label-value>
          <oj-form-layout>
            <oj-input-text
              id="name"
              labelHint="Name"
              onvalueChanged={onChangeHandler}
              value={editFormData?.name}></oj-input-text>
            <oj-input-text
              id="price"
              labelHint="Price"
              onvalueChanged={onChangeHandler}
              value={editFormData?.price}></oj-input-text>
            <oj-input-text
              id="short_desc"
              labelHint="Description"
              onvalueChanged={onChangeHandler}
              value={editFormData?.short_desc}></oj-input-text>
          </oj-form-layout>
        </div>
        <div slot="footer">
          <oj-button id="submitBtn" onojAction={editItem}>
            Submit
          </oj-button>
        </div>
      </oj-dialog>
    </span>
  );
};

export default EditItemDialog;
