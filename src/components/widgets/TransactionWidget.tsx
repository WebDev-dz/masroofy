import React from "react";
import { BaseWidget, TransactionsWidget } from "../../types/settings";
import { useTransactionStore } from "../../stores/transactionStore";
import { Avatar } from "../ui/avatar";
import { Icons } from "../icons";
import { cn } from '../../lib/utils';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../components/ui/card";
import { Button, buttonVariants } from "../ui/button";
import { Link } from "react-router-dom";

type Props = {
  widget: BaseWidget & TransactionsWidget;
};

const TransactionWidget = ({ widget }: Props) => {
  const { transactions } = useTransactionStore((state) => state);
  const limitedTransactions = transactions?.slice(0, widget.limit || 5);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Recent Transactions</CardTitle>
        <Icons.wallet className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="pb-4">
        <div className="space-y-4">
          {limitedTransactions?.map((tr) =>{
            const Icon = Icons[tr.category.icon]
            return (
            <div key={tr.transactionId} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar 
                  className={cn("h-10 w-10 flex items-center justify-center")} 
                  style={{background: tr.category.theme}}
                >
                  <Icon color="white" size={20} />
                </Avatar>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">{tr.category.name}</p>
                  <p className="text-xs text-muted-foreground">{new Date(tr.date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className={cn(
                "text-sm font-medium",
                tr.type === "expense" ? "text-red-500" : "text-green-500"
              )}>
                {new Intl.NumberFormat('en-US', { 
                  style: 'currency', 
                  currency: 'USD' 
                }).format(tr.amount)}
              </div>
            </div>
          )})}
        </div>
        
      </CardContent>
      <CardFooter className="justify-end">
            <Link className= {buttonVariants({variant: "link"})} to = "/transactions"> Show More</Link>
        </CardFooter>
    </Card>
  );
};

export default TransactionWidget;