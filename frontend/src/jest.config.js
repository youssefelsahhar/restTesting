module.exports = {
    transform: {
      '^.+\\.[t|j]sx?$': 'babel-jest',
    },
    moduleNameMapper: {
        "^react-router-dom$": require.resolve("react-router-dom"),
      } 
  };
  