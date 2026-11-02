import { useState, useEffect } from "react";

// AdvancedCounter component that displays a counter with increment and decrement buttons
export default function AdvancedCounter() {
	// State to hold the current count
	const [count, setCount] = useState(0);
    // State to hold the history of counts
    const [history, setHistory] = useState<number[]>([]);

    // Effect #1: record history
    useEffect(() => {
        // Update the history whenever the count changes
        setHistory((prev) => [...prev, count]);
    }, [count]);

    // Effect #2: auto-save
    useEffect(() => {
        // Returns an ID we can use to clear the timeout
        const timerId = setTimeout(() => {
            localStorage.setItem('advancedCounterCount', String(count));
        }, 500); // Save after 5 seconds of inactivity

        return () => {
            clearTimeout(timerId);
        };
    }, [count]); // re-run whenever count changes

    // Effect #3: keyboard listeners
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowUp') {
                setCount((prev) => prev + 1);
            } else if (event.key === 'ArrowDown') {
                setCount((prev) => prev - 1);
            }
        };

        // Tell the document to listen
        document.addEventListener('keydown', handleKeyDown);

        // CLEANUP
        return() => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []); 

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
            <p><em>Tip: Use Up/Down arrow keys to increment/decrement</em></p>
		</div>
	);
}
