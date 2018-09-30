import React from 'react';
import Stock from '../stock/Stock';
import axios from 'axios';
import { FormGroup, FormControl, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { executeBuyTransaction, executeSellTransaction } from '../../actions/transaction-actions';

export default class StockContainer extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleBuy = this.handleBuy.bind(this);
		this.handleSell = this.handleSell.bind(this);
		console.log(`symbol: ${props.match.params.symbol}`);

		const currentDate = new Date();
		this.state = {
			date: currentDate.toString(),
			transactionType: '',
			symbol: props.match.params.symbol, // TODO: should receive this value from Search component
			name: '',
			price: '', // TODO: display 2-decimal-point float in render
			quantity: '',
			totalValue: ''
		}
		axios.get(`https://api.iextrading.com/1.0/stock/${this.state.symbol}/quote`)
		.then(response => {
			// ??? Why is `this` undefined?
			//console.log(`latest price: ${response.data.latestPrice}`);
			this.setState({
				price: response.data.latestPrice,
				name: response.data.companyName
			});
			console.log(`this.state inside axios: ${this.state}`)
			return;
		})
		.catch(error => {
			console.log(error);
			return
		});
	}

	handleChange(e) {
		this.setState({
			quantity: e.target.value,
			totalValue: (this.state.price * e.target.value)
		});
	}

	handleSell(e) {
		e.preventDefault();
		//alert(`Sell ${this.state.quantity} shares of ${this.state.symbol}`);
		const sellRequestData = {
			date: this.state.date,
			type: 'sell',
			symbol: this.state.symbol,
			name: this.state.name,
			price: this.state.price,
			quantity: this.state.quantity,
			totalValue: this.state.totalValue
		}
		this.props.executeSellTransaction(sellRequestData);
	}

	handleBuy(e) {
		e.preventDefault();
		const buyRequestData = {
			date: this.state.date,
			type: 'buy',
			symbol: this.state.symbol,
			name: this.state.name,
			price: this.state.price,
			quantity: this.state.quantity,
			totalValue: this.state.totalValue
		}
		this.props.executeBuyTransaction(buyRequestData); // calling Action
		//alert(`Buy ${this.state.quantity} shares of ${this.state.symbol}`);
	}

	render() {
		return (
			<div>
				<Stock {...this.state} />
				<form>
					<FormGroup>
						<FormControl
							type="text"
							value={this.state.quantity}
							placeholder=""
							onChange={this.handleChange}
						/>
					</FormGroup>
					<Button className="sell" type="submit" onClick={this.handleSell}>Sell</Button>
					<Button className="buy" type="submit" onClick={this.handleBuy}>Buy</Button>
				</form>
			</div>
		)
	}
}
/*
const mapStateToProps = (state) => {
	return {
		 // state.transaction is from rootReducer in store.js
		 // store.js is connected to this script through Provider
		 // Provider encapsulates this Component
		 // the key can be named anything
		transaction: state.transactionReducer
	}
}
// const mapDispatchToProps = () => {}
// connect(mapStateToProps) connects redux state to component
// does the same job as second param of connect() below

// connect reducer and action with component
// this.props.executeBuyTransaction will be usable by this component
export default connect(mapStateToProps, { executeBuyTransaction, executeSellTransaction })(StockContainer) 
// store’s dispatch method is automatically provided as a prop
// `dispatch` connects redux actions to component
// data transformation occurs in Action
*/