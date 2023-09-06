export default function (...args: string[]) {
	if (!args[0]) {
		return terminal.print('Error: you must specify a new name');
	}

	env.hostname = args[0];
}
