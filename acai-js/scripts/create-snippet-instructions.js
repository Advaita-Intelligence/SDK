const fs = require('fs');
const path = require('path');

const cwd = process.cwd();
const instructionsFileName = path.join(cwd, 'acai-snippet-instructions.js');

const snippetFilename = path.join(cwd, 'acai-snippet.min.js');
const snippet = fs.readFileSync(snippetFilename, 'utf-8');

const script = `<script type="text/javascript">
${snippet}
acai.getInstance().init("YOUR_API_KEY_HERE")
</script>
`;
fs.writeFileSync(instructionsFileName, script);

console.log('Created acai-snippet-instructions.js');
