const SETUP_SCHEMA = {
  type: 'object',
  required: [
    'httpServer',
    'endpointsToValidate'
  ],
  properties: {
    httpServer: {
      type: 'string'
    },
    endpointsToValidate: {
      type: 'array',
      items: {
        type: 'object',
        required: [
          'path',
          'schema'
        ],
        properties: {
          path: {
            type: 'string'
          },
          schema: {
            type: 'object'
          },
          headers: {
            type: 'object'
          }
        }
      }
    }
  }
}

module.exports = {
  SETUP_SCHEMA
}
