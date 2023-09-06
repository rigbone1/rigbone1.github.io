type FObjectTypes = 'directory' | 'file';

// File Sys Object
abstract class FSObject {
	constructor(
		public readonly name: string,
		public readonly parent: FSDirectory | null,
		public readonly type: FObjectTypes
	) {}
}

class FSDirectory extends FSObject {
	readonly contents: FSObject[] = [];

	constructor(
		public readonly name: string,
		public readonly parent: FSDirectory | null
	) {
		super(name, parent, 'directory');
	}
}

const isDirectory = (object: FSObject): object is FSDirectory => {
	return object.type === 'directory';
};

// Named FileSys to avoid collision with window.FileSystem
export class FileSys {
	private readonly rootDir = new FSDirectory('~', null);
	private _currentDir = this.rootDir;

	get path(): string {
		return this.buildPath();
	}

	get currentDirectory(): FSDirectory {
		return this._currentDir;
	}

	makeDirectory(name: string) {
		const newDir = new FSDirectory(name, this._currentDir);
		this._currentDir.contents.push(newDir);
	}

	changeDirectory(path: string) {
		const dirToFind = path;
		const dir = this._currentDir.contents.find((d) => d.name === dirToFind);

		if (!dir) {
			throw new Error('Directory not found');
		}

		if (!isDirectory(dir)) {
			throw new Error('Object is not a directory');
		}

		this._currentDir = dir;
	}

	private buildPath() {
		let nodes = [];
		let node = this._currentDir;

		while (node.parent) {
			nodes.unshift(node.name);
			node = node.parent;
		}

		return `~${nodes.map((i) => '/' + i).join('')}`;
	}
}
