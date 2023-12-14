import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Payment from './pages/Payment';
import PaymentCompleted from './pages/PaymentCompleted';
import ViewTickets from './pages/ViewTickets'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={ViewTickets} />
        <Route path="/payment" component={Payment} />
        <Route path="/paymentCompleted" component={PaymentCompleted} />
      </Switch>
    </Router>
  );
}

export default App;
