# Design do Produto

Este documento descreve, em linguagem natural, as diretrizes de design do produto para manter consistência visual, boa usabilidade e identidade clara em todas as telas.

## 1. Cores

A paleta deve equilibrar clareza, confiança e boa legibilidade.

- **Cor primária**: usada em ações principais (botões de destaque, links principais, estados ativos de navegação).
- **Cor secundária**: usada para elementos de apoio (botões secundários, badges neutras, ícones auxiliares).
- **Cores de feedback**:
  - **Sucesso** para confirmações e mensagens positivas.
  - **Aviso** para atenção sem bloquear fluxo.
  - **Erro** para falhas, validações inválidas e situações críticas.
  - **Informação** para mensagens de contexto.
- **Neutros**: tons de cinza para fundo, bordas, textos e divisores.

Regras:
- Garantir contraste adequado entre texto e fundo para acessibilidade.
- Evitar usar cor como único indicador de estado; combinar com ícone, texto ou forma.
- Reservar a cor primária para ações realmente importantes.

## 2. Tipografia

A tipografia deve ser simples, legível e escalável em diferentes dispositivos.

- **Fonte base**: sans-serif moderna para interface.
- **Hierarquia textual**:
  - Títulos grandes para páginas e seções principais.
  - Subtítulos para agrupar blocos de conteúdo.
  - Texto de corpo para leitura contínua.
  - Legendas e texto auxiliar em tamanho menor.
- **Peso de fonte**:
  - Semibold/Bold para títulos e ênfases.
  - Regular para conteúdo principal.

Regras:
- Manter consistência nos tamanhos e pesos em todo o produto.
- Evitar excesso de variações de fonte.
- Garantir altura de linha confortável para leitura.

## 3. Componentes

Os componentes devem ser reutilizáveis e previsíveis no comportamento.

- **Botões**:
  - Primário, secundário e fantasma.
  - Estados: normal, hover, focus, ativo, desabilitado.
- **Campos de formulário**:
  - Label sempre visível.
  - Mensagem de erro clara e específica.
  - Estados de foco e validação evidentes.
- **Cards**:
  - Estrutura com título, conteúdo e ações opcionais.
  - Uso para agrupar informações relacionadas.
- **Navegação**:
  - Menu principal com indicação clara da página atual.
  - Breadcrumb quando houver hierarquia profunda.
- **Feedback de sistema**:
  - Alertas, toasts e estados vazios com linguagem direta.

Regras:
- Componentes devem manter o mesmo comportamento em todo o produto.
- Ícones devem ter significado claro e acompanhar texto quando necessário.
- Priorizar estados de foco visíveis para navegação por teclado.

## 4. Espaçamentos

O espaçamento organiza a interface e melhora a compreensão visual.

- Utilizar uma escala consistente (ex.: unidade base e múltiplos).
- Aplicar mais espaço entre seções distintas e menos espaço entre elementos relacionados.
- Garantir margens internas adequadas em cards, modais e formulários.

Regras:
- Evitar elementos “colados” entre si.
- Evitar espaços excessivos que prejudiquem densidade de informação.
- Manter alinhamento consistente em grades e listas.

## 5. Regras gerais do produto

Diretrizes transversais para todas as telas e fluxos.

- **Consistência**: mesmas decisões visuais e de interação em áreas diferentes.
- **Clareza**: linguagem objetiva, rótulos explícitos e ações previsíveis.
- **Acessibilidade**:
  - Navegação por teclado.
  - Contraste adequado.
  - Textos e controles compreensíveis para leitores de tela.
- **Responsividade**:
  - Interface adaptável para desktop, tablet e mobile.
  - Priorização de conteúdo essencial em telas menores.
- **Performance percebida**:
  - Exibir estados de carregamento quando necessário.
  - Evitar bloqueios de interface em operações longas.

## 6. Evolução do design

Este documento deve evoluir junto com o produto.

- Sempre que surgir novo padrão visual, registrar aqui.
- Revisar periodicamente para remover inconsistências.
- Validar decisões de design com uso real e feedback de usuários.
