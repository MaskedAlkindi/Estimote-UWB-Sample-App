const { withDangerousMod } = require('@expo/config-plugins');

module.exports = function reactCoreDependencyFix(config) {
  return withDangerousMod(config, [
    'ios',
    async (config) => {
      const fs = require('fs');
      const path = require('path');
      const filePath = path.join(config.modRequest.projectRoot, 'node_modules', 'react-native-fs', 'RNFS.podspec');
      let content = fs.readFileSync(filePath, 'utf8');
      content = content.replace("s.dependency 'React/Core'", "s.dependency 'React-Core'");
      fs.writeFileSync(filePath, content, 'utf8');
      return config;
    },
  ]);
};
