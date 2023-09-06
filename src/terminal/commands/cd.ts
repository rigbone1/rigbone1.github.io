export default function (...args: string[]) {
	if (!args[0]) {
		return terminal.print('Error: must specify a directory');
	}

	try {
		fileSystem.changeDirectory(args[0]);
	} catch (err) {
		terminal.print(`${err}`);
	}
}
