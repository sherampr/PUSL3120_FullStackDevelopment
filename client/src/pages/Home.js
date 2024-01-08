import { useEffect, useState } from "react"
import '../styles/Home.css'
import { Link } from "react-router-dom"
const Home = () => {

  const [roomTypes, setRoomTypes] = useState(null)

  useEffect(() => {
    const fetchRoomTypes = async () => {
      const response = await fetch('/api/roomtypes');
      const json = await response.json();

      if (response.ok) {
        setRoomTypes(json);
      }
    };
    fetchRoomTypes();
  }, []);

  const [Users, setUsers] = useState(null)

  useEffect(() => {
    const fetchUsers = async () => {

      const response = await fetch('/api/rusers');
      const json = await response.json();

      if (response.ok) {
        setUsers(json);
      }
    };
    fetchUsers();
  }, []);

  const [Reviews, setReviews] = useState(null)

  useEffect(() => {
    const fetchReviews = async () => {

      const response = await fetch('/api/reviews');
      const json = await response.json();

      if (response.ok) {
        setReviews(json);
      }
    };
    fetchReviews();
  }, []);


  return (

    <div className="home">
      <div class="header__image__container">
        <div class="header__content">
          <h1 className="title">Enjoy Your Dream Hotel in Felicon</h1>
          <p className="description">Enjoy Sri Lanka's Most Luxurious Rooms</p>
        </div>
      </div>

      <section class="section__container">
        <h2 class="section__header">Felicon Hotel Rooms</h2>
        <div className="room_cards">
          {roomTypes && roomTypes
            .filter(roomType => roomType.displayInHome === "true" || roomType.displayInHome === undefined) // Adjusted filter condition
            .map(roomType => (
              <div className="room__card" key={roomType._id}>
                <Link to={`/room-details/${roomType._id}`}>
                  <img src={roomType.typeImages.find(img => img.isMain)?.url} alt={roomType.typeName} />
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
      <section class="customer">
        <div class="section__container customer__container">
          <h2 class="section__header">What our Guests say</h2>
          <div class="customer__grid">
            {Reviews && Reviews
              .map(Review => (
                <div class="customer__card" key={Review._id}>
                  <img src="assets/customer-1.jpg" alt={Review.firstName} />
                  <p>
                    {Review.comment}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </section>
      <section class="section__container">
        <div class="reward__container">
          <p>Felicon Restaurant </p>
          <h4>Enjoy srilanka's best food with top notch service from our staff</h4>
          <button class="reward__btn">View Menu or Reserve a table here</button>
        </div>
      </section>

    </div>

  )
}

export default Home