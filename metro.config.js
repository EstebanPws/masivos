// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const defaultAssetExts = require("metro-config/src/defaults/defaults").assetExts;

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
    transformer: {
        getTransformOptions: async () => ({
          transform: {
            experimentalImportSupport: false,
            inlineRequires: true,
          },
        }),
      },
      resolver: {
          assetExts: [ ...defaultAssetExts, "css","js"]
      }
});

module.exports = config;
