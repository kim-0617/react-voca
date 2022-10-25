import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header';
import DayList from './components/DayList';
import Day from './components/Day';
import EmptyPage from './components/EmptyPage';
import CreateWord from './components/CreateWord';
import CreateDay from './components/CreateDay';

function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<DayList />} />
          <Route path='/day/:day' element={<Day />} />
          <Route path='/createWord' element={<CreateWord />} />
          <Route path='/createDay' element={<CreateDay />} />
          <Route path='*' element={<EmptyPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
