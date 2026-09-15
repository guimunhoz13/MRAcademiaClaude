# MR Academia — Landing Page

Landing page para a MR Academia, academia de bairro no Planalto, Araçatuba - SP.

## Estrutura

```
index.html      Marcação da página (uma única página)
css/style.css   Estilos, tokens de marca e responsividade
js/main.js      Menu mobile + animações de entrada (GSAP)
assets/logo.png Logo oficial da MR Academia
```

Sem build step: é HTML/CSS/JS puro. GSAP é carregado via CDN (cdnjs).

## Rodar localmente

```bash
python3 -m http.server 8000
```

Depois abra `http://localhost:8000`.

## Conteúdo

Todo o conteúdo (endereço, telefone, horário, avaliações) vem do perfil público
da MR Academia no Google/Facebook. Não há preços de plano — os três cartões de
planos (Mensal, Trimestral, Anual) levam direto para uma conversa no WhatsApp
com mensagem pronta, sem valor exibido no site.

**Confirme antes de publicar:** o número usado nos botões de WhatsApp é
`(18) 3622-8886`, o telefone público da academia. Se esse não for o número
correto para atendimento via WhatsApp, atualize as ocorrências de
`551836228886` em `index.html`.
