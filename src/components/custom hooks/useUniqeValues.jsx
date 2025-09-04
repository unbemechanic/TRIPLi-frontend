import { useMemo } from "react";

const useUniqueValues = (data, key) => {
  const uniqueValues = useMemo(() => {
    return Array.from(
      new Set(data.map((item) => item[key]?.trim().toLowerCase()))
    ).map((value) => {
      return data.find((item) => item[key]?.trim().toLowerCase() === value)[
        key
      ];
    });
  }, [data, key]);
  return uniqueValues;
};
export default useUniqueValues;
