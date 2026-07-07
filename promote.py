#!/usr/bin/env python3
import json, os, urllib.request, urllib.error

with open("/opt/data/proyectos/top-comidaconecta-worker/.env") as f:
    for line in f:
        if line.startswith("CLOUDFLARE_API_TOKEN"):
            token = line.strip().split("=", 1)[1]
            break

account_id = "3573e58c1513478811765e8dabc6b945"
headers = {
    "Authorization": f"Bearer {token}",
    "Content-Type": "application/json",
}

# List all deployments, find the one with comidaconecta.org alias
req = urllib.request.Request(
    f"https://api.cloudflare.com/client/v4/accounts/{account_id}/pages/projects/comidaconecta/deployments?per_page=15",
    headers=headers,
)
resp = json.loads(urllib.request.urlopen(req).read())
broken_id = None
working_id = "af68b612-5cdd-4944-aac5-94b69a8b5432"

for d in resp.get("result", []):
    aliases = d.get("aliases") or []
    cid = d["id"]
    if "comidaconecta.org" in aliases:
        broken_id = cid
        print(f"BROKEN production: {cid}  aliases={aliases}")
    if cid == working_id:
        print(f"WORKING deployment: {cid}  aliases={aliases}")

if broken_id:
    # Delete the broken deployment
    print(f"\nDeleting broken deployment: {broken_id}")
    req2 = urllib.request.Request(
        f"https://api.cloudflare.com/client/v4/accounts/{account_id}/pages/projects/comidaconecta/deployments/{broken_id}",
        headers=headers,
        method="DELETE",
    )
    try:
        resp2 = urllib.request.urlopen(req2)
        data2 = json.loads(resp2.read())
        print(f"Delete result: {data2.get('success')}")
    except urllib.error.HTTPError as e:
        body = e.read().decode()[:300]
        print(f"Delete error {e.code}: {body}")

# Now redeploy the working build
print("\nRedeploying working build to production...")
import subprocess
env = os.environ.copy()
env["CLOUDFLARE_API_TOKEN"] = token
os.chdir("/opt/data/proyectos/comidaconecta")
r = subprocess.run(
    ["npx", "wrangler", "pages", "deploy", ".open-next", "--project-name", "comidaconecta"],
    capture_output=True, text=True, timeout=120, env=env
)
# Print the URL from output
for line in r.stdout.split("\n"):
    if "comidaconecta.org" in line or "Deployment" in line:
        print(line)
print(r.stderr[-500:] if r.stderr else "")
print(f"Exit: {r.returncode}")

# Verify
req3 = urllib.request.Request(
    f"https://api.cloudflare.com/client/v4/accounts/{account_id}/pages/projects/comidaconecta/deployments?per_page=3",
    headers=headers,
)
resp3 = json.loads(urllib.request.urlopen(req3).read())
print("\n=== Deployments ===")
for d in resp3.get("result", []):
    aliases = d.get("aliases") or []
    cid = d["id"][:12]
    print(f"  {cid}  aliases={aliases}")

print("\nTesting production...")
for path in ["/", "/admin", "/login"]:
    import urllib.request as ur
    try:
        code = ur.urlopen(f"https://comidaconecta.org{path}").getcode()
        print(f"  {path} => {code}")
    except Exception as e:
        print(f"  {path} => ERROR: {e}")
