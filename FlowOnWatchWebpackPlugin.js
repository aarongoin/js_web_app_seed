const { execSync } = require('child_process');

const flowCmd = cwd => process.stdout.write(`

[flow start]

${execSync('flow', { cwd })}
[flow end]

`);

const pluginName = 'FlowOnWatchWebpackPlugin';

class FlowOnWatchWebpackPlugin {
    
    constructor(path) {
        this.path = path;
    }

    apply(compiler) {
        compiler.hooks.watchRun.tap(pluginName, () => flowCmd(this.path));
    }
}

module.exports = FlowOnWatchWebpackPlugin;