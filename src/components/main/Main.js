// Presentation component
// https://redux.js.org/basics/usagewithreact#presentational-and-container-components
import React from 'react';
import './Main.css';
import { Switch, Route } from 'react-router-dom';

import Home from '../home/Home';
import Landing from '../landing/Landing';
import Auth from '../auth/Auth';
import About from '../about/About';
import Account from '../account/Account';
import TransactionContainer from '../transaction-container/TransactionContainer';
import PortfolioContainer from '../portfolio-container/PortfolioContainer';
import StockContainer from '../stock-container/StockContainer';

export default class Main extends React.Component {
	render() {
		return(
			<div className="main">
			<Switch>
				<Route path='/' exact component={Landing} />
				<Route path='/home' component={Home} />
				<Route path='/auth' component={Auth} />
				<Route path='/about' component={About} />
				<Route path='/account' component={Account} />
				<Route path='/transactions' component={TransactionContainer} />
				<Route path='/portfolio' component={PortfolioContainer} />
				<Route path='/stock/:symbol' component={StockContainer} />
			</Switch>
			</div>
		)
	}
}

// ??? If user not logged in, Route path '/' should be Landing.
// If user logged in, Route path '/' should be Home.