import { useEffect, useState } from "react"

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
        <div className="home">
          <div className="roomTypes">
            {roomTypes && roomTypes.map((roomType)=>(
                 <RoomTypeDetails key={roomType._id} roomType={roomType}/>
            )
            
            )}
          </div>
        </div>
    )
}

export default Rooms