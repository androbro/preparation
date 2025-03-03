import React, { useState } from "react";

// This example demonstrates how React renders lists of data

// In .NET terms, React list rendering is similar to:
// - foreach loops in Razor views
// - ItemsControl or ListBox in WPF
// - Repeater/ListView/GridView in ASP.NET WebForms
// - DataGridView in WinForms

// Define TypeScript interfaces for our data
interface User {
	id: number;
	name: string;
	email: string;
	role: string;
	active: boolean;
}

const ListRenderingExample: React.FC = () => {
	// Sample data - in a real app, this might come from an API
	const [users, setUsers] = useState<User[]>([
		{
			id: 1,
			name: "Alice Johnson",
			email: "alice@example.com",
			role: "Developer",
			active: true
		},
		{
			id: 2,
			name: "Bob Smith",
			email: "bob@example.com",
			role: "Designer",
			active: true
		},
		{
			id: 3,
			name: "Carol Williams",
			email: "carol@example.com",
			role: "Manager",
			active: false
		},
		{
			id: 4,
			name: "Dave Brown",
			email: "dave@example.com",
			role: "Developer",
			active: true
		},
		{
			id: 5,
			name: "Eve Davis",
			email: "eve@example.com",
			role: "Tester",
			active: false
		}
	]);

	// State for filter options
	const [showInactive, setShowInactive] = useState<boolean>(true);
	const [roleFilter, setRoleFilter] = useState<string>("");

	// Handle toggling user active status
	const toggleUserStatus = (userId: number): void => {
		setUsers(
			users.map((user) =>
				user.id === userId ? { ...user, active: !user.active } : user
			)
		);
	};

	// Handle deleting a user
	const deleteUser = (userId: number): void => {
		setUsers(users.filter((user) => user.id !== userId));
	};

	// Apply filters to the user list
	const filteredUsers = users.filter(
		(user) =>
			(showInactive || user.active) &&
			(roleFilter === "" || user.role === roleFilter)
	);

	// Get unique roles for the filter dropdown
	const uniqueRoles = Array.from(new Set(users.map((user) => user.role)));

	return (
		<div>
			<h2 className="text-xl font-bold mb-4">7. List Rendering</h2>

			<div className="mb-6 p-4 bg-blue-50 rounded-lg">
				<p className="mb-2">
					React uses JavaScript's map function to render lists of data. Each
					item in a list should have a unique "key" prop to help React identify
					which items have changed.
				</p>
				<p>
					This is similar to how .NET frameworks like ASP.NET MVC use foreach
					loops in Razor views or how WPF binds collections to ItemsControls.
				</p>
			</div>

			{/* Filter controls */}
			<div className="mb-4 p-4 border rounded-lg bg-gray-50">
				<h3 className="font-bold mb-2">Filter Options</h3>
				<div className="flex flex-wrap gap-4">
					<div className="flex items-center">
						<input
							type="checkbox"
							id="showInactive"
							checked={showInactive}
							onChange={(e) => setShowInactive(e.target.checked)}
							className="mr-2"
						/>
						<label htmlFor="showInactive">Show Inactive Users</label>
					</div>

					<div className="flex items-center">
						<label htmlFor="roleFilter" className="mr-2">
							Role:
						</label>
						<select
							id="roleFilter"
							value={roleFilter}
							onChange={(e) => setRoleFilter(e.target.value)}
							className="p-1 border rounded"
						>
							<option value="">All Roles</option>
							{uniqueRoles.map((role) => (
								<option key={role} value={role}>
									{role}
								</option>
							))}
						</select>
					</div>
				</div>
			</div>

			{/* User list table */}
			<div className="border rounded-lg overflow-hidden mb-6">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-100">
						<tr>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Name
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Email
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Role
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Status
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Actions
							</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{filteredUsers.length > 0 ? (
							// Map over the filtered users array to create table rows
							filteredUsers.map((user) => (
								// Each list item needs a unique key prop
								<tr key={user.id}>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="font-medium text-gray-900">{user.name}</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="text-gray-500">{user.email}</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="text-gray-500">{user.role}</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<span
											className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${
												user.active
													? "bg-green-100 text-green-800"
													: "bg-red-100 text-red-800"
											}`}
										>
											{user.active ? "Active" : "Inactive"}
										</span>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
										<button
											onClick={() => toggleUserStatus(user.id)}
											className="text-indigo-600 hover:text-indigo-900 mr-4"
										>
											{user.active ? "Deactivate" : "Activate"}
										</button>
										<button
											onClick={() => deleteUser(user.id)}
											className="text-red-600 hover:text-red-900"
										>
											Delete
										</button>
									</td>
								</tr>
							))
						) : (
							// No results case - note this is a single item, not a list
							<tr>
								<td
									className="px-6 py-4 whitespace-nowrap text-center text-gray-500"
									colSpan={5}
								>
									No users found matching the current filters.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			{/* Code example */}
			<div className="border p-4 rounded shadow-sm mb-6">
				<h3 className="font-bold mb-2">Basic List Rendering Example</h3>
				<div className="bg-gray-100 p-3 rounded mb-3 font-mono text-sm overflow-auto">
					{`// TypeScript interface
interface User {
  id: number;
  name: string;
  email: string;
}

// Component with typed props and state
const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
    { id: 3, name: 'Carol', email: 'carol@example.com' }
  ]);

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          <strong>{user.name}</strong>: {user.email}
        </li>
      ))}
    </ul>
  );
}`}
				</div>
				<p className="text-sm text-gray-600">
					The key prop is crucial - it helps React identify which items have
					changed, been added, or been removed.
				</p>
			</div>

			{/* Complex example */}
			<div className="border p-4 rounded shadow-sm mb-6">
				<h3 className="font-bold mb-2">
					Handling Empty Lists and Conditional Rendering
				</h3>
				<div className="bg-gray-100 p-3 rounded mb-3 font-mono text-sm overflow-auto">
					{`// Component with conditional rendering
const ConditionalList: React.FC<{ items: string[] }> = ({ items }) => {
  return (
    <div>
      {items.length > 0 ? (
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <p>No items to display</p>
      )}
    </div>
  );
};`}
				</div>
				<p className="text-sm text-gray-600">
					Always handle the empty case in your list rendering. This is similar
					to checking if a collection is empty before looping in C#.
				</p>
			</div>

			<div className="mt-6 bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
				<h3 className="font-bold mb-2">.NET Comparison:</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<h4 className="font-semibold mb-1">ASP.NET MVC Razor View:</h4>
						<div className="font-mono bg-gray-100 p-2 text-sm">
							{`@model List<UserViewModel>

<table class="table">
    <thead>
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        @if (Model.Any())
        {
            @foreach (var user in Model)
            {
                <tr>
                    <td>@user.Name</td>
                    <td>@user.Email</td>
                    <td>
                        <a href="/User/Edit/@user.Id">Edit</a>
                        <a href="/User/Delete/@user.Id">Delete</a>
                    </td>
                </tr>
            }
        }
        else
        {
            <tr>
                <td colspan="3">No users found.</td>
            </tr>
        }
    </tbody>
</table>`}
						</div>
					</div>
					<div>
						<h4 className="font-semibold mb-1">React Equivalent:</h4>
						<div className="font-mono bg-gray-100 p-2 text-sm">
							{`interface User {
  id: number;
  name: string;
  email: string;
}

function UserTable({ users }: { users: User[] }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.length > 0 ? (
          users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <a href={\`/user/edit/\${user.id}\`}>Edit</a>
                <a href={\`/user/delete/\${user.id}\`}>Delete</a>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={3}>No users found.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}`}
						</div>
					</div>
				</div>
				<p className="mt-3 text-sm">
					In both cases, we iterate over a collection to render UI elements and
					handle the empty case, but React uses JavaScript's functional map
					method instead of imperative foreach loops.
				</p>
			</div>

			<div className="mt-6 bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
				<h3 className="font-bold mb-2">WPF XAML Comparison:</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<h4 className="font-semibold mb-1">WPF XAML:</h4>
						<div className="font-mono bg-gray-100 p-2 text-sm">
							{`<ListBox ItemsSource="{Binding Users}">
  <ListBox.ItemTemplate>
    <DataTemplate>
      <StackPanel Orientation="Horizontal">
        <TextBlock Text="{Binding Name}" FontWeight="Bold" />
        <TextBlock Text=": " />
        <TextBlock Text="{Binding Email}" />
        <Button Content="Edit" 
                Command="{Binding DataContext.EditCommand, 
                          RelativeSource={RelativeSource 
                          AncestorType=ListBox}}" 
                CommandParameter="{Binding Id}" />
      </StackPanel>
    </DataTemplate>
  </ListBox.ItemTemplate>
</ListBox>`}
						</div>
					</div>
					<div>
						<h4 className="font-semibold mb-1">React Equivalent:</h4>
						<div className="font-mono bg-gray-100 p-2 text-sm">
							{`function UserList() {
  const [users, setUsers] = useState<User[]>([...]);
  
  const handleEdit = (userId: number) => {
    // Handle edit logic
  };
  
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          <span style={{ fontWeight: 'bold' }}>{user.name}</span>: 
          {user.email}
          <button onClick={() => handleEdit(user.id)}>
            Edit
          </button>
        </li>
      ))}
    </ul>
  );
}`}
						</div>
					</div>
				</div>
				<p className="mt-3 text-sm">
					WPF uses declarative data templates and binding, while React uses
					JavaScript functions to transform data into UI elements. Both
					approaches are declarative, but React uses code rather than markup for
					templating.
				</p>
			</div>

			<div className="mt-6 bg-purple-50 border border-purple-200 p-4 rounded-lg">
				<h3 className="font-bold mb-2">Key Takeaways:</h3>
				<ul className="list-disc pl-5">
					<li>
						Use the <code className="text-sm bg-gray-200 px-1">map()</code>{" "}
						function to transform arrays of data into arrays of React elements
					</li>
					<li>
						Always provide a unique{" "}
						<code className="text-sm bg-gray-200 px-1">key</code> prop when
						rendering lists (ideally a stable ID, not array index)
					</li>
					<li>Handle empty lists with conditional rendering</li>
					<li>
						Use TypeScript interfaces to strongly type your collections (similar
						to C# List&lt;T&gt;)
					</li>
					<li>
						React's approach is more functional compared to .NET's more
						imperative foreach loops
					</li>
					<li>
						React updates only the DOM elements that actually changed, making
						list updates very efficient
					</li>
					<li>
						Filtering and sorting can be done directly with JavaScript array
						methods like filter(), sort(), etc.
					</li>
				</ul>
			</div>

			<div className="mt-6 bg-red-50 border border-red-200 p-4 rounded-lg">
				<h3 className="font-bold mb-2">Common Pitfalls:</h3>
				<ul className="list-disc pl-5">
					<li>
						Using array index as key when the list can change (causes rendering
						issues and bugs)
					</li>
					<li>Forgetting to handle empty lists or loading states</li>
					<li>
						Mutating arrays directly instead of using immutable updates with
						map(), filter(), etc.
					</li>
					<li>
						Complex nested mappings that become hard to read (consider
						extracting component functions)
					</li>
					<li>Not properly typing array operations when using TypeScript</li>
				</ul>
			</div>
		</div>
	);
};

export default ListRenderingExample;
