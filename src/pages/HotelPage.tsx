import HotelDetails from '../components/HotelDetails'
import RoomList from '../components/RoomList'

const HotelPage = () => {
  return (
    <div className="px-2 md:px-10 py-2">
      <HotelDetails />
      {/* List of rooms with variants along with infinite scroll  */}
      <RoomList />
    </div>
  )
}

export default HotelPage