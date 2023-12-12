import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Order from './pages/Order';
import Payment from './pages/Payment';
import PaymentCompleted from './pages/PaymentCompleted';
import ViewTickets from './pages/ViewTickets'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Order} />
        <Route path="/payment" component={Payment} />
        <Route path="/paymentCompleted" component={PaymentCompleted} />
        <Route path="/ticket" component={ViewTickets} />
      </Switch>
    </Router>
  );
}

export default App;
