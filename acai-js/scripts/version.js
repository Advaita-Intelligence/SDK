const fs = require('fs');
const path = require('path');
const { version } = require('../package');
const crypto = require('crypto');

const cwd = process.cwd();

function replaceTextInFile(filepath, match, replacement) {
  var filename = path.join(cwd, filepath);

  const updatedText = fs.readFileSync(filename, 'utf-8').replace(match, replacement);

  if (updatedText.indexOf(replacement) === -1) {
    throw new Error(`Failed to update text in ${filepath}`);
  }

  fs.writeFileSync(filename, updatedText);

  console.log(`Updated ${filepath}: ${replacement}`);
}

// Update version in snippet
replaceTextInFile(
  path.join('src', 'acai-snippet.js'),
  /cdn\.acai\.com\/libs\/acai-[0-9]+\.[0-9]+\.[0-9]+-min\.gz\.js/,
  `cdn.acaiplatform.ai/libs/acai-${version}-min.gz.js`,
);

// Update integrity hash in snippet
// Provides extra layer of security. If script changes, it will fail to load
const sdkText = fs.readFileSync(path.join('.', `acai.min.js`), 'utf-8');
const hash = crypto.createHash('sha384').update(sdkText).digest('base64');
replaceTextInFile(
  path.join('src', 'acai-snippet.js'),
  /as.integrity = 'sha384-[a-zA-Z0-9+/]+';/,
  `as.integrity = 'sha384-${hash}';`,
);

console.log(`Updated version to ${version}`);
