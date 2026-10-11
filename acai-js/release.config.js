module.exports = {
  "branches": ["main", "v8.x"],
  "plugins": [
    ["@semantic-release/commit-analyzer", {
      "preset": "angular",
      "parserOpts": {
        "noteKeywords": ["BREAKING CHANGE", "BREAKING CHANGES", "BREAKING"]
      }
    }],
    ["@semantic-release/release-notes-generator", {
      "preset": "angular",
    }],
    ["@semantic-release/changelog", {
      "changelogFile": "CHANGELOG.md"
    }],
    "@semantic-release/npm",
    ["@semantic-release/exec", {
      "prepareCmd": "make release && node scripts/create-snippet-instructions.js",
      "publishCmd": "python scripts/deploy_s3.py --version ${nextRelease.version}",
      "failCmd": "npm unpublish acai-js@${nextRelease.version}"
    }],
    ["@semantic-release/github", {
      "assets": "acai*.js"
    }],
    ["@semantic-release/git", {
      "assets": ["package.json", "src/acai-snippet.js", "CHANGELOG.md"],
      "message": "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
    }],
  ],
}
