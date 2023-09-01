import { Env } from './classes/env';
import { Shell } from './classes/shell';
import { Terminal } from './classes/terminal';

globalThis.env = new Env();
globalThis.terminal = new Terminal();
globalThis.shell = new Shell();

window.addEventListener('click', (e) => {
	const elem = e.target as HTMLElement;

	if (elem === document.firstElementChild || elem === document.body) {
		terminal.focus();
	}
});
