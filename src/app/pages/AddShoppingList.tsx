
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusIcon } from "lucide-react";
import { useShoppingListStore } from "../../stores/shoppingListStore";
import ShoppingListForm from "../../components/shopping/form";
import { ShoppingList } from "@/src/types/models";


const AddShoppingList = () => {
  const navigate = useNavigate();
  const { addShoppingList } = useShoppingListStore();


  const handleSubmit = async (data: ShoppingList) => {
    const shoppingList: ShoppingList = {
      ...data,
      id: Math.random().toString(),
    };
    const response = await addShoppingList(shoppingList);
    if (response.data) {
      navigate(`/shoppingList/${response.data.id}`);
    }
    return response;
  };

  return (
    <div className="p-4 space-y-3">
      <ShoppingListForm
        onSubmit={handleSubmit}
        title="Add Shopping List"
        type="create"
      />
    </div>
  );
};

export default AddShoppingList;