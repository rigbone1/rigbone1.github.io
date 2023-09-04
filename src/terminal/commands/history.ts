export default function () {
  shell.history.pop() // discount the history command

  let idx = 1;
  const lastTen = shell.history.slice(-10).map((cmd) => `${idx++} ${cmd}`)
  terminal.print(`\n${lastTen.join('\n')}`, true)
}