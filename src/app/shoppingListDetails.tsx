import React from "react";
import { useParams } from "react-router-dom";
import { PencilIcon } from "lucide-react";
import { useShoppingListStore } from "../stores/shoppingListStore";
import ShoppingListForm from "../components/shopping/form";

type Props = {};

const ShoppingListDetails = () => {
  const { id } = useParams(); // Extract the id from the route params
  const { shoppingLists, updateShoppingList } = useShoppingListStore();

  // Convert the id to a number since shoppingListId is numeric
  const shoppingListId = id ;
  const shoppingList = shoppingLists.find(
    (tr) => tr.id == shoppingListId
  );

  if (!shoppingList) {
    return <div>ShoppingList not found</div>; // Handle case when shoppingList is not found
  }

  console.log({shoppingList})

  return (
    <div className="p-4 space-y-3">
      
      <ShoppingListForm
        onSubmit={updateShoppingList}
        title="ShoppingList Details"
        type="update"
        value={shoppingList}
      />
    </div>
  );
};

export default ShoppingListDetails;
