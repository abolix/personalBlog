<template>
  <div class="w-full">
    <UInput
      v-model="searchQuery"
      :icon="icon"
      :size="size"
      :placeholder="placeholder"
      @keyup.enter="handleSearch"
      @input="onInput"
    />
    <div v-if="searchQuery && showClearButton" class="mt-2 flex justify-center">
      <UButton
        color="gray"
        variant="ghost"
        size="sm"
        @click="clearSearch"
      >
        {{ clearButtonText }}
      </UButton>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'جستجو...'
  },
  clearButtonText: {
    type: String,
    default: 'پاک کردن'
  },
  icon: {
    type: String,
    default: 'i-lucide-search'
  },
  size: {
    type: String,
    default: 'md'
  },
  showClearButton: {
    type: Boolean,
    default: true
  },
  debounceMs: {
    type: Number,
    default: 300
  }
})

const emit = defineEmits(['update:modelValue', 'search', 'clear'])

const searchQuery = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const handleSearch = () => {
  emit('search', searchQuery.value)
}

const clearSearch = () => {
  searchQuery.value = ''
  emit('clear')
}

// Debounced search on input (optional)
let debounceTimer = null

const onInput = () => {
  if (props.debounceMs <= 0) return

  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }

  debounceTimer = setTimeout(() => {
    handleSearch()
  }, props.debounceMs)
}
</script>
