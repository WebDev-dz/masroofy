import React from "react";
import { defaultDashboardConfig } from "../constants";
import { WidgetRenderer } from "./Widget";

export function Dashboard() {
  const { widgets, layout, name } = defaultDashboardConfig;

  

  return (
    <section className="space-y-4">
      <h1 className="text-xl font-bold">{name}</h1>
      <div
        className={`grid ${
          layout === "grid"
            ? "grid-cols-4 gap-4"
            : "flex flex-col space-y-4"
        }`}
      >
        {widgets.map((widget) => (
          <div
            key={widget.id}
            style={{
              gridColumn: `span ${widget.position.width}`,
              gridRow: `span ${widget.position.height}`,
            }}
            className="rounded-lg shadow-sm bg-white"
          >
            {/* @ts-ignore */}
            <WidgetRenderer widget={ widget} />
          </div>

        ))}
      </div>
    </section>
  );
}
