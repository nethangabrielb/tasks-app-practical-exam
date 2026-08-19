import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const FilterTabs = ({
  setFilter,
}: {
  setFilter: (filter: "ALL" | "INCOMPLETE" | "COMPLETED") => void;
}) => {
  return (
    <Tabs defaultValue="ALL">
      <TabsList>
        <TabsTrigger value="ALL" onClick={() => setFilter("ALL")}>
          All
        </TabsTrigger>
        <TabsTrigger value="INCOMPLETE" onClick={() => setFilter("INCOMPLETE")}>
          Incomplete
        </TabsTrigger>
        <TabsTrigger value="COMPLETE" onClick={() => setFilter("COMPLETED")}>
          Complete
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
