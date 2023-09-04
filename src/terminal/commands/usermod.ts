export default function (...args: string[]) {
  if (!args[0]) {
    return terminal.print("Error: you must specify a new name")
  }

  env.user = args[0]
}