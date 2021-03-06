// @remove-file-on-eject
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const execSync = require('child_process').execSync;
const spawn = require('react-dev-utils/crossSpawn');
const { defaultBrowsers } = require('react-dev-utils/browsersHelper');
const os = require('os');
const verifyTypeScriptSetup = require('./utils/verifyTypeScriptSetup');

function isInGitRepository() {
  try {
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
}

function isInMercurialRepository() {
  try {
    execSync('hg --cwd . root', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
}

function tryGitInit(appPath) {
  let didInit = false;
  try {
    execSync('git --version', { stdio: 'ignore' });
    if (isInGitRepository() || isInMercurialRepository()) {
      return false;
    }

    execSync('git init', { stdio: 'ignore' });
    didInit = true;

    execSync('git add -A', { stdio: 'ignore' });
    execSync('git commit -m "chore(init): initial commit from create react app"', {
      stdio: 'ignore',
    });
    return true;
  } catch (e) {
    if (didInit) {
      // If we successfully initialized but couldn't commit,
      // maybe the commit author config is not set.
      // In the future, we might supply our own committer
      // like Ember CLI does, but for now, let's just
      // remove the Git files to avoid a half-done state.
      try {
        // unlinkSync() doesn't work on directories.
        fs.removeSync(path.join(appPath, '.git'));
      } catch (removeErr) {
        // Ignore.
      }
    }
    return false;
  }
}

function tryInstallHusky(appPath, command) {
  let didInstall = false;

  console.log()
  console.log(`Installing ${chalk.cyan('husky')} as dev dependency.`)
  console.log()

  const huskyProc = spawn.sync(command, ['add', '-D', '-E', 'husky'], {
    stdio: 'inherit',
  });

  if (huskyProc.status !== 0) {
    console.error(`\`${command} ${['add', '-D', '-E', 'husky'].join(' ')}\` failed`);
    return didInstall;
  }

  didInstall = true;

  try {
    // Reusing the initialized commit to include changes in the package.json
    execSync('git add -A', { stdio: 'ignore' });
    execSync('git commit --amend --no-edit', {
      stdio: 'ignore',
    });
    return true;
  } catch (err) {
    if (didInstall) {
      // If we successfully installed but couldn't commit,
      // maybe the commit author config is not set.
      // In the future, we might supply our own committer
      // like Ember CLI does, but for now, let's just
      // remove the Git files to avoid a half-done state.
      try {
        // unlinkSync() doesn't work on directories.
        fs.removeSync(path.join(appPath, '.git'));
      } catch (removeErr) {
        // Ignore.
      }
    }
    return false;
  }
}

module.exports = function(
  appPath,
  appName,
  verbose,
  originalDirectory,
  template
) {
  const ownPath = path.dirname(
    require.resolve(path.join(__dirname, '..', 'package.json'))
  );
  const appPackage = require(path.join(appPath, 'package.json'));
  const useYarn = fs.existsSync(path.join(appPath, 'yarn.lock'));

  // Copy over some of the devDependencies
  appPackage.dependencies = appPackage.dependencies || {};

  const useTypeScript = appPackage.dependencies['typescript'] != null;

  // Setup the script rules
  appPackage.scripts = {
    start: 'sprint-scripts start',
    build: 'sprint-scripts build',
    test: 'sprint-scripts test',
    eject: 'sprint-scripts eject',
  };

  // Setup the eslint config
  // appPackage.eslintConfig = {
  //   extends: 'react-app',
  // };

  // Setup the browsers list
  appPackage.browserslist = defaultBrowsers;

  // Setup the husky
  appPackage.husky = {
    hooks: {
      'pre-commit': 'lint-staged',
      'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS'
    }
  },

  // Setup the lint-staged
  appPackage['lint-staged'] = {
    'src/**/*.{js,jsx,ts,tsx}': [
      'eslint --fix',
      'git add'
    ],
    'src/**/*.css': [
      'stylelint --fix',
      'git add'
    ],
    'src/**/*.scss': [
      'stylelint --syntax=scss --fix',
      'git add'
    ],
    'src/**/*.less': [
      'stylelint --syntax=less --fix',
      'git add'
    ],
  },

  // Setup the commitlint
  appPackage.commitlint = {
    'extends': [
      '@commitlint/config-conventional'
    ]
  }

  fs.writeFileSync(
    path.join(appPath, 'package.json'),
    JSON.stringify(appPackage, null, 2) + os.EOL
  );

  const readmeExists = fs.existsSync(path.join(appPath, 'README.md'));
  if (readmeExists) {
    fs.renameSync(
      path.join(appPath, 'README.md'),
      path.join(appPath, 'README.old.md')
    );
  }

  // Copy the files for the user
  const templatePath = template
    ? path.resolve(originalDirectory, template)
    : path.join(ownPath, useTypeScript ? 'template-typescript' : 'template');
  if (fs.existsSync(templatePath)) {
    fs.copySync(templatePath, appPath);
  } else {
    console.error(
      `Could not locate supplied template: ${chalk.green(templatePath)}`
    );
    return;
  }

  // Rename gitignore after the fact to prevent npm from renaming it to .npmignore
  // See: https://github.com/npm/npm/issues/1862
  try {
    fs.moveSync(
      path.join(appPath, 'gitignore'),
      path.join(appPath, '.gitignore'),
      []
    );
  } catch (err) {
    // Append if there's already a `.gitignore` file there
    if (err.code === 'EEXIST') {
      const data = fs.readFileSync(path.join(appPath, 'gitignore'));
      fs.appendFileSync(path.join(appPath, '.gitignore'), data);
      fs.unlinkSync(path.join(appPath, 'gitignore'));
    } else {
      throw err;
    }
  }

  let command;
  let args;

  if (useYarn) {
    command = 'yarnpkg';
    args = ['add'];
  } else {
    command = 'npm';
    args = ['install', '--save', verbose && '--verbose'].filter(e => e);
  }

  // TODO: if have any dependencies needs install, uncomment it
  // install dependencies
  const deps = [
    '@rematch/core@1.0.6',
    '@rematch/loading@1.1.2',
    '@rematch/persist@1.1.5',
    'antd@3.10.3',
    'axios@0.18.0',
    'history@4.7.2',
    'moment@2.22.2',
    'react-redux@5.1.0',
    'react-router-dom@4.3.1',
    'redux-persist@5.10.0',
  ];

  console.log(
    `Installing ${chalk.cyan(deps.join(', '))} as dependencies ${command}...`
  );
  console.log();

  const depsProc = spawn.sync(command, args.concat(deps), {
    stdio: 'inherit',
  });
  if (depsProc.status !== 0) {
    console.error(`\`${command} ${args.concat(deps).join(' ')}\` failed`);
    return;
  }

  // Install dev dependencies
  const devDeps = [
    'stylelint-config-standard',
    'stylelint-config-css-modules',
  ];

  if (useTypeScript) {
    devDeps.push(
      '@types/react-router-dom',
      '@types/enzyme',
      '@types/enzyme-adapter-react-16',
      '@types/history',
      '@types/qs',
      '@types/react-loadable',
      '@types/react-redux',
      '@types/webpack',
    )
  }

  console.log(
    `Installing ${chalk.cyan(devDeps.join(', '))} as dev dependencies ${command}...`
  );
  console.log();

  const devProc = spawn.sync(command, args.concat(['-D', '-E']).concat(devDeps), {
    stdio: 'inherit',
  });
  if (devProc.status !== 0) {
    console.error(`\`${command} ${args.concat(devDeps).join(' ')}\` failed`);
    return;
  }

  // Install additional template dependencies, if present
  const templateDependenciesPath = path.join(
    appPath,
    '.template.dependencies.json'
  );
  if (fs.existsSync(templateDependenciesPath)) {
    const templateDependencies = require(templateDependenciesPath).dependencies;
    args = args.concat(
      Object.keys(templateDependencies).map(key => {
        return `${key}@${templateDependencies[key]}`;
      })
    );
    fs.unlinkSync(templateDependenciesPath);
  }

  // Install react and react-dom for backward compatibility with old CRA cli
  // which doesn't install react and react-dom along with sprint-scripts
  // or template is presetend (via --internal-testing-template)
  if (!isReactInstalled(appPackage) || template) {
    args.push('react', 'react-dom');
    console.log(`Installing react and react-dom using ${command}...`);
    console.log();

    const proc = spawn.sync(command, args, { stdio: 'inherit' });
    if (proc.status !== 0) {
      console.error(`\`${command} ${args.join(' ')}\` failed`);
      return;
    }
  }

  if (useTypeScript) {
    verifyTypeScriptSetup();
  }

  if (tryGitInit(appPath)) {
    console.log();
    console.log('Initialized a git repository.');
  }

  tryInstallHusky(appPath, command)

  // Display the most elegant way to cd.
  // This needs to handle an undefined originalDirectory for
  // backward compatibility with old global-cli's.
  let cdpath;
  if (originalDirectory && path.join(originalDirectory, appName) === appPath) {
    cdpath = appName;
  } else {
    cdpath = appPath;
  }

  // Change displayed command to yarn instead of yarnpkg
  const displayedCommand = useYarn ? 'yarn' : 'npm';

  console.log();
  console.log(`Success! Created ${appName} at ${appPath}`);
  console.log('Inside that directory, you can run several commands:');
  console.log();
  console.log(chalk.cyan(`  ${displayedCommand} start`));
  console.log('    Starts the development server.');
  console.log();
  console.log(
    chalk.cyan(`  ${displayedCommand} ${useYarn ? '' : 'run '}build`)
  );
  console.log('    Bundles the app into static files for production.');
  console.log();
  console.log(chalk.cyan(`  ${displayedCommand} test`));
  console.log('    Starts the test runner.');
  console.log();
  console.log(
    chalk.cyan(`  ${displayedCommand} ${useYarn ? '' : 'run '}eject`)
  );
  console.log(
    '    Removes this tool and copies build dependencies, configuration files'
  );
  console.log(
    '    and scripts into the app directory. If you do this, you can’t go back!'
  );
  console.log();
  console.log('We suggest that you begin by typing:');
  console.log();
  console.log(chalk.cyan('  cd'), cdpath);
  console.log(`  ${chalk.cyan(`${displayedCommand} start`)}`);
  if (readmeExists) {
    console.log();
    console.log(
      chalk.yellow(
        'You had a `README.md` file, we renamed it to `README.old.md`'
      )
    );
  }
  console.log();
  console.log('Happy hacking!');
};

function isReactInstalled(appPackage) {
  const dependencies = appPackage.dependencies || {};

  return (
    typeof dependencies.react !== 'undefined' &&
    typeof dependencies['react-dom'] !== 'undefined'
  );
}
