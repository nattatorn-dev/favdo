/* eslint-disable no-console */
const express = require('express')
const bodyParser = require('body-parser')

const next = require('next')
const Wreck = require('wreck')
const cookieParser = require('cookie-parser')
const cookie = require('react-cookie')
const compression = require('compression')
const LRUCache = require('lru-cache')
const path = require('path')
const fs = require('fs')

const Router = require('./src/routes').Router
const logger = require('./server/logger')

const isDev = process.env.NODE_ENV !== 'production'
const isProd = !isDev
const ngrok = isDev && process.env.ENABLE_TUNNEL ? require('ngrok') : null

const customHost = process.env.HOST
const host = customHost || null
const prettyHost = customHost || 'localhost'
const port = parseInt(process.env.PORT, 10) || 3000

const app = next({ dir: 'src', dev: isDev })
const handle = app.getRequestHandler()

const ssrCache = new LRUCache({
  max: 100,
  maxAge: 3600 // 1 hour
})

const buildStats = isProd
  ? JSON.parse(
      fs.readFileSync('./src/.next/build-stats.json', 'utf8').toString()
    )
  : null

const buildId = isProd
  ? fs.readFileSync('./src/.next/BUILD_ID', 'utf8').toString()
  : null

/*
 * NB: make sure to modify this to take into account anything that should trigger
 * an immediate page change (e.g a locale stored in req.session)
 */
const getCacheKey = function getCacheKey(req) {
  return `${req.url}`
}

const renderAndCache = function renderAndCache(
  req,
  res,
  pagePath,
  queryParams
) {
  const key = getCacheKey(req)

  if (ssrCache.has(key) && !isDev) {
    console.log(`CACHE HIT: ${key}`)
    res.send(ssrCache.get(key))
    return
  }

  app
    .renderToHTML(req, res, pagePath, queryParams)
    .then(html => {
      // Let's cache this page
      if (!isDev) {
        console.log(`CACHE MISS: ${key}`)
        ssrCache.set(key, html)
      }

      res.send(html)
    })
    .catch(err => {
      app.renderError(err, req, res, pagePath, queryParams)
    })
}

const apiGetUser = token =>
  new Promise((resolve, reject) => {
    const query = 'query { me { id, username, dispName }}'

    Wreck.post(
      `http://localhost:4000/graphql`,
      {
        payload: {
          query
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      },
      (err, res, payload) => {
        if (err) {
          return reject(err)
        }

        try {
          const response = JSON.parse(payload)
          return resolve(response.data.me)
        } catch (err) {
          return reject(err)
        }
      }
    )
  })

/**
 * Handles the authentication of the user if the "token" cookie has been passed, the authenticated user is then available in req.user
 * @param {*} options
 */
const acceptToken = () =>
  function(req, res, next) {
    const token = req.cookies.token

    if (!token) {
      return next()
    }

    apiGetUser(token)
      .then(user => {
        req.user = user
        return next()
      })
      .catch(
        err => next(err)
        // return res.end(JSON.stringify(err));
      )
  }

app.prepare().then(() => {
  const server = express()

  server.use(bodyParser.json())
  server.use(cookieParser())
  server.use(acceptToken())
  server.use(compression({ threshold: 0 }))

  Router.forEachPattern((page, pattern, defaultParams) =>
    server.get(pattern, (req, res) =>
      renderAndCache(
        req,
        res,
        `/${page}`,
        Object.assign({}, defaultParams, req.query, req.params)
      )
    )
  )

  server.get('/sw.js', (req, res) =>
    app.serveStatic(req, res, path.resolve('./src/.next/sw.js'))
  )

  server.get('/manifest.html', (req, res) =>
    app.serveStatic(req, res, path.resolve('./src/.next/manifest.html'))
  )

  server.get('/manifest.appcache', (req, res) =>
    app.serveStatic(req, res, path.resolve('./src/.next/manifest.appcache'))
  )

  if (isProd) {
    server.get('/_next/-/app.js', (req, res) =>
      app.serveStatic(req, res, path.resolve('./src/.next/app.js'))
    )

    const hash = buildStats['app.js'] ? buildStats['app.js'].hash : buildId

    server.get(`/_next/${hash}/app.js`, (req, res) =>
      app.serveStatic(req, res, path.resolve('./src/.next/app.js'))
    )
  }

  server.get('*', (req, res) => {
    cookie.plugToRequest(req, res)
    return handle(req, res)
  })

  server.listen(port, host, err => {
    if (err) {
      return logger.error(err.message)
    }

    if (ngrok) {
      ngrok.connect(port, (innerErr, url) => {
        if (innerErr) {
          return logger.error(innerErr)
        }

        logger.appStarted(port, prettyHost, url)
      })
    } else {
      logger.appStarted(port, prettyHost)
    }
  })
})
