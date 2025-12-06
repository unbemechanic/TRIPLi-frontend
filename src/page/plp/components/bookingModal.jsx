import React, { useEffect } from "react";
import { ModalContent, ModalWrapper } from "../styles/bookingModalStyle";
import { API } from "../../../address/address";
import { useCart } from "../../../contextAPI/Context";

const BookingModal = ({ close, value }) => {
  const [bookData, setBookData] = React.useState({});
  const [userData, setUserData] = React.useState({});
  const { getUserId } = useCart();
  const userId = getUserId();
  // const hours = Array.from({ length: 24 }, (_, i) => i + 1);
  const [formattedDate, setFormattedDate] = React.useState("");
  const [duration, setDuration] = React.useState("");

  const fetchUserData = async () => {
    const res = await fetch(`${API}/api/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const UserData = await res.json();
    setUserData(UserData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5500/booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(bookData),
      });
      if (res.status === 201) {
        alert("Booking successful!");
        setTimeout(() => close(), 0);
      }
    } catch (error) {
      throw new Error("Error in submitting booking", error);
    }
  };
  const handleChange = (e) => {
    const { id, value } = e.target;
    const updatedData = { ...bookData, [id]: value };

    if (id === "startPeriod" || id === "endDate") {
      updatedData.duration = calculationDuration(
        id === "startPeriod" ? value : bookData.startPeriod,
        id === "endDate" ? value : bookData.endDate
      );
      setDuration(updatedData.duration);
    }
    setBookData(updatedData);
  };
  //calculate rental duration in hours
  const calculationDuration = (start, end) => {
    if (!start || !end) return "";

    const startDate = new Date(start);
    const endDate = new Date(end);

    if (endDate <= startDate) return "Invalid range";

    const diffMs = endDate - startDate;
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHrs / 24);
    const remainingHrs = diffHrs % 24;

    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? "s" : ""} ${remainingHrs} hour${
        remainingHrs !== 1 ? "s" : ""
      }`;
    }
    return `${diffHrs} hour${diffHrs !== 1 ? "s" : ""}`;
  };
  useEffect(() => {
    fetchUserData();
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    setFormattedDate(
      `${year}-${month}-${day}T${String(now.getHours()).padStart(
        2,
        "0"
      )}:${String(now.getMinutes()).padStart(2, "0")}`
    );
  }, []);

  useEffect(() => {
    setBookData((prev) => ({
      ...prev,
      userId: userId,
      productId: value._id,
      bookingDate: formattedDate,
      name: userData.name,
      email: userData.email,
      duration: duration,
    }));
  }, [userId, value, userData, formattedDate]);
  return (
    <ModalWrapper onClick={close}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <button onClick={close}>x</button>
        <h2>Reserve Your Car</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={bookData.name}
              onChange={handleChange}
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={bookData.email}
              onChange={handleChange}
            />
          </div>
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            pattern="[0-9]{3}[0-9]{4}[0-9]{4}"
            placeholder="010-1234-5678"
            onChange={handleChange}
          />
          <label htmlFor="product-name">Product</label>
          <input
            type="text"
            id="product-name"
            name="product-name"
            value={value.name}
            onChange={handleChange}
          />
          <input
            type="text"
            id="productId"
            name="productId"
            value={value._id}
            defaultValue={value._id}
            onChange={handleChange}
            hidden
          />
          <label htmlFor="start-date">Start Date</label>
          <input
            type="datetime-local"
            id="startPeriod"
            name="start-date"
            onChange={handleChange}
          />
          <label htmlFor="end-date">End Date</label>
          <input
            type="datetime-local"
            id="endDate"
            name="end-date"
            value={bookData.endDate}
            onChange={handleChange}
          />
          <label htmlFor="deposit">Deposit</label>
          <input
            type="text"
            id="duration"
            name="duration"
            value={bookData.duration || ""}
          />
          <button type="submit">Submit</button>
        </form>
      </ModalContent>
    </ModalWrapper>
  );
};

export default BookingModal;
