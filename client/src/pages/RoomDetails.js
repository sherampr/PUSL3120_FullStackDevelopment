import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
// import '../styles/RoomDetails.css'

const RoomDetails = () => {
    const { id } = useParams()
    const [roomTypes, setroomTypes] = useState(null)

    useEffect(() => {
        const fetchroomTypes = async () => {
            const response = await fetch(`/api/roomtypes/${id}`)
            const json = await response.json()

            if (response) {
                setroomTypes(json)
            }
        }
        fetchroomTypes()
    }, [id])

    if (!roomTypes) {
        return <div>Loading...</div>
    }

    return (
        <div className="room-details">
            <h2 className="room-details__header">{roomTypes.typeName}</h2>
            <img src={roomTypes.typeImages.find(img => img.isMain)?.url} alt="room type" />
            <div className="room-details__content">
                <h4>LKR {roomTypes.typePrice}</h4>
                <p>{roomTypes.location}</p>
                <p>{roomTypes.description}</p>
                <p>check</p>
            </div>
        </div>
    )
}

export default RoomDetails