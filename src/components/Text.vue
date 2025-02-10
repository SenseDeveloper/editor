<template>
    <p
      :style="{
        fontFamily: fontFamily,
        fontSize: fontSize,
        color: color,
        textAlign: textAlign,
      }"
    >
      {{ content }}
    </p>
  </template>
  
  <script>
  export default {
    props: {
      content: {
        type: String,
        default: 'Текст',
      },
      fontFamily: {
        type: String,
        default: 'Arial, sans-serif',
      },
      fontSize: {
        type: String,
        default: '16px',
      },
      color: {
        type: String,
        default: '#000000',
      },
      textAlign: {
        type: String,
        default: 'left',
      },
    },
  };
  </script>
  
  <style scoped>
  p {
    margin: 0;
    padding: 0;
  }
  </style>