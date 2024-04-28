/**
 * @type {import('semantic-release').GlobalConfig}
 */
module.exports = {
    branches: ["main", "develop"],
    plugins: [
        ['@semantic-release/commit-analyzer'],
        ['@semantic-release/release-notes-generator'],
        ['@semantic-release/changelog'],
        ['@semantic-release/git', {
            assets: ['package.json', 'CHANGELOG.md'],
            message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
        }]
    ]
};
