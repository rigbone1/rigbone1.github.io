import type { Command } from '../types/command';

export class Shell {
	readonly history: string[] = [];
	private currentHistoryIndex: number | undefined;

	get isHistoryAtEnd() {
		return (
			this.currentHistoryIndex === void 0 ||
			this.currentHistoryIndex === this.history.length
		);
	}

	clearHistory() {
		this.history.length = 0;
		this.currentHistoryIndex = undefined;
	}

	scrollHistory(direction: -1 | 1): string | undefined {
		if (this.currentHistoryIndex === void 0) {
			this.currentHistoryIndex = this.history.length;
		}

		this.currentHistoryIndex = Math.min(
			this.history.length,
			Math.max(0, this.currentHistoryIndex + direction)
		);

		return this.history[this.currentHistoryIndex];
	}

	async sendCommand(line: string, track = true) {
		const args = line.split(/ +/g);
		const commandName = args.shift();

		if (!commandName) {
			return;
		}

		// TODO throw error instead and decouple Shell from Terminal
		try {
			const commandFn = await this.resolveCommand(commandName);
			track && this.history.push(line);
			commandFn(...args);
		} catch (err) {
			terminal.print(`${err}`);
		} finally {
			terminal.render();
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
