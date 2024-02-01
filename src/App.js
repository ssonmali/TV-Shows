import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShowList from './components/ShowList';
import ShowSummary from './components/ShowSummary';
import TicketBooking from './components/TicketBooking';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ShowList />} />
        <Route path="/show/:id" element={<ShowSummary />} />
        <Route path="/book/:id" element={<TicketBooking />} />
      </Routes>
    </Router>
  );
}

export default App;
