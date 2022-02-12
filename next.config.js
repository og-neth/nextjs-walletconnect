module.exports = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack}) => {

        config.experiments = {
            topLevelAwait: true
        }
        return config
    }
}