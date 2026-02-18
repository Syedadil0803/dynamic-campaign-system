<template>
  <div class="lg:col-span-2 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
    <div class="flex flex-col gap-2">
      <div>
        <h4 class="text-base font-semibold text-gray-900 dark:text-gray-100">Sample Templates</h4>
      </div>
    </div>
    <div class="mt-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <div
        v-for="template in samplePromoTemplates"
        :key="template.id"
        @click="emit('apply-template', template.promoCard, template.name)"
        class="group rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:border-gray-300 cursor-pointer dark:border-gray-700 dark:bg-gray-900">
        <div class="mb-2 flex items-center justify-between">
          <p class="text-xs font-semibold tracking-wide text-gray-800 dark:text-gray-200">{{ template.name }}</p>
          <span class="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-200">Click to apply</span>
        </div>
        <div
          class="w-full rounded-xl shadow-xl p-4 transition-all duration-300 flex flex-col group-hover:scale-[1.01] group-hover:shadow-2xl"
          :style="{ background: getBackgroundStyle(template.promoCard.style.background) }">
          <h3
            class="text-lg font-bold mb-1 px-2 py-1 rounded break-words"
            :style="{
              background: getBackgroundStyle(template.promoCard.style.titleStyle.background),
              color: template.promoCard.style.titleStyle.textColor,
              textAlign: template.promoCard.style.titleStyle.textAlign || 'center'
            }"
            v-html="template.promoCard.title">
          </h3>
          <h4
            class="text-sm font-medium mb-2 px-2 py-1 rounded break-words"
            :style="{
              background: getBackgroundStyle(template.promoCard.style.subheadingStyle.background),
              color: template.promoCard.style.subheadingStyle.textColor,
              textAlign: template.promoCard.style.subheadingStyle.textAlign || 'center'
            }"
            v-html="template.promoCard.subtitle">
          </h4>
          <p
            class="text-sm opacity-90 mb-2 px-2 py-1 rounded break-words"
            :style="{
              background: getBackgroundStyle(template.promoCard.style.descriptionStyle.background),
              color: template.promoCard.style.descriptionStyle.textColor,
              textAlign: template.promoCard.style.descriptionStyle.textAlign || 'left'
            }"
            v-html="template.promoCard.description">
          </p>
          <div
            class="text-xs mb-4 px-2 py-1 rounded break-words"
            :style="{
              background: getBackgroundStyle(template.promoCard.style.dateStyle.background),
              color: template.promoCard.style.dateStyle.textColor,
              textAlign: template.promoCard.style.dateStyle.textAlign || 'center'
            }"
            v-html="getTemplateTimerPreviewText(template.promoCard.timerText)">
          </div>
          <div :class="template.promoCard.buttonFullWidth ? '' : 'flex justify-center'">
            <button
              :class="template.promoCard.buttonFullWidth ? 'w-full' : ''"
              class="py-2 px-4 rounded-lg text-sm font-semibold"
              :style="{ backgroundColor: template.promoCard.style.buttonColor, color: template.promoCard.style.buttonTextColor }">
              {{ template.promoCard.buttonText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { PromoCard } from '../types/campaign'

type PromoSampleTemplate = {
  id: string
  name: string
  promoCard: PromoCard
}

const emit = defineEmits<{
  (e: 'apply-template', template: PromoCard, templateName: string): void
}>()

const getISODateWithOffset = (daysFromToday = 0): string => {
  const date = new Date()
  date.setDate(date.getDate() + daysFromToday)
  return date.toISOString().split('T')[0]
}

const samplePromoTemplates = computed<PromoSampleTemplate[]>(() => [
  {
    id: 'professional-slate',
    name: 'Executive Slate',
    promoCard: {
      active: true,
      title: '<strong>Premium Workspace Collection</strong>',
      subtitle: '<span style="font-size:0.9rem;">Designed for modern offices and executive homes</span>',
      description: 'Elevate your interiors with refined textures, durable weaves, and a professional finish built for everyday performance.',
      buttonText: 'View Collection',
      buttonUrl: '/collections/professional',
      startDate: getISODateWithOffset(0),
      endDate: getISODateWithOffset(12),
      showTimer: true,
      showButton: true,
      timerText: '<strong>{h}h</strong> <span style="font-size:1rem;">{mm}m</span> <span style="font-size:0.75rem;">{ss}s</span> left for executive pricing',
      style: {
        position: 'bottom-right',
        background: { type: 'linear', startColor: '#f8fafc', endColor: '#e2e8f0', direction: 'to bottom right', midpoint: 46 },
        textColor: '#0f172a',
        buttonColor: '#1e293b',
        buttonTextColor: '#f8fafc',
        titleStyle: {
          background: { type: 'linear', startColor: '#1e3a8a', endColor: '#334155', direction: 'to right', midpoint: 48 },
          textColor: '#ffffff',
          textAlign: 'left',
        },
        subheadingStyle: {
          background: { type: 'solid', startColor: '#e2e8f0', endColor: '#e2e8f0', midpoint: 50 },
          textColor: '#334155',
          textAlign: 'left',
        },
        descriptionStyle: {
          background: { type: 'solid', startColor: '#ffffff', endColor: '#ffffff', midpoint: 50 },
          textColor: '#334155',
          textAlign: 'left',
        },
        dateStyle: {
          background: { type: 'radial', startColor: '#dbeafe', endColor: '#bfdbfe', midpoint: 42 },
          textColor: '#1e3a8a',
          textAlign: 'left',
        },
      },
    },
  },
  {
    id: 'all-features',
    name: 'Festival Spotlight',
    promoCard: {
      active: true,
      title: '<strong>Weekend Carpet Festival</strong> <span style="font-size: 0.8rem; letter-spacing:0.08em;">LIMITED DROP</span>',
      subtitle: '<span style="font-size: 0.85rem;">Flat</span> <span style="font-size: 1.35rem;"><strong>35% OFF</strong></span> + Free Delivery',
      description: 'Give your room a full glow-up with premium carpets. Apply <strong>COZY35</strong> before this drop disappears.',
      buttonText: 'Reveal My Offer',
      buttonUrl: '/collections/carpets',
      startDate: getISODateWithOffset(0),
      endDate: getISODateWithOffset(7),
      showTimer: true,
      showButton: true,
      timerText: 'Offer ends in <strong>{h}h</strong> <span style="font-size:1.125rem;">{mm}m</span> <span style="font-size:0.75rem;">{ss}s</span>',
      style: {
        position: 'bottom-right',
        background: { type: 'linear', startColor: '#fff7ed', endColor: '#ffedd5', direction: 'to bottom right', midpoint: 45 },
        textColor: '#1f2937',
        buttonColor: '#ea580c',
        buttonTextColor: '#ffffff',
        titleStyle: {
          background: { type: 'linear', startColor: '#7c2d12', endColor: '#c2410c', direction: 'to right', midpoint: 55 },
          textColor: '#ffffff',
          textAlign: 'center',
        },
        subheadingStyle: {
          background: { type: 'solid', startColor: '#ffedd5', endColor: '#ffedd5', midpoint: 50 },
          textColor: '#9a3412',
          textAlign: 'center',
        },
        descriptionStyle: {
          background: { type: 'solid', startColor: '#ffffff', endColor: '#ffffff', midpoint: 50 },
          textColor: '#374151',
          textAlign: 'left',
        },
        dateStyle: {
          background: { type: 'radial', startColor: '#fed7aa', endColor: '#fdba74', midpoint: 40 },
          textColor: '#7c2d12',
          textAlign: 'center',
        },
      },
    },
  },
  {
    id: 'luxury-gold',
    name: 'Luxury Gold',
    promoCard: {
      active: true,
      title: '<strong>Royal Loom Collection</strong> <span style="font-size:0.8rem;">SIGNATURE EDIT</span>',
      subtitle: 'Exclusive <strong>Members Access</strong> to Luxury Drops',
      description: 'Handcrafted statement pieces with deep texture and heritage finishes. Concierge pricing is now live.',
      buttonText: 'Enter Private Sale',
      buttonUrl: '/collections/luxury',
      startDate: getISODateWithOffset(0),
      endDate: getISODateWithOffset(3),
      showTimer: true,
      showButton: true,
      timerText: 'Private window closes in <strong>{h}h</strong> <span style="font-size:1.125rem;">{mm}m</span> <span style="font-size:0.75rem;">{ss}s</span>',
      style: {
        position: 'bottom-right',
        background: { type: 'linear', startColor: '#0f172a', endColor: '#111827', direction: 'to bottom right', midpoint: 50 },
        textColor: '#f9fafb',
        buttonColor: '#d4af37',
        buttonTextColor: '#111827',
        titleStyle: {
          background: { type: 'linear', startColor: '#d97706', endColor: '#facc15', direction: 'to right', midpoint: 60 },
          textColor: '#111827',
          textAlign: 'center',
        },
        subheadingStyle: {
          background: { type: 'solid', startColor: '#1f2937', endColor: '#1f2937', midpoint: 50 },
          textColor: '#fde68a',
          textAlign: 'center',
        },
        descriptionStyle: {
          background: { type: 'solid', startColor: '#111827', endColor: '#111827', midpoint: 50 },
          textColor: '#e5e7eb',
          textAlign: 'left',
        },
        dateStyle: {
          background: { type: 'radial', startColor: '#fef3c7', endColor: '#f59e0b', midpoint: 35 },
          textColor: '#1f2937',
          textAlign: 'center',
        },
      },
    },
  },
  {
    id: 'spring-bloom',
    name: 'Spring Bloom',
    promoCard: {
      active: true,
      title: '<strong>Spring Refresh</strong> <span style="font-size:0.8rem;">NEW SEASON</span>',
      subtitle: 'Bring <strong>fresh colors</strong> and airy textures home',
      description: 'From pastel runners to floral accents, this edit instantly brightens every corner.',
      buttonText: 'Shop The Bloom Edit',
      buttonUrl: '/collections/spring',
      startDate: getISODateWithOffset(0),
      endDate: getISODateWithOffset(10),
      showTimer: true,
      showButton: true,
      timerText: 'Spring deal ends in <strong>{h}h</strong> <span style="font-size:1.125rem;">{mm}m</span> <span style="font-size:0.75rem;">{ss}s</span>',
      style: {
        position: 'bottom-right',
        background: { type: 'linear', startColor: '#fdf2f8', endColor: '#ecfeff', direction: 'to right', midpoint: 50 },
        textColor: '#1f2937',
        buttonColor: '#db2777',
        buttonTextColor: '#ffffff',
        titleStyle: {
          background: { type: 'linear', startColor: '#ec4899', endColor: '#14b8a6', direction: 'to right', midpoint: 50 },
          textColor: '#ffffff',
          textAlign: 'center',
        },
        subheadingStyle: {
          background: { type: 'solid', startColor: '#ffffff', endColor: '#ffffff', midpoint: 50 },
          textColor: '#be185d',
          textAlign: 'center',
        },
        descriptionStyle: {
          background: { type: 'solid', startColor: '#ffffff', endColor: '#ffffff', midpoint: 50 },
          textColor: '#374151',
          textAlign: 'left',
        },
        dateStyle: {
          background: { type: 'radial', startColor: '#cffafe', endColor: '#a7f3d0', midpoint: 45 },
          textColor: '#0f766e',
          textAlign: 'center',
        },
      },
    },
  },
  {
    id: 'midnight-neon',
    name: 'Midnight Neon',
    promoCard: {
      active: true,
      title: '<strong>Midnight Flash Drop</strong>',
      subtitle: '<span style="font-size: 1.125rem;"><strong>Buy 1 Get 1</strong></span> on Select Rugs',
      description: 'After-dark offer for modern homes. Neon accents + deep contrasts = maximum attention.',
      buttonText: 'Activate Flash Deal',
      buttonUrl: '/collections/flash-sale',
      startDate: getISODateWithOffset(0),
      endDate: getISODateWithOffset(2),
      showTimer: true,
      showButton: true,
      timerText: 'Flash ends in <strong>{h}h</strong> <span style="font-size:1.125rem;">{mm}m</span> <span style="font-size:0.75rem;">{ss}s</span>',
      style: {
        position: 'bottom-right',
        background: { type: 'linear', startColor: '#020617', endColor: '#111827', direction: 'to bottom right', midpoint: 55 },
        textColor: '#e5e7eb',
        buttonColor: '#22d3ee',
        buttonTextColor: '#082f49',
        titleStyle: {
          background: { type: 'linear', startColor: '#06b6d4', endColor: '#a78bfa', direction: 'to right', midpoint: 50 },
          textColor: '#ffffff',
          textAlign: 'center',
        },
        subheadingStyle: {
          background: { type: 'solid', startColor: '#0f172a', endColor: '#0f172a', midpoint: 50 },
          textColor: '#67e8f9',
          textAlign: 'center',
        },
        descriptionStyle: {
          background: { type: 'solid', startColor: '#111827', endColor: '#111827', midpoint: 50 },
          textColor: '#cbd5e1',
          textAlign: 'left',
        },
        dateStyle: {
          background: { type: 'radial', startColor: '#a5f3fc', endColor: '#22d3ee', midpoint: 38 },
          textColor: '#083344',
          textAlign: 'center',
        },
      },
    },
  },
  {
    id: 'earthy-cozy',
    name: 'Earthy Cozy',
    promoCard: {
      active: true,
      title: '<strong>Cozy Home Week</strong> <span style="font-size:0.8rem;">CALM LIVING</span>',
      subtitle: 'Natural tones, soft textures, and calm spaces',
      description: 'Create a warm sanctuary with earthy layers and plush comfort made for everyday living.',
      buttonText: 'Build My Cozy Space',
      buttonUrl: '/collections/cozy-home',
      startDate: getISODateWithOffset(0),
      endDate: getISODateWithOffset(14),
      showTimer: true,
      showButton: true,
      timerText: 'Cozy week ends in <strong>{h}h</strong> <span style="font-size:1.125rem;">{mm}m</span> <span style="font-size:0.75rem;">{ss}s</span>',
      style: {
        position: 'bottom-right',
        background: { type: 'linear', startColor: '#fffbeb', endColor: '#fef3c7', direction: 'to bottom right', midpoint: 42 },
        textColor: '#292524',
        buttonColor: '#92400e',
        buttonTextColor: '#ffffff',
        titleStyle: {
          background: { type: 'linear', startColor: '#b45309', endColor: '#78350f', direction: 'to right', midpoint: 52 },
          textColor: '#ffffff',
          textAlign: 'center',
        },
        subheadingStyle: {
          background: { type: 'solid', startColor: '#fde68a', endColor: '#fde68a', midpoint: 50 },
          textColor: '#78350f',
          textAlign: 'center',
        },
        descriptionStyle: {
          background: { type: 'solid', startColor: '#fffbeb', endColor: '#fffbeb', midpoint: 50 },
          textColor: '#44403c',
          textAlign: 'left',
        },
        dateStyle: {
          background: { type: 'radial', startColor: '#fed7aa', endColor: '#f59e0b', midpoint: 40 },
          textColor: '#7c2d12',
          textAlign: 'center',
        },
      },
    },
  },
])

function getTemplateTimerPreviewText(timerText?: string) {
  const template = timerText || 'Ends in <strong>{h}h</strong> {mm}m {ss}s'
  return template
    .replace(/\{hh\}/g, '24')
    .replace(/\{h\}/g, '24')
    .replace(/\{mm\}/g, '18')
    .replace(/\{m\}/g, '18')
    .replace(/\{ss\}/g, '07')
    .replace(/\{s\}/g, '7')
    .replace(/hh/g, '23')
    .replace(/mm/g, '59')
    .replace(/ss/g, '59')
}

function getBackgroundStyle(background: any) {
  if (background.type === 'solid') {
    return background.startColor
  }
  if (background.type === 'linear') {
    const direction = background.direction || 'to right'
    const midpoint = background.midpoint ?? 50
    return `linear-gradient(${direction}, ${background.startColor} 0%, ${background.startColor} ${midpoint}%, ${background.endColor} 100%)`
  }
  if (background.type === 'radial') {
    const midpoint = background.midpoint ?? 50
    return `radial-gradient(circle, ${background.startColor} 0%, ${background.startColor} ${midpoint}%, ${background.endColor} 100%)`
  }
  return background.startColor
}
</script>
