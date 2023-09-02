import { Env } from '../classes/env';
import { Shell } from '../classes/shell';
import { Terminal } from '../classes/terminal';

declare global {
	var env: Env;
	var terminal: Terminal;
	var shell: Shell;
}
