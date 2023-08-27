const terminalLines = document.querySelector('.lines') as HTMLUListElement;
const terminal = document.querySelector('#input') as HTMLTextAreaElement;

terminal.addEventListener('input', () => {
	terminal.style.removeProperty('height');
	terminal.style.height = `${terminal.scrollHeight}px`;
});

terminal.addEventListener('keydown', (e: KeyboardEvent) => {
	if (e.key !== 'Enter') {
		return;
	}

	e.preventDefault();

	createLine(terminal.value);
	sendCommand(terminal.value);

	terminal.value = '';
});

function sendCommand(value: string) {
	const args = value.split(/ +/g);
	const command = args.shift();

	console.log('issued', command, 'args', args);
}

function createLine(text: string) {
	const line = document.createElement('li');
	line.className = 'line';

	const domain = terminal.previousElementSibling!.cloneNode(true);
	const command = document.createElement('span');
	command.textContent = text;

	line.append(domain, command);

	terminalLines.insertBefore(line, terminalLines.lastElementChild);
}
