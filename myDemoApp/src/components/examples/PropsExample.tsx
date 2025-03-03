// This demonstrates the Props system in React - how components receive and use data

// In .NET terms, props are similar to:
// - Method parameters in C#
// - Properties on controls in WPF/WinForms
// - Model data passed to a View in ASP.NET MVC

const PropsExample = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">2. Props (Properties)</h2>

      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <p className="mb-2">
          Props are how React components receive data from their parent. They
          are read-only and cannot be modified by the component that receives
          them.
        </p>
        <p>
          You can think of props like parameters passed to a C# method, or
          properties on a .NET control that are set by the parent.
        </p>
      </div>

      <div className="border p-4 rounded shadow-sm mb-6">
        <h3 className="font-bold mb-2">Basic Props Example</h3>
        <div className="bg-gray-100 p-3 rounded mb-3 font-mono text-sm overflow-auto">
          {`// Define a component that accepts props
						function Greeting(props) {
							return <h1>Hello, {props.name}!</h1>;
						}

						// Use the component with different props
						<Greeting name="Sarah" />
						<Greeting name="John" />`}
        </div>
        <p className="text-sm text-gray-600">
          Similar to passing parameters to methods in C#
        </p>
      </div>

      <div className="border p-4 rounded shadow-sm mb-6">
        <h3 className="font-bold mb-2">TypeScript with Props</h3>
        <div className="bg-gray-100 p-3 rounded mb-3 font-mono text-sm overflow-auto">
          {`// Define a type for props (similar to C# class with properties)
						interface UserProps {
							name: string;
							role: string;
							isAdmin?: boolean; // Optional property with '?'
						}

						// Use the interface to create a type-safe component
						function UserProfile({ name, role, isAdmin = false }: UserProps) {
							return (
								<div>
									<h2>{name}</h2>
									<p>Role: {role}</p>
									{isAdmin && <p>Admin privileges enabled</p>}
								</div>
							);
						}`}
        </div>
        <p className="text-sm text-gray-600">
          Using TypeScript for type-safe props is similar to strongly-typed
          models in ASP.NET MVC
        </p>
      </div>

      <div className="mt-6 border border-green-200 bg-green-50 p-4 rounded-lg">
        <h3 className="font-bold mb-2">Live Example:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded border">
            <h2 className="text-xl font-semibold">Alice Johnson</h2>
            <p>Role: Developer</p>
          </div>
          <div className="p-4 bg-white rounded border">
            <h2 className="text-xl font-semibold">Bob Smith</h2>
            <p>Role: Manager</p>
            <p className="text-green-600 font-semibold">
              Admin privileges enabled
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
        <h3 className="font-bold mb-2">.NET Comparison:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold mb-1">ASP.NET MVC:</h4>
            <div className="font-mono bg-gray-100 p-2 text-sm">
              {`// Controller
public ActionResult UserProfile(string name, string role)
{
    ViewBag.Name = name;
    ViewBag.Role = role;
    return View();
}

<!-- View -->
<h2>@ViewBag.Name</h2>
<p>Role: @ViewBag.Role</p>`}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-1">React Equivalent:</h4>
            <div className="font-mono bg-gray-100 p-2 text-sm">
              {`function UserProfile(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>Role: {props.role}</p>
    </div>
  );
}

<UserProfile 
  name="Alice" 
  role="Developer" 
/>`}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-purple-50 border border-purple-200 p-4 rounded-lg">
        <h3 className="font-bold mb-2">Key Takeaways:</h3>
        <ul className="list-disc pl-5">
          <li>Props are the React way to pass data to components</li>
          <li>
            Props are immutable (read-only) - components cannot modify their
            props
          </li>
          <li>
            Use TypeScript interfaces for type safety (similar to C# static
            typing)
          </li>
          <li>
            You can destructure props in the function parameters for cleaner
            code
          </li>
          <li>
            Props can include any JavaScript value: strings, numbers, arrays,
            objects, functions
          </li>
          <li>
            Props flow downward from parent to child components (one-way data
            flow)
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PropsExample;
