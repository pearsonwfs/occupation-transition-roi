const fs = require('fs');
const path = require('path');

function toPascalCase(str) {
  return str
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, function (match) {
      return match.toUpperCase();
    })
    .replace(/\s+/g, '');
}

module.exports = function (plop) {
  plop.setGenerator('add new app', {
    description: 'Creates a new federated app for export',
    prompts: [
      {
        type: 'input',
        name: 'nameOfApp',
        message: 'What is the name of the app? (enter in camelCase)',
      },
    ],
    actions: function (data) {
      const pascalCaseAppName = toPascalCase(data.nameOfApp);
      // Check if there are any symbols in name
      if (pascalCaseAppName.match(/[^a-zA-Z]/g)) {
        throw new Error('Name can only contain letters');
      }
      // Check if app already exists
      if (
        fs.existsSync(
          path.join(
            __dirname,
            `../src/apps/${pascalCaseAppName}/${pascalCaseAppName}.tsx`
          )
        )
      ) {
        throw new Error('App already exists');
      }

      return [
        {
          type: 'add',
          path: `../src/apps/{{pascalNameOfApp}}/{{pascalNameOfApp}}.tsx`,
          templateFile: './plopTemplates/SampleTemplate.tsx.hbs',
          data: {
            pascalNameOfApp: pascalCaseAppName,
          },
        },
        {
          type: 'add',
          path: `../src/apps/{{pascalNameOfApp}}/{{pascalNameOfApp}}.styles.tsx`,
          templateFile: './plopTemplates/Styles.tsx.hbs',
          data: {
            pascalNameOfApp: pascalCaseAppName,
          },
        },
        {
          type: 'add',
          path: `../src/apps/{{pascalNameOfApp}}/{{pascalNameOfApp}}.types.tsx`,
          templateFile: './plopTemplates/Types.tsx.hbs',
          data: {
            pascalNameOfApp: pascalCaseAppName,
          },
        },
        {
          type: 'modify',
          path: '../webpack.config.ts',
          pattern: /(exposes:\s*{\s*)(.*?)(\s*})/s,
          template:
            "$1'./{{pascalNameOfApp}}': './src/apps/{{pascalNameOfApp}}/{{pascalNameOfApp}}',\n$2}",
          patternInsert: 'replace',
          data: {
            pascalNameOfApp: pascalCaseAppName,
          },
        },
        {
          type: 'append',
          path: '../src/screens/AppContent.tsx',
          pattern:
            /{currentApp === 'sample-app' && <SampleApp accessToken={apiKey} \/>}/g,
          template:
            "{currentApp === '{{pascalNameOfApp}}' && <{{pascalNameOfApp}} accessToken={apiKey}/>}",
          data: {
            pascalNameOfApp: pascalCaseAppName,
          },
        },
        {
          type: 'append',
          path: '../src/screens/AppContent.tsx',
          pattern:
            /(import\s*{.*?}\s*from\s*['"]\.\.\/apps\/SampleApp\/SampleApp['"]\;)/,
          template:
            "import { {{pascalNameOfApp}} } from '../apps/{{pascalNameOfApp}}/{{pascalNameOfApp}}';",
          data: {
            pascalNameOfApp: pascalCaseAppName,
          },
        },
        {
          type: 'append',
          path: '../src/screens/AppContent.tsx',
          pattern: /(\/\/ PLOP NAVIGATION - DO NOT REMOVE THIS LINE)/,
          template: `          ,{\n            href: '#',\n            name: '{{pascalNameOfApp}}',\n            onClick: () => setCurrentApp('{{pascalNameOfApp}}'),\n            selected: currentApp === '{{pascalNameOfApp}}',\n            separator: false,\n          }\n`,
          data: {
            pascalNameOfApp: pascalCaseAppName,
          },
        },
      ];
    },
  });
};
