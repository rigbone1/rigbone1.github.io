import { Env } from './classes/env';
import { FileSys } from './classes/filesystem';
import { Shell } from './classes/shell';
import { Terminal } from './classes/terminal';

globalThis.env = new Env();
globalThis.fileSystem = new FileSys();
globalThis.shell = new Shell();
globalThis.terminal = new Terminal();

terminal.focus();
shell.sendCommand('echo Welcome! Type `help` for info', false);

window.addEventListener('click', (e) => {
	const elem = e.target as HTMLElement;

	if (elem === document.firstElementChild || elem === document.body) {
		terminal.focus();
	}
});
