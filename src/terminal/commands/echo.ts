export default function (...args: string[]) {
	terminal.print(`"${args.join(' ')}"`);
}
