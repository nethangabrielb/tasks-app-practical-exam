import { Search } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { FilterTabs } from "@/components/filter-tabs";

export const SearchTasks = ({
  search,
  setSearch,
  setFilter,
}: {
  search: string;
  setSearch: (search: string) => void;
  setFilter: (filter: "ALL" | "INCOMPLETE" | "COMPLETED") => void;
}) => {
  return (
    <div className="flex w-full gap-2 items-center">
      <InputGroup>
        <InputGroupInput
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
      </InputGroup>

      <FilterTabs setFilter={setFilter} />
    </div>
  );
};
