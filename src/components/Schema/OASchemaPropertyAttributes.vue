<script setup>
import { useI18n } from '@byjohann/vue-i18n'
import { titleCase } from 'scule'
import OACodeValue from '../Common/OACodeValue.vue'

const props = defineProps({
  property: {
    type: Object,
    required: true,
  },
})

const { t } = useI18n()

const keysToIgnore = ['name', 'types', 'description', 'properties', 'required', 'items', 'xml', 'allOf', 'anyOf', 'oneOf', 'not']

const isNonEmptyValue = (value) => {
  if (value === null || value === undefined) {
    return false
  }
  if (Array.isArray(value)) {
    return value.length > 0
  }
  if (typeof value === 'object') {
    return Object.keys(value).length > 0
  }
  return true
}

const properties = Object.keys(props.property)
  .filter(key => !keysToIgnore.includes(key)) // Exclude specified keys
  .filter(key => isNonEmptyValue(props.property[key]) || (key === 'default' && props.property[key] !== undefined)) // Keep only non-empty values except for "default"
</script>

<template>
  <div
    v-for="(key, propertyIdx) in properties"
    :key="propertyIdx"
    class="flex flex-row flex-wrap items-center gap-2"
  >
    <span class="text-xs text-muted-foreground">
      {{ t(titleCase(key)) }}
    </span>

    <OACodeValue :value="props.property[key]" />
  </div>
</template>
