import React, { createContext, useContext, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

// This example demonstrates React's Context API for state sharing between components

// In .NET terms, React's Context API is similar to:
// - Dependency Injection in .NET Core
// - Service Locator pattern
// - Shared services in Blazor
// - Global application state

// Define TypeScript interfaces for our contexts
interface ThemeContextType {
	theme: "light" | "dark";
	toggleTheme: () => void;
}

interface UserContextType {
	user: User | null;
	login: (username: string, role: string) => void;
	logout: () => void;
}

interface User {
	username: string;
	role: string;
	loginTime: Date;
}

// Create contexts with default values
// The default values are used if a component tries to use the context without a provider
const ThemeContext = createContext<ThemeContextType>({
	theme: "light",
	toggleTheme: () => console.warn("No theme provider found")
});

const UserContext = createContext<UserContextType>({
	user: null,
	login: () => console.warn("No user provider found"),
	logout: () => console.warn("No user provider found")
});

// Create a component that will provide the theme
const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
	children
}) => {
	// State to hold the current theme
	const [theme, setTheme] = useState<"light" | "dark">("light");

	// Function to toggle the theme
	const toggleTheme = (): void => {
		setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
	};

	// The value that will be provided to consumers
	const contextValue: ThemeContextType = {
		theme,
		toggleTheme
	};

	// Return the provider with the value and children
	return (
		<ThemeContext.Provider value={contextValue}>
			{children}
		</ThemeContext.Provider>
	);
};

// Create a component that will provide the user context
const UserProvider: React.FC<{ children: React.ReactNode }> = ({
	children
}) => {
	// State to hold the current user
	const [user, setUser] = useState<User | null>(null);

	// Login function
	const login = (username: string, role: string): void => {
		setUser({
			username,
			role,
			loginTime: new Date()
		});
	};

	// Logout function
	const logout = (): void => {
		setUser(null);
	};

	// The value that will be provided to consumers
	const contextValue: UserContextType = {
		user,
		login,
		logout
	};

	// Return the provider with the value and children
	return (
		<UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
	);
};

// Custom hooks to use our contexts (similar to service injection in .NET)
const useTheme = (): ThemeContextType => useContext(ThemeContext);
const useUser = (): UserContextType => useContext(UserContext);

// Example components that consume the contexts
const ThemedButton: React.FC<{
	onClick: () => void;
	children: React.ReactNode;
}> = ({ onClick, children }) => {
	// Use the theme context
	const { theme } = useTheme();

	// Apply different styles based on the theme
	const buttonClasses =
		theme === "light"
			? "bg-blue-500 hover:bg-blue-600 text-white"
			: "bg-purple-700 hover:bg-purple-800 text-gray-100";

	return (
		<button onClick={onClick} className={`px-4 py-2 rounded ${buttonClasses}`}>
			{children}
		</button>
	);
};

const UserProfile: React.FC = () => {
	// Use the user context
	const { user, logout } = useUser();

	// Use the theme context
	const { theme } = useTheme();

	// If no user is logged in, show a message
	if (!user) {
		return (
			<div
				className={`p-4 rounded border ${theme === "light" ? "border-gray-300 bg-white text-gray-800" : "border-gray-700 bg-gray-800 text-gray-200"}`}
			>
				<p>Please log in to view your profile</p>
			</div>
		);
	}

	// Otherwise, show the user profile
	return (
		<div
			className={`p-4 rounded border ${theme === "light" ? "border-gray-300 bg-white text-gray-800" : "border-gray-700 bg-gray-800 text-gray-200"}`}
		>
			<h3 className="font-bold text-lg">User Profile</h3>
			<p>
				<strong>Username:</strong> {user.username}
			</p>
			<p>
				<strong>Role:</strong> {user.role}
			</p>
			<p>
				<strong>Login Time:</strong> {user.loginTime.toLocaleTimeString()}
			</p>
			<div className="mt-4">
				<ThemedButton onClick={logout}>Log Out</ThemedButton>
			</div>
		</div>
	);
};

const LoginForm: React.FC = () => {
	// Local state for form fields
	const [username, setUsername] = useState<string>("");
	const [role, setRole] = useState<string>("user");

	// Use the user context
	const { login } = useUser();

	// Use the theme context
	const { theme } = useTheme();

	// Form submission handler
	const handleSubmit = (e: React.FormEvent): void => {
		e.preventDefault();
		if (username.trim()) {
			login(username, role);
		}
	};

	// Apply theme-based styles
	const inputClasses =
		theme === "light"
			? "border border-gray-300 p-2 rounded bg-white text-gray-800"
			: "border border-gray-700 p-2 rounded bg-gray-700 text-gray-100";

	const labelClasses =
		theme === "light" ? "block text-gray-700 mb-1" : "block text-gray-300 mb-1";

	return (
		<form
			onSubmit={handleSubmit}
			className={`p-4 rounded border ${theme === "light" ? "border-gray-300 bg-white" : "border-gray-700 bg-gray-800"}`}
		>
			<div className="mb-4">
				<label className={labelClasses} htmlFor="username">
					Username:
				</label>
				<input
					type="text"
					id="username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					className={`w-full ${inputClasses}`}
					required
				/>
			</div>

			<div className="mb-4">
				<label className={labelClasses} htmlFor="role">
					Role:
				</label>
				<select
					id="role"
					value={role}
					onChange={(e) => setRole(e.target.value)}
					className={`w-full ${inputClasses}`}
				>
					<option value="user">User</option>
					<option value="admin">Admin</option>
					<option value="editor">Editor</option>
				</select>
			</div>

			<div>
				<ThemedButton onClick={() => {}}>Log In</ThemedButton>
			</div>
		</form>
	);
};

const ThemeToggle: React.FC = () => {
	// Use the theme context
	const { theme, toggleTheme } = useTheme();

	return (
		<button
			onClick={toggleTheme}
			className={`px-4 py-2 rounded-lg ${
				theme === "light"
					? "bg-gray-200 text-gray-800 hover:bg-gray-300"
					: "bg-gray-700 text-white hover:bg-gray-600"
			}`}
		>
			Switch to {theme === "light" ? "Dark" : "Light"} Theme
		</button>
	);
};

// Main demo component that showcases context usage
const ContextExample: React.FC = () => {
	return (
		<div>
			<h2 className="text-xl font-bold mb-4">9. Context API</h2>

			<div className="mb-6 p-4 bg-blue-50 rounded-lg">
				<p className="mb-2">
					Context provides a way to share values like themes or user data
					between components without explicitly passing props through every
					level of the component tree.
				</p>
				<p>
					For .NET developers, Context is similar to Dependency Injection in
					.NET Core or service locator patterns where services are registered
					and then injected where needed.
				</p>
			</div>

			{/* Wrap everything in providers */}
			<ThemeProvider>
				<UserProvider>
					<div className="space-y-6">
						{/* Theme toggle demo */}
						<div className="border rounded-lg p-4">
							<h3 className="font-semibold text-lg mb-3">Theme Context Demo</h3>
							<ContextAwareContainer>
								<div className="flex justify-center mb-4">
									<ThemeToggle />
								</div>
								<p className="text-center text-sm">
									This button uses the ThemeContext to determine its styling and
									functionality. The theme state is stored at the top level and
									accessible to all child components.
								</p>
							</ContextAwareContainer>
						</div>

						{/* User context demo */}
						<div className="border rounded-lg p-4">
							<h3 className="font-semibold text-lg mb-3">User Context Demo</h3>
							<ContextAwareContainer>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div>
										<h4 className="font-medium mb-2">Login Form</h4>
										<LoginForm />
									</div>
									<div>
										<h4 className="font-medium mb-2">User Profile</h4>
										<UserProfile />
									</div>
								</div>
							</ContextAwareContainer>
						</div>
					</div>
				</UserProvider>
			</ThemeProvider>

			{/* Code examples */}
			<div className="mt-8 border p-4 rounded shadow-sm mb-6">
				<h3 className="font-bold mb-2">Creating and Using Context</h3>
				<div className="bg-gray-100 p-3 rounded mb-3 font-mono text-sm">
					<SyntaxHighlighter language="jsx" style={vscDarkPlus}>
						{`// 1. Define your context and its type
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

// 2. Create the context with default values
const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => console.warn('No provider')
});

// 3. Create a provider component
const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  const toggleTheme = (): void => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  // Value that will be provided to consumers
  const contextValue: ThemeContextType = {
    theme,
    toggleTheme
  };
  
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// 4. Create a custom hook for using the context
const useTheme = (): ThemeContextType => useContext(ThemeContext);

// 5. Use the context in a component
function ThemedButton() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      style={{ 
        background: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#333' : '#fff'
      }}
    >
      Toggle Theme
    </button>
  );
}`}
					</SyntaxHighlighter>
				</div>
			</div>

			<div className="mt-6 bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
				<h3 className="font-bold mb-2">.NET Comparison:</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<h4 className="font-semibold mb-1">
							.NET Core Dependency Injection:
						</h4>
						<div className="font-mono bg-gray-100 p-2 text-sm">
							<SyntaxHighlighter language="jsx" style={vscDarkPlus}>
								{`// 1. Define service interface
public interface IThemeService
{
    string CurrentTheme { get; }
    void ToggleTheme();
}

// 2. Implement the service
public class ThemeService : IThemeService
{
    public string CurrentTheme { get; private set; } = "light";
    
    public void ToggleTheme()
    {
        CurrentTheme = CurrentTheme == "light" ? "dark" : "light";
    }
}

// 3. Register with DI container in Startup.cs
public void ConfigureServices(IServiceCollection services)
{
    services.AddSingleton<IThemeService, ThemeService>();
}

// 4. Inject and use the service in a controller/component
public class HomeController : Controller
{
    private readonly IThemeService _themeService;
    
    public HomeController(IThemeService themeService)
    {
        _themeService = themeService;
    }
    
    public IActionResult Index()
    {
        ViewBag.Theme = _themeService.CurrentTheme;
        return View();
    }
}`}
							</SyntaxHighlighter>
						</div>
					</div>
					<div>
						<h4 className="font-semibold mb-1">React Context Equivalent:</h4>
						<div className="font-mono bg-gray-100 p-2 text-sm">
							<SyntaxHighlighter language="jsx" style={vscDarkPlus}>
								{`// 1. Define context type
interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

// 2. Create context and provider
const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {}
});

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Use context in app (similar to registering in Startup)
function App() {
  return (
    <ThemeProvider>
      <HomePage />
    </ThemeProvider>
  );
}

// 4. Consume the context (similar to injecting service)
function HomePage() {
  const { theme } = useContext(ThemeContext);
  
  return (
    <div className={theme === 'light' ? 'light-theme' : 'dark-theme'}>
      <h1>Home Page</h1>
    </div>
  );
}`}
							</SyntaxHighlighter>
						</div>
					</div>
				</div>
				<p className="mt-3 text-sm">
					Both approaches provide a way to share application-wide services/state
					and inject them only where needed, rather than passing them through
					every component/layer. The key difference is that .NET DI is
					configured at startup, while React Context is defined in component
					hierarchy.
				</p>
			</div>

			<div className="mt-6 bg-purple-50 border border-purple-200 p-4 rounded-lg">
				<h3 className="font-bold mb-2">Key Takeaways:</h3>
				<ul className="list-disc pl-5">
					<li>Context is React's built-in dependency injection system</li>
					<li>
						It solves the "prop drilling" problem when data needs to be passed
						deep in the component tree
					</li>
					<li>
						Context consists of a Provider (which supplies the value) and
						Consumers (which use it)
					</li>
					<li>
						The useContext hook makes consuming context values easy and concise
					</li>
					<li>
						Context is ideal for global app state like themes, user
						authentication, and app-wide settings
					</li>
					<li>
						Custom hooks can wrap useContext to provide better encapsulation and
						type safety
					</li>
					<li>
						Context is not optimized for high-frequency updates; consider Redux
						for complex state management
					</li>
					<li>
						TypeScript integration makes Context similar to strongly-typed DI in
						.NET
					</li>
				</ul>
			</div>

			<div className="mt-6 bg-red-50 border border-red-200 p-4 rounded-lg">
				<h3 className="font-bold mb-2">Common Pitfalls:</h3>
				<ul className="list-disc pl-5">
					<li>
						Re-rendering all consumers when context changes, even if they only
						use part of the context
					</li>
					<li>
						Creating too many contexts instead of structuring them properly
					</li>
					<li>Using context for state that should be local to a component</li>
					<li>Forgetting to provide default values that make sense</li>
					<li>Nesting too many providers, creating a "provider hell"</li>
					<li>
						Not properly typing context with TypeScript, losing type safety
					</li>
				</ul>
			</div>
		</div>
	);
};

// A context-aware container that changes based on the theme
const ContextAwareContainer: React.FC<{ children: React.ReactNode }> = ({
	children
}) => {
	const { theme } = useTheme();

	return (
		<div
			className={`p-4 rounded-lg ${
				theme === "light"
					? "bg-white border border-gray-200 text-gray-800"
					: "bg-gray-800 border border-gray-700 text-gray-200"
			}`}
		>
			{children}
		</div>
	);
};

export default ContextExample;
