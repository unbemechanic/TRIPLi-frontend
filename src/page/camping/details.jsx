import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CampingMainDiv } from "..//..//style";

import "./styles.css";

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import styled from "styled-components";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CampSwiper from "./campSwipe";
import Maping from "../../components/general/maping";
import { MdDescription } from "react-icons/md";

const StyledClock = styled(ScheduleOutlinedIcon)`
  font-size: 24px;
`;
const StyledPhone = styled(PhoneOutlinedIcon)`
  font-size: 24px;
`;
const StyledHome = styled(HomeOutlinedIcon)`
  font-size: 24px;
`;

const StyledIcon = styled(LocationOnOutlinedIcon)`
  font-size: 24px; /* Adjust size as needed */
  color: #373738; /* Blue color */
`;

const CampingDetailComponent = () => {
  let { id } = useParams();

  const [camps, setCamps] = useState([]);
  useEffect(() => {
    async function loadCamps() {
      const rawKey =
        "549fdaa0a592c57f9ec0179f1a1039ac437550d49cc8c5886d5a6e985b17794a";
      const apiKey = encodeURIComponent(
        process.env.REACT_APP_CAMPING_SECURITY_KEY || rawKey
      );
      const url = `https://apis.data.go.kr/B551011/GoCamping/basedList?serviceKey=${apiKey}&numOfRows=100&pageNo=1&MobileOS=ETC&MobileApp=campApp&_type=json`;

      const res = await fetch(url);
      const data = await res.json();
      console.log("camping data: ", data);
      // Camping items
      const items = data.response.body.items.item;

      setCamps(items);
    }

    loadCamps();
  }, []);
  const camp = camps.filter((camp) => String(camp.contentId) === String(id));
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Address copied!");
  };
  return (
    <CampingMainDiv>
      <CampSwiper />
      {camp.map((value) => {
        return (
          <div className="campingMainDiv" key={value.contentId}>
            <div className="campingTitle">
              <h1>{value.facltNm}</h1>
              <div className="mapSec">
                {value.addr1}
                <button onClick={() => handleCopy(value.addr1)}>
                  Copy map
                </button>
              </div>
            </div>
            <div className="info">
              <p className="paragraph">
                <StyledIcon />
                {value.doNm}
              </p>
              <p className="paragraph">
                <StyledPhone /> {value.tel || "No phone number"}
              </p>

              <p className="paragraph">
                <StyledHome />{" "}
                <a href={value.homepage}>{value.homepage || "No homepage"}</a>
              </p>
            </div>
            <p className="cdp-description">
              <MdDescription />
              {value.intro}
            </p>
            <Maping />
          </div>
        );
      })}
    </CampingMainDiv>
  );
};

export default CampingDetailComponent;
