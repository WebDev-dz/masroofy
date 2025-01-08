import React from "react";
import { useShoppingListStore } from "../../stores/shoppingListStore";
import { PlusIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ShoppingListForm from "../../components/shopping/form";
import { Card, CardContent, CardHeader } from "../../components/ui/card";

type Props = {};

const ShoppingListPage = () => {
  const { shoppingLists, addShoppingList } = useShoppingListStore();
  const navigate = useNavigate();

  return (
    <div className="p-4 space-y-3"> 
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Shopping Lists</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate("/shoppingList/new")}
        >
          <PlusIcon className="mr-2" />
          Add Shopping List
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {shoppingLists.map((shoppingList) => (
          <Card key={shoppingList.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">{shoppingList.name}</h2>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => navigate(`/shoppingList/${shoppingList.id}`)}
                >
                  Details
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                {/* {shoppingList?.description} */}
              </p>
              {shoppingList.items.map((item) => (
                <div key={item.itemName} className="flex items-center justify-between">
                  <p className="text-gray-700">{item.itemName}</p>
                  <p className="text-gray-700">{item.price}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ShoppingListPage;