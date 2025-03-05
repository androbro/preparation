import React, { useState, ChangeEvent, FormEvent } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

// This example demonstrates React's approach to form handling with TypeScript

// In .NET terms, React forms are similar to:
// - Form controls and validation in WinForms
// - Data binding in WPF
// - Model binding and validation in ASP.NET MVC

// Define TypeScript interfaces for our form data
interface FormData {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	role: "developer" | "designer" | "manager" | "tester";
	notifications: boolean;
	comments: string;
}

// Interface for our validation errors
interface FormErrors {
	firstName?: string;
	lastName?: string;
	email?: string;
	password?: string;
}

const FormHandlingExample: React.FC = () => {
	// Basic form state with multiple fields
	const [formData, setFormData] = useState<FormData>({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		role: "developer",
		notifications: true,
		comments: ""
	});

	// Validation state
	const [errors, setErrors] = useState<FormErrors>({});

	// Submission state
	const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

	// Generic change handler for all form inputs
	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
	): void => {
		const { name, value, type } = e.target;

		// Handle different input types appropriately
		// We need to cast here because TypeScript doesn't know about the 'checked' property on all HTML elements
		const inputValue =
			type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

		// Update the form data using object spread to preserve other fields
		setFormData({
			...formData,
			[name]: inputValue
		});

		// Clear any error for this field when it changes
		if (errors[name as keyof FormErrors]) {
			setErrors({
				...errors,
				[name]: undefined
			});
		}
	};

	// Validate form before submission
	const validateForm = (): boolean => {
		const newErrors: FormErrors = {};

		// First name validation
		if (!formData.firstName.trim()) {
			newErrors.firstName = "First name is required";
		}

		// Last name validation
		if (!formData.lastName.trim()) {
			newErrors.lastName = "Last name is required";
		}

		// Email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!formData.email.trim() || !emailRegex.test(formData.email)) {
			newErrors.email = "Valid email is required";
		}

		// Password validation
		if (formData.password.length < 6) {
			newErrors.password = "Password must be at least 6 characters";
		}

		// Set the errors and return whether the form is valid
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	// Form submission handler
	const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault();

		// Validate form
		const isValid = validateForm();

		if (isValid) {
			// In a real app, you'd typically:
			// 1. Send data to an API (fetch/axios)
			// 2. Handle the response
			// 3. Navigate to another page or show success

			console.log("Form submitted successfully:", formData);
			setIsSubmitted(true);
		} else {
			console.log("Form has errors");
		}
	};

	// Reset the form
	const handleReset = (): void => {
		setFormData({
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			role: "developer",
			notifications: true,
			comments: ""
		});
		setErrors({});
		setIsSubmitted(false);
	};

	return (
		<div>
			<h2 className="text-xl font-bold mb-4">
				8. Form Handling with TypeScript
			</h2>

			<div className="mb-6 p-4 bg-blue-50 rounded-lg">
				<p className="mb-2">
					React uses a pattern called "controlled components" for form handling,
					where form elements like inputs and selects are controlled by React
					state.
				</p>
				<p>
					With TypeScript, we can add strong typing to our forms - similar to
					how you would define models in ASP.NET MVC, ensuring type safety
					throughout our application.
				</p>
			</div>

			{isSubmitted ? (
				<div className="border border-green-200 bg-green-50 p-4 rounded-lg mb-6">
					<h3 className="font-bold text-green-800 mb-2">
						Form Submitted Successfully!
					</h3>
					<div className="bg-white p-4 rounded border">
						<h4 className="font-semibold mb-2">Submitted Data:</h4>
						<pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
							{JSON.stringify(formData, null, 2)}
						</pre>
					</div>
					<button
						onClick={handleReset}
						className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
					>
						Reset Form
					</button>
				</div>
			) : (
				<form onSubmit={handleSubmit} className="border rounded-lg p-6 mb-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
						{/* First Name */}
						<div>
							<label
								className="block text-sm font-medium mb-1"
								htmlFor="firstName"
							>
								First Name <span className="text-red-500">*</span>
							</label>
							<input
								type="text"
								id="firstName"
								name="firstName"
								value={formData.firstName}
								onChange={handleChange}
								className={`w-full p-2 border rounded ${
									errors.firstName ? "border-red-500" : "border-gray-300"
								}`}
							/>
							{errors.firstName && (
								<p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
							)}
						</div>

						{/* Last Name */}
						<div>
							<label
								className="block text-sm font-medium mb-1"
								htmlFor="lastName"
							>
								Last Name <span className="text-red-500">*</span>
							</label>
							<input
								type="text"
								id="lastName"
								name="lastName"
								value={formData.lastName}
								onChange={handleChange}
								className={`w-full p-2 border rounded ${
									errors.lastName ? "border-red-500" : "border-gray-300"
								}`}
							/>
							{errors.lastName && (
								<p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
							)}
						</div>
					</div>

					{/* Email */}
					<div className="mb-4">
						<label className="block text-sm font-medium mb-1" htmlFor="email">
							Email <span className="text-red-500">*</span>
						</label>
						<input
							type="email"
							id="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							className={`w-full p-2 border rounded ${
								errors.email ? "border-red-500" : "border-gray-300"
							}`}
						/>
						{errors.email && (
							<p className="mt-1 text-sm text-red-500">{errors.email}</p>
						)}
					</div>

					{/* Password */}
					<div className="mb-4">
						<label
							className="block text-sm font-medium mb-1"
							htmlFor="password"
						>
							Password <span className="text-red-500">*</span>
						</label>
						<input
							type="password"
							id="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							className={`w-full p-2 border rounded ${
								errors.password ? "border-red-500" : "border-gray-300"
							}`}
						/>
						{errors.password && (
							<p className="mt-1 text-sm text-red-500">{errors.password}</p>
						)}
					</div>

					{/* Role - Select Dropdown */}
					<div className="mb-4">
						<label className="block text-sm font-medium mb-1" htmlFor="role">
							Role
						</label>
						<select
							id="role"
							name="role"
							value={formData.role}
							onChange={handleChange}
							className="w-full p-2 border border-gray-300 rounded"
						>
							<option value="developer">Developer</option>
							<option value="designer">Designer</option>
							<option value="manager">Manager</option>
							<option value="tester">Tester</option>
						</select>
					</div>

					{/* Notifications - Checkbox */}
					<div className="mb-4">
						<div className="flex items-center">
							<input
								type="checkbox"
								id="notifications"
								name="notifications"
								checked={formData.notifications}
								onChange={handleChange}
								className="h-4 w-4 text-blue-600 border-gray-300 rounded"
							/>
							<label
								className="ml-2 block text-sm text-gray-900"
								htmlFor="notifications"
							>
								Receive email notifications
							</label>
						</div>
					</div>

					{/* Comments - Textarea */}
					<div className="mb-6">
						<label
							className="block text-sm font-medium mb-1"
							htmlFor="comments"
						>
							Comments
						</label>
						<textarea
							id="comments"
							name="comments"
							value={formData.comments}
							onChange={handleChange}
							rows={3}
							className="w-full p-2 border border-gray-300 rounded"
						></textarea>
					</div>

					{/* Form Actions */}
					<div className="flex justify-end space-x-4">
						<button
							type="button"
							onClick={handleReset}
							className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
						>
							Reset
						</button>
						<button
							type="submit"
							className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
						>
							Submit
						</button>
					</div>
				</form>
			)}

			<div className="border p-4 rounded shadow-sm mb-6">
				<h3 className="font-bold mb-2">TypeScript Form Pattern</h3>
				<div className="bg-gray-100 p-3 rounded mb-3 font-mono text-sm overflow-auto">
					<SyntaxHighlighter language="jsx" style={vscDarkPlus}>
						{`// Define interfaces for form data and errors
interface UserFormData {
  username: string;
  email: string;
}

interface UserFormErrors {
  username?: string;
  email?: string;
}

function TypedForm() {
  // State with type annotations
  const [formData, setFormData] = useState<UserFormData>({
    username: '',
    email: ''
  });
  
  const [errors, setErrors] = useState<UserFormErrors>({});
  
  // Properly typed event handler
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Typed form submission handler
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        value={formData.username}
        onChange={handleChange}
      />
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}`}
					</SyntaxHighlighter>
				</div>
				<p className="text-sm text-gray-600">
					Using TypeScript interfaces for form data creates a strongly-typed
					experience similar to C# models.
				</p>
			</div>

			<div className="mt-6 bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
				<h3 className="font-bold mb-2">.NET Comparison:</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<h4 className="font-semibold mb-1">C# Model and Validation:</h4>
						<div className="font-mono bg-gray-100 p-2 text-sm">
							<SyntaxHighlighter language="csharp" style={vscDarkPlus}>
								{`// C# Model class with validation
public class UserRegistrationModel
{
    [Required(ErrorMessage = "First name is required")]
    public string FirstName { get; set; }
    
    [Required(ErrorMessage = "Last name is required")]
    public string LastName { get; set; }
    
    [Required(ErrorMessage = "Email is required")]
    [EmailAddress(ErrorMessage = "Invalid email format")]
    public string Email { get; set; }
    
    [Required(ErrorMessage = "Password is required")]
    [MinLength(6, ErrorMessage = "Password must be at least 6 characters")]
    public string Password { get; set; }
    
    public string Role { get; set; } = "developer";
    
    public bool ReceiveNotifications { get; set; } = true;
    
    public string Comments { get; set; }
}`}
							</SyntaxHighlighter>
						</div>
					</div>
					<div>
						<h4 className="font-semibold mb-1">TypeScript Equivalent:</h4>
						<div className="font-mono bg-gray-100 p-2 text-sm">
							<SyntaxHighlighter language="jsx" style={vscDarkPlus}>
								{`// TypeScript interfaces
interface UserRegistrationData {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	role: 'developer' | 'designer' | 'manager' | 'tester';
	notifications: boolean;
	comments: string;
}

// Validation function (equivalent to Data Annotations)
function validateUser(user: UserRegistrationData): Record<string, string | undefined> {
	const errors: Record<string, string | undefined> = {};
	
	if (!user.firstName)
		errors.firstName = "First name is required";
		
	if (!user.lastName)
		errors.lastName = "Last name is required";
		
	if (!user.email || !/^[^s@]+@[^s@]+.[^s@]+$/.test(user.email))
		errors.email = "Invalid email format";
		
	if (!user.password || user.password.length < 6)
		errors.password = "Password must be at least 6 characters";
		
	return errors;
}`}
							</SyntaxHighlighter>
						</div>
					</div>
				</div>
				<p className="mt-3 text-sm">
					TypeScript interfaces provide a similar type-safety experience to C#
					classes, but validation is handled programmatically rather than with
					attributes/decorators.
				</p>
			</div>

			<div className="mt-6 bg-purple-50 border border-purple-200 p-4 rounded-lg">
				<h3 className="font-bold mb-2">Key Takeaways for .NET Developers:</h3>
				<ul className="list-disc pl-5">
					<li>
						Use TypeScript interfaces to create models similar to C# classes
					</li>
					<li>
						React forms require manual validation instead of attribute-based
						validation
					</li>
					<li>
						Type every event handler with proper React event types (ChangeEvent,
						FormEvent, etc.)
					</li>
					<li>
						Use type guards and type assertions when necessary for complex form
						elements
					</li>
					<li>
						Define union types for fields with specific allowed values (like
						enums in C#)
					</li>
					<li>
						React's controlled components pattern gives you complete control
						over form behavior
					</li>
					<li>
						Libraries like Formik, React Hook Form, or Zod can simplify complex
						form validation
					</li>
				</ul>
			</div>

			<div className="mt-6 bg-red-50 border border-red-200 p-4 rounded-lg">
				<h3 className="font-bold mb-2">TypeScript-Specific Challenges:</h3>
				<ul className="list-disc pl-5">
					<li>
						Handling generic event types for different form elements (inputs,
						selects, textareas)
					</li>
					<li>
						Type safety for dynamic form fields (when field names are determined
						at runtime)
					</li>
					<li>
						Properly typing error objects that may have undefined properties
					</li>
					<li>
						Using type assertions safely when TypeScript cannot infer the
						correct types
					</li>
					<li>Understanding React's generic types for events and components</li>
				</ul>
			</div>
		</div>
	);
};

export default FormHandlingExample;
