import 'dotenv/config'
import fastifyStatic from '@fastify/static'
import fastify from 'fastify'
import puppeteer from 'puppeteer'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

// Importação dos templates
import { template_4_5 } from './html/4-5.js'
import { template_9_16 } from './html/9-16.js'
import { template_1_1 } from './html/1-1.js'
import { template_16_9 } from './html/16-9.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const server = fastify({
  trustProxy: true,
})

server.register(fastifyStatic, {
  root: __dirname
})

// 1. Remoção de Código Duplicado (DRY)
const templatesMap = {
  '4-5': { width: 1080, height: 1350, template: template_4_5 },
  '9-16': { width: 1080, height: 1920, template: template_9_16 },
  '1-1': { width: 1080, height: 1080, template: template_1_1 },
  '16-9': { width: 1920, height: 1080, template: template_16_9 }
}

// 2. Validação de Dados Nativa do Fastify (JSON Schema)
const postBodySchema = {
  body: {
    type: 'object',
    required: ['url1', 'url2', 'fundo', 'type'],
    properties: {
      url1: { type: 'string', minLength: 1 },
      url2: { type: 'string', minLength: 1 },
      fundo: { type: 'string', minLength: 1 },
      texto1: { type: 'string' },
      texto2: { type: 'string' },
      type: { type: 'string', enum: Object.keys(templatesMap) } // Aceita apenas chaves válidas do map
    }
  }
}

// Iniciando o Puppeteer fora das rotas
const browser = await puppeteer.launch({
  args: ['--no-sandbox', '--disable-setuid-sandbox']
})

server.get('/', async () => {
  return { status: 'ok' }
})

// Middleware de Autenticação
const authenticate = async (request, reply) => {
  const apiKey = request.headers['x-api-key'] // Pega a chave enviada no cabeçalho

  // Compara com a chave que está no seu .env
  if (!apiKey || apiKey !== process.env.API_SECRET_KEY) {
    // Se não tiver chave ou for inválida, barra a requisição com status 401 (Unauthorized)
    reply.status(401).send({ error: 'Acesso não autorizado. Chave de API inválida.' })
  }
}

// Rota POST utilizando o schema para barrar requisições inválidas automaticamente
server.post('/', { 
  schema: postBodySchema, 
  preHandler: authenticate
}, async (request, reply) => {
  const { url1, url2, fundo, texto1, texto2, type } = request.body

  const { width, height, template } = templatesMap[type]
  
  const data = { url1, url2, fundo, texto1, texto2 }
  const htmlContent = template(data)

  let page;

  // 3. Prevenção de Vazamento de Memória (Memory Leak)
  try {
    page = await browser.newPage()
    await page.setViewport({ width, height })

    await page.setContent(htmlContent, {
      waitUntil: 'networkidle0'
    })

    // 4. Otimização do Script de Carregamento (Aliviando a CPU)
    await page.evaluate(async () => {
      // Selecionando apenas elementos que costumam ter background ou são imagens
      const selectors = Array.from(document.querySelectorAll('img, div, section, span, header, footer, main, article, figure'));
      
      const promises = selectors.map(el => {
        // Se for <img>, espera o onload
        if (el.tagName === 'IMG' && el.src) {
          return new Promise(r => { 
            if (el.complete) r(); 
            else { el.onload = r; el.onerror = r; } 
          });
        }
        
        // Se tiver background-image no CSS, extrai a URL e espera carregar
        const bg = getComputedStyle(el).backgroundImage;
        if (bg && bg !== 'none') {
          const url = bg.match(/url\(["']?([^"']+)["']?\)/)?.[1];
          if (url) {
            return new Promise(r => {
              const img = new Image();
              img.onload = r;
              img.onerror = r;
              img.src = url;
            });
          }
        }
        return Promise.resolve();
      });
      await Promise.all(promises);
    });

    const buffer = await page.screenshot({
      type: 'jpeg',
      clip: { x: 0, y: 0, width, height },
    })

    console.log({
      message: 'Imagem gerada com sucesso',
      ...data,
      type,
      timeStamp: new Date().toISOString()
    })

    reply.type('image/jpeg').send(buffer)

  } catch (error) {
    console.error('Erro durante a geração da imagem:', error)
    reply.status(500).send({ error: 'Erro interno ao processar e gerar a imagem' })
  } finally {
    // Garante que a página sempre será fechada, independentemente de erros ou sucesso
    if (page) {
      await page.close().catch(e => console.error('Erro silencioso ao fechar a página:', e))
    }
  }
})

// Inicialização do Servidor
server.listen({ port: process.env.PORT || 3000, host: process.env.HOST || '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server rodando em ${address}`)
})