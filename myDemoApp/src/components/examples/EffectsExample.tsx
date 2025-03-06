import React, {
	useState,
	useEffect,
	useContext,
	useReducer,
	useCallback,
	useMemo,
	useRef,
	useLayoutEffect,
	createContext
} from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
// This example demonstrates React's Effects system and component lifecycle

// In .NET terms, React effects are similar to:
// - Page/Control lifecycle events in ASP.NET (Page_Load, OnInit)
// - INotifyPropertyChanged in WPF/MVVM
// - Component lifecycle in Blazor
// - IDisposable.Dispose pattern for cleanup

// Create a context for the useContext example
const ThemeContext = createContext({ theme: "light", toggleTheme: () => {} });

// Reducer for useReducer example
const counterReducer = (state: { count: number }, action: { type: string }) => {
	switch (action.type) {
		case "increment":
			return { count: state.count + 1 };
		case "decrement":
			return { count: state.count - 1 };
		case "reset":
			return { count: 0 };
		default:
			return state;
	}
};

const EffectsExample: React.FC = () => {
	// State for our demo timer
	const [count, setCount] = useState<number>(0);
	const [isRunning, setIsRunning] = useState<boolean>(false);

	// State for data fetching example
	const [userData, setUserData] = useState<{ id: number; name: string } | null>(
		null
	);
	const [userId, setUserId] = useState<number>(1);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	// New state for comprehensive hooks example
	const [theme, setTheme] = useState<"light" | "dark">("light");

	// useReducer example
	const [counterState, dispatch] = useReducer(counterReducer, { count: 0 });

	// useRef example
	const inputRef = useRef<HTMLInputElement>(null);
	const renderCountRef = useRef<number>(0);

	// useCallback example
	const handleExpensiveCalculation = useCallback((value: number) => {
		console.log("Expensive calculation with:", value);
		return value * 2;
	}, []);

	// useMemo example
	const expensiveValue = useMemo(() => {
		console.log("Computing expensive value...");
		let result = 0;
		for (let i = 0; i < 1000000; i++) {
			result += i;
		}
		return result + counterState.count;
	}, [counterState.count]);

	// Theme context value
	const themeContextValue = {
		theme,
		toggleTheme: () => setTheme((prev) => (prev === "light" ? "dark" : "light"))
	};

	// Component for useContext example
	const ThemedButton = () => {
		const { theme, toggleTheme } = useContext(ThemeContext);
		return (
			<button
				onClick={toggleTheme}
				className={`px-3 py-1 rounded ${
					theme === "dark" ? "bg-gray-800 text-white" : "bg-blue-100 text-black"
				}`}
			>
				Current Theme: {theme}
			</button>
		);
	};

	// Basic Effect: Runs on EVERY render
	useEffect(() => {
		// This code runs after every render
		console.log("Component rendered");

		// This is similar to ComponentDidUpdate in class components
		document.title = `Count: ${count}`;
	});

	// Effect with dependency array: Runs only when dependencies change
	useEffect(() => {
		// This only runs when count changes
		console.log(`Count changed to: ${count}`);

		// No cleanup needed for this effect
	}, [count]); // Dependency array - only run when these values change

	// Effect with empty dependency array: Runs ONCE on mount
	useEffect(() => {
		// This only runs once when the component mounts
		console.log("Component mounted");

		// This is similar to ComponentDidMount in class components
		// or Page_Load in ASP.NET

		// Return a cleanup function (runs when component unmounts)
		return () => {
			// This is similar to ComponentWillUnmount or IDisposable.Dispose
			console.log("Component will unmount - cleanup");
		};
	}, []); // Empty dependency array = run once on mount

	// Effect with cleanup for timer
	useEffect(() => {
		let timerId: number | undefined;

		// Only start the timer if isRunning is true
		if (isRunning) {
			console.log("Starting timer...");
			// Set up the interval
			timerId = window.setInterval(() => {
				setCount((prevCount) => prevCount + 1);
			}, 1000);
		}

		// Return cleanup function to clear the interval
		return () => {
			if (timerId) {
				console.log("Cleaning up timer...");
				clearInterval(timerId);
			}
		};
	}, [isRunning]); // Only re-run if isRunning changes

	// Data fetching effect
	useEffect(() => {
		// Define async function inside effect
		const fetchUser = async (): Promise<void> => {
			setIsLoading(true);
			setError(null);

			try {
				// Simulate API call with delay
				await new Promise((resolve) => setTimeout(resolve, 1000));

				// For demo purposes, let's simulate different responses based on userId
				if (userId === 3) {
					throw new Error("User not found");
				}

				// Mock user data
				const mockUsers = [
					{ id: 1, name: "John Doe" },
					{ id: 2, name: "Jane Smith" },
					{ id: 4, name: "Bob Johnson" },
					{ id: 5, name: "Alice Williams" }
				];

				const user = mockUsers.find((u) => u.id === userId);

				if (user) {
					setUserData(user);
				} else {
					throw new Error("User not found");
				}
			} catch (err) {
				setError(err instanceof Error ? err.message : "An error occurred");
				setUserData(null);
			} finally {
				setIsLoading(false);
			}
		};

		// Call the async function
		fetchUser();

		// Optional: Cancel fetch requests if component unmounts or userId changes
		return () => {
			// In a real app, you would cancel fetch here
			console.log("Cleaning up previous fetch request");
		};
	}, [userId]); // Only re-fetch when userId changes

	// useLayoutEffect example - runs synchronously after DOM mutations
	useLayoutEffect(() => {
		// Update render count reference
		renderCountRef.current += 1;

		// This effect runs synchronously before browser paints
		if (inputRef.current) {
			// We could measure or modify DOM elements here before browser paints
			console.log("Input element width:", inputRef.current.offsetWidth);
		}
	});

	return (
		<div>
			<h2 className="text-xl font-bold mb-4">5. Effects (Lifecycle)</h2>

			<div className="mb-6 p-4 bg-blue-50 rounded-lg">
				<p className="mb-2">
					Effects allow React components to perform side effects like data
					fetching, DOM manipulation, subscriptions, and more. They are similar
					to lifecycle methods in class components but work in functional
					components.
				</p>
				<p>
					For .NET developers, effects are similar to page lifecycle events in
					ASP.NET, component lifecycle in Blazor, or property change
					notifications in MVVM.
				</p>
			</div>

			{/* Timer example */}
			<div className="border rounded-lg p-6 mb-6">
				<h3 className="font-semibold text-lg mb-3">Timer Example</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
					<div>
						<SyntaxHighlighter language="jsx" style={vscDarkPlus}>
							{`// Timer implementation with useEffect
const [count, setCount] = useState(0);
const [isRunning, setIsRunning] = useState(false);

// Effect with cleanup for timer
useEffect(() => {
  let timerId;

  // Only start if isRunning is true
  if (isRunning) {
    console.log("Starting timer...");
    timerId = window.setInterval(() => {
      setCount(prevCount => prevCount + 1);
    }, 1000);
  }

  // Cleanup function runs when:
  // 1. Component unmounts
  // 2. isRunning changes
  // 3. Before next effect execution
  return () => {
    if (timerId) {
      console.log("Cleaning up timer...");
      clearInterval(timerId);
    }
  };
}, [isRunning]); // Only re-run when isRunning changes`}
						</SyntaxHighlighter>
					</div>
					<div className="bg-gray-100 p-4 rounded-lg text-center">
						<div className="text-4xl font-bold mb-2">{count}</div>
						<div className="flex space-x-4 justify-center">
							<button
								onClick={() => setIsRunning(!isRunning)}
								className={`px-4 py-2 rounded-lg ${
									isRunning
										? "bg-red-500 hover:bg-red-600 text-white"
										: "bg-green-500 hover:bg-green-600 text-white"
								}`}
							>
								{isRunning ? "Stop" : "Start"}
							</button>
							<button
								onClick={() => setCount(0)}
								className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg"
								disabled={isRunning}
							>
								Reset
							</button>
						</div>
						<div className="mt-2 text-sm text-gray-600">
							Open your browser console to see effect logs
						</div>
					</div>
				</div>
				<div className="text-sm">
					<p className="mb-2">This example demonstrates:</p>
					<ul className="list-disc list-inside space-y-1">
						<li>
							Effects that run on specific state changes ([isRunning]
							dependency)
						</li>
						<li>Cleanup function to prevent memory leaks (clearInterval)</li>
						<li>Conditional setup of effects (only if isRunning is true)</li>
					</ul>
				</div>
			</div>

			{/* Data fetching example */}
			<div className="border rounded-lg p-6 mb-6">
				<h3 className="font-semibold text-lg mb-3">Data Fetching Example</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
					<div>
						<SyntaxHighlighter language="jsx" style={vscDarkPlus}>
							{`// Data fetching with useEffect
const [userId, setUserId] = useState(1);
const [userData, setUserData] = useState(null);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(null);

// Effect runs when userId changes
useEffect(() => {
  const fetchUser = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In real app, this would be a fetch call:
      // const response = await fetch(\`/api/users/\${userId}\`);
      // const data = await response.json();
      
      // Simulate error for user 3
      if (userId === 3) {
        throw new Error("User not found");
      }
      
      // Mock data lookup
      const user = mockUsers.find(u => u.id === userId);
      if (user) {
        setUserData(user);
      } else {
        throw new Error("User not found");
      }
    } catch (err) {
      setError(err.message);
      setUserData(null);
    } finally {
      setIsLoading(false);
    }
  };
  
  fetchUser();
  
  // Cleanup function
  return () => {
    console.log("Cleaning up previous fetch");
    // In real app: abortController.abort();
  };
}, [userId]); // Only re-fetch when userId changes`}
						</SyntaxHighlighter>
					</div>
					<div>
						<div className="mb-4">
							<div className="mb-2">Select a user ID to fetch:</div>
							<div className="flex space-x-2">
								{[1, 2, 3, 4, 5].map((id) => (
									<button
										key={id}
										onClick={() => setUserId(id)}
										className={`px-3 py-1 rounded ${
											userId === id
												? "bg-blue-500 text-white"
												: "bg-gray-200 hover:bg-gray-300"
										}`}
									>
										User {id}
									</button>
								))}
							</div>
						</div>

						<div className="bg-gray-100 p-4 rounded-lg">
							{isLoading ? (
								<div className="text-center py-4">Loading...</div>
							) : error ? (
								<div className="text-center text-red-500 py-4">{error}</div>
							) : userData ? (
								<div>
									<h4 className="font-semibold">User Details:</h4>
									<p>ID: {userData.id}</p>
									<p>Name: {userData.name}</p>
								</div>
							) : (
								<div className="text-center text-gray-500 py-4">
									Select a user to load data
								</div>
							)}
						</div>
					</div>
				</div>
				<div className="text-sm">
					<p className="mb-2">This example demonstrates:</p>
					<ul className="list-disc list-inside space-y-1">
						<li>Data fetching with useEffect</li>
						<li>Handling loading states and errors</li>
						<li>Dependency array to control when to re-fetch ([userId])</li>
						<li>Cleanup function for canceling in-flight requests</li>
					</ul>
				</div>
			</div>

			{/* Code examples */}
			<div className="border p-4 rounded shadow-sm mb-6">
				<h3 className="font-bold mb-2">Effect Types</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<h4 className="font-semibold mb-1">Run Once (ComponentDidMount)</h4>
						<div className="bg-gray-100 p-3 rounded mb-3 font-mono text-sm">
							<SyntaxHighlighter language="jsx" style={vscDarkPlus}>
								{`useEffect(() => {
  // Runs once when component mounts
  console.log('Component mounted');
  
  // Optional cleanup (ComponentWillUnmount)
  return () => {
    console.log('Component unmounted');
  };
}, []); // Empty dependency array`}
							</SyntaxHighlighter>
						</div>
					</div>

					<div>
						<h4 className="font-semibold mb-1">Run on State Change</h4>
						<div className="bg-gray-100 p-3 rounded mb-3 font-mono text-sm">
							<SyntaxHighlighter language="jsx" style={vscDarkPlus}>
								{`useEffect(() => {
  // Runs when userId changes
  console.log('Fetching user:', userId);
  
  // Optional cleanup before next run
  return () => {
    console.log('Cleaning up previous fetch');
  };
}, [userId]); // Dependency array`}
							</SyntaxHighlighter>
						</div>
					</div>
				</div>
			</div>

			<div className="mt-6 bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
				<h3 className="font-bold mb-2">.NET Comparison:</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<h4 className="font-semibold mb-1">ASP.NET Page Lifecycle:</h4>
						<div className="font-mono bg-gray-100 p-2 text-sm">
							<SyntaxHighlighter language="csharp" style={vscDarkPlus}>
								{`public partial class MyPage : Page
{
    // Similar to useEffect with empty dependency array
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            // First load only (like [] dependency)
            LoadInitialData();
        }
        
        // Runs on every load (like no dependency array)
        UpdateUI();
    }
    
    // Similar to useEffect cleanup function
    protected override void Dispose(bool disposing)
    {
        if (disposing)
        {
            // Clean up resources
        }
        base.Dispose(disposing);
    }
}`}
							</SyntaxHighlighter>
						</div>
					</div>
					<div>
						<h4 className="font-semibold mb-1">React Equivalent:</h4>
						<div className="font-mono bg-gray-100 p-2 text-sm">
							<SyntaxHighlighter language="jsx" style={vscDarkPlus}>
								{`function MyComponent() {
  // Similar to Page_Load with !IsPostBack
  useEffect(() => {
    // Runs once on mount (first load only)
    loadInitialData();
    
    // Similar to Dispose
    return () => {
      // Clean up resources
    };
  }, []);
  
  // Similar to Page_Load without IsPostBack check
  useEffect(() => {
    // Runs on every render (every load)
    updateUI();
  });
  
  // Component render
  return <div>...</div>;
}`}
							</SyntaxHighlighter>
						</div>
					</div>
				</div>
			</div>

			<div className="mt-6 bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
				<h3 className="font-bold mb-2">WPF/MVVM Comparison:</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<h4 className="font-semibold mb-1">WPF/MVVM Property Changed:</h4>
						<div className="font-mono bg-gray-100 p-2 text-sm">
							<SyntaxHighlighter language="csharp" style={vscDarkPlus}>
								{`public class UserViewModel : INotifyPropertyChanged
{
    private int _userId;
    
    public int UserId
    {
        get => _userId;
        set
        {
            if (_userId != value)
            {
                _userId = value;
                OnPropertyChanged();
                
                // Run side effect when property changes
                LoadUserData();
            }
        }
    }
    
    private async void LoadUserData()
    {
        IsLoading = true;
        
        try
        {
            UserData = await _dataService.GetUserAsync(UserId);
        }
        catch (Exception ex)
        {
            ErrorMessage = ex.Message;
        }
        finally
        {
            IsLoading = false;
        }
    }
    
    // INotifyPropertyChanged implementation
    public event PropertyChangedEventHandler PropertyChanged;
    
    protected void OnPropertyChanged([CallerMemberName] string propertyName = null)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}`}
							</SyntaxHighlighter>
						</div>
					</div>
					<div>
						<h4 className="font-semibold mb-1">React Equivalent:</h4>
						<div className="font-mono bg-gray-100 p-2 text-sm">
							<SyntaxHighlighter language="jsx" style={vscDarkPlus}>
								{`function UserComponent() {
  const [userId, setUserId] = useState(1);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Run side effect when userId changes
  // (similar to the property setter side effect)
  useEffect(() => {
    const loadUserData = async () => {
      setIsLoading(true);
      
      try {
        const data = await dataService.getUser(userId);
        setUserData(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setUserData(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadUserData();
  }, [userId]); // Only run when userId changes
  
  // Component render
  return <div>...</div>;
}`}
							</SyntaxHighlighter>
						</div>
					</div>
				</div>
				<p className="mt-3 text-sm">
					In MVVM, side effects often happen in property setters. In React,
					these are moved to useEffect hooks that react to state changes,
					creating a more declarative pattern.
				</p>
			</div>

			<div className="mt-6 bg-purple-50 border border-purple-200 p-4 rounded-lg">
				<h3 className="font-bold mb-2">Key Takeaways:</h3>
				<ul className="list-disc pl-5">
					<li>Effects run after render, keeping the render phase pure</li>
					<li>
						Use the dependency array to control when effects run ([] = once,
						omitted = every render)
					</li>
					<li>
						Return a cleanup function to prevent memory leaks and remove
						subscriptions
					</li>
					<li>For data fetching, always handle loading and error states</li>
					<li>
						Multiple effects can be used to separate concerns (like MVC/MVVM
						separation)
					</li>
					<li>
						Effects replace several lifecycle methods from class components
					</li>
					<li>
						Avoid putting effects inside conditions or loops - they must be
						called consistently
					</li>
				</ul>
			</div>

			<div className="mt-6 bg-red-50 border border-red-200 p-4 rounded-lg">
				<h3 className="font-bold mb-2">Common Pitfalls:</h3>
				<ul className="list-disc pl-5">
					<li>Forgetting the dependency array (causing infinite loops)</li>
					<li>Missing dependencies in the dependency array</li>
					<li>Not cleaning up subscriptions, timers, or event handlers</li>
					<li>
						Misunderstanding the execution timing (effects run after render)
					</li>
					<li>
						Using async directly in the effect function (create an inner async
						function instead)
					</li>
					<li>Running expensive operations without proper dependencies</li>
				</ul>
			</div>

			{/* Add new comprehensive hooks section at the end */}
			<div className="mt-8 border-t-2 pt-6">
				<h2 className="text-2xl font-bold mb-6">
					Comprehensive React Hooks Overview
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{/* useState */}
					<div className="border rounded-lg p-4 shadow-sm">
						<h3 className="font-bold text-lg mb-2">useState</h3>
						<SyntaxHighlighter language="jsx" style={vscDarkPlus}>
							{`const [state, setState] = useState(initialValue);
                            
// Example
const [count, setCount] = useState(0);
const [user, setUser] = useState({ name: '', email: '' });

// Updates
setCount(count + 1); // Replace value
setCount(prev => prev + 1); // Functional update
setUser({...user, name: 'John'}); // Partial update`}
						</SyntaxHighlighter>

						<div className="mt-3 p-3 bg-blue-50 rounded">
							<p>
								<strong>.NET equivalent:</strong> Properties with change
								notification
							</p>
							<p className="text-sm mt-1">
								Similar to a property with backing field in C# that raises
								PropertyChanged events
							</p>
						</div>

						<div className="flex gap-2 items-center mt-3">
							<button
								onClick={() => setCount((prev) => prev + 1)}
								className="px-3 py-1 bg-blue-500 text-white rounded"
							>
								Increment
							</button>
							<span>Count: {count}</span>
						</div>
					</div>

					{/* useReducer */}
					<div className="border rounded-lg p-4 shadow-sm">
						<h3 className="font-bold text-lg mb-2">useReducer</h3>
						<SyntaxHighlighter language="jsx" style={vscDarkPlus}>
							{`const [state, dispatch] = useReducer(reducer, initialState);
                            
// Reducer function
function reducer(state, action) {
	switch (action.type) {
		case "increment":
			return { count: state.count + 1 };
		case "decrement":
			return { count: state.count - 1 };
		case "reset":
			return { count: 0 };
		default:
			return state;
	}
}`}
						</SyntaxHighlighter>

						<div className="mt-3 p-3 bg-blue-50 rounded">
							<p>
								<strong>.NET equivalent:</strong> Command pattern / State
								machine
							</p>
							<p className="text-sm mt-1">
								Similar to Flux/Redux patterns or state reducers in .NET
							</p>
						</div>

						<div className="flex gap-2 items-center mt-3">
							<button
								onClick={() => dispatch({ type: "decrement" })}
								className="px-3 py-1 bg-blue-500 text-white rounded"
							>
								-
							</button>
							<span>Reducer Count: {counterState.count}</span>
							<button
								onClick={() => dispatch({ type: "increment" })}
								className="px-3 py-1 bg-blue-500 text-white rounded"
							>
								+
							</button>
							<button
								onClick={() => dispatch({ type: "reset" })}
								className="px-3 py-1 bg-gray-300 rounded ml-2"
							>
								Reset
							</button>
						</div>
					</div>

					{/* useRef */}
					<div className="border rounded-lg p-4 shadow-sm">
						<h3 className="font-bold text-lg mb-2">useRef</h3>
						<SyntaxHighlighter language="jsx" style={vscDarkPlus}>
							{`// DOM reference
const inputRef = useRef(null);
// Later: inputRef.current.focus();

// Mutable value that doesn't trigger re-renders
const counterRef = useRef(0);

function incrementCounter() {
  // This updates the ref but doesn't trigger a re-render!
  counterRef.current += 1;
  console.log("Counter value:", counterRef.current);
}

// The displayed value will only update after a re-render
// caused by something else (state, props, parent)`}
						</SyntaxHighlighter>

						<div className="mt-3 p-3 bg-blue-50 rounded">
							<p>
								<strong>.NET equivalent:</strong> Field references in classes
							</p>
							<p className="text-sm mt-1">
								Similar to class fields that don't trigger UI updates when
								changed
							</p>
						</div>

						<div className="mt-3 space-y-3">
							<div>
								<input
									ref={inputRef}
									type="text"
									className="border p-2 rounded"
									placeholder="DOM ref example"
								/>
								<button
									onClick={() => inputRef.current?.focus()}
									className="ml-2 px-3 py-2 bg-blue-500 text-white rounded"
								>
									Focus Input
								</button>
							</div>

							<div className="border-t pt-3">
								<p className="text-sm mt-2">
									Ref counter: {renderCountRef.current}
									<br />
									<span className="text-gray-500 text-xs">
										(Only updates in UI after re-render, check console for
										actual value)
									</span>
								</p>
							</div>
						</div>
					</div>

					{/* useContext */}
					<div className="border rounded-lg p-4 shadow-sm">
						<h3 className="font-bold text-lg mb-2">useContext</h3>
						<SyntaxHighlighter language="jsx" style={vscDarkPlus}>
							{`// 1. Create a context
const ThemeContext = createContext(defaultValue);

// 2. Provide context value
<ThemeContext.Provider value={themeValue}>
  <ChildComponents />
</ThemeContext.Provider>

// 3. Consume in any child component
function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button style={{ background: theme }}>Themed</button>;
}`}
						</SyntaxHighlighter>

						<div className="mt-3 p-3 bg-blue-50 rounded">
							<p>
								<strong>.NET equivalent:</strong> Dependency Injection
							</p>
							<p className="text-sm mt-1">
								Similar to services in ASP.NET DI container or Blazor's
								cascading parameters
							</p>
						</div>

						<ThemeContext.Provider value={themeContextValue}>
							<div
								className="mt-3 p-3 rounded"
								style={{
									background: theme === "dark" ? "#333" : "#f0f0f0",
									color: theme === "dark" ? "white" : "black"
								}}
							>
								<p>
									Current theme context value: <strong>{theme}</strong>
								</p>
								<div className="mt-2">
									<ThemedButton />
								</div>
							</div>
						</ThemeContext.Provider>
					</div>

					{/* useMemo */}
					<div className="border rounded-lg p-4 shadow-sm">
						<h3 className="font-bold text-lg mb-2">useMemo</h3>
						<SyntaxHighlighter language="jsx" style={vscDarkPlus}>
							{`// Cache a computed value
const memoizedValue = useMemo(() => {
  // Expensive calculation here
  return computeExpensiveValue(a, b);
}, [a, b]); // Only recompute when deps change`}
						</SyntaxHighlighter>

						<div className="mt-3 p-3 bg-blue-50 rounded">
							<p>
								<strong>.NET equivalent:</strong> Cached property values or
								memorization patterns
							</p>
							<p className="text-sm mt-1">
								Similar to Lazy&lt;T&gt; or computed properties with caching in
								C#
							</p>
						</div>

						<div className="mt-3">
							<p>Memoized expensive calculation:</p>
							<p className="font-mono mt-1">{expensiveValue}</p>
							<p className="text-sm mt-2">
								The expensive value depends on counter ({counterState.count})
							</p>
							<button
								onClick={() => dispatch({ type: "increment" })}
								className="px-3 py-1 bg-blue-500 text-white rounded mt-2"
							>
								Update Dependent Value
							</button>
						</div>
					</div>

					{/* useCallback */}
					<div className="border rounded-lg p-4 shadow-sm">
						<h3 className="font-bold text-lg mb-2">useCallback</h3>
						<SyntaxHighlighter language="jsx" style={vscDarkPlus}>
							{`// Cache a function definition
const memoizedCallback = useCallback(() => {
  doSomethingWith(a, b);
}, [a, b]); // Only recreate when deps change`}
						</SyntaxHighlighter>

						<div className="mt-3 p-3 bg-blue-50 rounded">
							<p>
								<strong>.NET equivalent:</strong> Delegate caching
							</p>
							<p className="text-sm mt-1">
								Similar to storing delegate instances to avoid recreating them
							</p>
						</div>

						<div className="mt-3">
							<p>Callback value calculation:</p>
							<button
								onClick={() => alert(handleExpensiveCalculation(5))}
								className="px-3 py-1 bg-blue-500 text-white rounded mt-2"
							>
								Run Callback
							</button>
							<p className="text-sm mt-2">
								This function won't be recreated on renders
							</p>
						</div>
					</div>

					{/* Custom Hooks */}
					<div className="border rounded-lg p-4 shadow-sm">
						<h3 className="font-bold text-lg mb-2">Custom Hooks</h3>
						<SyntaxHighlighter language="jsx" style={vscDarkPlus}>
							{`// Create reusable hooks
function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  
  function handleChange(e) {
    setValue(e.target.value);
  }
  
  return {
    value,
    onChange: handleChange
  };
}

// Usage
function Form() {
  const nameInput = useFormInput('');
  const emailInput = useFormInput('');
  // ...
}`}
						</SyntaxHighlighter>

						<div className="mt-3 p-3 bg-blue-50 rounded">
							<p>
								<strong>.NET equivalent:</strong> Helper classes and composition
							</p>
							<p className="text-sm mt-1">
								Similar to utility services or composable behaviors in C#
							</p>
						</div>
					</div>

					{/* Hooks Diagram */}
					<div className="border rounded-lg p-4 shadow-sm md:col-span-2">
						<h3 className="font-bold text-lg mb-3">
							React Hooks Decision Flowchart
						</h3>
						<div className="bg-white p-3 rounded border">
							<pre className="text-xs overflow-auto">
								{`When to use which Hook:

useState
  └─ Need local component state
       ├─ Simple state: useState(initialValue)
       └─ Complex state: useReducer(reducer, initialState)

useEffect
  └─ Need to perform side effects
       ├─ After every render: useEffect(fn)
       ├─ Only when certain values change: useEffect(fn, [deps])
       ├─ Only once after mount: useEffect(fn, [])
       └─ Need synchronous DOM measurements: useLayoutEffect(fn, [deps])

Performance Hooks
  └─ Need to optimize performance
       ├─ Expensive calculations: useMemo(() => compute(), [deps])
       ├─ Function references: useCallback(fn, [deps])
       └─ Mutable values without re-renders: useRef(initialValue)

Integration Hooks
  └─ Need to access context or global state
       └─ Read from context: useContext(MyContext)

Custom Hooks
  └─ Need to share logic between components
       └─ Create your own: function useMyHook() { ... }`}
							</pre>
						</div>
					</div>
				</div>

				<div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
					<h3 className="font-bold mb-2">Rules of Hooks:</h3>
					<ul className="list-disc pl-5">
						<li>
							Only call hooks at the top level (not inside conditions, loops, or
							nested functions)
						</li>
						<li>
							Only call hooks from React function components or custom hooks
						</li>
						<li>Hooks names must start with "use" (convention)</li>
						<li>All hooks used must be in the same order between renders</li>
						<li>Include all dependencies in dependency arrays</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default EffectsExample;
