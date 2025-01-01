"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis ,BarProps } from "recharts";

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

type DynamicBarChartProps = {
  title: string;
  description?: string;
  data: Array<{ [key: string]: any }>;
  bars: Array<BarProps>;
  xAxisKey: string;
  config: ChartConfig;
  trendText?: string;
  footerNote?: string;
};

export function BarChartWidget({
  title,
  description,
  data,
  bars,
  xAxisKey,
  config,
  trendText = "Trending up by 5.2% this month",
  footerNote = "Showing total data for the last 6 months",
}: DynamicBarChartProps) {


    

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ChartContainer config={config}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={xAxisKey}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)} // Shorten month names, adjust if needed
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            {bars.map((bar) => (
              <Bar
                key={bar.key}
                dataKey={bar.dataKey}
                fill={bar.color}
                radius={4}
              />
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {trendText} <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">{footerNote}</div>
      </CardFooter>
    </Card>
  );
}
