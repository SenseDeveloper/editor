<template>
    <div>
      <Button
        v-for="(button, index) in buttons"
        :key="index"
        :buttonText="button.text"
        :backgroundColor="button.backgroundColor"
        :textColor="button.textColor"
        :padding="button.padding"
        :fontSize="button.fontSize"
      />
    </div>
  </template>
  
  <script>
  import Button from './Button.vue';
  
  export default {
    components: {
      Button,
    },
    computed: {
      buttons() {
        return this.$store.state.elements.buttons;
      },
    },
  };
  </script>
  <template>
    <div>
      <Text
        v-for="(text, index) in texts"
        :key="index"
        :content="text.content"
        :fontFamily="text.fontFamily"
        :fontSize="text.fontSize"
        :color="text.color"
        :textAlign="text.textAlign"
      />
    </div>
  </template>
  
  <script>
  import Text from './Text.vue';
  
  export default {
    components: {
      Text,
    },
    computed: {
      texts() {
        return this.$store.state.elements.texts;
      },
    },
  };
  </script>
  <template>
  <div>
    <Image
      v-for="(image, index) in images"
      :key="index"
      :src="image.src"
      :alt="image.alt"
      :width="image.width"
      :height="image.height"
      :border="image.border"
      :borderRadius="image.borderRadius"
      :boxShadow="image.boxShadow"
    />
  </div>
</template>

<script>
import Image from './Image.vue';

export default {
  components: {
    Image,
  },
  computed: {
    images() {
      return this.$store.state.elements.images;
    },
  },
};
</script>