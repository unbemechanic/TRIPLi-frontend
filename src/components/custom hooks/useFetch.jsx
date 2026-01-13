import { useState, useEffect, useDebugValue } from "react";

const useFetchData = (url, initialValue) => {
  useDebugValue(url);
  const [data, setData] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useDebugValue(error, (error) => error.message || "No error");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setData(data);
      } catch (err) {
        setError(err);
        console.log("custom hook error: ", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  useDebugValue(data, (items) =>
    items.length > 0 ? items.map((item) => item.title) : "No data"
  );
  return { data, loading, error };
};
export { useFetchData };
