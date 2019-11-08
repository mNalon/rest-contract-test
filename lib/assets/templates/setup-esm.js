const BAZ_SCHEMA = {
  type: 'object',
  properties: {
    id: {
      type: 'integer'
    }
  }
}

const QUX_SCHEMA = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    }
  }
}

const setup = async () => ({
  httpServer: 'http://foo.bar',
  endpointsToValidate: [{
    path: '/baz', schema: BAZ_SCHEMA
  }, {
    path: '/baz', schema: QUX_SCHEMA
  }]
})

export { setup }
