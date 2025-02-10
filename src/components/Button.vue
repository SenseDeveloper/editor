<template>
    <button
      :style="{
        backgroundColor: backgroundColor,
        color: textColor,
        padding: padding,
        fontSize: fontSize,
      }"
      @click="handleClick"
    >
      {{ buttonText }}
    </button>
  </template>
  
  <script>
  export default {
    props: {
      buttonText: {
        type: String,
        default: 'Кнопка',
      },
      backgroundColor: {
        type: String,
        default: '#007BFF',
      },
      textColor: {
        type: String,
        default: '#FFFFFF',
      },
      padding: {
        type: String,
        default: '10px 20px',
      },
      fontSize: {
        type: String,
        default: '16px',
      },
    },
    methods: {
      handleClick() {
        console.log('Кнопка нажата!');
        // Здесь можно добавить любую логику, например, открытие модального окна
      },
    },
  };
  </script>
  
  <style scoped>
  button {
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    opacity: 0.9;
  }
  </style>