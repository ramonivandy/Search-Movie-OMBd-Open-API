const axios = require('axios').default;

class Http {
    constructor(options = {}) {
        this.axios = axios.create({
            timeout: 10000,
            ...options
        })
    }

    async get(url, params = {}) {
        return await this.axios.get(url, { params })
          .then(({ data }) => Promise.resolve({err:null, data: data}))
          .catch((err) => Promise.resolve({err: err, data: null}));
      }
}

module.exports = Http;