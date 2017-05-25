import * as child_process from 'child_process'

const args = [ 'start' ];
const opts = { stdio: 'inherit', cwd: 'client', shell: true };
child_process.spawn('npm', args, opts);