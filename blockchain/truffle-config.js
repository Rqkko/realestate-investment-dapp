module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,            // Ganache default port
      network_id: "*",       // Match any network id
    },
  },

  compilers: {
    solc: {
      version: "0.8.20",     // Must match your OpenZeppelin version
      settings: {
        optimizer: {
          enabled: true,     // Enable optimizer
          runs: 200          // Optimize for 200 runs
        },
        evmVersion: "istanbul" // Default EVM version
      }
    }
  },

  mocha: {
    timeout: 4000           // Test timeout in ms
  },

  // Fix for uWS warning (optional)
  dashboard: {
    port: 24012
  }
};