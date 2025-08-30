
# Comandos para Deploy - Pomodoro Timer

Este documento contém todos os comandos utilizados para fazer o deploy do projeto Pomodoro Timer.

## ✅ Status Atual (Agosto 2025)
- **Deploy Vercel:** https://pomodoro-timer-mu-tan.vercel.app
- **GitHub:** https://github.com/GuilhermeZelenovsky/pomodoro-timer
- **Próximo:** Configurar domínio personalizado

## 📋 Sumário
- [Histórico de Deploy](#histórico-de-deploy)
- [Vercel Deploy](#vercel-deploy)
- [GitHub Repository](#github-repository)
- [Domínio Personalizado](#domínio-personalizado)
- [Atualizações Futuras](#atualizações-futuras)

---

## 📅 Histórico de Deploy

### Agosto 2025 - Deploy Completo

#### Comandos Executados:
```bash
# 1. Inicialização do Git
git init
git add .
git commit -m "feat: adiciona aplicação Pomodoro Timer completa com configurações personalizáveis"

# 2. Autenticação GitHub CLI
gh auth login

# 3. Criação e push para GitHub
gh repo create pomodoro-timer --public --source=. --remote=origin --push

# 4. Deploy no Vercel
vercel --prod
```

#### URLs Geradas:
- **Produção:** https://pomodoro-timer-mu-tan.vercel.app
- **GitHub:** https://github.com/GuilhermeZelenovsky/pomodoro-timer

---

## 🚀 Vercel Deploy

### 1. Preparar o Projeto

```bash
# Testar se o build funciona
npm run build

# Se houver erros de TypeScript, corrigi-los primeiro
```

### 2. Instalar Vercel CLI

```bash
# Instalar globalmente
npm install -g vercel

# Ou no Windows com winget
winget install --id Vercel.Vercel
```

### 3. Fazer Login na Vercel

```bash
# Fazer login (abrirá o navegador)
vercel login

# Escolher método de autenticação:
# - GitHub (recomendado)
# - GitLab
# - Bitbucket
# - Email
```

### 4. Deploy Inicial

```bash
# Deploy de desenvolvimento (preview)
vercel

# Responder as perguntas:
# - Set up and deploy? → Y
# - Which scope? → Sua conta
# - Link to existing project? → N (primeira vez)
# - Project name? → pomodoro-timer
# - Directory? → ./ (pasta atual)
```

### 5. Deploy de Produção

```bash
# Deploy final para produção
vercel --prod

# Com confirmação automática
vercel --prod --yes
```

### 6. URLs Geradas

Após o deploy, você terá:
- **Preview:** `https://pomodoro-timer-xxx.vercel.app`
- **Production:** `https://pomodoro-timer.vercel.app`
- **Dashboard:** `https://vercel.com/seu-usuario/pomodoro-timer`

---

## 🐙 GitHub Repository

### 1. Instalar GitHub CLI

```bash
# Windows (winget)
winget install --id GitHub.cli

# Windows (Chocolatey)
choco install gh

# macOS
brew install gh

# Linux (Debian/Ubuntu)
sudo apt install gh
```

### 2. Autenticação GitHub CLI

```bash
# Login no GitHub
gh auth login

# Selecionar:
# → GitHub.com
# → HTTPS
# → Authenticate with browser

# Verificar autenticação
gh auth status
```

### 3. Criar Repositório via CLI

```bash
# Criar repositório e fazer push de uma vez
gh repo create pomodoro-timer \
  --public \
  --source=. \
  --remote=origin \
  --push \
  --description="Aplicação Pomodoro Timer com Next.js e React"
```

### 4. Ou Criar Manualmente e Conectar

```bash
# Se criar pelo site github.com/new, depois conectar:

# Adicionar remote
git remote add origin https://github.com/SEU_USUARIO/pomodoro-timer.git

# Verificar remote
git remote -v

# Fazer primeiro push
git push -u origin master

# Ou se o branch for main
git push -u origin main
```

---

## 🔄 Atualizações Futuras

### Fluxo de Atualização Completo

```bash
# 1. Fazer alterações no código

# 2. Adicionar mudanças ao Git
git add .

# 3. Fazer commit
git commit -m "feat: descrição da mudança"

# 4. Push para GitHub
git push

# 5. Deploy na Vercel
vercel --prod
```

### Deploy Automático com GitHub

Se conectar Vercel ao GitHub pelo painel web:
```bash
# Apenas fazer push já faz deploy automático
git add .
git commit -m "sua mensagem"
git push
# Vercel detecta e faz deploy automaticamente!
```

---

## 🌐 Domínio Personalizado

### Sugestões de Nomes (Top 5):
1. **tomatempo.com.br** ⭐ - Fusão perfeita
2. **pomoflow.com.br** ⭐ - Moderno
3. **tomatick.com.br** ⭐ - Divertido
4. **focustomato.com.br** - Descritivo
5. **pomozen.com.br** - Calmo

### Processo Completo:

#### 1. Registro no Registro.br
```bash
# Após criar conta e comprar domínio (R$ 40/ano)
# Configurar nameservers para:
ns1.vercel-dns.com
ns2.vercel-dns.com
```

#### 2. Na Vercel (via CLI)

```bash
# Adicionar domínio customizado
vercel domains add tomatempo.com.br

# Listar domínios
vercel domains ls

# Verificar configuração DNS
vercel domains inspect tomatempo.com.br

# Verificar propagação DNS (pode levar até 48h)
nslookup tomatempo.com.br
dig tomatempo.com.br
```

#### 3. Na Vercel (via Dashboard)

1. Acessar: `https://vercel.com/guilhermezelenonsky/pomodoro-timer/settings/domains`
2. Clicar em "Add Domain"
3. Digitar seu domínio
4. Seguir instruções de DNS

---

## 🆘 Comandos Úteis

### Vercel

```bash
# Ver status do projeto
vercel ls

# Ver logs do deploy
vercel logs

# Ver variáveis de ambiente
vercel env ls

# Adicionar variável de ambiente
vercel env add NOME_VARIAVEL

# Rollback para versão anterior
vercel rollback

# Remover projeto
vercel remove pomodoro-timer
```

### Git/GitHub

```bash
# Ver status
git status

# Ver histórico
git log --oneline

# Ver branches
git branch -a

# Criar branch
git checkout -b nova-feature

# Voltar para master
git checkout master

# Ver diferenças
git diff

# Desfazer mudanças locais
git checkout -- arquivo.tsx

# Resetar para último commit
git reset --hard HEAD
```

### GitHub CLI

```bash
# Ver informações do repo
gh repo view

# Criar issue
gh issue create

# Criar pull request
gh pr create

# Ver PRs abertos
gh pr list

# Clonar repositório
gh repo clone usuario/pomodoro-timer
```

---

## 📝 Notas Importantes

### Estrutura de Branches
- `master` ou `main`: Produção
- `develop`: Desenvolvimento
- `feature/*`: Novas funcionalidades

### Convenções de Commit
```bash
# Formato
tipo: descrição

# Tipos comuns
feat: nova funcionalidade
fix: correção de bug
docs: documentação
style: formatação
refactor: refatoração
test: testes
chore: tarefas gerais
```

### Variáveis de Ambiente
```bash
# Criar arquivo .env.local
touch .env.local

# Adicionar variáveis
echo "NEXT_PUBLIC_API_URL=https://api.exemplo.com" >> .env.local

# Na Vercel
vercel env add NEXT_PUBLIC_API_URL production
```

---

## 🔗 Links Úteis

- **Vercel Dashboard:** https://vercel.com/dashboard
- **GitHub:** https://github.com/SEU_USUARIO/pomodoro-timer
- **Documentação Vercel:** https://vercel.com/docs
- **Documentação GitHub CLI:** https://cli.github.com/manual/

---

*Última atualização: Dezembro 2024*
*Projeto: Pomodoro Timer - Next.js + React + TypeScript*