import { useEffect, useState } from "react";
import { getAllDate, updateRupee } from "@/hooks/DaysHandles";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StatusFilter } from "@/components/StatusFilter";
import { statusOptions } from "@/lib/utils";
import Pagination from "@/components/Pagination";
import SkeletonBox from "@/components/SkeletonBox";

const Days = () => {
  const [data, setData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRupueeSubmitting, setRupueeIsSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [amount, setAmount] = useState("");

  const [page, setPage] = useState(1);
  const limit = 10;
  const [filters, setFilters] = useState({ day: "", status: "" });

  const days = data?.entries || [];

  useEffect(() => {
    getAllDate(setIsSubmitting, setData, setError, { ...filters, page, limit });
  }, [page, filters]);

  const handleSubmit = async () => {
    await updateRupee(amount, setRupueeIsSubmitting);
    setAmount("");
    getAllDate(setIsSubmitting, setData, setError, { ...filters, page, limit });
  };

  const handleNextPage = () => {
    if (page < data?.totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
    setPage(1); // Reset to page 1 when filter changes
  };

  return (
    <div className="md:p-6 space-y-6">
      {error && <p className="text-red-600">{error}</p>}
      <h3>Enter a Date</h3>
      <div className="flex md:flex-row flex-col items-center mb-4 max-md:gap-2">
        <Input
          type="number"
          placeholder="Enter the Amount of Day"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <Button className="md:w-[50%] w-full" onClick={handleSubmit}>
          {isRupueeSubmitting ? "Sumbitting..." : "Submit"}
        </Button>
      </div>
      <div className="flex flex-col items-center mb-4 max-md:gap-2">
        <div className="flex w-full">
          <Input
            placeholder="Filter by Day"
            name="day"
            value={filters.day}
            onChange={handleFilterChange}
            type="number"
            min="1"
            className="h-9"
          />
          <StatusFilter
            value={filters.status}
            onChange={(value) => {
              setFilters((prev) => ({ ...prev, status: value }));
              setPage(1);
            }}
            options={statusOptions}
            placeholder="Filter by status"
          />
        </div>
      </div>
      {isSubmitting ? (
        <div className="grid md:grid-cols-3 grid-cols-1 md:gap-4 gap-2">
          {Array.from({ length: 10 }).map((_, index) => (
            <SkeletonBox key={index} />
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-3 grid-cols-1 items-center md:gap-4 justify-between mb-4">
          {days.map((day, index) => (
            <Card
              key={index}
              className={`w-full max-w-sm mx-auto my-4 ${
                day.saved ? "bg-green-100" : "bg-red-100"
              }`}
            >
              <CardHeader>
                <CardTitle>₹ {day.amount}</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <Label className="mr-2">
                  {day.saved === true
                    ? "Payment for this day has been successfully completed."
                    : "Payment for this day is pending. Please complete it when possible."}
                </Label>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <Pagination
        currentPage={data?.currentPage}
        totalPages={data?.totalPages}
        onPrevious={handlePreviousPage}
        onNext={handleNextPage}
      />
    </div>
  );
};

export default Days;
