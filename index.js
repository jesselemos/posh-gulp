'use strict';

const run = require('child_process').spawnSync;
const spawn = require('child_process').spawn;
const colors = require('ansi-colors');
const log = require('fancy-log');

const switches = [
   '-NoProfile',
   '-NoLogo',
   '-NonInteractive',
   '-File'
];

module.exports = function (gulp, file) {

   log('Importing Tasks', colors.magenta(file));

   const result = run('powershell', switches.concat(file));

   if (result.stderr.length > 0)
      log.error(result.stderr.toString());
   else {
      const tasks = JSON.parse(result.stdout);
      Object.keys(tasks).forEach(function (key) {
         const cb = (cb) => {
            const execSwitches = switches.concat(file, key);
            const taskProcess = spawn('powershell', execSwitches, { stdio: ['inherit', 'pipe'] });

            taskProcess.stdout.on('data', data => {
               data
                  .toString()
                  .split(/\r?\n/)
                  .filter(l => l !== '')
                  .map(l => JSON.parse(l))
                  .forEach(l => console.log(l));
            });

            taskProcess.on('close', () => cb());
         };
         gulp.task(key, tasks[key], cb);
      });
   }
};