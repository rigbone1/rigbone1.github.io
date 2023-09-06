import { Env } from '../classes/env';
import { FileSys } from '../classes/filesystem';
import { Shell } from '../classes/shell';
import { Terminal } from '../classes/terminal';

declare global {
	var fileSystem: FileSys;
	var env: Env;
	var shell: Shell;
	var terminal: Terminal;
}
