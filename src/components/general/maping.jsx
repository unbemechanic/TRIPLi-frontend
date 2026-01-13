import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Maping = () => {
  const [camps, setCamps] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function loadCamps() {
      const apiKey = encodeURIComponent(
        process.env.REACT_APP_CAMPING_SECURITY_KEY
      );
      const url = `https://apis.data.go.kr/B551011/GoCamping/basedList?serviceKey=${apiKey}&numOfRows=100&pageNo=1&MobileOS=ETC&MobileApp=campApp&_type=json`;

      const res = await fetch(url).catch((err) =>
        console.error("Error fetching camps:", err)
      );
      const data = await res.json();
      // Camping items
      const items = data.response.body.items.item;

      setCamps(items);
    }

    loadCamps();
  }, []);
  const mapData = camps.filter((camp) => String(camp.contentId) === String(id));

  const latitude = parseFloat(mapData[0]?.mapY);
  const longitude = parseFloat(mapData[0]?.mapX);

  const new_script = (src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.addEventListener("load", () => {
        resolve();
      });
      script.addEventListener("error", (e) => {
        reject(e);
      });
      document.head.appendChild(script);
    });
  };

  useEffect(() => {
    if (!latitude || !longitude) return;
    const my_script = new_script(
      "https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=896f4f88b2060f77a9fea902e7d4ba20"
    );
    my_script.then(() => {
      console.log("script loaded!!!");
      const kakao = window["kakao"];
      kakao.maps.load(() => {
        const mapContainer = document.getElementById("map-main");

        const options = {
          center: new kakao.maps.LatLng(latitude, longitude),
          level: 10,
        };

        const map = new kakao.maps.Map(mapContainer, options);

        new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(latitude, longitude),
        });
      });
    });
  }, [latitude, longitude]);
  return (
    <div>
      <div
        id="map-main"
        className="map"
        style={{ width: "1200px", height: "500px" }}
      />
    </div>
  );
};
export default Maping;
