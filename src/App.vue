<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
  export default {
    name: 'App'
  }
</script>

<style>
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video, input, div {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    /*font-weight: normal;*/
    /*vertical-align: baseline;*/
    /*cursor: pointer;*/
  }
  #app,html,body {
    font-family: PingFangSC-Regular, sans-serif;
    font-size: 13px;
    background: #ffffff;
    max-width: 750px;
    margin: 0 auto;
  }
  .mint-loadmore-text {
    text-align: center;
    line-height: 40px;
    /*display: block;*/
    display: none;
  }
  a {
    text-decoration: none;
  }
</style>
