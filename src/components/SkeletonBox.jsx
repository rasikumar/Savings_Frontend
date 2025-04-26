import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Skeleton } from "./ui/skeleton";

const SkeletonBox = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex gap-2">
          ₹ <Skeleton className="h-8 w-8 " />{" "}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-between gap-4">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </CardContent>
    </Card>
  );
};

export default SkeletonBox;
