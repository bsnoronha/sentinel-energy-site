# ⚡ SENTINEL ENERGY — Public Portfolio Site

Repositório público destinado à hospedagem do site de portfólio estático do **SENTINEL ENERGY** via **GitHub Pages**.

## 📌 Propósito

Este repositório armazena e expõe publicamente os relatórios de inteligência energética, análises operacionais e placares de acurácia de previsões gerados de forma automatizada pelo pipeline de síntese do SENTINEL ENERGY.

## 🏗️ Estrutura de Diretórios

```
sentinel-energy-site/
├── css/
│   └── style.css           # Design system em CSS puro (dark mode, responsivo)
├── flash/
│   ├── .gitkeep
│   └── index.html          # Shell da categoria Flash Briefings (alertas ad hoc)
├── diario/
│   ├── .gitkeep
│   └── index.html          # Shell da categoria Relatórios Diários
├── placar/
│   ├── .gitkeep
│   └── index.html          # Shell da categoria Placar de Previsões (com disclaimer)
├── .gitignore              # Omissões padrão de arquivos temporários e IDE
├── .nojekyll               # Impede o processamento Jekyll pelo GitHub Pages
├── index.html              # Landing page principal (Shell raiz)
└── README.md               # Esta documentação
```

> [!NOTE]
> **Arquitetura de Shells Honestos**: Nesta etapa inicial, os arquivos `index.html` (raiz e subpastas) são shells visuais pré-estruturados com estado vazio ("*Nenhum relatório publicado ainda*"). A geração e atualização automatizada desses índices a partir dos arquivos HTML gerados será implementada na próxima etapa, através da integração com o `synthesis/publishing/publish_flow.py` no repositório principal do pipeline.

---

## 🚀 Guia de Setup Inicial e Publicação (Passo a Passo)

Siga as instruções abaixo no seu terminal para conectar este repositório local ao GitHub e ativar a publicação via GitHub Pages.

### 1. Inicializar o Repositório Local e Criar Commit Inicial

Navegue até a pasta deste repositório e execute:

```bash
cd /home/bsnoronha/Projects/SENTINEL_ENERGY/sentinel-energy-site
git init
git branch -M main
git add .
git commit -m "feat: estrutura inicial do site de portfolio SENTINEL ENERGY"
```

### 2. Criar Repositório no GitHub e Adicionar Remote

Crie um novo repositório **público** chamado `sentinel-energy-site` na sua conta do GitHub (via interface web do GitHub ou CLI `gh repo create sentinel-energy-site --public`).

Em seguida, adicione o *remote* e envie a branch `main`:

```bash
git remote add origin git@github.com:<SEU_USUARIO>/sentinel-energy-site.git
git push -u origin main
```

*(Substitua `<SEU_USUARIO>` pelo seu nome de usuário no GitHub).*

### 3. Habilitar o GitHub Pages

1. No GitHub, abra o repositório **`sentinel-energy-site`**.
2. Acesse **Settings** > **Pages** (no menu lateral esquerdo).
3. Na seção **Build and deployment**:
   - **Source**: Selecione `Deploy from a branch`.
   - **Branch**: Selecione `main` e a pasta `/ (root)`.
4. Clique em **Save**.

Após alguns instantes, o site estará acessível no endereço:
`https://<SEU_USUARIO>.github.io/sentinel-energy-site/`
