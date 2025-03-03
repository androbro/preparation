import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";

const BasicComponent = () => {
	const liveCodeExample = `function Greeting(props) {
  // Try editing this code!
  return <h1>Hello, {props.name || ".NET Developer"}!</h1>;
}

// Render the component
render(<Greeting name="React Learner" />);`;

	return (
		<div>
			<h2 className="text-xl font-bold mb-4">1. Basic Components</h2>

			<div className="mb-6 p-4 bg-blue-50 rounded-lg">
				<p className="mb-2">
					Components are the fundamental building blocks of React applications.
					They encapsulate UI and behavior, similar to UserControls in .NET.
				</p>
				<p>
					In React, components can be written as functions (Function Components)
					or classes (Class Components). Function Components are now preferred
					and recommended by the React team.
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="border p-4 rounded shadow-sm">
					<h3 className="font-bold mb-2">Function Component Example</h3>
					<SyntaxHighlighter language="javascript" style={vscDarkPlus}>
						{`function Greeting() {
  return <h1>Hello, .NET Developers!</h1>;
}`}
					</SyntaxHighlighter>
					<p className="text-sm text-gray-600">
						Similar to a C# method that returns HTML content
					</p>
				</div>

				<div className="border p-4 rounded shadow-sm">
					<h3 className="font-bold mb-2">Class Component Example</h3>
					<SyntaxHighlighter language="javascript" style={vscDarkPlus}>
						{`class Greeting extends React.Component {
  render() {
    return <h1>Hello, .NET Developers!</h1>;
  }
}`}
					</SyntaxHighlighter>
					<p className="text-sm text-gray-600">
						Similar to a C# class with a Render method
					</p>
				</div>
			</div>

			<div className="mt-6 border border-green-200 bg-green-50 p-4 rounded-lg">
				<h3 className="font-bold mb-2">Live Example:</h3>
				<div className="p-4 bg-white rounded border">
					<h1 className="text-2xl font-bold text-blue-600">
						Hello, .NET Developers!
					</h1>
					<p>This is a React component</p>
				</div>
			</div>

			<div className="mt-6 bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
				<h3 className="font-bold mb-2">.NET Comparison:</h3>
				<p className="mt-2">
					In React, the equivalent would be:
					<SyntaxHighlighter language="javascript" style={vscDarkPlus}>
						{`function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}`}
					</SyntaxHighlighter>
				</p>
			</div>

			<div className="mt-6 bg-purple-50 border border-purple-200 p-4 rounded-lg">
				<h3 className="font-bold mb-2">Key Takeaways:</h3>
				<ul className="list-disc pl-5">
					<li>Components are the building blocks of React applications</li>
					<li>They encapsulate both UI (HTML) and behavior (JavaScript)</li>
					<li>
						JSX allows you to write HTML-like syntax directly in JavaScript
					</li>
					<li>Function components are preferred over class components</li>
					<li>Components can be composed and nested like Lego blocks</li>
				</ul>
			</div>

			<div className="mt-6 border border-green-200 bg-green-50 p-4 rounded-lg">
				<h3 className="font-bold mb-2">Live Editable Example:</h3>
				<LiveProvider code={liveCodeExample} scope={{}} noInline={true}>
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
			</div>
		</div>
	);
};

export default BasicComponent;
