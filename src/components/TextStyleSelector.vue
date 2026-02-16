<template>
  <div class="relative rounded-md shadow-sm">
    <label class="block text-xs text-gray-500 mb-1 dark:text-gray-400">{{ label }}</label>
    <div class="space-y-2">
      <!-- Background Type Selector -->
      <div>
        <label class="block text-xs text-gray-500 mb-1 dark:text-gray-400">Background Type</label>
        <select v-model="localConfig.background.type" @change="updateConfig"
          class="block w-full text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md p-2 border bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
          <option value="solid">Solid</option>
          <option value="linear">Linear</option>
          <option value="radial">Gradient</option>
        </select>
      </div>
      
      <!-- Text Color (Always Visible) -->
      <div>
        <label class="block text-xs text-gray-500 mb-1 dark:text-gray-400">Text Color</label>
        <input type="color" v-model="localConfig.textColor" @input="updateConfig"
          class="h-9 w-full rounded border border-gray-300 cursor-pointer dark:border-gray-600" />
      </div>
      
      <!-- Linear Gradient Controls -->
      <div v-if="localConfig.background.type === 'linear'" class="grid grid-cols-3 gap-4">
        <div>
          <label class="block text-xs text-gray-500 mb-1 dark:text-gray-400">Start Color</label>
          <input type="color" v-model="localConfig.background.startColor" @input="updateConfig"
            class="h-9 w-full rounded border border-gray-300 cursor-pointer dark:border-gray-600" />
        </div>
        <div>
          <label class="block text-xs text-gray-500 mb-1 dark:text-gray-400">End Color</label>
          <input type="color" v-model="localConfig.background.endColor" @input="updateConfig"
            class="h-9 w-full rounded border border-gray-300 cursor-pointer dark:border-gray-600" />
        </div>
        <div>
          <label class="block text-xs text-gray-500 mb-1 dark:text-gray-400">Direction</label>
          <select v-model="localConfig.background.direction" @change="updateConfig"
            class="block w-full text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md p-2 border bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
            <option value="to right">To Right →</option>
            <option value="to left">To Left ←</option>
            <option value="to bottom">To Bottom ↓</option>
            <option value="to top">To Top ↑</option>
            <option value="to bottom right">To Bottom Right ↘</option>
            <option value="to bottom left">To Bottom Left ↙</option>
            <option value="to top right">To Top Right ↗</option>
            <option value="to top left">To Top Left ↖</option>
          </select>
        </div>
      </div>
      
      <div v-if="localConfig.background.type === 'linear'" class="space-y-2">
        <label class="block text-xs text-gray-500 dark:text-gray-400">Balance: {{ localConfig.background.midpoint ?? 50 }}%</label>
        <input type="range" min="0" max="100" v-model.number="localConfig.background.midpoint" @input="updateConfig"
          class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
      </div>
      
      <!-- Solid Background Colors -->
      <div v-if="localConfig.background.type === 'solid'" class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-xs text-gray-500 mb-1 dark:text-gray-400">Background Color</label>
          <input type="color" v-model="localConfig.background.startColor" @input="updateConfig"
            class="h-9 w-full rounded border border-gray-300 cursor-pointer dark:border-gray-600" />
        </div>
      </div>
      
      <!-- Radial Gradient Colors -->
      <div v-if="localConfig.background.type === 'radial'" class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-xs text-gray-500 mb-1 dark:text-gray-400">Center Color</label>
          <input type="color" v-model="localConfig.background.startColor" @input="updateConfig"
            class="h-9 w-full rounded border border-gray-300 cursor-pointer dark:border-gray-600" />
        </div>
        <div>
          <label class="block text-xs text-gray-500 mb-1 dark:text-gray-400">Outer Color</label>
          <input type="color" v-model="localConfig.background.endColor" @input="updateConfig"
            class="h-9 w-full rounded border border-gray-300 cursor-pointer dark:border-gray-600" />
        </div>
      </div>
      
      <div v-if="localConfig.background.type === 'radial'" class="space-y-2">
        <label class="block text-xs text-gray-500 dark:text-gray-400">Balance: {{ localConfig.background.midpoint ?? 50 }}%</label>
        <input type="range" min="0" max="100" v-model.number="localConfig.background.midpoint" @input="updateConfig"
          class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
      </div>
      
      <!-- Text Alignment -->
      <div v-if="showTextAlign">
        <label class="block text-xs text-gray-500 mb-1 dark:text-gray-400">Text Align</label>
        <div class="flex gap-2">
          <button @click="localConfig.textAlign = 'left'; updateConfig()"
            :class="localConfig.textAlign === 'left' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-200'"
            class="flex-1 px-3 py-2 text-xs rounded transition-colors">Left</button>
          <button @click="localConfig.textAlign = 'center'; updateConfig()"
            :class="localConfig.textAlign === 'center' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-200'"
            class="flex-1 px-3 py-2 text-xs rounded transition-colors">Center</button>
          <button @click="localConfig.textAlign = 'right'; updateConfig()"
            :class="localConfig.textAlign === 'right' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-200'"
            class="flex-1 px-3 py-2 text-xs rounded transition-colors">Right</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface GradientStyle {
  type: 'solid' | 'linear' | 'radial'
  startColor: string
  endColor: string
  direction?: string
  midpoint?: number
}

interface TextStyleConfig {
  background: GradientStyle
  textColor: string
  textAlign?: 'left' | 'center' | 'right'
}

interface Props {
  label: string
  modelValue: TextStyleConfig
  showTextAlign?: boolean
}

interface Emits {
  (e: 'update:modelValue', value: TextStyleConfig): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const localConfig = ref<TextStyleConfig>({ ...props.modelValue })

const updateConfig = () => {
  emit('update:modelValue', { ...localConfig.value })
}

// Watch for external changes
watch(() => props.modelValue, (newValue) => {
  localConfig.value = { ...newValue }
}, { deep: true })
</script>
