import { Search } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { FilterTabs } from "@/components/filter-tabs";

export const SearchTasks = () => {
  return (
    <div className="flex w-full gap-2 items-center">
      <InputGroup>
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
      </InputGroup>

      <FilterTabs></FilterTabs>
    </div>
  );
};
