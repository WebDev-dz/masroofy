import React from "react";
import { BaseWidget, CategoryWidget as CategoryWidgetType } from "../../types/settings";
import { useCategoryStore } from "../../stores/categoryStore";

type Props = { widget: BaseWidget & CategoryWidgetType };

const CategoryWidget = ({ widget }: Props) => {
  const { categories } = useCategoryStore((state) => state);

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <h3 className="text-lg font-semibold">{widget.title}</h3>
      {widget.description && (
        <p className="text-sm text-muted-foreground">{widget.description}</p>
      )}
      <div className="mt-4">
        <p>Total Categories: {categories?.length || 0}</p>
      </div>
    </div>
  );
};

export default CategoryWidget;
