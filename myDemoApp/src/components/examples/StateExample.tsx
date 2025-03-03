import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";

// This example demonstrates React's state management - how components manage their internal data

// In .NET terms, state is similar to:
// - Private fields/properties in a class
// - Properties in a ViewModel with INotifyPropertyChanged
// - ViewState in WebForms

const StateExample = () => {
	const useStateHookExample = `function Counter() {
  // useState returns a pair:
  // 1. The current state value (count)
  // 2. A function to update it (setCount)
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button 
        onClick={() => setCount(count + 1)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Click me
      </button>
    </div>
  );
}

// Render the component
render(<Counter />);`;

	const multipleStateExample = `function UserForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ firstName, lastName, email });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        placeholder="First Name"
        value={firstName} 
        onChange={e => setFirstName(e.target.value)}
        className="block my-2 p-2 border border-gray-300 rounded w-full"
      />
      <input 
        placeholder="Last Name"
        value={lastName} 
        onChange={e => setLastName(e.target.value)}
        className="block my-2 p-2 border border-gray-300 rounded w-full"
      />
      <input 
        placeholder="Email"
        value={email} 
        onChange={e => setEmail(e.target.value)}
        className="block my-2 p-2 border border-gray-300 rounded w-full"
      />
      <button 
        type="submit" 
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
}

// Render the component
render(<UserForm />);`;

	return (
		<div>
			<h2 className="text-xl font-bold mb-4">3. State</h2>

			<div className="mb-6 p-4 bg-blue-50 rounded-lg">
				<p className="mb-2">
					While props are passed to a component, state is managed within the
					component itself. State allows React components to create and manage
					their own data.
				</p>
				<p>
					Unlike props, state can be changed. When state changes, React
					automatically re-renders the component to reflect the changes.
				</p>
			</div>

			<div className="border p-4 rounded shadow-sm mb-6">
				<h3 className="font-bold mb-2">useState Hook Example</h3>
				<LiveProvider
					code={useStateHookExample}
					scope={{ useState: React.useState, React }}
					noInline={true}
				>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="bg-gray-800 rounded p-2">
							<LiveEditor style={{ fontFamily: "monospace" }} />
							<LiveError className="text-red-500 text-sm mt-2" />
						</div>
						<div className="border p-4 bg-white rounded">
							<LivePreview />
						</div>
					</div>
				</LiveProvider>
				<p className="text-sm text-gray-600 mt-2">
					Similar to a property with getter/setter in C#, but with automatic UI
					updates
				</p>
			</div>

			<div className="border p-4 rounded shadow-sm mb-6">
				<h3 className="font-bold mb-2">Multiple State Variables</h3>
				<LiveProvider
					code={multipleStateExample}
					scope={{ useState: React.useState, React }}
					noInline={true}
				>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="bg-gray-800 rounded p-2">
							<LiveEditor style={{ fontFamily: "monospace" }} />
							<LiveError className="text-red-500 text-sm mt-2" />
						</div>
						<div className="border p-4 bg-white rounded">
							<LivePreview />
						</div>
					</div>
				</LiveProvider>
				<p className="text-sm text-gray-600 mt-2">
					Similar to multiple properties in a ViewModel class
				</p>
			</div>

			<div className="mt-6 bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
				<h3 className="font-bold mb-2">.NET Comparison:</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<h4 className="font-semibold mb-1">
							C# with INotifyPropertyChanged:
						</h4>
						<SyntaxHighlighter language="csharp" style={vscDarkPlus}>
							{`public class CounterViewModel : INotifyPropertyChanged
{
    private int _count;
    
    public int Count
    {
        get => _count;
        set
        {
            _count = value;
            OnPropertyChanged();
        }
    }
    
    public ICommand IncrementCommand { get; }
    
    public CounterViewModel()
    {
        IncrementCommand = new RelayCommand(
            () => Count++
        );
    }
    
    // INotifyPropertyChanged implementation...
}`}
						</SyntaxHighlighter>
					</div>
					<div>
						<h4 className="font-semibold mb-1">React Equivalent:</h4>
						<SyntaxHighlighter language="jsx" style={vscDarkPlus}>
							{`function Counter() {
    const [count, setCount] = useState(0);
    
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>
                Increment
            </button>
        </div>
    );
}`}
						</SyntaxHighlighter>
					</div>
				</div>
				<p className="mt-3 text-sm">
					Notice how React has significantly less boilerplate code than the
					equivalent C# MVVM pattern. React's state management is built directly
					into the framework.
				</p>
			</div>

			<div className="mt-6 bg-purple-50 border border-purple-200 p-4 rounded-lg">
				<h3 className="font-bold mb-2">Key Takeaways:</h3>
				<ul className="list-disc pl-5">
					<li>State is for data that changes over time within a component</li>
					<li>
						The useState hook provides a state variable and a setter function
					</li>
					<li>State updates trigger component re-rendering automatically</li>
					<li>Each component manages its own state independently</li>
					<li>
						State updates may be asynchronous, so don't rely on previous state
						values directly
					</li>
					<li>
						Use the functional update form:{" "}
						<code className="text-sm">
							setCount(prevCount {"=>"} prevCount + 1)
						</code>{" "}
						for updates based on previous state
					</li>
					<li>
						Unlike in .NET, there's no need to manually trigger UI updates after
						state changes
					</li>
				</ul>
			</div>
		</div>
	);
};

export default StateExample;
