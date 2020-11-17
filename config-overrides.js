module.exports = {
  webpack: function(config) {
    return {
      ...config,
      resolve: {
        alias: {
          src: path.resolve(__dirname, 'src'),
          tests: path.resolve(__dirname, 'tests')
        }
      }
    };
  },
};
