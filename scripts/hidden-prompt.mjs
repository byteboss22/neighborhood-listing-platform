/** Local terminal input only. Do not import into application/browser code. */
export function secret(prompt) {
  if (!process.stdin.isTTY) throw new Error("Use an interactive terminal for credentials.");
  return new Promise((resolve, reject) => {
    let value = "";
    process.stdout.write(prompt);
    process.stdin.setRawMode(true);
    process.stdin.resume();
    const finish = () => {
      process.stdin.off("data", receive);
      process.stdin.setRawMode(false);
      process.stdin.pause();
      process.stdout.write("\n");
    };
    const receive = (chunk) => {
      for (const character of chunk.toString("utf8")) {
        if (character === "\u0003" || character === "\u0004") {
          finish(); reject(new Error("Cancelled")); return;
        }
        if (character === "\r" || character === "\n") {
          finish(); resolve(value); return;
        }
        if (character === "\u007f" || character === "\b") value = [...value].slice(0, -1).join("");
        else if (character >= " ") value += character;
      }
    };
    process.stdin.on("data", receive);
  });
}

/** Retry local validation before the caller performs any password update. */
export async function confirmedPassword(label, ask = secret, notify = console.log) {
  while (true) {
    let password = await ask(`New password for ${label} (12+ characters, hidden): `);
    if (password.length < 12) {
      password = "";
      notify("Password is too short. Use at least 12 characters and try again.");
      continue;
    }
    let confirmation = await ask("Confirm new password (hidden): ");
    if (password !== confirmation) {
      password = "";
      confirmation = "";
      notify("The two passwords did not match. Enter both again.");
      continue;
    }
    confirmation = "";
    return password;
  }
}
