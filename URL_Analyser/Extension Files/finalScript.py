import subprocess
import time

subprocess.call("node req.js", shell=True)
time.sleep(2)
subprocess.call("open ../Website/index.html", shell=True)