# Art Colchões · site institucional

Next.js 16 (App Router) + Tailwind v4 + GSAP 3.15 (ScrollTrigger, ScrollSmoother, SplitText, Flip, DrawSVG).
Export estático: roda na Vercel ou em qualquer hospedagem de arquivos (Hostinger).

## Rotas

Direção V1 "Showroom Editorial" (aprovada em 23/09/2026) no tema noturno, multipágina:

| Rota | O que é |
| --- | --- |
| `/` | Home: hero, marcas, diferenciais, ambientes, atalhos, sobre e contato |
| `/produtos/` | Catálogo de colchões com filtro, categorias e guia de firmeza |
| `/tecnologia/` | Explicador de camadas e tecnologias Pikolin |
| `/duvidas/` | FAQ (com dados estruturados FAQPage) |
| `/campanha/` | Landing de campanha (10.10) com contagem regressiva e ofertas |

O código das páginas fica em `src/views/` (`ui.tsx` tem as rotas, o menu e o `Shell`).
As direções V2 e V3 foram removidas e continuam no histórico do git (commit `573c768`).

## Desenvolvimento

```bash
npm install
npm run dev
```

## Onde editar o conteúdo

- `src/lib/site.ts`: contatos, endereço, horários, diferenciais, marcas, cidades e FAQ (tudo do briefing)
- `src/lib/products.ts`: catálogo dos 11 colchões expostos (Pikolin e Mannes) e camadas do explicador de tecnologia
- `src/lib/campaign.ts`: dados da campanha (datas, horário especial, ofertas de/por, produtos em destaque).
  Com `preview: true` a página mostra o aviso de "ofertas de exemplo"
- `public/img/`: fotos otimizadas. Para regerar a partir dos originais: `node scripts/prepare-images.mjs`
- `public/img/produto-*`: fotos de produto recortadas das lâminas de catálogo (`../assets-cliente/catalogo`),
  com o fundo removido: `node scripts/prepare-catalog.mjs`

## Deploy

### Vercel
Importar o repositório: o preset Next.js detecta tudo sozinho (`output: "export"` já está configurado).

### Hostinger (hospedagem compartilhada)
```bash
npm run build
```
Enviar o **conteúdo** da pasta `out/` para `public_html/`. Como está com `trailingSlash: true`,
cada rota vira `rota/index.html` e funciona no Apache sem configuração extra.

## Preview na rede local

Com `npm run dev` o site já abre no celular pelo IP da máquina (`http://<ip>:3000`, liberado em
`allowedDevOrigins` no `next.config.ts`). Para testar a versão final (mais fiel em desempenho):

```bash
npm run build
npx serve out -l tcp://0.0.0.0:4000
```
Abrir `http://<ip-da-máquina>:4000` no celular (mesma rede Wi-Fi).

## Pendências com o cliente

- Fotos de produto de Cure, Dense, Balance, Equilibrium, Activeness e Inspire no mesmo padrão das lâminas
  (Cure e Dense usam foto do showroom; os outros 4 ainda aparecem como ilustração)
- Firmeza do Nova York; medidas disponíveis e garantia de cada modelo
- Confirmar se Herval e D'Angelis entram só como marcas de cama & banho/bases
- Instagram integrado: conectar a conta @artcolchoesbrusque num serviço de feed (ex.: Behold) ou na Graph API
- Domínio: `artcolchoes.com.br` já está registrado por terceiros; definir alternativa (`site.url` em `src/lib/site.ts`)
- Ofertas reais da campanha 10.10 (hoje são as do Mês do Cliente como exemplo; trocar e pôr `preview: false`)
- Logo da Art Colchões em vetor (SVG/PDF/AI). O logo atual é um PNG tirado de um JPG; o PDF "Logo pdf atualizada" é o da D'Angelis
