const kebabToCamel = (str) => str.replace(/-./g, (m) => m.toUpperCase()[1]);

module.exports = function (plop) {
  plop.setGenerator('bootstrap repo', {
    description: 'updates configurations files for module federation',
    prompts: [
      {
        type: 'input',
        name: 'convertKebabToCamel',
        message: 'what is the name of your repository in kebab-case?',
      },
    ],
    actions: function (data) {
      const newCamelName = kebabToCamel(data.convertKebabToCamel);

      // Check if there are any symbols in name
      if (newCamelName.match(/[^a-zA-Z]/g)) {
        throw new Error('Name can only contain letters');
      }

      return [
        {
          type: 'modify',
          path: '../webpack.config.ts',
          pattern: /(new ModuleFederationPlugin\(\s*{\s*name:\s*')(.*)(')/g,
          template: "new ModuleFederationPlugin({ name: '{{newCamelName}}'",
          patternInsert: 'replace',
          data: {
            newCamelName: newCamelName,
          },
        },
        {
          type: 'modify',
          path: '../package.json',
          pattern: /("name":\s*")(.*)(")/g,
          template: '"name": "{{newCamelName}}"',
          patternInsert: 'replace',
          data: {
            newCamelName: data.convertKebabToCamel,
          },
        },
        {
          type: 'modify',
          path: '../package-lock.json',
          pattern: /("name":\s*")(.*)(")/g,
          template: '"name": "{{newCamelName}}"',
          patternInsert: 'replace',
          data: {
            newCamelName: data.convertKebabToCamel,
          },
        },
      ];
    },
  });
};
