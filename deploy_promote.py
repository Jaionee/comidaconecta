#!/usr/bin/env python3
"""Promote a deployment to production by updating its alias."""
import json, urllib.request, sys

# Read token
with open("/opt/data/proyectos/top-comidaconecta-worker/.env") as f:
    for line in f:
        if line.startswith("CLOUDFLARE_API_TOKEN"):
            token = line.strip().split("=", 1)[1]
            break
    else:
        print("ERROR: Token not found")
        sys.exit(1)

account_id = "3573e58c1513478811765e8dabc6b945"
headers = {
    "Authorization": f"Bearer {token}",
    "Content-Type": "application/json",
}

# The working deployment ID
deployment_id = "34585679-7dac-4473-aeac-aad2628af426"

# Update aliases
body = json.dumps({"aliases": ["comidaconecta.org"]}).encode()
req = urllib.request.Request(
    f"https://api.cloudflare.com/client/v4/accounts/{account_id}/pages/projects/comidaconecta/deployments/{deployment_id}",
    data=body,
    headers=headers,
    method="PATCH",
)
try:
    resp = urllib.request.urlopen(req)
    data = json.loads(resp.read())
    print(f"Result: {data}")
except urllib.error.HTTPError as e:
    print(f"HTTP Error: {e.code} - {e.reason}")
    resp_body = e.read().decode()
    print(f"Response: {resp_body}")

# Alternative: just deploy to production branch
import subprocess, os
os.chdir("/opt/data/proyectos/comidaconecta")
env = os.environ.copy()
env["CLOUDFLARE_API_TOKEN"] = token

# Deploy directly to production
r = subprocess.run(
    ["npx", "wrangler", "pages", "deploy", ".open-next", "--project-name", "comidaconecta"],
    capture_output=True, text=True, timeout=120, env=env
)
print(r.stdout)
