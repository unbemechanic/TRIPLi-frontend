import { createContext, useContext, useState, useEffect } from "react";

const CampingContext = createContext();

export function CampingProvider({ children }) {
  const [camps, setCamps] = useState([]);
  const rawKey =
    "549fdaa0a592c57f9ec0179f1a1039ac437550d49cc8c5886d5a6e985b17794a";

  useEffect(() => {
    async function loadCamps() {
      try {
        const apiKey = encodeURIComponent(
          process.env.REACT_APP_CAMPING_SECURITY_KEY || rawKey
        );

        const url = `https://apis.data.go.kr/B551011/GoCamping/basedList?serviceKey=${apiKey}&numOfRows=500&pageNo=1&MobileOS=ETC&MobileApp=campApp&_type=json`;

        const res = await fetch(url);
        const data = await res.json();
        const items = data.response.body.items.item;

        setCamps(items);
      } catch (err) {
        console.error("Error loading camps:", err);
      }
    }

    loadCamps();
  }, []);

  return (
    <CampingContext.Provider value={{ camps }}>
      {children}
    </CampingContext.Provider>
  );
}

export function useCamping() {
  return useContext(CampingContext);
}
