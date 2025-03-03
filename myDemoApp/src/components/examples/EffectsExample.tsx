import React, { useState, useEffect } from "react";

// This example demonstrates React's Effects system and component lifecycle

// In .NET terms, React effects are similar to:
// - Page/Control lifecycle events in ASP.NET (Page_Load, OnInit)
// - INotifyPropertyChanged in WPF/MVVM
// - Component lifecycle in Blazor
// - IDisposable.Dispose pattern for cleanup

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
				<div className="bg-gray-100 p-4 rounded-lg mb-4 text-center">
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

				<div className="bg-gray-100 p-4 rounded-lg mb-4">
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
							{`useEffect(() => {
  // Runs once when component mounts
  console.log('Component mounted');
  
  // Optional cleanup (ComponentWillUnmount)
  return () => {
    console.log('Component unmounted');
  };
}, []); // Empty dependency array`}
						</div>
					</div>

					<div>
						<h4 className="font-semibold mb-1">Run on State Change</h4>
						<div className="bg-gray-100 p-3 rounded mb-3 font-mono text-sm">
							{`useEffect(() => {
  // Runs when userId changes
  console.log('Fetching user:', userId);
  
  // Optional cleanup before next run
  return () => {
    console.log('Cleaning up previous fetch');
  };
}, [userId]); // Dependency array`}
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
						</div>
					</div>
					<div>
						<h4 className="font-semibold mb-1">React Equivalent:</h4>
						<div className="font-mono bg-gray-100 p-2 text-sm">
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
						</div>
					</div>
					<div>
						<h4 className="font-semibold mb-1">React Equivalent:</h4>
						<div className="font-mono bg-gray-100 p-2 text-sm">
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
		</div>
	);
};

export default EffectsExample;
