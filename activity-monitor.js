const os = require('os');
const childProcess = require('child_process');
const fs = require('fs');

let activityMonitorData;

const execProcess = command => {
  childProcess.exec(command, (error, stdout, stderr) => {
    activityMonitorData = stdout;
    console.clear();
    console.log(stdout);
    console.error(stderr);

    if (error !== null) {
      console.error(`error: ${error}`);
    }
  });
}

const writeToFile = () => {
  if (!handlerId) {
    clearInterval(writeToFileId);
    return;
  }
  if (activityMonitorData) {
    fs.appendFile('activityMonitor.log', `${Date.now()}: ${activityMonitorData} \r`, (err) => {
      if (err) {
        throw err;
      }
    });
  }
};

const activityMonitorHandler = () => {
  const platform = os.platform();
  switch (platform) {
    case 'linux':
    case 'darwin':
      execProcess('ps -A -o %cpu,%mem,comm | sort -nr | head -n 1');
      break;
    case 'win32':
      execProcess('powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + \' \' + $_.CPU + \' \' + $_.WorkingSet }"');
      break;
    default:
      clearInterval(handlerId);
      handlerId = null;
      console.warn(`Your ${platform} doesn't support`);
  }
};

let handlerId = setInterval(activityMonitorHandler, 100);
let writeToFileId = setInterval(writeToFile, 1000);

