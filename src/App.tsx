import { fetchMockRooms } from './services/apis';
import HotelDetails from './pages/HotelPage';

const App = () => {
  fetchMockRooms(1);
  return (
    <div className='text-red-500'>
      <HotelDetails />
    </div>
  )
}

export default App