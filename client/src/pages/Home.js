import { useEffect, useState } from "react";
import "../styles/Home.css";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
  const [roomTypes, setRoomTypes] = useState(null);
  const [Reviews, setReviews] = useState(null);

  useEffect(() => {
    const fetchRoomTypes = async () => {
      const response = await fetch("/api/roomtypes");
      const json = await response.json();
      if (response.ok) {
        setRoomTypes(json);
      }
    };
    fetchRoomTypes();
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await fetch("/api/reviews");
      const json = await response.json();
      if (response.ok) {
        setReviews(json);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div className="home">
      <div className="header__image__container">
        <div className="header__content">
          <h1 className="title">Enjoy Your Dream Hotel in Felicon</h1>
          <p className="description">Enjoy Sri Lanka's Most Luxurious Rooms</p>
        </div>
      </div>

      <section className="section__container">
        <h2 className="section__header">Felicon Hotel Rooms</h2>
        <div className="room_cards">
          {roomTypes &&
            roomTypes
              .filter(
                (roomType) =>
                  roomType.displayInHome === "true" ||
                  roomType.displayInHome === undefined
              )
              .map((roomType) => (
                <div className="room__card" key={roomType._id}>
                  <Link to={`/room-details/${roomType._id}`}>
                    <img
                      src={roomType.typeImages.find((img) => img.isMain)?.url}
                      alt={roomType.typeName}
                    />
                  </Link>
                  <div className="popular__content">
                    <div className="room__card__header">
                      <h4>{roomType.typeName}</h4>
                      <h4>LKR {roomType.typePrice}</h4>
                    </div>
                    <p>{roomType.location}</p>
                  </div>
                </div>
              ))}
        </div>
      </section>

      <section className="customer">
        <div className="section__container customer__container">
          <h2 className="section__header">What our Guests say</h2>
          <div className="customer__grid">
            {Reviews &&
              Reviews.map((Review) => (
                <div className="customer__card" key={Review._id}>
                  <FaUserAlt size={30} />
                  <p>
                    <strong>{Review.customerName}</strong>: {Review.comment}
                  </p>
                  <p>{Review.rating}/10</p>
                </div>
              ))}
          </div>
        </div>
      </section>

      <section className="section__container">
        <div className="menu__container">
          <p>Felicon Restaurant</p>
          <h4>
            Enjoy Sri Lanka's best food with top-notch service from our staff
          </h4>
          <div className="menu__buttons">
            <Link className="menu__btn" to={"/menu"}>
              View Restaurant Menu
            </Link>
            <Link className="menu__btn" to={"/reserve-table"}>
              Reserve a table here
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
