const fs = require('fs');
const path = require('path');
const ejs = require('ejs');


const templatePath = path.join(__dirname, '..', 'acai-wrapper.js.ejs');
const outputPath = path.join(__dirname, '..', 'lib', 'acai-wrapper.js');
fs.mkdirSync(path.join(__dirname, '..', 'lib'), { recursive: true });

// Read the analytics browser snippet
const analyticsSnippetPath = path.join(__dirname, '..', '..', 'analytics-browser', 'lib', 'scripts','acai-gtm-snippet-min.js');
console.log('Reading analytics browser snippet...');
const analyticsBrowserSnippet = fs.readFileSync(analyticsSnippetPath, 'utf8');


// Read and process the EJS template
console.log('Processing EJS template...');
const template = fs.readFileSync(templatePath, 'utf8');

// Render the template with the snippet
const rendered = ejs.render(template, {
  analyticsBrowserSnippet,
});

// Write the output file
console.log('Writing output file...');
fs.writeFileSync(outputPath, rendered);

console.log('✅ Successfully built acai-wrapper.js from template');
