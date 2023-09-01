export class Terminal {
	private readonly inputElem;
	private readonly linesElem;

	constructor() {
		this.linesElem = document.querySelector('.lines') as HTMLUListElement;
		this.inputElem = document.querySelector('#input') as HTMLTextAreaElement;

		this.inputElem.addEventListener('input', () => {
			this.inputElem.style.removeProperty('height');
			this.inputElem.style.height = `${this.inputElem.scrollHeight}px`;
		});

		this.inputElem.addEventListener('keydown', (e: KeyboardEvent) => {
			if (e.key !== 'Enter') {
				return;
			}

			e.preventDefault();

			this.print(this.inputElem.value);
			shell.sendCommand(this.inputElem.value);

			this.inputElem.value = '';
		});
	}

	focus() {
		this.inputElem.focus();
	}

	print(text: string) {
		const line = document.createElement('li');
		line.className = 'line';

		const domain = this.inputElem.previousElementSibling!.cloneNode(true);
		const command = document.createElement('span');
		command.textContent = text;

		line.append(domain, command);

		this.linesElem.insertBefore(line, this.linesElem.lastElementChild);
	}

	clear() {
		while (this.linesElem.childElementCount > 1) {
			this.linesElem.firstElementChild?.remove();
		}
	}
}
