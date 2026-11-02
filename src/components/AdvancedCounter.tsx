import { useState, useEffect } from "react";

// AdvancedCounter component that displays a counter with increment and decrement buttons
export default function AdvancedCounter() {
	// State to hold the current count
	const [count, setCount] = useState(0);
    // State to hold the history of counts
    const [history, setHistory] = useState<number[]>([]);

    // useEffect to update the history whenever the count changes
    useEffect(() => {
        // Update the history whenever the count changes
        setHistory((prev) => [...prev, count]);
    }, [count]);

	// Function to increment the count
	const handleIncrement = () => {
		setCount((prev) => prev + 1);
	};

	// Function to decrement the count
	const handleDecrement = () => {
		setCount((prev) => prev - 1);
	};

	return (
		<div>
			<h1>Advanced Counter</h1>
			{/* {count} shows the number on the page */}
			<p>Current Count: {count}</p>
			<button onClick={handleIncrement}>Increment (+1)</button>
			<button onClick={handleDecrement}>Decrement (-1)</button>

            {/* Display the history of counts */}
            <p>Previous counts: {history.join(', ')}</p>
		</div>
	);
}
