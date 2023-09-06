export default function () {
	const currentDir = fileSystem.currentDirectory;
	const text = currentDir.contents.map((i) => `${i.type[0]}\t${i.name}`);
	terminal.print(
		`total ${currentDir.contents.length}\n-${text.join('\n-')}`,
		true
	);
}
