//  Presentation component
import React from 'react';

export default function Portfolio(props) {
	debugger
		return(
			<div>
			<h2>Portfolio</h2>
			<p>Value: ${props.value} (currency format)</p>
			<p>Current Date: {props.currentDate}</p>
			<p>Day Ago: {props.dayAgo}</p>
			<p>Week Ago: {props.weekAgo}</p>
			<p>Month Ago: {props.monthAgo}</p>
			<p>Year Ago: {props.yearAgo}</p>
			</div>
		)
}