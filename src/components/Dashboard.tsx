import { useCallback, useState } from "react";
import {
  useCreativeEmissions,
  creativeEmissionFormatOptions,
  CreativeEmissionsFilters,
} from "../hooks/useCreateEmissions";
import { DataCard } from "./DataCard";

export function Dashboard() {
  const [filters, setFilters] = useState<CreativeEmissionsFilters>({
    country: "US",
    date: "2023-06-17",
    format: "banner",
    impressions: 1000,
  });

  const { data, isLoading } = useCreativeEmissions(filters);

  const handleFilterInputChange = useCallback((event: any) => {
    event.preventDefault();

    setFilters((prevFilters) => ({
      ...prevFilters,
      [event.target.name]:
        event.target.name === "impressions"
          ? event.target.valueAsNumber
          : event.target.value,
    }));
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-xl mb-2">Welcome to dashboard!</h1>
      <form className="flex">
        <div className="mr-5">
          <label className="font-bold mr-4">Format</label>
          <select
            className="border-2 rounded-md"
            name="format"
            value={filters.format}
            onChange={handleFilterInputChange}
          >
            {creativeEmissionFormatOptions.map((format) => (
              <option value={format}>{format}</option>
            ))}
          </select>
        </div>
        <div className="mr-5">
          <label className="font-bold mr-4">Format</label>
          <input
            className="border-2 rounded-md"
            name="country"
            value={filters.country}
            onChange={handleFilterInputChange}
          />
        </div>
        <div className="mr-5">
          <label className="font-bold mr-4">Date</label>
          <input
            className="border-2 rounded-md"
            name="date"
            value={filters.date}
            placeholder="2023-03-01"
            onChange={handleFilterInputChange}
          />
        </div>
        <div className="mr-5">
          <label className="font-bold mr-4">Impressions</label>
          <input
            className="border-2 rounded-md"
            name="impressions"
            type="number"
            value={filters.impressions}
            onChange={handleFilterInputChange}
          />
        </div>
      </form>
      <div className="w-full border-2 mt-2" />
      <div>
        {isLoading || !data ? (
          <p>Loading...</p>
        ) : (
          <div className="flex">
            <DataCard
              title="Consumer Device Emissions"
              data={data.consumerDeviceEmissions}
            />
            <DataCard
              title="Creative Consumer Device Emissions"
              data={data.creativeConsumerDeviceEmissions}
            />
            <DataCard
              title="Creative Distribution Emissions"
              data={data.creativeDistributionEmissions}
            />
            <DataCard
              title="Data Transfer Emissions"
              data={data.dataTransferEmissions}
            />
            <DataCard title="Total Emissions" data={data.totalEmissions} />
          </div>
        )}
      </div>
    </div>
  );
}
