import subprocess
import time

subprocess.call("node req.js", shell=True)
time.sleep(2)
subprocess.call("open ../Homework2-Resume-EC601/index.html", shell=True)