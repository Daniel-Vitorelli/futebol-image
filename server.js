import 'dotenv/config'
import fastifyStatic from '@fastify/static'
import fastify from 'fastify'
import puppeteer from 'puppeteer'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { template_4_5_times } from './html/4-5-times.js'
import { template_1200_628_times } from './html/1200-628-times.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const server = fastify({
  trustProxy: true
})

server.register(fastifyStatic, {
  root: __dirname
})

const browser = await puppeteer.launch({
  args: ['--no-sandbox', '--disable-setuid-sandbox']
})

server.get('/', async () => {
  return { status: 'ok' }
})

server.post('/', async (request, reply) => {
  const { 
    url1,
    url2,
    fundo,
    texto1,
    texto2,
    type
  } = request.body || {}

  if (!url1) {
    return reply.status(400).send({ error: 'url1 é obrigatório' })
  }
  if (!url2) {
    return reply.status(400).send({ error: 'url2 é obrigatório' })
  }
  if (!fundo) {
    return reply.status(400).send({ error: 'fundo é obrigatório' })
  }
  if (!type) {
    return reply.status(400).send({ error: 'type é obrigatório, use 4:5-times' })
  }

  const data = {
    url1,
    url2,
    fundo,
    texto1,
    texto2
  }

  let width = 1080
  let height = 1080

  switch (type) {
    case '4:5-times':
      width = 1080
      height = 1350
      break
    case '1200:628-times':
      width = 1200
      height = 628
      break
    default:
      return reply.status(400).send({ error: 'Tipo de imagem inválido, use 4:5-times ou 1200:628-times' })
  }

  const page = await browser.newPage()

  await page.setViewport({ width, height })
  
  let htmlContent = ''
  switch (type) {
    case '4:5-times':
      htmlContent = template_4_5_times({ ...data })
      break
    case '1200:628-times':
      htmlContent = template_1200_628_times({ ...data })
      break
    default:
      return reply.status(400).send({ error: 'Tipo de imagem inválido' })
  }
  
  await page.setContent(htmlContent, {
    waitUntil: 'networkidle0'
  })

  const buffer = await page.screenshot({
    type: 'jpeg',
    clip: { x: 0, y: 0, width, height }
  })

  await page.close()

  console.log({
    message: 'Imagem gerada com sucesso',
    ...data,
    type
  })

  reply.type('image/jpeg').send(buffer)
})

server.listen({ port: process.env.PORT || 3000, host: process.env.HOST || '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server rodando em ${address}`)
})