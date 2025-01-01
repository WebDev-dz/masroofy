import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";




export function MetricCard({ title, value, icon }: { title: string; value: string; icon?: React.ReactNode }) {
    return (
      <Card>
        <CardHeader className="flex items-center space-x-4">
          {icon && <div className="text-primary">{icon}</div>}
          <div>
            <CardTitle className="text-sm">{title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{value}</p>
        </CardContent>
      </Card>
    );
  }
  