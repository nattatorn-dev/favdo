import fetch from 'node-fetch'
import ogs from 'open-graph-scraper'

async function fetchOpenGraphByUrl(url) {
  const options = { url }
  return await ogs(options, (err, results) => {
    return results
  })
}

export { fetchOpenGraphByUrl }
