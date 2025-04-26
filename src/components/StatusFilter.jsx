import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";

export const StatusFilter = ({
  value,
  onChange,
  options,
  placeholder = "Filter status",
}) => {
  return (
    <Select
      value={value || ""}
      onValueChange={(val) => {
        onChange(val === "All" ? "" : val);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <SelectValue placeholder={placeholder} />
        </div>
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="All">All Statuses</SelectItem>
        {options.map((option) => {
          const Icon = option.icon;
          return (
            <SelectItem key={option.value} value={option.value}>
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                {option.label}
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};
