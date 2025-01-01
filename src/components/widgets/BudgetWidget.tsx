import React from "react";
import { BaseWidget, BudgetWidget as BudgetWidgetType } from "../../types/settings";
import { useBudgetStore } from "../../stores/budgetStore";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../../components/ui/card";
import { Progress } from "../../components/ui/progress";
import { Icons } from "../icons";
import { Link } from "react-router-dom";
import { buttonVariants } from "../ui/button";

type Props = {
  widget: BaseWidget & BudgetWidgetType;
};

const BudgetWidget = ({ widget }: Props) => {
  const { budgets } = useBudgetStore((state) => state);
  
  const calculateProgress = (current: number, limit: number) => {
    return Math.min((current / limit) * 100, 100);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const limitedBudgets = budgets?.slice(0, widget?.limit || 5);


  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-sm font-medium">{widget.title}</CardTitle>
          {widget.description && (
            <CardDescription>{widget.description}</CardDescription>
          )}
        </div>
        <Icons.piggyBank className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {limitedBudgets?.map((budget) => (
            <div key={budget.budgetId} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{budget.category?.name || 'General Budget'}</p>
                  <p className="text-xs text-muted-foreground">{budget.period}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {formatCurrency(budget.currentAmount)} / {formatCurrency(budget.limit)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatCurrency(budget.limit - budget.currentAmount)} remaining
                  </p>
                </div>
              </div>
              <Progress
                color="blue" 
                style={{height: 8}}
                value={calculateProgress(budget.currentAmount, budget.limit)}
                // className={budget.currentAmount > budget.limit ? "text-red-100" : "text-green-100"}
              />
            </div>
          ))}
          
          {(!budgets || budgets.length === 0) && (
            <div className="text-center py-6 text-muted-foreground">
              <p>No budgets set up yet</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
      <Link className= {buttonVariants({variant: "link"})} to = "/budgets"> Show More</Link>

      </CardFooter>
    </Card>
  );
};

export default BudgetWidget;