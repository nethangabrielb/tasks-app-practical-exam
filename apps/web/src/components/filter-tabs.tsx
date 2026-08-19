import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const FilterTabs = () => {
  return (
    <Tabs defaultValue="ALL">
      <TabsList>
        <TabsTrigger value="ALL">All</TabsTrigger>
        <TabsTrigger value="INCOMPLETE">Incomplete</TabsTrigger>
        <TabsTrigger value="COMPLETE">Complete</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
