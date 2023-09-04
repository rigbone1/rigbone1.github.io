export default function () {
  shell.history.pop() // discount this command

  const lastCommand = shell.history[shell.history.length - 1]
  shell.sendCommand(lastCommand)
  
  shell.history.pop() // don't write to history
}