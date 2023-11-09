import { useState, useEffect } from "react";

export function useSimpleData() {
  const [data, setData] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await fetch("http://localhost:8010/proxy");

      console.log(data);
    })();
  }, []);

  return [data, setData];
}
