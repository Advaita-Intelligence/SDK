import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import gzip from 'rollup-plugin-gzip';
import execute from 'rollup-plugin-execute';
import json from '@rollup/plugin-json';
import sourcemaps from 'rollup-plugin-sourcemaps';
import { exec } from 'child_process';
import fs from 'fs';
import { brotliCompress } from 'zlib';
import { promisify } from 'util';

const brotliPromise = promisify(brotliCompress);

// The paths are relative to process.cwd(), which are packages/*
const base = '../..';

const createSnippet = () => {
  return {
    name: 'acai-snippet',
    options: (opt) => {
      return new Promise((resolve) => {
        opt.input = 'generated/acai-snippet.js';
        if (process.env.GENERATE_SNIPPET !== 'true') return resolve(opt);
        exec(`node ${base}/scripts/version/create-snippet.js`, (err) => {
          if (err) {
            throw err;
          }
          resolve(opt);
        });
      });
    },
  };
};

export const umd = {
  input: 'src/index.ts',
  output: {
    name: 'acai',
    file: 'lib/scripts/acai-min.umd.js',
    format: 'umd',
  },
  plugins: [
    typescript({
      module: 'es2020',
      noEmit: false,
      outDir: 'lib/umd',
      rootDir: 'src',
    }),
    resolve({
      browser: true,
    }),
    commonjs(),
    terser({
      output: {
        comments: false,
      },
    }),
    gzip(),
  ],
};

const updateLibPrefix = (isUndo) => {
  const path = 'src/lib-prefix.ts'
  if (!fs.existsSync(path)) {
    // Supported in rollup 4, we're currently rollup 2
    // this.error(`File not found: ${path}`);
    return;
  }

  let content = fs.readFileSync(path, 'utf-8');
  let updatedContent;
  if (isUndo) {
    updatedContent = content.replace(/acai-ts-sdk-script/g, 'acai-ts');
  } else {
    updatedContent = content.replace(/acai-ts/g, 'acai-ts-sdk-script');
  }

  fs.writeFileSync(path, updatedContent, 'utf-8');
  // Supported in rollup 4, we're currently rollup 2
  // this.info(`File updated: ${path}`);
}


const updateLibPrefixPlugin = () => {
  return {
    name: 'update-lib-prefix',
    buildStart() {
      updateLibPrefix(false);
    },
    buildEnd() {
      updateLibPrefix(true);
    }
  };
}

export const iife = {
  input: 'src/snippet-index.ts',
  output: {
    name: 'acai',
    file: 'lib/scripts/acai-min.js',
    format: 'iife',
    sourcemap: true,
  },
  plugins: [
    updateLibPrefixPlugin(),
    typescript({
      module: 'es2020',
      noEmit: false,
      outDir: 'lib/script',
      rootDir: 'src',
    }),
    resolve({
      browser: true,
    }),
    commonjs(),
    // Flatten source maps: Dependencies like @acai/analytics-core are pre-compiled by
    // TypeScript to lib/esm/*.js with corresponding lib/esm/*.js.map files that point back to
    // the original .ts sources. When Rollup bundles these, the sourcemaps() plugin reads those
    // intermediate source maps and chains them together. The result is a final source map that
    // points directly to the original .ts files, enabling one-step unminification from CDN.
    // Note: lib/cjs/ is for Node.js and not used in the browser IIFE bundle.
    sourcemaps(),
    terser({
      output: {
        comments: false,
      },
    }),
    gzip(),
  ],
};

export const snippet = {
  output: {
    name: 'acai',
    file: 'lib/scripts/acai-snippet-min.js',
    format: 'iife',
  },
  plugins: [
    createSnippet(),
    terser(),
    execute(
      `node ${base}/scripts/version/create-snippet-instructions.js && node ${base}/scripts/version/update-readme.js`,
    ),
  ],
};

const createGTMSnippet = () => {
  return {
    name: 'acai-gtm-snippet',
    options: (opt) => {
      return new Promise((resolve) => {
        opt.input = 'generated/acai-gtm-snippet.js';
        if (process.env.GENERATE_SNIPPET !== 'true') return resolve(opt);
        exec(
          `node ${base}/scripts/version/create-snippet.js --inputFile=acai-gtm-min.js --outputFile=acai-gtm-snippet.js --globalVar=acaiGTM --nameSuffix=-gtm`,
          (err) => {
            if (err) {
              throw err;
            }
            resolve(opt);
          },
        );
      });
    },
  };
};

export const iifeGTM = {
  input: 'src/gtm-snippet-index.ts',
  output: {
    name: 'acaiGTM',
    file: 'lib/scripts/acai-gtm-min.js',
    format: 'iife',
    sourcemap: true,
  },
  plugins: [
    typescript({
      module: 'es2020',
      noEmit: false,
      outDir: 'lib/script',
      rootDir: 'src',
    }),
    resolve({
      browser: true,
    }),
    commonjs(),
    // Flatten source maps: Dependencies like @acai/analytics-core are pre-compiled by
    // TypeScript to lib/esm/*.js with corresponding lib/esm/*.js.map files that point back to
    // the original .ts sources. When Rollup bundles these, the sourcemaps() plugin reads those
    // intermediate source maps and chains them together. The result is a final source map that
    // points directly to the original .ts files, enabling one-step unminification from CDN.
    // Note: lib/cjs/ is for Node.js and not used in the browser IIFE bundle.
    sourcemaps(),
    terser({
      output: {
        comments: false,
      },
    }),
    gzip(),
  ],
};

export const snippetGTM = {
  output: {
    name: 'acaiGTM', // the name of the window variable
    file: 'lib/scripts/acai-gtm-snippet-min.js',
    format: 'iife',
  },
  plugins: [createGTMSnippet(), terser()],
};

// Input: bookmarklet js template + acai js
// Output: bookmarklet js snippet
const createBookmarkletSnippet = () => {
  return {
    name: 'acai-bookmarklet-snippet',
    options: (opt) => {
      return new Promise((resolve) => {
        opt.input = 'generated/acai-bookmarklet-snippet.js';
        if (process.env.GENERATE_SNIPPET !== 'true') return resolve(opt);
        exec(`node ${base}/scripts/version/create-bookmarklet-snippet.js`, (err) => {
          if (err) {
            throw err;
          }
          resolve(opt);
        });
      });
    },
  };
};

// Input: bookmarklet js snippet
// Output: bookmarklet prefix + bookmarklet js snippet (url encoded)
export const bookmarklet = {
  output: {
    name: 'acai',
    file: 'lib/scripts/acai-bookmarklet-snippet-min.js',
    format: 'iife',
  },
  plugins: [createBookmarkletSnippet(), terser(), execute(`node ${base}/scripts/version/create-bookmarklet.js`)],
};

export const gtmSnippetBundle = {
  input: 'lib/acai-wrapper.js', // TODO: move this around
  output: {
    name: 'acaiGTM',
    file: 'lib/scripts/analytics-browser-gtm-wrapper.min.js',
    format: 'iife',
    sourcemap: true,
  },
  plugins: [
    terser({
      output: {
        comments: false,
      },
    }),
    gzip(),
    gzip({
      customCompression: (content) => brotliPromise(Buffer.from(content)),
      fileName: '.br',
    }),
    json(),
  ],
}
