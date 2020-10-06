#!/usr/bin/env node
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const chalk = require('chalk');
const args = process.argv;
const fs = require('fs');
const npm = require('npm-programmatic');
const { execSync } = require('child_process');
const editJsonFile = require('edit-json-file');  

const node_installation_status = `
    Check if node.js is installed in your system.
    Visit https://nodejs.org/en/ an download the latest stable version of node.js

    Once node.js is installed run this command again
`;

const babelContent = `
{
    "presets": ["env"]
}
`;

console.log(chalk.red('Checking system requirement'));

const checkNodeInstallationStatus = async () => {
    try {
        const { stdout, stderr } = await exec("node --version");
        if(stderr) {
            console.log("stderr: ", stderr);
            return;
        }
        if(stdout) {
            console.log(chalk.blue("Node.js --> looks fine"));
        }    
    } catch (error) {
        console.log(error.message)
        console.log(node_installation_status);
    }
};

const checkNPMInstallationStatus = async () => {
    try {
        const { stdout, stderr } = await exec("npm --version");
        if(stderr) {
            console.log("stderr: ", stderr);
            return;
        }
        if(stdout) {
            console.log(chalk.blue("npm --> looks fine"));
        }    
    } catch (error) {
        console.log(error.message)
        console.log(node_installation_status);
    }
};

const generatePackageJson = () => {
    try {
        const { stdout, stderr } = execSync("npm init -y");
        if(stderr) {
            console.log("stderr: ", stderr);
            return;
        }   
    } catch (error) {
        console.log(error.message)
    }
}

const createSrcFolder = async () => {
    try {
        fs.mkdirSync('src');   
    } catch (error) {
        console.log(error.message)
    }
}

const createSrcFile = async () => {
    try {
        const data = fs.appendFile('./src/index.js', '//write your code here', (err) => {
            if(err) {
                console.log(err);
                return;
            }
        });
    } catch (error) {
        console.error(error);
    }
}

const installBabel = async () => {
    npm.install(['babel-cli','babel-preset-env'],{
        cwd:'.',
        saveDev: true
    })
    .then(function() {
        console.log(chalk.green('Packages installed successfully'));
    })
    .catch(function() {
        console.log('Unable to install packages');
    });
}

const createBabelConfigFile = async () => {
    try {
        const data = fs.appendFile('.babelrc', babelContent, (err) => {
            if(err) {
                console.log(err);
                return;
            }
        });
    } catch (error) {
        console.error(error);
    }
}

const editPackageJson = () => {
    let jsonFile = editJsonFile('./package.json');
    jsonFile.set("scripts.build","babel src -d lib");
    jsonFile.set("main","bin/index.js");
    jsonFile.save();
};

checkNodeInstallationStatus();
checkNPMInstallationStatus();
generatePackageJson();
createSrcFolder();
createSrcFile();
createBabelConfigFile();
installBabel();
editPackageJson();

