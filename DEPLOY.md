# 🐳 Deployment Docker Swarm - Futebol Image

## 📋 Pré-requisitos

1. **Docker Swarm ativo**
   ```bash
   docker swarm init
   ```

2. **Traefik já em execução** (para roteamento de domínios)
   - A stack Traefik deve estar criada
   - Network `traefik-public` deve existir

3. **Domínio configurado**
   - `futebol-image.seudominio.com` apontando para seu Swarm

## 🚀 Deploy via Portainer

### Opção 1: Upload do Arquivo

1. Abra Portainer → **Stacks**
2. Clique em **Add Stack**
3. Nome: `futebol-image`
4. Cola o conteúdo de `docker-compose.yml` ou faz upload do arquivo
5. Clique em **Deploy the stack**

### Opção 2: Git Repository (Recomendado)

1. Faça push desta pasta para seu Git (GitHub, GitLab, etc.)
2. Em Portainer → **Stacks** → **Add Stack**
3. Selecione **Git repository**
4. Preencha:
   - **Repository URL**: seu repo Git
   - **Repository ref**: `main` ou sua branch
   - **Compose path**: `docker-compose.yml`
5. Clique em **Deploy the stack**

## 🔧 Configurações Importantes

### Domínio (Traefik)

Edite no `docker-compose.yml` a linha:
```yaml
- "traefik.http.routers.futebol-image.rule=Host(`futebol-image.seudominio.com`)"
```

Troque `seudominio.com` pelo seu domínio real.

### Réplicas

Para escalar, mude em `deploy.replicas`:
```yaml
replicas: 2  # Aumentar para mais instâncias
```

### Porta

Se usar porta diferente de 3000, altere:
```yaml
environment:
  - PORT=3000
```

## 📊 Monitoramento

1. **Logs em Portainer**:
   - Stacks → `futebol-image` → Logs

2. **Status dos serviços**:
   - Stacks → `futebol-image` → Services

3. **Health check** (opcional):
   ```bash
   curl https://futebol-image.seudominio.com/
   # Resposta esperada: {"status":"ok"}
   ```

## 🔐 SSL/TLS

- Traefik + Let's Encrypt (automático via `certresolver: letsencrypt`)
- Certificado renovado automaticamente

## 📦 Build da Imagem

### Local (antes de fazer push)
```bash
docker build -t futebol-image:latest .
```

### Registry (se quiser usar registro privado)

1. Tag a imagem:
   ```bash
   docker tag futebol-image:latest seu-registry.com/futebol-image:latest
   ```

2. Push:
   ```bash
   docker push seu-registry.com/futebol-image:latest
   ```

3. Altere em `docker-compose.yml`:
   ```yaml
   image: seu-registry.com/futebol-image:latest
   remove: build:  # Se usar registry, remova a seção build
   ```

## 🛑 Remover Stack

```bash
docker stack rm futebol-image
```

## 📝 Notas

- **Réplicas**: 2 instâncias por padrão (alta disponibilidade)
- **Restart**: Automático em caso de falha
- **Network**: Overlay network compartilhada com Traefik
- **Volumes**: `/etc/localtime` para sincronizar horário

## ⚙️ Troubleshooting

### Serviço não inicia
```bash
docker service logs futebol-image_futebol-image
```

### Traefik não roteia
- Confirme que network `traefik-public` existe: `docker network ls`
- Verifique labels em `docker-compose.yml`

### HTTPS não funciona
- Verifique se Traefik está configurado com Let's Encrypt
- Confirme domínio no DNS

---

**Pronto para produção!** 🎯
