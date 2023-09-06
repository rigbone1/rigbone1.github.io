export class Terminal {
	private readonly inputElem;
	private readonly linesElem;
	private currentInputBuffer = '';

	constructor() {
		this.linesElem = document.querySelector('.lines') as HTMLUListElement;
		this.inputElem = document.querySelector('#input') as HTMLTextAreaElement;

		this.inputElem.addEventListener('input', () => {
			this.inputElem.style.removeProperty('height');
			this.inputElem.style.height = `${this.inputElem.scrollHeight}px`;
		});

		this.inputElem.addEventListener('keydown', (e: KeyboardEvent) => {
			if (e.key === 'Enter') {
				e.preventDefault();

				this.print(this.inputElem.value);
				shell.sendCommand(this.inputElem.value);

				this.inputElem.value = '';
				this.render();
			} else if (e.key.startsWith('Arrow')) {
				let line;

				if (e.key === 'ArrowUp') {
					if (shell.isHistoryAtEnd) {
						this.currentInputBuffer = this.inputElem.value;
					}

					line = shell.scrollHistory(-1);
				} else if (e.key === 'ArrowDown') {
					line = shell.scrollHistory(1);
				} else {
					return;
				}

				if (!line) {
					line = this.currentInputBuffer;
				}

				this.inputElem.value = line;
				this.inputElem.selectionEnd = line.length;
			}
		});

		this.render();
	}

	focus() {
		this.inputElem.focus();
	}

	print(text: string, parse = false) {
		const line = document.createElement('li');
		line.className = 'line';

		const domain = this.inputElem.previousElementSibling!.cloneNode(true);
		const command = document.createElement('span');

		if (parse) {
			const parsedNodes = this.parseText(text);
			command.append(...parsedNodes);
		} else {
			command.textContent = text;
		}

		line.append(domain, command);

		this.linesElem.insertBefore(line, this.linesElem.lastElementChild);
	}

	clear() {
		while (this.linesElem.childElementCount > 1) {
			this.linesElem.firstElementChild?.remove();
		}
	}

	render() {
		this.inputElem.previousElementSibling?.replaceWith(this.createDomain());
	}

	private parseText(text: string) {
		const splitText = text.split(/\n|\\n/g);
		const nodes: Node[] = [];

		const firstTextItem = splitText.shift();
		nodes.push(document.createTextNode(`${firstTextItem}`));

		for (const item of splitText) {
			nodes.push(document.createElement('br'));
			nodes.push(document.createTextNode(item));
		}

		return nodes;
	}

	private createDomain() {
		const domainElem = document.createElement('div');
		domainElem.className = 'domain';

		const userhost = document.createElement('span');
		userhost.className = 'userhost';
		userhost.textContent = `${env.username}@${env.hostname}`;

		const path = document.createElement('span');
		path.className = 'path';
		path.textContent = fileSystem.path;

		domainElem.append(userhost, ':', path, '$');
		return domainElem;
	}
}
