import Form from './components/Form';

export default function Dashboard() {
	return (
		<main className="flex flex-wrap align-top items-start flex-1 p-5 rounded-[12px] bg-white/30 shadow-[0_0_25px_0_rgba(0,0,0,0.1)] backdrop-blur-[2px]">
			<Form/>
		</main>
	);
}