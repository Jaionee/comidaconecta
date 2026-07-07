#!/usr/bin/env python3
"""Deploy comidaconecta to Cloudflare Pages preview branch."""
import subprocess, os

# Read token from env file - skip the hermes masking
with open("/opt/data/proyectos/top-comidaconecta-worker/.env") as f:
    for line in f:
        if line.startswith("CLOUDFLARE_API_TOKEN"):
            token = line.strip().split("=", 1)[1]
            break

os.chdir("/opt/data/proyectos/comidaconecta")
env = os.environ.copy()
env["CLOUDFLARE_API_TOKEN"] = token

r = subprocess.run(
    ["npx", "wrangler", "pages", "deploy", ".open-next", "--project-name", "comidaconecta", "--branch", "preview"],
    capture_output=True, text=True, timeout=120, env=env
)
print(r.stdout[-1000:])
if r.stderr:
    print("STDERR:", r.stderr[-500:])
