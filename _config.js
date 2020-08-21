var config = {}

// Update to have your correct username and password
config.mongoURI = {
    production: 'mongodb+srv://noshki123:noshki123@gpcluster.1veny.mongodb.net/darkroom?retryWrites=true&w=majority',
    development: 'mmongodb+srv://noshki123:noshki123@gpcluster.1veny.mongodb.net/darkroom-dev?retryWrites=true&w=majority',
    test: 'mongodb+srv://noshki123:noshki123@gpcluster.1veny.mongodb.net/darkroom-test?retryWrites=true&w=majority',
}
module.exports = config;