import { useEffect, useState } from "react"
import '../styles/RoomPageStyles.css'
//Importing components
import RoomTypeDetails  from '../components/RoomTypeDetails'

const Rooms = ()=>{
    const [roomTypes,setRoomTypes]=useState(null)

    useEffect(()=>{
        const fetchRoomTypes = async()=>{
            const response = await fetch('/api/roomtypes')
            const json = await response.json()

            if(response){
                setRoomTypes(json)
            }
        }
        fetchRoomTypes()
    },[])
    
  

    return(
        <section className="">
        
          <div className="cards-wrapper">
            {roomTypes && roomTypes.map((roomType)=>(
                 <RoomTypeDetails key={roomType._id} roomType={roomType}/>
            )
            
            )}
          </div>
        
        </section>
    )
}

export default Rooms