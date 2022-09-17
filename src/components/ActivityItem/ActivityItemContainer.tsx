import ItemActionsContainer from "./ItemActionsContainer";
import { h, ComponentProps } from "preact";
import { useState, useCallback, useRef } from "preact/hooks";
import "ojs/ojlistview";
import { ojListView } from "ojs/ojlistview";
import "ojs/ojdialog";
import { ojDialog } from "ojs/ojdialog";
import "ojs/ojformlayout";
import "ojs/ojlabel";
import "ojs/ojlabelvalue";
import { RESTDataProvider } from "ojs/ojrestdataprovider";

type Props = {
  selectedActivity?: Item;
  data: RESTDataProvider<any, any>;
  onItemChanged?: (item: any) => void;
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

type ActivityItem = {
  id: string;
  name: string;
  items: Array<Item>;
  short_desc: string;
  image: string;
};

type ListViewProps = ComponentProps<"oj-list-view">;
const gridlinesItemVisible: ListViewProps["gridlines"] = { item: "visible" };
const scrollPolicyOpts: ListViewProps["scrollPolicyOptions"] = {
  fetchSize: 15,
};

const listItemRenderer = (item: ojListView.ItemTemplateContext) => {
  const image = item.data.image.replace("css", "styles");
  return (
    <div class="oj-flex no-wrap">
      <span
        class="demo-thumbnail oj-flex-item"
        style={"background-image:url(" + image + ")"}
      ></span>
      <div class="demo-content oj-flex-item">
        <div>
          <strong>{item.data.name}</strong>
        </div>
        <span class="demo-metadata">{item.data.short_desc}</span>
      </div>
    </div>
  );
};

const DEFAULT_ACTIVITY_ITEM_STATE: any = {};

const ActivityItemContainer = (props: Props) => {
  const createDialogRef = useRef();
  const editDialogRef = useRef();
  const activityItemDataProvider = props.data;
  const restServerURLItems =
    "https://apex.oracle.com/pls/apex/oraclejet/lp/activities/" +
    props.selectedActivity.id +
    "/items/";

  const [activityItemValue, setActivityItemValue] = useState(
    DEFAULT_ACTIVITY_ITEM_STATE
  );
  const [itemData, setItemData] = useState<any>(props.selectedActivity);
  const [itemName, setItemName] = useState();
  const [price, setPrice] = useState();
  const [shortDesc, setShortDesc] = useState();
  const [quantityInstock, setQuantityInstock] = useState();
  const [quantityShipped, setQuantityShipped] = useState();
  const [inputItemID, setInputItemID] = useState<number>();
  const [inputItemName, setInputItemName] = useState();
  const [inputPrice, setInputPrice] = useState();
  const [inputShortDesc, setInputShortDesc] = useState();

  const selectedActivityItemChanged = useCallback(
    (event: ojListView.firstSelectedItemChanged<Item["id"], Item>) => {
      if (event.detail.updatedFrom === "internal") {
        let tempItem = event.detail.value.data;
        if (tempItem != null) {
          props.onItemChanged(tempItem);
        } else {
          props.onItemChanged(null);
        }
        setActivityItemValue(tempItem);
        setItemData(tempItem);
      }
    },
    [activityItemValue]
  );
  const updateInputName = (event) => {
    setInputItemName(event.detail.value);
  };
  const updateInputPrice = (event) => {
    setInputPrice(event.detail.value);
  };
  const updateInputDesc = (event) => {
    setInputShortDesc(event.detail.value);
  };

  const editItem = async () => {
    if (itemData != null) {
      const row = {
        itemId: itemData.id,
        name: inputItemName,
        price: inputPrice,
        short_desc: inputShortDesc,
      };

      // Create and send request to update row on rest service
      const request = new Request(`${restServerURLItems}${itemData.id}`, {
        headers: new Headers({
          "Content-type": "application/json; charset=UTF-8",
        }),
        body: JSON.stringify(row),
        method: "PUT",
      });
      const response = await fetch(request);
      const updatedRow = await response.json();
      // Create update mutate event and call mutate method
      // to notify dataprovider consumers that a row has been
      // updated
      const updatedRowKey = itemData.id;
      const updatedRowMetaData = { key: updatedRowKey };
      props.data.mutate({
        update: {
          data: [updatedRow],
          keys: new Set([updatedRowKey]),
          metadata: [updatedRowMetaData],
        },
      });
    } // End if statement
    console.log("Edited item");
    (editDialogRef.current as ojDialog).close();
  };

  const updateName = (event) => {
    setItemName(event.detail.value);
  };
  const updatePrice = (event) => {
    setPrice(event.detail.value);
  };
  const updateDesc = (event) => {
    setShortDesc(event.detail.value);
  };
  const updateInStock = (event) => {
    setQuantityInstock(event.detail.value);
  };
  const updateShipped = (event) => {
    setQuantityShipped(event.detail.value);
  };

  const createItem = async () => {
    //process create command and close dialog on success

    let quantity = Number(quantityInstock) + Number(quantityShipped);

    const row = {
      name: itemName,
      short_desc: shortDesc,
      price: price,
      quantity_instock: quantityInstock,
      quantity_shipped: quantityShipped,
      quantity: quantity,
      activity_id: props.selectedActivity.id,
      image: "css/images/product_images/jet_logo_256.png",
    };

    //   // Create and send request to REST service to add row
    const request = new Request(restServerURLItems, {
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8",
      }),
      body: JSON.stringify(row),
      method: "POST",
    });

    const response = await fetch(request);
    const addedRow = await response.json();

    // Create add mutate event and call mutate method
    // to notify dataprovider that a row has been
    // added

    /***  This is currently not working for Add. It's fine for update and remove.
     * Use .refresh() on the DataProvider for now.
      */
    // const addedRowKey = addedRow["id"];
    // const addedRowMetaData = { key: addedRowKey };
    // activityItemDataProvider.mutate({
    //   add: {
    //     data: [addedRow],
    //     keys: new Set([addedRowKey]),
    //     metadata: [addedRowMetaData],
    //   },
    // });
    activityItemDataProvider.refresh();
    // Close dialog
    console.log("Created new item");
    (createDialogRef.current as ojDialog).close();
    // end createItem
  };

  const deleteItem = async () => {
    const really = confirm("Do you really want to delete this item?");
    if (really) {
      // Create and send request to delete row on REST service
      const request = new Request(`${restServerURLItems}${itemData.id}`, {
        method: "DELETE",
      });
      const response = await fetch(request);
      // Create remove mutate event and call mutate method
      // to notify data-provider consumers that a row has been
      // removed
      if (response.status === 200) {
        const removedRowKey = itemData.id;
        const removedRowMetaData = { key: removedRowKey };

        props.data.mutate({
          remove: {
            data: [itemData.id],
            keys: new Set([removedRowKey]),
            metadata: [removedRowMetaData],
          },
        });
      } else {
        alert(
          "Delete failed with status " +
            response.status +
            " : " +
            response.statusText
        );
      }
      console.log("deleted that thing!");
    } else {
      console.log("Ok, we canceled that delete");
    }
  };

  const openEditDialog = () => {
    if (itemData !== undefined) {
      setInputItemID(itemData.id);
      setInputItemName(itemData.name);
      setInputPrice(itemData.price);
      setInputShortDesc(itemData.short_desc);
      console.log("Item: " + JSON.stringify(itemData));
    }
    console.log("Edit dialog opened");
    (editDialogRef.current as ojDialog).open();
  };

  const openCreateDialog = () => {
    console.log("Create dialog opened");
    (createDialogRef.current as ojDialog).open();
  };

  return (
    <div
      id="activityItemsContainer"
      class="oj-flex-item oj-sm-padding-4x-start oj-md-6 oj-sm-12"
    >
      <div id="container">
        <h3>Activity Items</h3>
        <ItemActionsContainer
          edit={openEditDialog}
          delete={deleteItem}
          itemSelected={activityItemValue}
          create={openCreateDialog}
        />
        <oj-list-view
          id="activitiesList"
          class="item-display oj-sm-margin-2x-top"
          aria-labelledby="activitiesHeader"
          data={activityItemDataProvider}
          gridlines={gridlinesItemVisible}
          selectionMode="single"
          onfirstSelectedItemChanged={selectedActivityItemChanged}
          scrollPolicy="loadMoreOnScroll"
          scrollPolicyOptions={scrollPolicyOpts}
        >
          <template slot="itemTemplate" render={listItemRenderer}></template>
        </oj-list-view>
      </div>
      <span>
        <oj-dialog
          id="createDialog"
          ref={createDialogRef}
          dialogTitle="Create New Item"
          cancelBehavior="icon"
        >
          <div slot="body">
            <oj-form-layout>
              <oj-input-text
                id="createNewName"
                labelHint="Name"
                onvalueChanged={updateName}
                value={itemName}
              ></oj-input-text>
              <oj-input-text
                id="createNewPrice"
                labelHint="Price"
                onvalueChanged={updatePrice}
                value={price}
              ></oj-input-text>
              <oj-input-text
                id="createNewDesc"
                labelHint="Description"
                onvalueChanged={updateDesc}
                value={shortDesc}
              ></oj-input-text>
              <oj-input-text
                id="createNewInStock"
                labelHint="Quantity: In-Stock"
                onvalueChanged={updateInStock}
                value={quantityInstock}
              ></oj-input-text>
              <oj-input-text
                id="createNewShipped"
                labelHint="Quantity: Shipped"
                onvalueChanged={updateShipped}
                value={quantityShipped}
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
      <span>
        <oj-dialog
          id="editDialog"
          ref={editDialogRef}
          class="no-display"
          dialogTitle="Update Item Details"
          cancelBehavior="icon"
        >
          <div slot="body">
            <oj-label-value labelEdge="inside">
              <oj-label for="itemid" slot="label">
                Item ID
              </oj-label>
              <div id="itemid" slot="value" class="slot-line">
                {inputItemID}
              </div>
            </oj-label-value>
            <oj-form-layout>
              <oj-input-text
                id="createNewName"
                labelHint="Name"
                onvalueChanged={updateInputName}
                value={inputItemName}
              ></oj-input-text>
              <oj-input-text
                id="createNewPrice"
                labelHint="Price"
                onvalueChanged={updateInputPrice}
                value={inputPrice}
              ></oj-input-text>
              <oj-input-text
                id="createNewDesc"
                labelHint="Description"
                onvalueChanged={updateInputDesc}
                value={inputShortDesc}
              ></oj-input-text>
            </oj-form-layout>
          </div>
          <div slot="footer">
            <oj-button id="submitBtn" onojAction={editItem}>
              Submit
            </oj-button>
          </div>
        </oj-dialog>
      </span>
    </div>
  );
};

export default ActivityItemContainer;
