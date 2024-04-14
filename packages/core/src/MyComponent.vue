<script setup lang="ts">
import { ref } from 'vue-demi'
import type {
  MyComponentEmits,
  MyComponentExpose,
  MyComponentProps,
  MyComponentSlots,
} from './MyComponent.api.ts'

const props = withDefaults(defineProps<MyComponentProps>(), {
  msg: 'Hello world!',
})

const emits = defineEmits<MyComponentEmits>()

defineSlots<MyComponentSlots>()

defineExpose<MyComponentExpose>({
  msg: props.msg,
})

const count = ref(0)
</script>

<template>
  <div class="vue-component-starter" @click="emits('click', props.msg)">
    <slot :msg="props.msg">
      <h2>{{ props.msg }}</h2>
    </slot>

    <div class="mt-4    text-4 mb-4">
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
