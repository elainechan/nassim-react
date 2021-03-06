// Presentation component
import React from 'react';
import './Stock.css';


export default function Stock(props)  {
	console.log(`'Stock' props.symbol: ${props.stockInfo.symbol}`)
		return (
			<div>
				<h2>{props.stockInfo.companyName} ({props.stockInfo.symbol})</h2>
				<p>Price: ${Number.parseFloat(props.stockInfo.latestPrice).toFixed(2)}</p>
				<p>As of: {props.stockInfo.latestTime}</p>
			</div>
		)
}