import 'dotenv/config'
import fastifyStatic from '@fastify/static'
import fastify from 'fastify'
import puppeteer from 'puppeteer'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { template_4_5 } from './html/4-5.js'
import { template_9_16 } from './html/9-16.js'
import { template_1_1 } from './html/1-1.js'
import { template_16_9 } from './html/16-9.js'

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
    return reply.status(400).send({ error: 'type é obrigatório, use 4-5 ou 9-16 ou 1-1' })
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
    case '4-5':
      width = 1080
      height = 1350
      break
    case '9-16':
      width = 1080
      height = 1920
      break
    case '1-1':
      width = 1080
      height = 1080
      break
    case '16-9':
      width = 1920
      height = 1080
      break
    default:
      return reply.status(400).send({ error: 'Tipo de imagem inválido, use 4-5 ou 9-16 ou 1-1' })
  }

  const page = await browser.newPage()

  await page.setViewport({ width, height })
  
  let htmlContent = ''
  switch (type) {
    case '4-5':
      htmlContent = template_4_5({ ...data })
      break
    case '9-16':
      htmlContent = template_9_16({ ...data })
      break
    case '1-1':
      htmlContent = template_1_1({ ...data })
      break
    case '16-9':
      htmlContent = template_16_9({ ...data })
      break
    default:
      return reply.status(400).send({ error: 'Tipo de imagem inválido' })
  }

  await page.setContent(htmlContent, {
    waitUntil: 'networkidle0'
  })

  const buffer = await page.screenshot({
    type: 'jpeg',
    clip: { x: 0, y: 0, width, height },
  })

  await page.close()

  console.log({
    message: 'Imagem gerada com sucesso',
    ...data,
    type,
    timeStamp: new Date().toISOString()
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