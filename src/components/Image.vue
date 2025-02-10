<template>
    <img
      :src="src"
      :alt="alt"
      :style="{
        width: width,
        height: height,
        border: border,
        borderRadius: borderRadius,
        boxShadow: boxShadow,
      }"
    />
  </template>
  
  <script>
  export default {
    props: {
      src: {
        type: String,
        required: true,
      },
      alt: {
        type: String,
        default: 'Изображение',
      },
      width: {
        type: String,
        default: '100%',
      },
      height: {
        type: String,
        default: 'auto',
      },
      border: {
        type: String,
        default: 'none',
      },
      borderRadius: {
        type: String,
        default: '0',
      },
      boxShadow: {
        type: String,
        default: 'none',
      },
    },
  };
  </script>
  
  <style scoped>
  img {
    display: block;
    max-width: 100%;
  }
  </style>