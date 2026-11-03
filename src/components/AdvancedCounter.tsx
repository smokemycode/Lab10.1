import { useState, useEffect } from "react";

// AdvancedCounter component that displays a counter with increment and decrement buttons
export default function AdvancedCounter() {
	const [count, setCount] = useState(0); // State to hold the current count
    const [history, setHistory] = useState<number[]>([]); // State to hold the history of counts
    const [step, setStep] = useState(1); // the numeric step used by + / -
    const [stepText, setStepText] = useState('1'); // the text input for the step

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
                setCount((prev) => prev + step);
            } else if (event.key === 'ArrowDown') {
                setCount((prev) => prev - step);
            }
        };

        // Tell the document to listen
        document.addEventListener('keydown', handleKeyDown);

        // CLEANUP
        return() => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [step]); // re-run whenever step changes

	// Function to increment the count
	const handleIncrement = () => {
		setCount((prev) => prev + step);
	};

	// Function to decrement the count
	const handleDecrement = () => {
		setCount((prev) => prev - step);
	};

    // Reset: clear history AND set count to 0
    const handleReset = () => {
        setHistory([]); 
        setCount(0);
    };

    // When the user types in the step box
    const handleStepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value;
        setStepText(text); 

        const parsed = Number(text);
        // Only update 'step' if it's a real number and > 0.
        if (!Number.isNaN(parsed) && parsed > 0) {
            setStep(parsed);
        }
    };

    // RENDER
	return (
		<div>
			<h1>Advanced Counter</h1>
			{/* {count} shows the number on the page */}
			<p>Current Count: {count}</p>
			<button onClick={handleIncrement}>Increment (+1)</button>
			<button onClick={handleDecrement}>Decrement (-1)</button>
            <button onClick={handleReset}>Reset</button>

            <div> 
                <label>
                    Step: <input value={stepText} onChange={handleStepChange} type="number" min="1" />
                </label>
            </div>

            {/* Display the history of counts */}
            <p>Previous counts: {history.join(', ')}</p>
            <p><em>Tip: Use Up/Down arrow keys to increment/decrement</em></p>
		</div>
	);
}
