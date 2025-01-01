import React from "react";
import { BaseWidget, ShoppingListWidget as ShoppingListWidgetType } from "../../types/settings";
import { useShoppingListStore } from "../../stores/shoppingListStore";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Checkbox } from "@radix-ui/react-checkbox";

type Props = { widget: BaseWidget & ShoppingListWidgetType };

const ShoppingListWidget = ({ widget }: Props) => {
  const { shoppingLists } = useShoppingListStore((state) => state);

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <h3 className="text-lg font-semibold">{widget.title}</h3>
      {widget.description && (
        <p className="text-sm text-muted-foreground">{widget.description}</p>
      )}
      <div className="mt-4">
        <p>Total Shopping Lists: {shoppingLists?.length || 0}</p>
      </div>
      <Accordion type="single" collapsible className="w-full">
      {shoppingLists.map((item, index) => (
        <AccordionItem key={item.name + index} value={item.name}>
          <AccordionTrigger>{item.name}</AccordionTrigger>
          <AccordionContent>
            {item.items.map((s, i) => (
              <div key={s.itemName + i} className="flex gap-2">
                <Checkbox />
                <p> {s.itemName} </p>

                <span>{s.price}</span>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
    </div>
  );
};


export default ShoppingListWidget;
