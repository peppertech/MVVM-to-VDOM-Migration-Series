import { h } from "preact";
import { useState, useRef, useEffect } from "preact/hooks";
import "ojs/ojdialog";
import { ojDialog } from "ojs/ojdialog";

type Props = {
  isOpened: boolean;
  closeDialog: (ref,type) => void;
  createNewItem: (object,string) => void;
};

type Item = {
  name?: string | undefined;
  short_desc?: string;
  price?: number;
  quantity_shipped?: number;
  quantity_instock?: number;
};


const CreateNewItemDialog = (props: Props) => {
  const createDialogRef = useRef<ojDialog>();
  const [formData, setFormData] = useState<Partial<Item>>();

  const onChangeHandler = (event) => {
    setFormData({
      ...formData,
      [event.currentTarget.id]: event.detail.value,
    });
  }

  const closeDialog = () => {
    props.closeDialog(createDialogRef,'create')
  }

  const createItem = () => {
    console.log('data: '+ JSON.stringify(formData));
    props.createNewItem(formData,createDialogRef);
  }

  useEffect(() => {
    props.isOpened
      ? createDialogRef.current.open()
      : createDialogRef.current.close();
  }, [props.isOpened]);

  return (
    <span>
      <oj-dialog
        id="createDialog"
        ref={createDialogRef}
        dialogTitle="Create New Item"
        onojClose={closeDialog}
        cancelBehavior="icon">
        <div slot="body">
          <oj-form-layout>
            <oj-input-text
              id="name"
              labelHint="Name"
              onvalueChanged={onChangeHandler}></oj-input-text>
            <oj-input-text
              id="price"
              labelHint="Price"
              onvalueChanged={onChangeHandler}
              ></oj-input-text>
            <oj-input-text
              id="short_desc"
              labelHint="Description"
              onvalueChanged={onChangeHandler}
              ></oj-input-text>
            <oj-input-text
              id="quantity_instock"
              labelHint="Quantity: In-Stock"
              onvalueChanged={onChangeHandler}
              ></oj-input-text>
            <oj-input-text
              id="quantity_shipped"
              labelHint="Quantity: Shipped"
              onvalueChanged={onChangeHandler}
              ></oj-input-text>
          </oj-form-layout>
        </div>
        <div slot="footer">
          <oj-button id="submitBtn" onojAction={createItem}>
            Submit
          </oj-button>
        </div>
      </oj-dialog>
    </span>
  );
};

export default CreateNewItemDialog;
