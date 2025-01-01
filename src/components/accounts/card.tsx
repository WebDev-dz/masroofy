import { Account } from "../..//types/models";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"; // Adjust the import path as necessary

type AccountCardProps = {
  account: Account;
};

export function AccountCard({ account }: AccountCardProps) {
  return (
    <Card className="cursor-pointer group hover:shadow-md hover:bg-sky-500 hover:ring-sky-500" >
      <CardHeader className="flex items-center space-x-4 p-4">
        
        <div>
          <CardTitle className="text-sm text-slate-900 group-hover:text-white font-semibold">{account.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-lg font-bold group-hover:text-white">Balance: {account.balance.toFixed(2)} {account.currency}</p>
        {/* <p className="text-sm">Account ID: {account.accountId}</p>
        <p className="text-sm">Type: {account.type}</p>
        <p className="text-sm">Status: {account.isActive ? 'Active' : 'Inactive'}</p>
        <p className="text-sm">Color: <span style={{ backgroundColor: account.color }} className="inline-block w-4 h-4 rounded-full"></span></p> */}
        {account.bankNumber && <p className="text-sm group-hover:text-white">Bank Number: {account.bankNumber}</p>}
      </CardContent>
    </Card>
  );
}
