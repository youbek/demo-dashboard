import { useEffect, useState } from "react";

type CreativeEmissionsData = {
  consumerDeviceEmissions: number;
  creativeConsumerDeviceEmissions: number;
  creativeDistributionEmissions: number;
  dataTransferEmissions: number;
  totalEmissions: number;
};

export const creativeEmissionFormatOptions = [
  "banner",
  "video",
  "text",
  "audio",
] as const;

export type CreativeEmissionsFilters = {
  format: (typeof creativeEmissionFormatOptions)[number];
  country: string;
  date: string;
  impressions: number;
};

export function useCreativeEmissions(filters: CreativeEmissionsFilters) {
  const [data, setData] = useState<CreativeEmissionsData | null>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let ignore = false;

    setIsLoading(true);

    console.log("Filters: ", filters);

    (async () => {
      const options = {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify(filters),
      };

      const request = await fetch(
        "http://localhost:8010/proxy/v1/creative",
        options
      );
      const newData: CreativeEmissionsData = await request.json();

      if (ignore) return;

      setData(newData);
      setIsLoading(false);
    })();

    return () => {
      ignore = true;
    };
  }, [filters]);

  return {
    isLoading,
    data,
  };
}
