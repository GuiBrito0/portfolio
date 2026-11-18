# Portfólio – Guilherme Brito

Portfólio pessoal desenvolvido durante a graduação em Engenharia de Software (UCSal), como parte dos estudos de Front-End. O site é estático, feito apenas com HTML, CSS e JavaScript puro, sem dependências ou etapa de build.

## Funcionalidades

- **Tema claro/escuro:** botão no cabeçalho alterna entre os temas.
- **Seção Sobre:** apresentação, ficha com objetivo atual e botão "Mostrar mais/menos" para expandir informações.
- **Conhecimentos:** HTML, CSS, Tailwind, JavaScript e Java.
- **Projetos:**
  - formulário de cadastro de projetos com validação e contador de caracteres;
  - filtro por categoria;
  - remoção de projetos cadastrados;
  - páginas de projetos, como o [Clube.html](Clube.html) (Bahia Futebol Clube).
- **Contato:** formulário com validação, contador de caracteres da mensagem e campo "Assunto" que só aparece quando o motivo é "Outro".
- **Acessibilidade:** `aria-label`, `aria-pressed`, `aria-expanded` e `aria-describedby` nos elementos interativos.

## Estrutura

```
portfolio/
├── index.html    # Página principal
├── Clube.html    # Página do projeto do Bahia
├── style.css     # Estilos
├── script.js     # Interações (tema, formulários, filtro)
└── img/          # Imagens
```

## Como executar

Não há dependências. Basta clonar o repositório e abrir o `index.html` no navegador:

```bash
git clone https://github.com/GuiBrito0/portfolio.git
cd portfolio
```

Opcionalmente, use uma extensão como o Live Server do VS Code.

## Tecnologias

- HTML5
- CSS3
- JavaScript (ES6+)

## Autor

**Guilherme Brito**
- GitHub: [@GuiBrito0](https://github.com/GuiBrito0)
