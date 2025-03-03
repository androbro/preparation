import { useState } from "react";
import BasicComponent from "./examples/BasicComponent";
import PropsExample from "./examples/PropsExample";
import StateExample from "./examples/StateExample";
import EventHandlingExample from "./examples/EventHandlingExample";
import EffectsExample from "./examples/EffectsExample";
import ConditionalRenderingExample from "./examples/ConditionalRenderingExample";
import ListRenderingExample from "./examples/ListRenderingExample";
import FormHandlingExample from "./examples/FormHandlingExample";
import ContextExample from "./examples/ContextExample";
import ReactNativeComparison from "./examples/ReactNativeComparison";

const TutorialContainer = () => {
	const examples = [
		{ id: 1, name: "1. Basic Components", component: BasicComponent },
		{ id: 2, name: "2. Props", component: PropsExample },
		{ id: 3, name: "3. State", component: StateExample },
		{ id: 4, name: "4. Event Handling", component: EventHandlingExample },
		{ id: 5, name: "5. Effects (Lifecycle)", component: EffectsExample },
		{
			id: 6,
			name: "6. Conditional Rendering",
			component: ConditionalRenderingExample
		},
		{ id: 7, name: "7. List Rendering", component: ListRenderingExample },
		{ id: 8, name: "8. Form Handling", component: FormHandlingExample },
		{ id: 9, name: "9. Context API", component: ContextExample },
		{
			id: 10,
			name: "10. React Native Comparison",
			component: ReactNativeComparison
		}
	];

	const [currentExampleIndex, setCurrentExampleIndex] = useState(0);

	const goToNext = () => {
		if (currentExampleIndex < examples.length - 1) {
			setCurrentExampleIndex(currentExampleIndex + 1);
		}
	};

	const goToPrevious = () => {
		if (currentExampleIndex > 0) {
			setCurrentExampleIndex(currentExampleIndex - 1);
		}
	};

	const CurrentExample = examples[currentExampleIndex].component;

	return (
		<div className="max-w-7xl mx-auto p-6">
			<h1 className="text-3xl font-bold text-center mb-2">
				React for .NET Developers
			</h1>
			<p className="text-center text-gray-600 mb-6">
				Interactive Tutorial with Examples
			</p>

			<div className="flex justify-between items-center mb-4">
				<button
					onClick={goToPrevious}
					disabled={currentExampleIndex === 0}
					className={`px-4 py-2 rounded ${
						currentExampleIndex === 0
							? "bg-gray-300 cursor-not-allowed"
							: "bg-blue-500 hover:bg-blue-600 text-white"
					}`}
				>
					← Previous
				</button>

				<span className="text-lg font-medium">
					{examples[currentExampleIndex].name} ({currentExampleIndex + 1}/
					{examples.length})
				</span>

				<button
					onClick={goToNext}
					disabled={currentExampleIndex === examples.length - 1}
					className={`px-4 py-2 rounded ${
						currentExampleIndex === examples.length - 1
							? "bg-gray-300 cursor-not-allowed"
							: "bg-blue-500 hover:bg-blue-600 text-white"
					}`}
				>
					Next →
				</button>
			</div>

			<div className="border p-6 rounded-lg shadow-md bg-white">
				<CurrentExample />
			</div>

			<div className="mt-8 grid grid-cols-5 gap-2">
				{examples.map((example, index) => (
					<button
						key={example.id}
						onClick={() => setCurrentExampleIndex(index)}
						className={`p-2 text-sm rounded ${
							currentExampleIndex === index
								? "bg-blue-500 text-white"
								: "bg-gray-200 hover:bg-gray-300"
						}`}
					>
						{example.id}
					</button>
				))}
			</div>
		</div>
	);
};

export default TutorialContainer;
