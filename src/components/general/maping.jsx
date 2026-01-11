import React, { useEffect, useRef, useState } from "react";
import { campingPlace } from "../../page/data/campingPlace";
import { useParams } from "react-router-dom";

const Maping = () => {
  const [camps, setCamps] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function loadCamps() {
      const rawKey =
        "549fdaa0a592c57f9ec0179f1a1039ac437550d49cc8c5886d5a6e985b17794a";
      const apiKey = encodeURIComponent(
        process.env.REACT_APP_CAMPING_SECURITY_KEY || rawKey
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
  const addressRef = useRef(null);
  return (
    <div>
      <div
        id="map-main"
        className="map"
        style={{ width: "1200px", height: "500px" }}
      />
      {/* {mapData.map((value) => {
        return (
          <div className="campingPlace" key={value.contentId}>
            <div className="campingPlace"></div>
          </div>
        );
      })} */}
    </div>
  );
};
export default Maping;
export const ContactMaping = () => {
  const data = campingPlace.maindata;
  const { id } = useParams();
  const mapData = data.filter((value) => value.id == id);
  const latitude = data.ca;

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
    const my_script = new_script(
      "https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=896f4f88b2060f77a9fea902e7d4ba20"
    );
    my_script.then(() => {
      console.log("script loaded!!!");
      const kakao = window["kakao"];
      kakao.maps.load(() => {
        const mapContainer = document.getElementById("map");
        const options = {
          center: new kakao.maps.LatLng(35.88419, 127.0856),
          level: 8,
        };

        const map = new kakao.maps.Map(mapContainer, options);
        const markerPositions = [new kakao.maps.LatLng(35.88419, 127.0856)];

        markerPositions.forEach((position) => {
          const marker = new kakao.maps.Marker({
            position: position,
          });
          marker.setMap(map);
        });
      });
    });
  }, []);
  const addressRef = useRef(null);
  return (
    <div>
      <div
        id="map-contact"
        className="map"
        style={{ width: "500px", height: "280px" }}
      />
    </div>
  );
};
