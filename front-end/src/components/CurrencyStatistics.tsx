import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Statistics } from "@/types/typings";

type CurrencyStatisticsProps = {
  statistics: Statistics;
};

const CurrencyStatistics = ({ statistics }: CurrencyStatisticsProps) => {
  
  const formattedDate = statistics.date
    ? new Date(statistics.date).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false, 
      })
    : "Incorrect format date";
  
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Statistics</CardTitle>
          <CardDescription>Last updated at {formattedDate}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            <p><span className="font-semibold">Highest:</span> {statistics.highest} </p>
            <p><span className="font-semibold">Lowest:</span> {statistics.lowest} </p>
            <p><span className="font-semibold">Average:</span> {statistics.average} </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CurrencyStatistics;
