# Whatsapp Bubble Widget (BETA)

A customizable Whatsapp Bubble Widget


## How to use

Build `wpb-[version].js` append `/dist/` on your website.
```
yarn build
```

Add `whatsapp-bubble-widget container` and `wpb script` before `</body>` close tag:
```html
<div id="whatsapp-bubble-widget"
  phone="56912345678"
  message="Hi, I need help!"
  tooltip-message="Hi, Ask me anything!"
>
</div>
<script src="../dist/wpb.[id compilado].min.js"></script>
```

## Attributes

| Atributo | Descripcion | Required | Value / Example |
| -------- | ------------ | -------- | --------------- |
| id | Container name **(don't change it)** | Yes | whatsapp-bubble-widget |
| phone | Whatsapp number | Yes | 56912345678 |
| message | Initial user conversation message | No | Hi, I need help! |
| tooltip-message | Tooltip message | No | Hi, Ask me anything! |
| background-color | Background color for image and tooltip | No | '#222222' |
| image-url | URL to custom image | No | /path/to/image.png |
| sound-url | URL to custom notification sound | No | /path/to/sound.mp3 |


## Developer instructions



Use this command for development:
```
yarn example
```