import { test } from "node:test";
import assert from "node:assert/strict";
import { confirmedPassword } from "../scripts/hidden-prompt.mjs";

// Fictional input only. These values are never sent to an account or database.
test("password validation retries short/mismatched input before returning a confirmed 12-character password", async () => {
  const inputs = ["short", "fictional-test-password", "different-test-password", "abcdefghijkl", "abcdefghijkl"];
  const prompts: string[] = [];
  const notices: string[] = [];
  const value = await confirmedPassword("fictional test account", async (prompt: string) => {
    prompts.push(prompt);
    assert.ok(inputs.length);
    return inputs.shift()!;
  }, (message: string) => notices.push(message));
  assert.equal(value, "abcdefghijkl");
  assert.equal(inputs.length, 0);
  assert.equal(prompts.filter((prompt) => prompt.startsWith("Confirm")).length, 2);
  assert.deepEqual(notices, [
    "Password is too short. Use at least 12 characters and try again.",
    "The two passwords did not match. Enter both again.",
  ]);
});

test("password input cancellation propagates without returning a password", async () => {
  await assert.rejects(confirmedPassword("fictional test account", async () => {
    throw new Error("Cancelled");
  }, () => {}), /Cancelled/);
});
