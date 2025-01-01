"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./chart";



type DynamicChartProps = {
  title: string;
  description?: string;
  data: Array<{ [key: string]: any }>;
  dataKey: string;
  nameKey: string;
  config: ChartConfig;
  trendText?: string;
  footerNote?: string;
};
export function PieChartWidget({
  title,
  description,
  data,
  dataKey,
  nameKey,
  config,
  trendText = "Trending up by 5.2% this month",
  footerNote = "Showing data for the last 6 months",
}: DynamicChartProps) {
    const totalValue = React.useMemo(() => {
        return data.reduce((acc, curr) => acc + curr[dataKey], 0);
      }, [data, dataKey]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={config}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey={dataKey}
              nameKey={nameKey}
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalValue.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {config[dataKey]?.label || "Total"}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          {trendText} <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">{footerNote}</div>
      </CardFooter>
    </Card>
  );
}
