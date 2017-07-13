import express from 'express'
import { createServer } from 'http'
import cors from 'cors'
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import bodyParser from 'body-parser'
import { execute, subscribe } from 'graphql'

import { apolloUploadExpress } from 'apollo-upload-server'

import { schema } from './schema'
import UserModel from './User'
const jwt = require('jwt-simple')
require('dotenv').config()

import mongoose from 'mongoose'
// DB Setup
const mongoUri = process.env.MONGODB_URL

mongoose.Promise = require('bluebird')
mongoose.connect(mongoUri, function(err) {
  if (err) {
    console.log('connection error', err + ' on ' + mongoUri)
  } else {
    console.log('connection to ' + mongoUri + ' successful')
  }
})

const graphqlPath = '/graphql'
const graphiqlPath = '/graphiql'
const graphqlOptions = { schema }
const subscriptionsPath = '/subscriptions'

const graphiqlOptions = {
  endpointURL: graphqlPath,
  subscriptionsEndpoint: 'ws://localhost:4000' + subscriptionsPath,
}

const server = express()
const httpServer = createServer(server)

const tokenParser = () => {
  return (req, res, next) => {
    let token = req.query['access_token']

    // Parse Bearer Token
    if (req.headers['authorization']) {
      const splits = req.headers['authorization'].split(' ')

      if (splits.length < 2) {
        return next()
      }

      token = splits[1]
    }

    if (!token) {
      return next()
    }

    // Fetch user
    var userObj = jwt.decode(token, process.env.SECRET)
    if (!userObj || !userObj.login) {
      res.setHeader('Content-Type', 'application/json')
      return res.end(
        JSON.stringify({
          errors: [{ message: 'USER_DOES_NOT_EXIST' }],
        })
      )
    }
    UserModel.findOne({ username: userObj.login }).then(user => {
      if (!user) {
        res.setHeader('Content-Type', 'application/json')
        return res.end(
          JSON.stringify({
            errors: [{ message: 'USER_DOES_NOT_EXIST' }],
          })
        )
      } else {
        req.user = user
        return next()
      }
    })
  }
}

server.use(tokenParser())

server.use(
  graphqlPath,
  cors(),
  bodyParser.json(),
  apolloUploadExpress({
    uploadDir: '/tmp/uploads',
  }),
  graphqlExpress(req => {
    const query = req.query.query || req.body.query
    if (query && query.length > 2000) {
      throw new Error('Query too large.')
    }

    return {
      schema,
      graphiql: true,
      pretty: true,
      rootValue: {
        user: req.user,
      },
    }
  })
)

server.use(graphiqlPath, graphiqlExpress(graphiqlOptions))

server.get('/', function(req, res) {
  res.send('Hello World!')
})

httpServer.listen(4000, '0.0.0.0', err => {
  if (err) throw err
  console.log('> ready on localhost:4000')
})

new SubscriptionServer(
  {
    schema,
    execute,
    subscribe,
    onConnect() {
      console.log('Client connected')
    },
    onDisconnect() {
      console.log('Client disconnected')
    },
  },
  { server: httpServer, path: subscriptionsPath }
)
