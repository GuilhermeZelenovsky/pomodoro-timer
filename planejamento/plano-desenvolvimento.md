# Plano de Desenvolvimento - Pomodoro Timer

## 1. Visão Geral do Projeto
Um aplicativo de timer Pomodoro para ajudar na produtividade e gestão de tempo, usando a técnica Pomodoro (25 minutos de foco + 5 minutos de pausa), agora desenvolvido em Next.js com funcionalidades avançadas de tracking e análise.

## 2. Status Atual do Projeto

### ✅ Deploy e Publicação (Agosto 2025)
- ✅ **Aplicação publicada no Vercel**
  - URL: https://pomodoro-timer-mu-tan.vercel.app
  - Deploy automático via GitHub
  - SSL/HTTPS configurado automaticamente
  
- ✅ **Repositório no GitHub**
  - URL: https://github.com/GuilhermeZelenovsky/pomodoro-timer
  - Código versionado com Git
  - Integração com Vercel para CI/CD

- 🔄 **Domínio Personalizado** (Em andamento)
  - Pesquisa de nomes criativos concluída
  - Próximo: Registro no Registro.br
  - Configuração DNS para Vercel

### ✅ Implementado (Fase 1 e 2 Completas)
- ✅ **Migração para Next.js com TypeScript**
  - Framework moderno com App Router
  - TypeScript para type safety
  - Tailwind CSS para estilização
  
- ✅ **Timer Completo**
  - Timer de 25 minutos (configurável)
  - Pausas curtas de 5 minutos (configurável)
  - Pausas longas de 15 minutos (configurável)
  - Transição automática entre sessões
  - Contador de ciclos Pomodoro
  
- ✅ **Sistema de Configurações**
  - Modal de configurações com interface minimalista
  - Campos numéricos com validação
  - 3 Presets prontos (Padrão, Intenso, Rápido)
  - Persistência via localStorage
  - Context API para estado global
  - Configurações disponíveis:
    - Tempo de Foco (15-60 min)
    - Pausa Curta (3-15 min)
    - Pausa Longa (10-30 min)
    - Sessões até Pausa Longa (2-6)
    - Som de Notificação (On/Off)
    - Auto-iniciar Próxima (On/Off)

## 3. Próximas Fases de Desenvolvimento

### Fase 3: Lista de Tarefas e Analytics (PRÓXIMO)
#### 3.1 Sistema de Tarefas
- [ ] **Componente de Lista de Tarefas**
  - Interface para adicionar/editar/remover tarefas
  - Marcar tarefa como ativa durante sessão
  - Checkbox para completar tarefas
  - Reordenação drag-and-drop
  
- [ ] **Integração Timer-Tarefa**
  - Associar sessão Pomodoro à tarefa ativa
  - Registrar tempo gasto por tarefa
  - Pausar/continuar tarefa entre sessões
  
- [ ] **Categorização**
  - Tags/categorias para tarefas
  - Filtros por categoria
  - Cores por categoria

#### 3.2 Analytics e Relatórios
- [ ] **Tracking de Sessões**
  - Registrar início/fim de cada sessão
  - Tipo de sessão (trabalho/pausa)
  - Tarefa associada
  - Duração real vs planejada
  
- [ ] **Dashboard de Produtividade**
  - Gráfico de sessões por dia/semana/mês
  - Tempo total por tarefa
  - Taxa de conclusão de tarefas
  - Heatmap de produtividade
  
- [ ] **Exportação de Dados**
  - CSV/JSON de sessões
  - Relatórios PDF
  - Integração com calendário

### Fase 4: Backend e Autenticação
#### 4.1 Banco de Dados
- [ ] **Escolha da Stack**
  - Opção 1: Supabase (PostgreSQL + Auth integrado)
  - Opção 2: PlanetScale (MySQL) + NextAuth
  - Opção 3: MongoDB Atlas + NextAuth
  
- [ ] **Schema do Banco**
  ```typescript
  // Usuários
  User {
    id: string
    email: string
    name: string
    settings: Settings
    createdAt: Date
  }
  
  // Tarefas
  Task {
    id: string
    userId: string
    title: string
    description?: string
    category?: string
    completed: boolean
    estimatedPomodoros: number
    actualPomodoros: number
    createdAt: Date
    completedAt?: Date
  }
  
  // Sessões
  Session {
    id: string
    userId: string
    taskId?: string
    type: 'work' | 'shortBreak' | 'longBreak'
    duration: number
    startedAt: Date
    endedAt: Date
    completed: boolean
  }
  ```

#### 4.2 Sistema de Autenticação
- [ ] **Login/Registro**
  - Email/senha
  - OAuth (Google, GitHub)
  - Magic link por email
  
- [ ] **Gerenciamento de Conta**
  - Perfil do usuário
  - Alterar senha
  - Excluir conta
  - Exportar dados (GDPR)

#### 4.3 API Routes
- [ ] **Endpoints REST/tRPC**
  - CRUD de tarefas
  - CRUD de sessões
  - Estatísticas e relatórios
  - Configurações do usuário

### Fase 5: Features Avançadas
- [ ] **Modo Offline**
  - Service Worker
  - Sincronização quando online
  
- [ ] **Notificações**
  - Browser notifications
  - Email de resumo diário/semanal
  
- [ ] **Gamificação**
  - Streaks de dias produtivos
  - Badges de conquistas
  - Ranking entre amigos
  
- [ ] **Integrações**
  - Google Calendar
  - Notion
  - Todoist
  - Slack

## 4. Stack Tecnológica Atualizada

### Frontend
- **Next.js 15**: Framework React com App Router
- **TypeScript**: Type safety
- **Tailwind CSS**: Estilização utility-first
- **React Context**: Estado global
- **Chart.js/Recharts**: Gráficos e visualizações

### Backend (Fase 4)
- **Next.js API Routes**: Backend serverless
- **Prisma**: ORM para banco de dados
- **NextAuth.js**: Autenticação
- **Banco de Dados**: Supabase/PlanetScale/MongoDB

### Ferramentas
- **ESLint**: Linting
- **Prettier**: Formatação
- **Jest/Vitest**: Testes
- **Playwright**: E2E tests

## 5. Estrutura de Arquivos Atualizada
```
pomodoro-next/
├── app/
│   ├── api/           # API routes (Fase 4)
│   ├── auth/          # Páginas de auth (Fase 4)
│   ├── dashboard/     # Dashboard analytics (Fase 3)
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── PomodoroTimer.tsx
│   ├── SettingsModal.tsx
│   ├── TaskList.tsx   # (Fase 3)
│   ├── TaskItem.tsx   # (Fase 3)
│   └── Analytics/     # (Fase 3)
├── contexts/
│   ├── SettingsContext.tsx
│   └── TaskContext.tsx # (Fase 3)
├── hooks/
│   ├── useLocalStorage.ts
│   └── useTimer.ts    # (Refactor)
├── lib/
│   ├── db.ts          # (Fase 4)
│   └── auth.ts        # (Fase 4)
├── types/
│   └── index.ts       # Type definitions
└── prisma/
    └── schema.prisma  # (Fase 4)
```

## 6. Cronograma Revisado

### ✅ Completo
- Setup Next.js e migração
- Timer com todas funcionalidades básicas
- Sistema de configurações personalizáveis

### 🔄 Em Andamento (Fase 3) - 2 semanas
**Semana 1: Lista de Tarefas**
- Dias 1-2: Componente de lista de tarefas
- Dias 3-4: Integração com timer
- Dia 5: Persistência local

**Semana 2: Analytics**
- Dias 1-2: Tracking de sessões
- Dias 3-4: Dashboard básico
- Dia 5: Exportação de dados

### 📅 Futuro (Fase 4) - 2-3 semanas
**Semana 1: Setup Backend**
- Dias 1-2: Configurar banco de dados
- Dias 3-5: Implementar schema e Prisma

**Semana 2: Autenticação**
- Dias 1-3: NextAuth setup
- Dias 4-5: Páginas de login/registro

**Semana 3: API e Integração**
- Dias 1-3: API routes
- Dias 4-5: Migração de dados locais

## 7. Considerações Técnicas

### Performance
- Lazy loading de componentes pesados
- Otimização de re-renders com memo
- Server Components onde possível

### Segurança (Fase 4)
- Validação de inputs
- Rate limiting nas APIs
- Sanitização de dados
- HTTPS obrigatório

### UX/UI
- Modo escuro (futuro)
- Responsivo mobile-first
- Acessibilidade (ARIA labels)
- Feedback visual imediato

## 8. Decisões a Tomar

1. **Banco de Dados**: Qual solução escolher?
   - Supabase (mais fácil, tudo incluído)
   - PlanetScale (escalável, MySQL)
   - MongoDB (flexível, NoSQL)

2. **Modelo de Dados**: 
   - Quanto detalhe capturar por sessão?
   - Arquivar dados antigos?

3. **Monetização** (futuro):
   - Freemium com limite de tarefas?
   - Plano Pro com analytics avançado?
   - Totalmente gratuito?

## 9. Métricas de Sucesso

### Técnicas
- ✅ Zero bugs críticos
- ✅ Performance < 3s load time
- 95% uptime (quando online)
- Testes com 80% coverage

### Produto
- Usuários completam setup em < 2 min
- Taxa de retenção > 40% após 1 semana
- NPS > 8
- 100+ usuários ativos mensais

## 10. Notas de Desenvolvimento

### Lições Aprendidas
- Context API simplifica compartilhamento de estado
- TypeScript previne muitos bugs em runtime
- Tailwind acelera muito o desenvolvimento de UI
- localStorage é suficiente para MVP

### Próximos Desafios
- Sincronização de dados offline/online
- Migração de dados do localStorage para DB
- Otimização de queries de analytics
- Escalabilidade da arquitetura

---

**Última atualização**: Dezembro 2024
**Status**: Fase 2 completa, iniciando Fase 3