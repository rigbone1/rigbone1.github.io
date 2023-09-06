export default function (...args: string[]) {
	if (!args[0]) {
		return terminal.print('Error: must specify a name');
	}

	fileSystem.makeDirectory(args[0]);
}
