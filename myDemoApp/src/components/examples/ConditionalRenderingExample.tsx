import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

// This example demonstrates different ways to conditionally render content in React

// In .NET terms, conditional rendering is similar to:
// - Conditional blocks in Razor views (@if, @switch)
// - Visibility properties in WPF/WinForms
// - Conditional templating in ASP.NET MVC

// Define TypeScript interfaces for our data
interface Product {
	id: number;
	name: string;
	price: number;
	inStock: boolean;
	category: "electronics" | "clothing" | "books" | "food";
	rating: number;
}

const ConditionalRenderingExample: React.FC = () => {
	// Sample data for our examples
	const [products, setProducts] = useState<Product[]>([
		{
			id: 1,
			name: "Laptop",
			price: 999.99,
			inStock: true,
			category: "electronics",
			rating: 4.5
		},
		{
			id: 2,
			name: "T-shirt",
			price: 19.99,
			inStock: true,
			category: "clothing",
			rating: 3.8
		},
		{
			id: 3,
			name: "Headphones",
			price: 149.99,
			inStock: false,
			category: "electronics",
			rating: 4.2
		},
		{
			id: 4,
			name: "Novel",
			price: 9.99,
			inStock: true,
			category: "books",
			rating: 4.0
		},
		{
			id: 5,
			name: "Snacks",
			price: 5.99,
			inStock: true,
			category: "food",
			rating: 3.5
		}
	]);

	// States and handlers...
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [selectedProductId, setSelectedProductId] = useState<number | null>(
		null
	);

	const selectedProduct = selectedProductId
		? products.find((p) => p.id === selectedProductId) || null
		: null;

	// Toggle loading state for demo
	const toggleLoading = (): void => {
		setError(null);
		setIsLoading(!isLoading);
	};

	// Simulate an error for demo
	const simulateError = (): void => {
		setIsLoading(false);
		setError("An error occurred while fetching data");
	};

	// Clear all states
	const clearAll = (): void => {
		setIsLoading(false);
		setError(null);
		setSelectedProductId(null);
	};

	// Toggle a product's stock status
	const toggleProductStock = (id: number): void => {
		setProducts(
			products.map((product) =>
				product.id === id ? { ...product, inStock: !product.inStock } : product
			)
		);
	};

	// Select a product to show details
	const selectProduct = (id: number): void => {
		setSelectedProductId(id);
	};

	return (
		<div>
			<h2 className="text-xl font-bold mb-4">6. Conditional Rendering</h2>

			<div className="mb-6 p-4 bg-blue-50 rounded-lg">
				<p className="mb-2">
					Conditional rendering in React allows you to show different UI
					elements based on the current state or props of your component.
				</p>
				<p>
					For .NET developers, this is similar to using @if statements in Razor
					views, Visibility properties in WPF, or conditional templating in
					ASP.NET MVC.
				</p>
			</div>

			{/* Demo controls */}
			<div className="mb-6 p-4 border rounded-lg">
				<h3 className="font-semibold mb-3">Demo Controls</h3>
				<div className="flex flex-wrap gap-3">
					<button
						onClick={toggleLoading}
						className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
					>
						{isLoading ? "Stop Loading" : "Show Loading"}
					</button>
					<button
						onClick={simulateError}
						className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
					>
						Simulate Error
					</button>
					<button
						onClick={clearAll}
						className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
					>
						Clear All
					</button>
				</div>
			</div>

			{/* Example 1: If-Else using ternary operator */}
			<div className="mb-6 p-4 border rounded-lg">
				<h3 className="font-semibold mb-3">
					1. If-Else using Ternary Operator
				</h3>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<SyntaxHighlighter language="jsx" style={vscDarkPlus}>
							{`{isLoading ? (
  <div>Loading...</div>
) : error ? (
  <div>{error}</div>
) : (
  <p>Products are ready</p>
)}`}
						</SyntaxHighlighter>
					</div>
					<div className="p-4 bg-gray-100 rounded">
						{/* Ternary operator for isLoading */}
						{isLoading ? (
							<div className="text-center p-4">
								<div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
								<p className="mt-2">Loading products...</p>
							</div>
						) : error ? (
							<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
								<p>{error}</p>
							</div>
						) : (
							<p>Products are ready to be displayed</p>
						)}
					</div>
				</div>
			</div>

			{/* Example 2: Logical && operator */}
			<div className="mb-6 p-4 border rounded-lg">
				<h3 className="font-semibold mb-3">2. Logical && Operator</h3>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<SyntaxHighlighter language="jsx" style={vscDarkPlus}>
							{`{isLoading && (
  <div>Loading...</div>
)}

{error && (
  <div>{error}</div>
)}

{!isLoading && !error && (
  <div>Content is visible</div>
)}`}
						</SyntaxHighlighter>

						<div className="mt-3 p-2 bg-yellow-50 rounded text-sm">
							<p className="font-medium">⚠️ Warning:</p>
							<p>
								Be careful with the && operator if the left side could be 0:
							</p>
							<SyntaxHighlighter language="jsx" style={vscDarkPlus}>
								{`// Wrong - will render "0" when length is 0
{products.length && <ProductList products={products} />}

// Correct way
{products.length > 0 && <ProductList products={products} />}`}
							</SyntaxHighlighter>
						</div>
					</div>

					<div className="p-4 bg-gray-100 rounded">
						{/* Using && for conditional rendering */}
						{isLoading && (
							<div className="text-center p-4">
								<div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
								<p className="mt-2">Loading with && operator...</p>
							</div>
						)}

						{error && (
							<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
								<p>{error}</p>
							</div>
						)}

						{!isLoading && !error && (
							<p>Content is visible when not loading and no errors</p>
						)}
					</div>
				</div>
			</div>

			{/* Example 3: Immediate return for guard clauses */}
			<div className="mb-6 p-4 border rounded-lg">
				<h3 className="font-semibold mb-3">
					3. Immediate Return (Guard Clauses)
				</h3>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<SyntaxHighlighter language="jsx" style={vscDarkPlus}>
							{`// Using an immediately-invoked function expression (IIFE)
{(() => {
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (error) {
    return <div>{error}</div>;
  }
  
  return <p>Main content</p>;
})()}`}
						</SyntaxHighlighter>
					</div>

					<div className="p-4 bg-gray-100 rounded">
						{/* Using a render function with early returns */}
						{(() => {
							if (isLoading) {
								return (
									<div className="text-center p-4">
										<div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
										<p className="mt-2">Loading with early return...</p>
									</div>
								);
							}

							if (error) {
								return (
									<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
										<p>{error}</p>
									</div>
								);
							}

							return <p>Main content after guard clauses</p>;
						})()}
					</div>
				</div>
			</div>

			{/* Example 4: Switch-case with component variables */}
			<div className="mb-6 p-4 border rounded-lg">
				<h3 className="font-semibold mb-3">
					4. Switch/Case Pattern with Component Variables
				</h3>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<SyntaxHighlighter language="jsx" style={vscDarkPlus}>
							{`let content: React.ReactNode;

switch (true) {
  case isLoading:
    content = <div>Loading...</div>;
    break;
  case error !== null:
    content = <div>{error}</div>;
    break;
  default:
    content = <p>Default content</p>;
}

return content;`}
						</SyntaxHighlighter>
					</div>

					<div className="p-4 bg-gray-100 rounded">
						{/* Using variables to hold components */}
						{(() => {
							let content: React.ReactNode;

							switch (true) {
								case isLoading:
									content = (
										<div className="text-center p-4">
											<div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
											<p className="mt-2">Loading with switch-case...</p>
										</div>
									);
									break;
								case error !== null:
									content = (
										<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
											<p>{error}</p>
										</div>
									);
									break;
								default:
									content = <p>Default content from switch statement</p>;
							}

							return content;
						})()}
					</div>
				</div>
			</div>

			{/* Example 5: Conditional styling and props */}
			<div className="mb-6 p-4 border rounded-lg">
				<h3 className="font-semibold mb-3">5. Conditional Styling and Props</h3>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<SyntaxHighlighter language="jsx" style={vscDarkPlus}>
							{`<div>
  <span>{product.name}</span>
  {!product.inStock && (
    <span className="text-red-500">Out of stock</span>
  )}
</div>`}
						</SyntaxHighlighter>
					</div>

					<div className="p-4 bg-gray-100 rounded">
						<h4 className="font-medium mb-2">
							Product List with Conditional Styles
						</h4>
						<ul className="divide-y">
							{products.slice(0, 3).map((product) => (
								<li
									key={product.id}
									className={`p-3 ${
										product.inStock
											? "bg-white hover:bg-gray-50"
											: "bg-gray-100 text-gray-500"
									} ${
										selectedProductId === product.id
											? "border-l-4 border-blue-500 pl-2"
											: ""
									}`}
								>
									<div className="flex justify-between">
										<div>
											<span className="font-medium">{product.name}</span>
											<span className="ml-3">${product.price.toFixed(2)}</span>
											{/* Conditional rendering with && */}
											{!product.inStock && (
												<span className="ml-2 text-red-500 text-sm">
													Out of stock
												</span>
											)}
										</div>
										<button
											onClick={() => selectProduct(product.id)}
											className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
										>
											Details
										</button>
										<button
											onClick={() => toggleProductStock(product.id)}
											className="px-2 py-1 text-xs bg-gray-200 text-gray-800 rounded hover:bg-gray-300 ml-2"
										>
											Toggle Stock
										</button>
									</div>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>

			{/* Example 6: Component extraction for complex conditions */}
			<div className="mb-6 p-4 border rounded-lg">
				<h3 className="font-semibold mb-3">
					6. Extract Complex Conditional Logic to Components
				</h3>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<SyntaxHighlighter language="jsx" style={vscDarkPlus}>
							{`// Extract complex rendering to separate components
{isLoading ? (
  <LoadingIndicator />
) : error ? (
  <ErrorMessage message={error} />
) : selectedProduct ? (
  <ProductDetails 
    product={selectedProduct} 
    onBack={() => setSelectedProductId(null)}
  />
) : (
  <p>Select a product to see details</p>
)}`}
						</SyntaxHighlighter>
						<SyntaxHighlighter language="jsx" style={vscDarkPlus}>
							{`// Within a products.map() function
products.map(product => (
  <div className={\`p-3 \${
    product.inStock ? 'bg-white' : 'bg-gray-100 text-gray-500'
  }\`}>
    <span>{product.name}</span>
    {!product.inStock && (
      <span className="text-red-500">Out of stock</span>
    )}
  </div>
))`}
						</SyntaxHighlighter>
					</div>

					<div className="p-4 bg-gray-100 rounded">
						{/* Using separate components for conditional rendering */}
						{isLoading ? (
							<LoadingIndicator />
						) : error ? (
							<ErrorMessage message={error} />
						) : selectedProduct ? (
							<ProductDetails
								product={selectedProduct}
								onBack={() => setSelectedProductId(null)}
							/>
						) : (
							<p>Select a product from the list above to see details</p>
						)}
					</div>
				</div>
			</div>
			<div className="mt-6 bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
				<h3 className="font-bold mb-2">WPF/XAML Comparison:</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<h4 className="font-semibold mb-1">WPF XAML:</h4>
						<SyntaxHighlighter language="xml" style={vscDarkPlus}>
							{`<Grid>
    <!-- Visibility based on boolean property -->
    <ProgressBar 
        Visibility="{Binding IsLoading, 
                    Converter={StaticResource BoolToVisibility}}" />
    
    <!-- DataTrigger for conditional styling -->
    <ListView ItemsSource="{Binding Products}">
        <ListView.ItemTemplate>
            <DataTemplate>
                <StackPanel>
                    <TextBlock Text="{Binding Name}" />
                    <TextBlock Text="Out of stock"
                              Visibility="{Binding InStock, 
															Converter={StaticResource InverseBoolToVisibility}}" />
                    <StackPanel.Style>
                        <Style TargetType="StackPanel">
                            <Style.Triggers>
                                <DataTrigger Binding="{Binding InStock}" Value="False">
                                    <Setter Property="Opacity" Value="0.5" />
                                </DataTrigger>
                            </Style.Triggers>
                        </Style>
                    </StackPanel.Style>
                </StackPanel>
            </DataTemplate>
        </ListView.ItemTemplate>
    </ListView>
</Grid>`}
						</SyntaxHighlighter>
					</div>
					<div>
						<h4 className="font-semibold mb-1">React Equivalent:</h4>
						<SyntaxHighlighter language="jsx" style={vscDarkPlus}>
							{`function ProductView({ isLoading, products }) {
  return (
    <div>
      {/* Conditional rendering instead of Visibility */}
      {isLoading && <div className="progress-bar" />}
      
      {/* Map with inline conditional styles */}
      <ul>
        {products.map(product => (
          <li
            key={product.id}
            style={{ opacity: product.inStock ? 1 : 0.5 }}
          >
            <span>{product.name}</span>
            {!product.inStock && (
              <span>Out of stock</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}`}
						</SyntaxHighlighter>
					</div>
				</div>
				<p className="mt-3 text-sm">
					WPF uses Visibility properties and converters, while React directly
					renders or doesn't render components based on conditions. WPF uses
					DataTriggers for conditional styling, while React uses inline style
					objects or conditional class names.
				</p>
			</div>

			<div className="mt-6 bg-purple-50 border border-purple-200 p-4 rounded-lg">
				<h3 className="font-bold mb-2">Key Takeaways:</h3>
				<ul className="list-disc pl-5">
					<li>
						React uses JavaScript expressions for conditional rendering
						(if/else, ternary, &&)
					</li>
					<li>Components can return different JSX based on state or props</li>
					<li>
						Use the ternary operator for if-else conditions:{" "}
						<code className="text-sm bg-gray-200 px-1">
							condition ? trueElement : falseElement
						</code>
					</li>
					<li>
						Use the && operator for simple "if" conditions:{" "}
						<code className="text-sm bg-gray-200 px-1">
							condition && element
						</code>
					</li>
					<li>
						Extract complex conditional logic to separate components for
						readability
					</li>
					<li>Use TypeScript for type-safe conditional rendering</li>
					<li>
						Remember that all conditional branches must return valid JSX (or
						null)
					</li>
					<li>
						Conditional classes can be applied using template literals (string
						interpolation)
					</li>
				</ul>
			</div>

			<div className="mt-6 bg-red-50 border border-red-200 p-4 rounded-lg">
				<h3 className="font-bold mb-2">Common Pitfalls:</h3>
				<ul className="list-disc pl-5">
					<li>
						Using && with values that could be 0 (use explicit boolean
						comparisons instead)
					</li>
					<li>
						Forgetting to handle all possible states (loading, error, empty,
						success)
					</li>
					<li>
						Nesting too many conditional operators, making code hard to read
					</li>
					<li>Duplicating logic across conditional branches</li>
					<li>Not considering the "null" or "undefined" case in TypeScript</li>
					<li>
						Rendering unnecessarily complex DOM trees when a simple hide/show
						would work
					</li>
				</ul>
			</div>
		</div>
	);
};

// Helper components for the "Extract to components" example
const LoadingIndicator: React.FC = () => (
	<div className="text-center p-4">
		<div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
		<p className="mt-2">Loading from component...</p>
	</div>
);

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
	<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
		<p>Error from component: {message}</p>
	</div>
);

const ProductDetails: React.FC<{
	product: Product;
	onBack: () => void;
}> = ({ product, onBack }) => (
	<div className="bg-white p-4 rounded shadow">
		<h4 className="font-bold text-lg mb-2">{product.name}</h4>
		<div className="grid grid-cols-2 gap-2 mb-4">
			<div>Category:</div>
			<div>{product.category}</div>

			<div>Price:</div>
			<div>${product.price.toFixed(2)}</div>

			<div>Rating:</div>
			<div>{product.rating} / 5</div>

			<div>Status:</div>
			<div>
				{product.inStock ? (
					<span className="text-green-600">In Stock</span>
				) : (
					<span className="text-red-600">Out of Stock</span>
				)}
			</div>
		</div>
		<button
			onClick={onBack}
			className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
		>
			Back to List
		</button>
	</div>
);

export default ConditionalRenderingExample;
