import 'dotenv/config'
import fastifyStatic from '@fastify/static'
import fastify from 'fastify'
import puppeteer from 'puppeteer'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { html } from './html.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const server = fastify()

server.register(fastifyStatic, {
  root: __dirname
})

const browser = await puppeteer.launch()

server.get('/', async () => {
  return { status: 'ok' }
})

server.post('/', async (request, reply) => {
  const { url1, url2 } = request.body || {}

  if (!url1) {
    return reply.status(400).send({ error: 'url1 é obrigatório' })
  }
  if (!url2) {
    return reply.status(400).send({ error: 'url2 é obrigatório' })
  }

  const host = request.headers['x-forwarded-host'] || request.headers.host
  const proto = request.headers['x-forwarded-proto'] || 'http'
  const baseURL = `${proto}://${host}`

  const page = await browser.newPage()

  await page.setViewport({ width: 1080, height: 1350 })
  await page.setContent(html(url1, url2, baseURL), {
    waitUntil: 'networkidle0'
  })

  const buffer = await page.screenshot({
    type: 'png',
    clip: { x: 0, y: 0, width: 1080, height: 1350 }
  })

  await page.close()

  reply.type('image/png').send(buffer)
})

server.listen({ port: process.env.PORT || 3000 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server rodando em ${address}`)
})