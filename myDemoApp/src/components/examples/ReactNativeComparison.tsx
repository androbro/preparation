import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

// This example demonstrates the key differences and similarities between
// React (for web) and React Native (for mobile)

// In .NET terms, this comparison is similar to:
// - ASP.NET MVC (web) vs. Xamarin/MAUI (mobile)
// - WPF (desktop) vs. UWP (universal)

const ReactNativeComparison: React.FC = () => {
	// State for our interactive demo
	const [showWebVersion, setShowWebVersion] = useState<boolean>(true);

	// Toggle between web and mobile examples
	const toggleVersion = (): void => {
		setShowWebVersion(!showWebVersion);
	};

	return (
		<div>
			<h2 className="text-xl font-bold mb-4">10. React Native Comparison</h2>

			<div className="mb-6 p-4 bg-blue-50 rounded-lg">
				<p className="mb-2">
					React Native allows you to build mobile applications using React
					concepts. It uses the same component-based architecture, but with
					native UI components instead of DOM elements.
				</p>
				<p>
					For .NET developers, the relationship between React and React Native
					is similar to the relationship between ASP.NET (web) and Xamarin/MAUI
					(mobile).
				</p>
			</div>

			{/* Toggle button for demo */}
			<div className="mb-6 flex justify-center">
				<button
					onClick={toggleVersion}
					className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
				>
					{showWebVersion
						? "Show React Native Version"
						: "Show React Web Version"}
				</button>
			</div>

			{/* Interactive comparison */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
				<div className="border rounded-lg overflow-hidden">
					<div className="bg-gray-100 px-4 py-2 font-medium border-b">
						{showWebVersion ? "React (Web)" : "React Native (Mobile)"}
					</div>
					<div className="p-4">
						{showWebVersion ? (
							// React Web Example
							<div className="space-y-3">
								<div className="font-mono text-sm bg-gray-50 p-3 rounded">
									<SyntaxHighlighter language="jsx" style={vscDarkPlus}>
										{`import React, { useState } from 'react';

function ProfileCard() {
  const [likes, setLikes] = useState(0);

  return (
    <div className="card">
      <img 
        src="avatar.png" 
        alt="Profile" 
        className="avatar" 
      />
      <h2>Jane Doe</h2>
      <p>Frontend Developer</p>
      <button onClick={() => setLikes(likes + 1)}>
        Likes: {likes}
      </button>
    </div>
  );
}`}
									</SyntaxHighlighter>
								</div>
								<div className="bg-gray-50 p-3 rounded">
									<div className="border p-4 rounded max-w-xs mx-auto shadow-sm">
										<div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-3"></div>
										<h2 className="text-lg font-semibold text-center">
											Jane Doe
										</h2>
										<p className="text-gray-600 text-center mb-3">
											Frontend Developer
										</p>
										<button className="w-full py-2 bg-blue-500 text-white rounded">
											Likes: 0
										</button>
									</div>
								</div>
							</div>
						) : (
							// React Native Example
							<div className="space-y-3">
								<div className="font-mono text-sm bg-gray-50 p-3 rounded">
									<SyntaxHighlighter language="jsx" style={vscDarkPlus}>
										{`import React, { useState } from 'react';
import { 
  View, Text, Image, 
  TouchableOpacity, StyleSheet 
} from 'react-native';

function ProfileCard() {
  const [likes, setLikes] = useState(0);

  return (
    <View style={styles.card}>
      <Image 
        source={require('./avatar.png')} 
        style={styles.avatar}
      />
      <Text style={styles.name}>Jane Doe</Text>
      <Text style={styles.role}>Frontend Developer</Text>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => setLikes(likes + 1)}
      >
        <Text style={styles.buttonText}>
          Likes: {likes}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  role: {
    color: '#666',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
});`}
									</SyntaxHighlighter>
								</div>
								<div className="bg-gray-50 p-3 rounded">
									<div
										className="border p-4 rounded max-w-xs mx-auto shadow-sm"
										style={{ backgroundColor: "white" }}
									>
										<div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-3"></div>
										<p className="text-lg font-semibold text-center">
											Jane Doe
										</p>
										<p className="text-gray-600 text-center mb-3">
											Frontend Developer
										</p>
										<div className="w-full py-2 bg-blue-500 rounded flex justify-center">
											<span className="text-white">Likes: 0</span>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>

				<div className="border rounded-lg overflow-hidden">
					<div className="bg-gray-100 px-4 py-2 font-medium border-b">
						Key Differences
					</div>
					<div className="p-4">
						<ul className="space-y-2">
							<li className="flex items-start">
								<span className="inline-block w-24 font-medium">
									Components:
								</span>
								<span>
									{showWebVersion
										? "Uses HTML elements (div, span, img, button)"
										: "Uses Native components (View, Text, Image, TouchableOpacity)"}
								</span>
							</li>
							<li className="flex items-start">
								<span className="inline-block w-24 font-medium">Styling:</span>
								<span>
									{showWebVersion
										? "Uses CSS classes and CSS-in-JS"
										: "Uses StyleSheet.create() with a subset of CSS properties"}
								</span>
							</li>
							<li className="flex items-start">
								<span className="inline-block w-24 font-medium">Layout:</span>
								<span>
									{showWebVersion
										? "Uses standard CSS layout (flex, grid, etc.)"
										: "Uses Flexbox by default (no Grid support)"}
								</span>
							</li>
							<li className="flex items-start">
								<span className="inline-block w-24 font-medium">Events:</span>
								<span>
									{showWebVersion
										? "onClick, onChange, onSubmit, etc."
										: "onPress, onChangeText, onLayout, etc."}
								</span>
							</li>
							<li className="flex items-start">
								<span className="inline-block w-24 font-medium">Text:</span>
								<span>
									{showWebVersion
										? "Can be placed directly in any element"
										: "Must be wrapped in a <Text> component"}
								</span>
							</li>
						</ul>
					</div>
				</div>
			</div>

			<div className="border p-4 rounded shadow-sm mb-6">
				<h3 className="font-bold mb-2">
					Component Mapping Between React and React Native
				</h3>
				<div className="overflow-x-auto">
					<table className="min-w-full bg-white border">
						<thead>
							<tr className="bg-gray-50">
								<th className="py-2 px-4 border-b text-left">React (Web)</th>
								<th className="py-2 px-4 border-b text-left">React Native</th>
								<th className="py-2 px-4 border-b text-left">Purpose</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className="py-2 px-4 border-b font-mono text-sm">
									&lt;div&gt;
								</td>
								<td className="py-2 px-4 border-b font-mono text-sm">
									&lt;View&gt;
								</td>
								<td className="py-2 px-4 border-b">Container element</td>
							</tr>
							<tr>
								<td className="py-2 px-4 border-b font-mono text-sm">
									&lt;span&gt;, &lt;p&gt;, &lt;h1&gt;
								</td>
								<td className="py-2 px-4 border-b font-mono text-sm">
									&lt;Text&gt;
								</td>
								<td className="py-2 px-4 border-b">Text elements</td>
							</tr>
							<tr>
								<td className="py-2 px-4 border-b font-mono text-sm">
									&lt;img&gt;
								</td>
								<td className="py-2 px-4 border-b font-mono text-sm">
									&lt;Image&gt;
								</td>
								<td className="py-2 px-4 border-b">Display images</td>
							</tr>
							<tr>
								<td className="py-2 px-4 border-b font-mono text-sm">
									&lt;button&gt;, &lt;a&gt;
								</td>
								<td className="py-2 px-4 border-b font-mono text-sm">
									&lt;TouchableOpacity&gt;, &lt;Pressable&gt;
								</td>
								<td className="py-2 px-4 border-b">
									Interactive/clickable elements
								</td>
							</tr>
							<tr>
								<td className="py-2 px-4 border-b font-mono text-sm">
									&lt;input type="text"&gt;
								</td>
								<td className="py-2 px-4 border-b font-mono text-sm">
									&lt;TextInput&gt;
								</td>
								<td className="py-2 px-4 border-b">Text input field</td>
							</tr>
							<tr>
								<td className="py-2 px-4 border-b font-mono text-sm">
									&lt;ul&gt;, &lt;ol&gt;
								</td>
								<td className="py-2 px-4 border-b font-mono text-sm">
									&lt;FlatList&gt;, &lt;SectionList&gt;
								</td>
								<td className="py-2 px-4 border-b">List elements</td>
							</tr>
							<tr>
								<td className="py-2 px-4 border-b font-mono text-sm">
									&lt;input type="checkbox"&gt;
								</td>
								<td className="py-2 px-4 border-b font-mono text-sm">
									&lt;Switch&gt;
								</td>
								<td className="py-2 px-4 border-b">Toggle control</td>
							</tr>
							<tr>
								<td className="py-2 px-4 border-b font-mono text-sm">
									CSS, className
								</td>
								<td className="py-2 px-4 border-b font-mono text-sm">
									StyleSheet.create(), style prop
								</td>
								<td className="py-2 px-4 border-b">Styling</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			<div className="mt-6 bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
				<h3 className="font-bold mb-2">.NET Comparison:</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<h4 className="font-semibold mb-1">
							ASP.NET MVC vs. Xamarin.Forms:
						</h4>
						<div className="font-mono bg-gray-100 p-2 text-sm">
							<SyntaxHighlighter language="csharp" style={vscDarkPlus}>
								{`<!-- ASP.NET MVC (Razor) -->
<div class="profile-card">
    <img src="~/images/avatar.png" alt="Profile" />
    <h2>@Model.Name</h2>
    <p>@Model.Role</p>
    <button id="likeButton">
        Likes: <span id="likeCount">0</span>
    </button>
</div>

@section Scripts {
    <script>
        $(function() {
            $("#likeButton").click(function() {
                var count = parseInt($("#likeCount").text());
                $("#likeCount").text(count + 1);
            });
        });
    </script>
}`}
							</SyntaxHighlighter>
						</div>
					</div>
					<div>
						<h4 className="font-semibold mb-1">Xamarin.Forms XAML:</h4>
						<div className="font-mono bg-gray-100 p-2 text-sm">
							<SyntaxHighlighter language="XML" style={vscDarkPlus}>
								{`<!-- Xamarin.Forms (XAML) -->
<ContentPage xmlns="...">
  <StackLayout Padding="16" 
               BackgroundColor="White">
    <Image Source="avatar.png"
           WidthRequest="64"
           HeightRequest="64"
           HorizontalOptions="Center" />
    <Label Text="{Binding Name}"
           FontSize="18"
           FontAttributes="Bold"
           HorizontalOptions="Center" />
    <Label Text="{Binding Role}"
           TextColor="#666666"
           HorizontalOptions="Center" />
    <Button Text="{Binding LikeText}"
            BackgroundColor="#3498db"
            TextColor="White"
            Command="{Binding LikeCommand}" />
  </StackLayout>
</ContentPage>`}
							</SyntaxHighlighter>
						</div>
					</div>
				</div>
				<p className="mt-3 text-sm">
					The relationship between React and React Native is similar to how
					ASP.NET MVC (web) relates to Xamarin (mobile). Both platforms share
					core concepts (components/controls, properties/bindings) but use
					different rendering targets.
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
				<div className="border p-4 rounded shadow-sm">
					<h3 className="font-bold mb-2">
						What's the Same in React and React Native
					</h3>
					<ul className="list-disc pl-5 space-y-1">
						<li>Component-based architecture</li>
						<li>Props for component configuration</li>
						<li>State management (useState, useReducer)</li>
						<li>Lifecycle methods and hooks (useEffect)</li>
						<li>Context API for state sharing</li>
						<li>TypeScript support</li>
						<li>JSX syntax</li>
						<li>
							Navigation libraries available (React Router / React Navigation)
						</li>
						<li>Most third-party JS libraries that don't use DOM</li>
					</ul>
				</div>

				<div className="border p-4 rounded shadow-sm">
					<h3 className="font-bold mb-2">What's Different in React Native</h3>
					<ul className="list-disc pl-5 space-y-1">
						<li>Native UI components instead of DOM elements</li>
						<li>StyleSheet API instead of CSS</li>
						<li>No CSS classes, only inline styles</li>
						<li>No HTML or web APIs (document, window, etc.)</li>
						<li>Different navigation paradigms (stack, tab, drawer)</li>
						<li>Platform-specific code (iOS vs Android)</li>
						<li>Different event handling (onPress vs onClick)</li>
						<li>All text must be inside &lt;Text&gt; components</li>
						<li>
							Access to native device features (camera, geolocation, etc.)
						</li>
						<li>
							Different performance considerations (JS thread vs UI thread)
						</li>
					</ul>
				</div>
			</div>

			<div className="mt-6 bg-purple-50 border border-purple-200 p-4 rounded-lg">
				<h3 className="font-bold mb-2">Key Takeaways for .NET Developers:</h3>
				<ul className="list-disc pl-5">
					<li>
						React Native is to React what Xamarin is to ASP.NET - same concepts,
						different platforms
					</li>
					<li>
						Once you learn React fundamentals, the transition to React Native is
						relatively straightforward
					</li>
					<li>
						Both platforms use the same JavaScript/TypeScript language and core
						React concepts
					</li>
					<li>
						React Native lets you build truly native apps, not hybrid web apps
						like some other frameworks
					</li>
					<li>
						Code sharing between web and mobile is possible for business logic,
						but UI components differ
					</li>
					<li>
						TypeScript provides a familiar strongly-typed experience for C#
						developers
					</li>
					<li>
						There are cross-platform styling solutions (like styled-components)
						that work in both React and React Native
					</li>
					<li>
						For maximum code sharing between React and React Native, focus on
						separating UI and business logic
					</li>
				</ul>
			</div>

			<div className="mt-6 bg-red-50 border border-red-200 p-4 rounded-lg">
				<h3 className="font-bold mb-2">
					Common Pitfalls When Moving from React to React Native:
				</h3>
				<ul className="list-disc pl-5">
					<li>
						Assuming all HTML elements have direct React Native equivalents
					</li>
					<li>
						Trying to use CSS selectors, classes, or complex CSS features not
						available in React Native
					</li>
					<li>Forgetting to wrap all text in &lt;Text&gt; components</li>
					<li>Using web-specific libraries that depend on the DOM</li>
					<li>
						Not considering platform-specific UI patterns (iOS vs Android)
					</li>
					<li>
						Underestimating the complexity of mobile layout compared to web
					</li>
					<li>Not accounting for different device sizes and orientations</li>
					<li>
						Overusing Animated API without considering performance implications
					</li>
				</ul>
			</div>
		</div>
	);
};

export default ReactNativeComparison;
