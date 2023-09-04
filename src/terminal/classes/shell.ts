import type { Command } from '../types/command';

export class Shell {
	readonly history: string[] = []

	clearHistory() {
		this.history.length = 0
	}

	async sendCommand(line: string) {
		const args = line.split(/ +/g);
		const commandName = args.shift();

		if (!commandName) {
			return;
		}

		try {
			const commandFn = await this.resolveCommand(commandName)
			this.history.push(line)
			commandFn(...args);
		} catch (err) {
			terminal.print(`${err}`);
		}
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
