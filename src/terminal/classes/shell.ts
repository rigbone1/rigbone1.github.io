import type { Command } from '../types/command';

export class Shell {
	sendCommand(line: string) {
		const args = line.split(/ +/g);
		const commandName = args.shift();

		if (!commandName) {
			return;
		}

		this.resolveCommand(commandName)
			.then((commandFn) => {
				commandFn(...args);
			})
			.catch((err) => {
				terminal.print(err.message);
			});
	}

	private async resolveCommand(commandName: string): Promise<Command> {
		try {
			return await import(`../commands/${commandName}.ts`).then(
				(m) => m.default
			);
		} catch (e) {
			throw new Error(`Command "${commandName}" not found`);
		}
	}
}
