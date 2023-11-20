import { Button } from "react-day-picker";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export const CardItem = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>春节倒计时</CardTitle>
        <CardDescription>距离春节还有: 00-00-00 00:00:00</CardDescription>
      </CardHeader>
      <CardContent>
        
      </CardContent>
      <CardFooter>
        <Button>delete</Button>
      </CardFooter>
    </Card>
  );
};
