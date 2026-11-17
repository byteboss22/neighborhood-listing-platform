"""Read-only credential-pattern audit of non-ignored files and all reachable Git blobs.

Print locations and pattern labels only, never the matched credential text.
This is a bounded heuristic, not a guarantee that no possible secret exists.
"""
import pathlib
import re
import subprocess
import sys

root = pathlib.Path(__file__).resolve().parent.parent


def git(*args):
    return subprocess.check_output(["git", *args], cwd=root)


patterns = {
    "private-key": re.compile(rb"-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----"),
    "github-token": re.compile(rb"(?:gh" + rb"[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{40,})"),
    "aws-access-key": re.compile(rb"AK" + rb"IA[0-9A-Z]{16}"),
    "supabase-secret": re.compile(rb"sb_" + rb"secret_[A-Za-z0-9_-]{20,}"),
    "jwt": re.compile(rb"eyJ[A-Za-z0-9_-]{15,}\.[A-Za-z0-9_-]{15,}\.[A-Za-z0-9_-]{15,}"),
    "public-service-role-variable": re.compile(rb"NEXT_PUBLIC_[A-Z_]*SERVICE_ROLE[A-Z_]*"),
}
findings = []


def inspect(data, location):
    for label, pattern in patterns.items():
        if pattern.search(data):
            findings.append((location, label))


files = git("ls-files", "--cached", "--others", "--exclude-standard", "-z").decode().split("\0")
for name in filter(None, files):
    file = root / name
    if file.is_file():
        if file.name.startswith(".env"):
            findings.append((name, "environment-file-in-git-file-list"))
        inspect(file.read_bytes(), name)

objects = git("rev-list", "--objects", "--all").decode().splitlines()
blob_count = 0
proc = subprocess.Popen(["git", "cat-file", "--batch"], cwd=root, stdin=subprocess.PIPE, stdout=subprocess.PIPE)
try:
    for entry in objects:
        oid, _, name = entry.partition(" ")
        proc.stdin.write((oid + "\n").encode())
        proc.stdin.flush()
        header = proc.stdout.readline().decode().split()
        data = proc.stdout.read(int(header[2]))
        proc.stdout.read(1)
        if header[1] == "blob":
            blob_count += 1
            inspect(data, f"history:{oid}:{name}")
            if pathlib.PurePosixPath(name).name.startswith(".env"):
                findings.append((f"history:{oid}:{name}", "historical-environment-file"))
finally:
    proc.stdin.close()
    proc.stdout.close()
    proc.wait()

client_chunks = list((root / ".next/static").rglob("*.js"))
for file in client_chunks:
    data = file.read_bytes()
    if b"SUPABASE_SERVICE_ROLE_KEY" in data:
        findings.append((str(file.relative_to(root)), "service-role-reference-in-browser-output"))

print(f"Scanned {len(list(filter(None, files)))} non-ignored files, {blob_count} reachable historical blobs, and {len(client_chunks)} browser JS chunks.")
for location, label in findings:
    print(f"FLAG: {label}: {location}")
print(f"Credential-pattern findings: {len(findings)}. Heuristic scope only; independent review is still required.")
sys.exit(1 if findings else 0)
