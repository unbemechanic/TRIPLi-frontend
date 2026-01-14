import { useEffect, useState } from "react";
import { BodyDiv, MotorBodyContainer, MotorH, HeroSection } from "../../style";
import { CampingBoxLink } from "./style/style";
import "./styles.css";
import { FaRegCopy } from "react-icons/fa";
import LoadingOverlay from "../../components/general/loader";

const CampingComponent = () => {
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const campsWithImages = camps.filter((camp) => camp.firstImageUrl);
  const campsWithoutImages = camps.filter((camp) => !camp.firstImageUrl);

  useEffect(() => {
    async function loadCamps() {
      setLoading(true);
      const apiKey = encodeURIComponent(
        process.env.REACT_APP_CAMPING_SECURITY_KEY
      );
      const url = `https://apis.data.go.kr/B551011/GoCamping/basedList?serviceKey=${apiKey}&numOfRows=100&pageNo=1&MobileOS=ETC&MobileApp=campApp&_type=json`;

      const res = await fetch(url);
      const data = await res.json();
      // Camping items
      const items = data.response.body.items.item;

      setCamps(items);
      setLoading(false);
    }

    loadCamps();
  }, []);
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Address copied!");
  };

  return (
    <BodyDiv>
      <HeroSection $camping>
        <MotorH $home>Home / Camping Places</MotorH>
        <MotorH $ranges>Our Sights</MotorH>
        <MotorH $motor>Camping Places</MotorH>
      </HeroSection>
      <MotorBodyContainer>
        <div className="camping-container">
          {campsWithImages.map((camp) => {
            return (
              <CampingBoxLink
                to={`/camping/${camp.contentId}`}
                key={camp.contentId}
              >
                <img src={camp.firstImageUrl} alt="car" />
                <div className="camping-info">
                  <h3>{camp.facltNm}</h3>
                  <p>
                    {camp.addr1}
                    <FaRegCopy
                      style={{ cursor: "pointer" }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleCopy(camp.addr1);
                      }}
                    />
                  </p>
                </div>
              </CampingBoxLink>
            );
          })}
        </div>
      </MotorBodyContainer>
      {loading && <LoadingOverlay />}
    </BodyDiv>
  );
};

export default CampingComponent;
