import { useEffect, useState } from "react"
import '../styles/Home.css'
import { Link } from "react-router-dom"
const Home = ()=>{
       
    const [roomTypes,setRoomTypes]=useState(null)

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
    

    return(
        
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
          <div class="customer__card">
            <img alt="customer" />
            <p>
              The booking process was seamless, and the confirmation was
              instant.
            </p>
          </div>
          <div class="customer__card">
            <img alt="customer" />
            <p>
              The website provided detailed information about hotel, including
              amenities, photos, which helped me make an informed decision.
            </p>
          </div>
          <div class="customer__card">
            <img alt="customer" />
            <p>
              I was able to book a room within minutes, and the hotel exceeded
              my expectations. 
            </p>
          </div>
        </div>
      </div>
    </section>


    <section class="section__container">
      <div class="menu__container">
        <p>Felicon Restaurant </p>
        <h4>Enjoy srilanka's best food with top notch service from our staff</h4>
        <div class="menu__buttons">
        <button class="menu__btn">View Restaurant Menu</button>
        <button class="menu__btn">Reserve a table here</button>
        </div>
      </div>
    </section>

          </div>
       
    )
}

export default Home