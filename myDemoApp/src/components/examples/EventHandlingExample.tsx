import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

// This example demonstrates React's event handling system

// In .NET terms, React events are similar to:
// - Event handlers in WinForms/WPF
// - JavaScript event handlers in ASP.NET
// - Command binding in MVVM

const EventHandlingExample = () => {
	const [message, setMessage] = useState("No event fired yet");
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [formData, setFormData] = useState({
		name: "",
		email: ""
	});

	// Simple event handler
	const handleClick = () => {
		setMessage("Button was clicked!");
	};

	const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>): void => {
		setPosition({
			x: event.clientX,
			y: event.clientY
		});
	};

	// Form input change handler
	interface FormInput {
		name: string;
		value: string;
	}

	const handleInputChange = (
		event: React.ChangeEvent<HTMLInputElement>
	): void => {
		const { name, value }: FormInput = event.target;
		setFormData({
			...formData, // Spread operator to preserve other fields
			[name]: value // Update only the changed field
		});
	};

	// Form submission handler
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault(); // Prevent default form submission (page reload)
		setMessage(`Form submitted with: ${formData.name} (${formData.email})`);
	};

	return (
		<div>
			<h2 className="text-xl font-bold mb-4">4. Event Handling</h2>

			<div className="mb-6 p-4 bg-blue-50 rounded-lg">
				<p className="mb-2">
					React uses event handlers to respond to user interactions. These are
					similar to event handlers in .NET but use camelCase naming (onClick vs
					OnClick) and are passed as JSX attributes.
				</p>
				<p>
					React events are synthetic events that wrap native browser events for
					cross-browser compatibility.
				</p>
			</div>

			<div className="border p-4 rounded shadow-sm mb-6">
				<h3 className="font-bold mb-2">Basic Event Handling</h3>
				<SyntaxHighlighter language="jsx" style={vscDarkPlus} className="mb-3">
					{`function ClickHandler() {
  const handleClick = () => {
    console.log('Button was clicked!');
  };
  
  return (
    <button onClick={handleClick}>
      Click me
    </button>
  );
}`}
				</SyntaxHighlighter>
				<p className="text-sm text-gray-600">
					Similar to button_Click event handler in WinForms
				</p>
			</div>

			<div className="border p-4 rounded shadow-sm mb-6">
				<h3 className="font-bold mb-2">Event with Parameters</h3>
				<SyntaxHighlighter language="jsx" style={vscDarkPlus} className="mb-3">
					{`function Counter() {
  const [count, setCount] = useState(0);
  
  const handleIncrement = (amount) => {
    setCount(count + amount);
  };
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => handleIncrement(1)}>+1</button>
      <button onClick={() => handleIncrement(5)}>+5</button>
    </div>
  );
}`}
				</SyntaxHighlighter>
				<p className="text-sm text-gray-600">
					Using arrow functions to pass parameters to event handlers
				</p>
			</div>

			<div className="mt-6 border border-green-200 bg-green-50 p-4 rounded-lg">
				<h3 className="font-bold mb-2">Live Examples:</h3>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
					<div>
						<h4 className="font-semibold mb-2">Basic Click Event Code:</h4>
						<SyntaxHighlighter language="jsx" style={vscDarkPlus}>
							{`// Simple event handler
const handleClick = () => {
  setMessage("Button was clicked!");
};

return (
  <>
    <button 
      onClick={handleClick}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Click me
    </button>
    <p className="mt-2">{message}</p>
  </>
);`}
						</SyntaxHighlighter>
					</div>
					<div className="p-4 bg-white rounded border">
						<h4 className="font-semibold mb-2">Basic Click Event</h4>
						<button
							onClick={handleClick}
							className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
						>
							Click me
						</button>
						<p className="mt-2">{message}</p>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
					<div>
						<h4 className="font-semibold mb-2">Mouse Move Event Code:</h4>
						<SyntaxHighlighter language="jsx" style={vscDarkPlus}>
							{`const [position, setPosition] = useState({ x: 0, y: 0 });

const handleMouseMove = (event) => {
  setPosition({
    x: event.clientX,
    y: event.clientY
  });
};

return (
  <>
    <div
      onMouseMove={handleMouseMove}
      className="h-24 bg-gray-200 rounded flex items-center justify-center cursor-pointer"
    >
      Move mouse here
    </div>
    <p className="mt-2">
      Position: X: {position.x}, Y: {position.y}
    </p>
  </>
);`}
						</SyntaxHighlighter>
					</div>
					<div className="p-4 bg-white rounded border">
						<h4 className="font-semibold mb-2">Mouse Move Event</h4>
						<div
							onMouseMove={handleMouseMove}
							className="h-24 bg-gray-200 rounded flex items-center justify-center cursor-pointer"
						>
							Move mouse here
						</div>
						<p className="mt-2">
							Position: X: {position.x}, Y: {position.y}
						</p>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<h4 className="font-semibold mb-2">Form Events Code:</h4>
						<SyntaxHighlighter language="jsx" style={vscDarkPlus}>
							{`const [formData, setFormData] = useState({
  name: "",
  email: ""
});

const handleInputChange = (event) => {
  const { name, value } = event.target;
  setFormData({
    ...formData,
    [name]: value
  });
};

const handleSubmit = (event) => {
  event.preventDefault();
  setMessage(\`Form submitted with: \${formData.name} (\${formData.email})\`);
};

return (
  <form onSubmit={handleSubmit} className="space-y-3">
	<div>
		<label className="block text-sm mb-1">Name:</label>
		<input
			type="text"
			name="name"
			value={formData.name}
			onChange={handleInputChange}
			className="w-full p-2 border rounded"
		/>
	</div>
	<div>
		<label className="block text-sm mb-1">Email:</label>
		<input
			type="email"
			name="email"
			value={formData.email}
			onChange={handleInputChange}
			className="w-full p-2 border rounded"
		/>
	</div>
	<button
		type="submit"
		className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
	>
		Submit
	</button>
</form>
);`}
						</SyntaxHighlighter>
					</div>
					<div className="p-4 bg-white rounded border">
						<h4 className="font-semibold mb-2">Form Events</h4>
						<form onSubmit={handleSubmit} className="space-y-3">
							<div>
								<label className="block text-sm mb-1">Name:</label>
								<input
									type="text"
									name="name"
									value={formData.name}
									onChange={handleInputChange}
									className="w-full p-2 border rounded"
								/>
							</div>
							<div>
								<label className="block text-sm mb-1">Email:</label>
								<input
									type="email"
									name="email"
									value={formData.email}
									onChange={handleInputChange}
									className="w-full p-2 border rounded"
								/>
							</div>
							<button
								type="submit"
								className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
							>
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>

			<div className="mt-6 bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
				<h3 className="font-bold mb-2">.NET Comparison:</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<h4 className="font-semibold mb-1">WinForms/WPF Event Handler:</h4>
						<SyntaxHighlighter language="csharp" style={vscDarkPlus}>
							{`// XAML
<Button x:Name="myButton" 
        Click="MyButton_Click"
        Content="Click Me" />

// Code-behind
private void MyButton_Click(object sender, RoutedEventArgs e)
{
    MessageBox.Show("Button was clicked!");
}`}
						</SyntaxHighlighter>
					</div>
					<div>
						<h4 className="font-semibold mb-1">React Equivalent:</h4>
						<SyntaxHighlighter language="jsx" style={vscDarkPlus}>
							{`function MyComponent() {
  const handleClick = () => {
    alert("Button was clicked!");
  };
  
  return (
    <button onClick={handleClick}>
      Click Me
    </button>
  );
}`}
						</SyntaxHighlighter>
					</div>
				</div>
			</div>

			<div className="mt-6 bg-purple-50 border border-purple-200 p-4 rounded-lg">
				<h3 className="font-bold mb-2">Key Takeaways:</h3>
				<ul className="list-disc pl-5">
					<li>
						React events use camelCase naming convention (onClick, onChange,
						onSubmit)
					</li>
					<li>
						Event handlers are passed as functions, not strings (onClick={"{"}
						<code>handleClick</code>
						{"}"})
					</li>
					<li>
						To pass parameters to event handlers, use arrow functions: onClick=
						{"{"}
						<code>() {">"} handleClick(param)</code>
						{"}"}
					</li>
					<li>React's synthetic events normalize browser differences</li>
					<li>
						event.preventDefault() stops default browser behavior (like form
						submissions)
					</li>
					<li>
						Form inputs need both value and onChange to create controlled
						components
					</li>
					<li>
						Event handling is often combined with state updates to create
						interactive UIs
					</li>
				</ul>
			</div>

			<div className="mt-6 bg-red-50 border border-red-200 p-4 rounded-lg">
				<h3 className="font-bold mb-2">Common Pitfalls:</h3>
				<ul className="list-disc pl-5">
					<li>
						Forgetting to bind methods in class components (use arrow functions
						or bind in constructor)
					</li>
					<li>
						Using onClick={"{"}handleClick(){"}"} instead of onClick={"{"}
						handleClick{"}"}
						(this would call the function immediately)
					</li>
					<li>Not using event.preventDefault() in form submissions</li>
					<li>
						Forgetting to update all form fields when using controlled
						components
					</li>
				</ul>
			</div>
		</div>
	);
};

export default EventHandlingExample;
