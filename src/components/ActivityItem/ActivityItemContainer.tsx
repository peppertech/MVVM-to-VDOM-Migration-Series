import ItemActionsContainer from "./ItemActionsContainer";
import CreateNewItemDialog from "./CreateNewItemDialog";
import EditItemDialog from "./EditItemDialog";
import { h, ComponentProps } from "preact";
import { useState, useCallback } from "preact/hooks";
import "ojs/ojlistview";
import { ojListView } from "ojs/ojlistview";
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
        style={"background-image:url(" + image + ")"}></span>
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
  const activityItemDataProvider = props.data;
  const restServerURLItems =
    "https://apex.oracle.com/pls/apex/oraclejet/lp/activities/" +
    props.selectedActivity.id +
    "/items/";

  const [activityItemValue, setActivityItemValue] = useState(
    DEFAULT_ACTIVITY_ITEM_STATE
  );
  const [itemData, setItemData] = useState<Item>(props.selectedActivity);
  const [isCreateOpened, setIsCreateOpened] = useState<boolean>();
  const [isEditOpened, setIsEditOpened] = useState<boolean>();

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

  const editItem = async (newItemData, editDialogRef) => {
    if (newItemData != null) {
      const row = {
        itemId: newItemData.id,
        name: newItemData.name,
        price: newItemData.price,
        short_desc: newItemData.short_desc,
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
    editDialogRef.current.close();
  };

  const createItem = async (data: Partial<Item>, createDialogRef: any) => {
    //process create command and close dialog on success
    if (data?.name) {
      let quantity =
        Number(data.quantity_instock) + Number(data.quantity_shipped);
      const row = {
        name: data.name,
        short_desc: data.short_desc,
        price: data.price,
        quantity_instock: data.quantity_instock,
        quantity_shipped: data.quantity_shipped,
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
      createDialogRef.current.close();
      // end createItem
    }
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
    console.log("Item: " + JSON.stringify(itemData));
    setIsEditOpened(true);
    console.log("Edit dialog opened");
  };

  const openCreateDialog = () => {
    console.log("Create dialog opened");
    setIsCreateOpened(true);
  };

  const handleDialogClose = (ref, type) => {
    type === "create" ? setIsCreateOpened(false) : setIsEditOpened(false);
    ref.current.close();
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
      <CreateNewItemDialog
        isOpened={isCreateOpened}
        createNewItem={createItem}
        closeDialog={handleDialogClose}
      />
      <EditItemDialog
        isOpened={isEditOpened}
        editItem={editItem}
        closeDialog={handleDialogClose}
        itemData={itemData}
      />
    </div>
  );
};

export default ActivityItemContainer;
