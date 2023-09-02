const files = import.meta.glob('./*.ts');

export default function () {
	const commands = Object.getOwnPropertyNames(files).map((file) => {
		return file.match(/\w+/);
	});

	const pre = '\n- ';
	const text = `Commands:${pre}${commands.join(pre)}`;

	terminal.print(text, true);
}
