/**
 * @type {import('semantic-release').GlobalConfig}
 */
module.exports = {
    branches: ["main", "develop"],
    repositoryUrl: "https://jaimecruz:$GL_TOKEN@gitlab.com/gitlab-org/gitlab",
    plugins: [
        ['@semantic-release/commit-analyzer'],
        ['@semantic-release/release-notes-generator'],
        ['@semantic-release/changelog'],
        [
            "@semantic-release/gitlab",
            {
                "gitlabUrl": "https://custom.gitlab.com",
                "assets": [
                    { "path": "dist/asset.min.css", "label": "CSS distribution" },
                    { "path": "dist/asset.min.js", "label": "JS distribution", "target": "generic_package" },
                    { "path": "dist/asset.min.js", "label": "v${nextRelease.version}.js" },
                    { "url": "https://gitlab.com/gitlab-org/gitlab/-/blob/master/README.md" }
                ]
            }
        ]
    ]
};
