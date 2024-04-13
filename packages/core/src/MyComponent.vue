<script setup lang="ts">
import { ref } from 'vue-demi'

const count = ref(0)
</script>

<template>
  <div class="vue-component-starter">
    <h2>vue-component-starter <i class="i-mdi:account-cowboy-hat-outline " /></h2>

    <div class="mt-4    text-4 mb-4 color-#000">
      Count: {{ count }}
    </div>

    <div>
      Action:

      <button class="i-mdi:plus active:animate-bounce-in cursor-pointer mr-4" @click="count++">
        Increment
      </button>

      <button class="i-mdi:minus active:animate-bounce-in cursor-pointer" @click="count--">
        Decrement
      </button>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.vue-component-starter {
  h2 {
    text-decoration: underline;
  }
}
</style>
