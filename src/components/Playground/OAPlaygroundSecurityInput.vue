<script setup lang="ts">
import { computed, defineEmits, defineProps } from 'vue'
import { usePlayground } from '../../composables/usePlayground'
import { Input } from '../ui/input'

const props = defineProps({
  scheme: {
    type: Object,
    required: true,
  },
  modelValue: {
    type: [String, Number],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
})

const emits = defineEmits([
  'update:modelValue',
  'submit',
])

const placeholder = computed(() => {
  if (props.modelValue) {
    return props.modelValue
  }

  if (props.scheme?.example) {
    return props.scheme.example
  }

  return usePlayground().getSecuritySchemeDefaultValue(props.scheme)
})
</script>

<template>
  <div class="flex flex-col space-y-2">
    <Input
      :id="name"
      :value="modelValue"
      :name="name"
      type="text"
      :placeholder="placeholder"
      class="bg-muted"
      @update:model-value="emits('update:modelValue', $event)"
      @keydown.enter="emits('submit')"
    />
  </div>
</template>
