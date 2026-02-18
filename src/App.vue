<template>
  <div class="flex h-screen bg-gray-50 font-sans text-gray-900 dark:bg-gray-900 dark:text-gray-100">
    <!-- Main Content -->
    <div class="flex-1 flex flex-col h-full overflow-hidden">
      <!-- Header with Navigation -->
      <header
        class="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 z-20 shadow-sm sticky top-0 dark:bg-gray-800 dark:border-gray-700">

        <!-- Logo & Branding -->
        <div class="flex items-center">
          <LayoutDashboard class="w-6 h-6 text-indigo-600 mr-3 hidden sm:block" />
          <h1 class="text-xl font-bold text-gray-800 tracking-tight dark:text-gray-100">Campaign Admin</h1>
        </div>

        <!-- Top Navigation Links -->
        <nav class="hidden md:flex items-center space-x-1 ml-8">
          <button @click="switchTab('dashboard')"
            :class="activeTab === 'dashboard' ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200'"
            class="px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center">
            <LayoutGrid class="w-4 h-4 mr-2" />
            Dashboard
          </button>
          <button @click="switchTab('announcement')"
            :class="activeTab === 'announcement' ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200'"
            class="px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center">
            <Megaphone class="w-4 h-4 mr-2" />
            Announcement
            <span
              :class="config.announcementBar.active ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200' : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'"
              class="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium">
              {{ config.announcementBar.active ? 'ON' : 'OFF' }}
            </span>
          </button>
          <button @click="switchTab('promo')"
            :class="activeTab === 'promo' ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200'"
            class="px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center">
            <Gift class="w-4 h-4 mr-2" />
            Promo Card
            <span
              :class="config.promoCard.active ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200' : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'"
              class="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium">
              {{ config.promoCard.active ? 'ON' : 'OFF' }}
            </span>
          </button>
        </nav>

        <!-- Right Side Actions -->
        <div class="flex items-center space-x-3">
          <!-- Dark Mode Toggle -->
          <button @click="toggleDarkMode"
            class="p-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors"
            title="Toggle dark mode">
            <Sun v-if="isDarkMode" class="w-5 h-5" />
            <Moon v-else class="w-5 h-5" />
          </button>
          <div v-if="hasChanges"
            class="text-sm text-yellow-600 font-medium flex items-center animate-pulse hidden sm:flex">
            <span class="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
            Unsaved changes
          </div>
          <button @click="handleSave" :disabled="!hasChanges"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
            <Save class="w-4 h-4 mr-2" />
            <span class="hidden sm:inline">{{ hasChanges ? 'Save Changes' : 'Saved' }}</span>
            <span class="sm:hidden">Save</span>
          </button>
          <!-- Logout Button -->
          <button @click="handleLogout"
            class="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-900/30 dark:hover:text-red-400 transition-colors text-sm font-medium"
            title="Logout">
            <LogOut class="w-4 h-4" />
            <span class="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      <!-- Scrollable Content -->
      <main class="flex-1 overflow-y-auto bg-gray-50 p-6 dark:bg-gray-900">
        <div class="max-w-[1400px] mx-auto space-y-8 pb-12">

          <!-- Dashboard Overview -->
          <div v-if="activeTab === 'dashboard'" class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Announcement Bar Summary Card -->
            <div @click="switchTab('announcement')"
              class="bg-white rounded-lg border border-gray-200 shadow-sm p-6 cursor-pointer hover:shadow-md hover:border-indigo-200 transition-all group dark:bg-gray-800 dark:border-gray-700 dark:hover:border-indigo-500">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center">
                  <div class="p-2 bg-indigo-100 rounded-lg mr-3">
                    <Megaphone class="w-5 h-5 text-indigo-600" />
                  </div>
                  <h3 class="text-base font-semibold text-gray-900 dark:text-gray-100">Announcement Bar</h3>
                </div>
                <span
                  :class="config.announcementBar.active ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200' : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'"
                  class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium">
                  {{ config.announcementBar.active ? 'Active' : 'Inactive' }}
                </span>
              </div>
              <p class="text-sm text-gray-500 mb-3 line-clamp-2 dark:text-gray-400">
                <span v-if="config.announcementBar.announcements.length === 0">No announcements set</span>
                <span v-else-if="config.announcementBar.announcements.length === 1">
                  <span v-if="!config.announcementBar.announcements[0].richText">{{
                    config.announcementBar.announcements[0].text }}</span>
                  <span v-else v-html="config.announcementBar.announcements[0].text"></span>
                </span>
                <span v-else>
                  <span v-if="!config.announcementBar.announcements[0].richText">{{
                    config.announcementBar.announcements[0].text }}</span>
                  <span v-else v-html="config.announcementBar.announcements[0].text"></span>
                  •
                  <span v-if="!config.announcementBar.announcements[1].richText">{{
                    config.announcementBar.announcements[1].text }}</span>
                  <span v-else v-html="config.announcementBar.announcements[1].text"></span>
                </span>
              </p>
              <div class="flex items-center text-xs text-gray-400">
                <div class="w-3.5 h-3.5 mr-1">
                  <Megaphone class="w-3 h-3" />
                </div>
                <span>{{ config.announcementBar.announcements.length }} announcement{{
                  config.announcementBar.announcements.length !== 1 ? 's' : '' }}</span>
              </div>
              <div
                class="mt-3 text-xs text-indigo-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity dark:text-indigo-400">
                Click to edit →</div>
            </div>

            <!-- Promo Card Summary Card -->
            <div @click="switchTab('promo')"
              class="bg-white rounded-lg border border-gray-200 shadow-sm p-6 cursor-pointer hover:shadow-md hover:border-pink-200 transition-all group dark:bg-gray-800 dark:border-gray-700 dark:hover:border-pink-500">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center">
                  <div class="p-2 bg-pink-100 rounded-lg mr-3">
                    <Gift class="w-5 h-5 text-pink-600" />
                  </div>
                  <h3 class="text-base font-semibold text-gray-900 dark:text-gray-100">Promo Card</h3>
                </div>
                <span
                  :class="config.promoCard.active ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200' : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'"
                  class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium">
                  {{ config.promoCard.active ? 'Active' : 'Inactive' }}
                </span>
              </div>
              <p class="text-sm text-gray-500 mb-1 font-medium dark:text-gray-400">
                {{ config.promoCard.title || 'No title set' }}
              </p>
              <p class="text-sm text-gray-400 mb-3 line-clamp-2 dark:text-gray-500">
                {{ config.promoCard.description || 'No description set' }}
              </p>
              <div class="flex items-center text-xs text-gray-400">
                <Calendar class="w-3.5 h-3.5 mr-1" />
                <span v-if="config.promoCard.startDate">{{ config.promoCard.startDate }} → {{ config.promoCard.endDate
                  || '...' }}</span>
                <span v-else>No schedule set</span>
              </div>
              <div
                class="mt-3 text-xs text-pink-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity dark:text-pink-400">
                Click to edit →</div>
            </div>
          </div>


          <!-- Announcement Bar Section -->
          <section v-if="activeTab === 'announcement'" id="announcement"
            class="bg-white shadow rounded-lg border border-gray-200 overflow-hidden dark:bg-gray-800 dark:border-gray-700">
            <div
              class="px-6 py-3 border-b border-gray-200 bg-gray-50/50 flex items-center justify-between dark:border-gray-700 dark:bg-gray-700/50">
              <div class="flex items-center">
                <div class="p-2 bg-indigo-100 rounded-lg mr-4">
                  <Megaphone class="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">Announcement Bar</h3>
                  <p class="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">Top banner for site-wide alerts.
                  </p>
                </div>
              </div>

              <!-- Toggle Switch -->
              <button @click="toggleCampaign('announcementBar')"
                :class="config.announcementBar.active ? 'bg-indigo-600' : 'bg-gray-200'"
                class="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <span :class="config.announcementBar.active ? 'translate-x-5' : 'translate-x-0'"
                  class="pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"></span>
              </button>
            </div>

            <div class="p-4 space-y-6">
              <!-- Live Preview Area Inline -->
              <div class="bg-gray-100 p-4 border border-gray-200 rounded-md dark:bg-gray-700 dark:border-gray-600">
                <h4 class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 dark:text-gray-400">Preview
                </h4>
                <div
                  class="w-full bg-white border border-gray-300 rounded shadow-sm overflow-hidden transform transition-all dark:bg-gray-800 dark:border-gray-600">
                  <!-- Scrolling Announcement Bar -->
                  <div v-if="config.announcementBar.active && config.announcementBar.announcements.length > 0"
                    class="h-10 px-4 text-center text-sm font-medium transition-colors duration-300 overflow-hidden flex items-center justify-center"
                    :style="{ background: getBackgroundStyle(config.announcementBar.style.background), color: config.announcementBar.style.textColor }">
                    <div class="animate-scroll-left">
                      <span v-for="announcement in config.announcementBar.announcements" :key="announcement.text"
                        class="inline-block px-4">
                        <a v-if="announcement.url" :href="announcement.url" target="_blank"
                          class="underline hover:no-underline transition-all"
                          :style="{ color: config.announcementBar.style.textColor }">
                          <span v-html="announcement.text"></span>
                        </a>
                        <span v-else v-html="announcement.text"></span>
                      </span>
                    </div>
                  </div>
                  <!-- Website Header Mock -->
                  <div
                    class="h-12 bg-white flex items-center justify-between px-4 border-b border-gray-100 dark:bg-gray-900 dark:border-gray-700">
                    <div class="w-24 h-4 bg-gray-200 rounded"></div>
                    <div class="flex space-x-2">
                      <div class="w-12 h-4 bg-gray-100 rounded"></div>
                      <div class="w-12 h-4 bg-gray-100 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="space-y-6">
                  <!-- Announcement Input -->
                  <div>
                    <div class="flex items-center justify-between mb-2">
                      <label for="announcement-text" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Announcement Text
                      </label>

                      <div class="flex items-center gap-2">
                        <span class="text-xs text-gray-500">Rich Text</span>
                        <button @click="toggleRichText"
                          :class="selectedAnnouncementRichText ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'"
                          class="px-2 py-0.5 text-xs rounded-md border-0 focus:ring-2 focus:ring-indigo-500 transition-colors">
                          {{ selectedAnnouncementRichText ? 'ON' : 'OFF' }}
                        </button>
                      </div>
                    </div>

                    <!-- Rich Text Toolbar -->
                    <div v-if="selectedAnnouncementRichText"
                      class="mb-2 border border-gray-300 rounded-md p-1.5 bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                      <div class="flex flex-wrap gap-1 items-center">
                        <button @mousedown.prevent="formatText('bold')"
                          :class="activeFormats.bold ? 'bg-indigo-600 text-white border-indigo-600' : 'border-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 dark:border-gray-600'"
                          class="px-2 py-1 text-xs font-bold border rounded transition-colors" title="Bold">B</button>
                        <button @mousedown.prevent="formatText('italic')"
                          :class="activeFormats.italic ? 'bg-indigo-600 text-white border-indigo-600' : 'border-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 dark:border-gray-600'"
                          class="px-2 py-1 text-xs italic border rounded transition-colors" title="Italic">I</button>

                        <div class="border-l border-gray-300 h-4 mx-1"></div>

                        <button @mousedown.prevent="formatText('size-xs')"
                          :class="activeFormats.size === 'xs' ? 'bg-indigo-600 text-white border-indigo-600' : 'border-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 dark:border-gray-600'"
                          class="px-2 py-1 text-xs border rounded transition-colors">XS</button>
                        <button @mousedown.prevent="formatText('size-sm')"
                          :class="activeFormats.size === 'sm' ? 'bg-indigo-600 text-white border-indigo-600' : 'border-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 dark:border-gray-600'"
                          class="px-2 py-1 text-xs border rounded transition-colors">SM</button>
                        <button @mousedown.prevent="formatText('size-md')"
                          :class="activeFormats.size === 'md' ? 'bg-indigo-600 text-white border-indigo-600' : 'border-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 dark:border-gray-600'"
                          class="px-2 py-1 text-xs border rounded transition-colors">MD</button>
                        <button @mousedown.prevent="formatText('size-lg')"
                          :class="activeFormats.size === 'lg' ? 'bg-indigo-600 text-white border-indigo-600' : 'border-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 dark:border-gray-600'"
                          class="px-2 py-1 text-xs border rounded transition-colors">LG</button>
                        <button @mousedown.prevent="formatText('size-xl')"
                          :class="activeFormats.size === 'xl' ? 'bg-indigo-600 text-white border-indigo-600' : 'border-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 dark:border-gray-600'"
                          class="px-2 py-1 text-xs border rounded transition-colors">XL</button>
                        <button @mousedown.prevent="formatText('size-xxl')"
                          :class="activeFormats.size === 'xxl' ? 'bg-indigo-600 text-white border-indigo-600' : 'border-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 dark:border-gray-600'"
                          class="px-2 py-1 text-xs border rounded transition-colors">XXL</button>

                        <div class="ml-auto text-[10px] text-gray-400 hidden sm:block">
                          Click to toggle
                        </div>
                      </div>
                    </div>

                    <div class="mt-1 flex gap-2">
                      <!-- Plain text textarea (when no announcement is selected OR rich text is OFF) -->
                      <textarea v-if="!isRichTextEditMode" id="announcement-text" rows="2" v-model="newAnnouncementText"
                        @keyup.enter="addAnnouncement"
                        class="flex-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-3 border bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
                        placeholder="Type announcement and press Enter..."></textarea>
                      <!-- Rich text contenteditable div (when rich text is ON for selected announcement) -->
                      <div v-else id="announcement-richtext-editor" contenteditable="true" @input="onRichTextInput"
                        @mouseup="updateActiveFormats" @keyup="updateActiveFormats"
                        @focus="nextTick(() => ensureDefaultFontSize())" @keyup.enter.prevent="addAnnouncement"
                        class="flex-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-3 border bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400 min-h-[56px] outline-none overflow-auto"
                        :data-placeholder="'Type announcement text...'"></div>
                      <button @click="addAnnouncement" :disabled="!newAnnouncementText?.trim()"
                        class="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed">
                        Add
                      </button>
                    </div>
                  </div>

                  <!-- Style Customization -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">Style
                      Customization</label>

                    <!-- Background Type Selector -->
                    <div class="grid grid-cols-2 gap-4">
                      <!-- Background Type -->
                      <div class="relative rounded-md shadow-sm">
                        <label class="block text-xs text-gray-500 mb-1 dark:text-gray-400">Background Type</label>
                        <select v-model="config.announcementBar.style.background.type" @change="markChanged"
                          class="block w-full text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md p-2 border bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                          <option value="solid">Solid</option>
                          <option value="linear">Linear</option>
                          <option value="radial">Gradient</option>
                        </select>
                      </div>

                      <!-- Text Color (Always Visible) -->
                      <div class="relative rounded-md shadow-sm">
                        <label class="block text-xs text-gray-500 mb-1 dark:text-gray-400">Text Color</label>
                        <input type="color" v-model="config.announcementBar.style.textColor" @input="markChanged"
                          class="h-10 w-full rounded border border-gray-300 cursor-pointer dark:border-gray-600" />
                      </div>
                    </div>

                    <!-- Linear Gradient Controls (Full Width Below) -->
                    <div v-if="config.announcementBar.style.background.type === 'linear'"
                      class="relative rounded-md shadow-sm mt-4">
                      <div class="grid grid-cols-3 gap-4">
                        <div class="relative">
                          <label class="block text-xs text-gray-500 mb-1 dark:text-gray-400">Start Color</label>
                          <input type="color" v-model="config.announcementBar.style.background.startColor"
                            @input="markChanged"
                            class="h-10 w-full rounded border border-gray-300 cursor-pointer dark:border-gray-600" />
                        </div>
                        <div class="relative">
                          <label class="block text-xs text-gray-500 mb-1 dark:text-gray-400">End Color</label>
                          <input type="color" v-model="config.announcementBar.style.background.endColor"
                            @input="markChanged"
                            class="h-10 w-full rounded border border-gray-300 cursor-pointer dark:border-gray-600" />
                        </div>
                        <div class="relative">
                          <label class="block text-xs text-gray-500 mb-1 dark:text-gray-400">Direction</label>
                          <select v-model="config.announcementBar.style.background.direction" @change="markChanged"
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
                      <div class="mt-4 space-y-2">
                        <label class="block text-xs text-gray-500 dark:text-gray-400">Balance: {{
                          config.announcementBar.style.background.midpoint ?? 50 }}%</label>
                        <input type="range" min="0" max="100"
                          v-model.number="config.announcementBar.style.background.midpoint" @input="markChanged"
                          class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
                      </div>
                    </div>

                    <!-- Color Controls (Full Width Below) -->
                    <div class="grid grid-cols-2 gap-4 mt-4">
                      <!-- Solid Background -->
                      <div v-if="config.announcementBar.style.background.type === 'solid'" class="col-span-2">
                        <div class="grid grid-cols-2 gap-4">
                          <div class="relative rounded-md shadow-sm">
                            <label class="block text-xs text-gray-500 mb-1 dark:text-gray-400">Background Color</label>
                            <input type="color" v-model="config.announcementBar.style.background.startColor"
                              @input="markChanged"
                              class="h-10 w-full rounded border border-gray-300 cursor-pointer dark:border-gray-600" />
                          </div>
                          <div class="relative rounded-md shadow-sm">
                            <label class="block text-xs text-gray-500 mb-1 dark:text-gray-400">Text Color</label>
                            <input type="color" v-model="config.announcementBar.style.textColor" @input="markChanged"
                              class="h-10 w-full rounded border border-gray-300 cursor-pointer dark:border-gray-600" />
                          </div>
                        </div>
                      </div>

                      <!-- Radial Gradient -->
                      <div v-if="config.announcementBar.style.background.type === 'radial'" class="col-span-2">
                        <div class="grid grid-cols-2 gap-4">
                          <div class="relative rounded-md shadow-sm">
                            <label class="block text-xs text-gray-500 mb-1 dark:text-gray-400">Center Color</label>
                            <input type="color" v-model="config.announcementBar.style.background.startColor"
                              @input="markChanged"
                              class="h-10 w-full rounded border border-gray-300 cursor-pointer dark:border-gray-600" />
                          </div>
                          <div class="relative rounded-md shadow-sm">
                            <label class="block text-xs text-gray-500 mb-1 dark:text-gray-400">Outer Color</label>
                            <input type="color" v-model="config.announcementBar.style.background.endColor"
                              @input="markChanged"
                              class="h-10 w-full rounded border border-gray-300 cursor-pointer dark:border-gray-600" />
                          </div>
                        </div>
                        <div class="mt-4 space-y-2">
                          <label class="block text-xs text-gray-500 dark:text-gray-400">Balance: {{
                            config.announcementBar.style.background.midpoint ?? 50 }}%</label>
                          <input type="range" min="0" max="100"
                            v-model.number="config.announcementBar.style.background.midpoint" @input="markChanged"
                            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                <div class="space-y-6">
                  <!-- Single Date Fields for All Announcements -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Schedule</label>
                    <div class="grid grid-cols-2 gap-4">
                      <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Start Date</label>
                        <input type="date" v-model="config.announcementBar.startDate" @input="markChanged"
                          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2.5 border bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" />
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">End Date</label>
                        <input type="date" v-model="config.announcementBar.endDate" @input="markChanged"
                          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2.5 border bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" />
                      </div>
                    </div>
                  </div>

                  <!-- Announcements List -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Announcements</label>
                    <div :class="[
                      'flex flex-wrap gap-2 mb-4',
                      config.announcementBar.announcements.length > 2 ? 'max-h-20 overflow-y-auto pr-1' : ''
                    ]">
                      <div v-for="(announcement, index) in config.announcementBar.announcements" :key="index"
                        class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 group relative"
                        :class="{ 'ring-1 ring-indigo-300/60 dark:ring-indigo-400/40': selectedAnnouncementIndex === index }">
                        <span @click="selectAnnouncement(index)" class="cursor-pointer flex-1"
                          v-html="announcement.text"></span>
                        <a v-if="announcement.url" :href="announcement.url" target="_blank"
                          class="ml-1 text-xs underline hover:no-underline" @click.stop>
                          🔗
                        </a>

                        <!-- Delete Button -->
                        <button @click="removeAnnouncement(index)"
                          class="ml-2 text-indigo-600 hover:text-indigo-800 dark:text-indigo-300 dark:hover:text-indigo-100 opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Remove" @click.stop>
                          <X class="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- URL Management -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">Link
                      Management</label>

                    <!-- URL Field (shows when announcement is selected) -->
                    <div v-if="selectedAnnouncementIndex !== null" class="space-y-4">
                      <div>
                        <label class="block text-xs text-gray-500 mb-1 dark:text-gray-400">
                          Link URL for "{{ getSelectedAnnouncementText() }}"
                        </label>
                        <input type="url" v-model="selectedAnnouncementUrl" @input="updateSelectedAnnouncementUrl"
                          class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2.5 border bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                          placeholder="https://example.com (optional)" />
                      </div>

                      <p class="text-xs text-gray-500 dark:text-gray-400">
                        These settings apply only to the selected announcement above.
                      </p>
                    </div>

                    <!-- Empty state when no announcement selected -->
                    <div v-else class="text-center py-2 border-2 border-dashed border-gray-300 rounded-lg">
                      <div class="text-gray-400">
                        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                        <p class="mt-2 text-sm">Click an announcement to add URL or enable rich text</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Promo Card Section -->
          <section v-if="activeTab === 'promo'" id="promo"
            class="bg-white shadow rounded-lg border border-gray-200 overflow-hidden dark:bg-gray-800 dark:border-gray-700">
            <div
              class="px-6 py-3 border-b border-gray-200 bg-gray-50/50 flex items-center justify-between dark:border-gray-700 dark:bg-gray-700/50">
              <div class="flex items-center">
                <div class="p-2 bg-pink-100 rounded-lg mr-4">
                  <Gift class="w-5 h-5 text-pink-600" />
                </div>
                <div>
                  <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">Promo Card</h3>
                  <p class="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">Floating widget for special offers.
                  </p>
                </div>
              </div>
              <!-- Toggle Switch -->
              <button @click="toggleCampaign('promoCard')"
                :class="config.promoCard.active ? 'bg-indigo-600' : 'bg-gray-200'"
                class="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <span :class="config.promoCard.active ? 'translate-x-5' : 'translate-x-0'"
                  class="pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"></span>
              </button>
            </div>

            <div class="p-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <!-- Form Side -->
              <div class="space-y-4">
                <!-- Global Text Formatting Toolbar -->
                <div class="border border-gray-300 rounded-md p-2 bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                  <label class="block text-xs font-medium text-gray-700 mb-1.5 dark:text-gray-300">Style
                    Controls</label>
                  <div class="space-y-1.5">
                    <!-- Row 1: Text Formatting + Text Color + Alignment -->
                    <div class="flex flex-wrap items-center gap-2">
                      <div class="flex flex-wrap items-center gap-1.5">
                        <button @mousedown.prevent="formatPromoText('bold')"
                          :class="promoFormats.bold ? 'bg-indigo-600 text-white border-indigo-600' : 'border-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 dark:border-gray-600'"
                          class="px-2.5 py-1.5 text-xs font-bold border rounded transition-colors"
                          title="Bold">B</button>
                        <button @mousedown.prevent="formatPromoText('italic')"
                          :class="promoFormats.italic ? 'bg-indigo-600 text-white border-indigo-600' : 'border-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 dark:border-gray-600'"
                          class="px-2.5 py-1.5 text-xs italic border rounded transition-colors"
                          title="Italic">I</button>

                        <div class="border-l border-gray-300 h-5 mx-0.5"></div>

                        <button @mousedown.prevent="formatPromoText('size-xs')"
                          :class="promoFormats.size === 'xs' ? 'bg-indigo-600 text-white border-indigo-600' : 'border-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 dark:border-gray-600'"
                          class="px-2.5 py-1.5 text-xs border rounded transition-colors">XS</button>
                        <button @mousedown.prevent="formatPromoText('size-sm')"
                          :class="promoFormats.size === 'sm' ? 'bg-indigo-600 text-white border-indigo-600' : 'border-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 dark:border-gray-600'"
                          class="px-2.5 py-1.5 text-xs border rounded transition-colors">SM</button>
                        <button @mousedown.prevent="formatPromoText('size-md')"
                          :class="promoFormats.size === 'md' ? 'bg-indigo-600 text-white border-indigo-600' : 'border-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 dark:border-gray-600'"
                          class="px-2.5 py-1.5 text-xs border rounded transition-colors">MD</button>
                        <button @mousedown.prevent="formatPromoText('size-lg')"
                          :class="promoFormats.size === 'lg' ? 'bg-indigo-600 text-white border-indigo-600' : 'border-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 dark:border-gray-600'"
                          class="px-2.5 py-1.5 text-xs border rounded transition-colors">LG</button>
                        <button @mousedown.prevent="formatPromoText('size-xl')"
                          :class="promoFormats.size === 'xl' ? 'bg-indigo-600 text-white border-indigo-600' : 'border-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 dark:border-gray-600'"
                          class="px-2.5 py-1.5 text-xs border rounded transition-colors">XL</button>
                        <button @mousedown.prevent="formatPromoText('size-xxl')"
                          :class="promoFormats.size === 'xxl' ? 'bg-indigo-600 text-white border-indigo-600' : 'border-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 dark:border-gray-600'"
                          class="px-2.5 py-1.5 text-xs border rounded transition-colors">XXL</button>
                      </div>

                      <div class="w-full sm:w-auto sm:ml-auto flex items-center gap-1.5">
                        <div class="border-l border-gray-300 h-5 mx-0.5"></div>

                        <div class="flex gap-1.5 items-center">
                          <label class="text-xs text-gray-500 dark:text-gray-400">Text:</label>
                          <input type="color" v-model="currentFieldTextColor" @input="updateFieldColors"
                            class="h-7 w-10 rounded border border-gray-300 cursor-pointer dark:border-gray-600" />
                        </div>

                        <div class="border-l border-gray-300 h-5 mx-0.5"></div>

                        <button @click="setFieldAlignment('left')" @mousedown.prevent
                          class="px-2.5 py-1.5 text-xs border rounded transition-colors border-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 dark:border-gray-600"
                          title="Align Left">L</button>
                        <button @click="setFieldAlignment('center')" @mousedown.prevent
                          class="px-2.5 py-1.5 text-xs border rounded transition-colors border-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 dark:border-gray-600"
                          title="Align Center">C</button>
                        <button @click="setFieldAlignment('right')" @mousedown.prevent
                          class="px-2.5 py-1.5 text-xs border rounded transition-colors border-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 dark:border-gray-600"
                          title="Align Right">R</button>

                        <!-- Button Width Toggle (only for button field) -->
                        <template v-if="currentFieldFocus === 'button'">
                          <div class="border-l border-gray-300 h-5 mx-0.5"></div>
                          <button
                            @click="config.promoCard.buttonFullWidth = !config.promoCard.buttonFullWidth; markChanged()"
                            @mousedown.prevent
                            :class="config.promoCard.buttonFullWidth ? 'bg-indigo-600 text-white border-indigo-600' : 'border-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 dark:border-gray-600'"
                            class="px-2.5 py-1.5 text-xs border rounded transition-colors" title="Toggle Full Width">
                            {{ config.promoCard.buttonFullWidth ? 'Full' : 'Auto' }}
                          </button>
                        </template>
                      </div>
                    </div>

                    <!-- Row 2: Background Type + Colors + Gradient Controls -->
                    <div class="flex flex-wrap gap-1.5 items-center">
                      <select v-model="currentFieldBgType" @change="updateFieldBgType"
                        class="text-xs border-gray-300 rounded px-2 py-1.5 border bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                        <option value="solid">Solid</option>
                        <option value="linear">Linear</option>
                        <option value="radial">Radial</option>
                      </select>

                      <div class="border-l border-gray-300 h-5 mx-0.5"></div>

                      <div class="flex gap-1.5 items-center">
                        <label class="text-xs text-gray-500 dark:text-gray-400">Start:</label>
                        <input type="color" v-model="currentFieldBgColor" @input="updateFieldColors"
                          class="h-7 w-10 rounded border border-gray-300 cursor-pointer dark:border-gray-600" />
                      </div>

                      <div v-if="currentFieldBgType !== 'solid'" class="flex gap-1.5 items-center">
                        <label class="text-xs text-gray-500 dark:text-gray-400">End:</label>
                        <input type="color" v-model="currentFieldBgEndColor" @input="updateFieldGradient"
                          class="h-7 w-10 rounded border border-gray-300 cursor-pointer dark:border-gray-600" />
                      </div>

                      <select v-if="currentFieldBgType === 'linear'" v-model="currentFieldBgDirection"
                        @change="updateFieldGradient"
                        class="text-xs border-gray-300 rounded px-2 py-1.5 border bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                        <option value="to right">→</option>
                        <option value="to left">←</option>
                        <option value="to bottom">↓</option>
                        <option value="to top">↑</option>
                        <option value="to bottom right">↘</option>
                        <option value="to bottom left">↙</option>
                        <option value="to top right">↗</option>
                        <option value="to top left">↖</option>
                      </select>

                      <div v-if="currentFieldBgType !== 'solid'" class="flex-1 flex gap-1.5 items-center min-w-[150px]">
                        <label class="text-xs text-gray-500 dark:text-gray-400">{{ currentFieldBgMidpoint }}%</label>
                        <input type="range" min="0" max="100" v-model.number="currentFieldBgMidpoint"
                          @input="updateFieldGradient"
                          class="flex-1 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-500" />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                    <div id="promo-title-editor" contenteditable="true" @input="onPromoTitleInput"
                      @mouseup="updatePromoFormats" @keyup="updatePromoFormats"
                      @focus="currentFieldFocus = 'title'; syncToolbarWithField()"
                      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 min-h-[38px] outline-none break-words overflow-wrap-anywhere"
                      :data-placeholder="'Get 20% OFF'"></div>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Subtitle</label>
                    <div id="promo-subtitle-editor" contenteditable="true" @input="onPromoSubtitleInput"
                      @mouseup="updatePromoFormats" @keyup="updatePromoFormats"
                      @focus="currentFieldFocus = 'subtitle'; syncToolbarWithField()"
                      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 min-h-[38px] outline-none break-words overflow-wrap-anywhere"
                      :data-placeholder="'Limited time offer'"></div>
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                  <div id="promo-description-editor" contenteditable="true" @input="onPromoDescriptionInput"
                    @mouseup="updatePromoFormats" @keyup="updatePromoFormats"
                    @focus="currentFieldFocus = 'description'; syncToolbarWithField()"
                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 min-h-[48px] outline-none break-words overflow-wrap-anywhere"
                    :data-placeholder="'Sign up for our newsletter today!'"></div>
                </div>

                <!-- Dates -->
                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Start Date</label>
                    <input type="date" v-model="config.promoCard.startDate" @input="markChanged"
                      class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2 border bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">End Date</label>
                    <input type="date" v-model="config.promoCard.endDate" @input="markChanged"
                      class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2 border bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" />
                  </div>
                </div>

                <!-- Timer Toggle -->
                <div class="flex items-center justify-between">
                  <div>
                    <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Enable Timer</label>
                  </div>
                  <button @click="toggleTimer" :class="config.promoCard.showTimer ? 'bg-indigo-600' : 'bg-gray-200'"
                    class="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span :class="config.promoCard.showTimer ? 'translate-x-5' : 'translate-x-0'"
                      class="pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"></span>
                  </button>
                </div>

                <!-- Timer Text Editor -->
                <div v-if="config.promoCard.showTimer">
                  <label class="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Timer Text</label>
                  <div id="timer-richtext-editor" contenteditable="true" @input="onTimerTextInput"
                    @mouseup="updatePromoFormats" @keyup="updatePromoFormats" @keydown="onTimerEditorKeydown"
                    @focus="currentFieldFocus = 'timer'; syncToolbarWithField()"
                    class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 min-h-[48px] outline-none break-words overflow-wrap-anywhere"
                    :data-placeholder="'Ends in hh:mm:ss'"></div>
                  <p class="text-xs text-gray-500 mt-1 dark:text-gray-400">
                    <span class="inline-flex items-center gap-1">
                      <span
                        class="inline-block px-1 py-0.5 bg-indigo-100 text-indigo-700 rounded text-[10px] font-mono dark:bg-indigo-900 dark:text-indigo-300">hh</span>
                      <span
                        class="inline-block px-1 py-0.5 bg-green-100 text-green-700 rounded text-[10px] font-mono dark:bg-green-900 dark:text-green-300">mm</span>
                      <span
                        class="inline-block px-1 py-0.5 bg-orange-100 text-orange-700 rounded text-[10px] font-mono dark:bg-orange-900 dark:text-orange-300">ss</span>
                      are locked placeholders — select them to change style/size.
                    </span>
                  </p>
                </div>

                <!-- Button Toggle -->
                <div class="flex items-center justify-between">
                  <div>
                    <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Enable Button</label>
                  </div>
                  <button @click="config.promoCard.showButton = !config.promoCard.showButton; markChanged()"
                    :class="config.promoCard.showButton ? 'bg-indigo-600' : 'bg-gray-200'"
                    class="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span :class="config.promoCard.showButton ? 'translate-x-5' : 'translate-x-0'"
                      class="pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"></span>
                  </button>
                </div>

                <div v-if="config.promoCard.showButton" class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Button Text</label>
                    <div id="promo-button-editor" contenteditable="true" @input="onPromoButtonInput"
                      @mouseup="updatePromoFormats" @keyup="updatePromoFormats"
                      @focus="currentFieldFocus = 'button'; syncToolbarWithField()"
                      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 min-h-[38px] outline-none break-words overflow-wrap-anywhere"
                      :data-placeholder="'Shop Now'"></div>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Button URL</label>
                    <input type="text" v-model="config.promoCard.buttonUrl" @input="markChanged"
                      class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2 border bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" />
                  </div>
                </div>
              </div>

              <div class="space-y-4">
                <!-- Styling -->
                <div class="border border-gray-200 rounded-lg p-4 bg-white dark:bg-gray-800 dark:border-gray-700">
                  <h4 class="text-sm font-medium text-gray-900 mb-2 dark:text-gray-100">Card Appearance</h4>
                  <div class="space-y-3">
                    <div class="grid grid-cols-2 gap-4">
                      <div>
                        <label class="block text-xs text-gray-500 mb-1 dark:text-gray-400">Position</label>
                        <select v-model="config.promoCard.style.position" @change="markChanged"
                          class="block w-full text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md p-2 border bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                          <option value="bottom-right">Bottom Right</option>
                          <option value="bottom-left">Bottom Left</option>
                        </select>
                      </div>
                      <div>
                        <label class="block text-xs text-gray-500 mb-1 dark:text-gray-400">Background Type</label>
                        <select v-model="config.promoCard.style.background.type" @change="markChanged"
                          class="block w-full text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md p-2 border bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                          <option value="solid">Solid</option>
                          <option value="linear">Linear</option>
                          <option value="radial">Gradient</option>
                        </select>
                      </div>
                    </div>

                    <!-- Linear Gradient Controls -->
                    <div v-if="config.promoCard.style.background.type === 'linear'" class="grid grid-cols-3 gap-4">
                      <div>
                        <label class="block text-xs text-gray-500 mb-1 dark:text-gray-400">Start Color</label>
                        <input type="color" v-model="config.promoCard.style.background.startColor" @input="markChanged"
                          class="h-9 w-full rounded border border-gray-300 cursor-pointer dark:border-gray-600" />
                      </div>
                      <div>
                        <label class="block text-xs text-gray-500 mb-1 dark:text-gray-400">End Color</label>
                        <input type="color" v-model="config.promoCard.style.background.endColor" @input="markChanged"
                          class="h-9 w-full rounded border border-gray-300 cursor-pointer dark:border-gray-600" />
                      </div>
                      <div>
                        <label class="block text-xs text-gray-500 mb-1 dark:text-gray-400">Direction</label>
                        <select v-model="config.promoCard.style.background.direction" @change="markChanged"
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
                    <div v-if="config.promoCard.style.background.type === 'linear'" class="space-y-2">
                      <label class="block text-xs text-gray-500 dark:text-gray-400">Balance: {{
                        config.promoCard.style.background.midpoint ?? 50 }}%</label>
                      <input type="range" min="0" max="100" v-model.number="config.promoCard.style.background.midpoint"
                        @input="markChanged"
                        class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
                    </div>

                    <!-- Solid Background Colors -->
                    <div v-if="config.promoCard.style.background.type === 'solid'">
                      <div>
                        <label class="block text-xs text-gray-500 mb-1 dark:text-gray-400">Background Color</label>
                        <input type="color" v-model="config.promoCard.style.background.startColor" @input="markChanged"
                          class="h-9 w-full rounded border border-gray-300 cursor-pointer dark:border-gray-600" />
                      </div>
                    </div>

                    <!-- Radial Gradient Colors -->
                    <div v-if="config.promoCard.style.background.type === 'radial'" class="grid grid-cols-2 gap-4">
                      <div>
                        <label class="block text-xs text-gray-500 mb-1 dark:text-gray-400">Center Color</label>
                        <input type="color" v-model="config.promoCard.style.background.startColor" @input="markChanged"
                          class="h-9 w-full rounded border border-gray-300 cursor-pointer dark:border-gray-600" />
                      </div>
                      <div>
                        <label class="block text-xs text-gray-500 mb-1 dark:text-gray-400">Outer Color</label>
                        <input type="color" v-model="config.promoCard.style.background.endColor" @input="markChanged"
                          class="h-9 w-full rounded border border-gray-300 cursor-pointer dark:border-gray-600" />
                      </div>
                    </div>
                    <div v-if="config.promoCard.style.background.type === 'radial'" class="space-y-2">
                      <label class="block text-xs text-gray-500 dark:text-gray-400">Balance: {{
                        config.promoCard.style.background.midpoint ?? 50 }}%</label>
                      <input type="range" min="0" max="100" v-model.number="config.promoCard.style.background.midpoint"
                        @input="markChanged"
                        class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
                    </div>
                  </div>
                </div>

                <!-- Preview Side -->
                <div
                  class="bg-gray-100 rounded-lg p-4 relative self-start min-h-[260px] border border-gray-200 bg-[url('https://lib.shadcn.com/placeholder.svg')] bg-center bg-no-repeat bg-contain dark:bg-gray-700 dark:border-gray-600">
                  <div
                    class="absolute inset-0 flex items-center justify-center text-gray-400 text-sm font-medium pointer-events-none dark:text-gray-500">
                    Website Content Area</div>

                  <!-- The Actual Card Preview -->
                  <div class="relative z-10 w-full min-h-[228px] grid">
                    <div v-if="config.promoCard.active"
                      class="relative w-[400px] rounded-xl shadow-2xl p-5 transition-all duration-300 flex flex-col"
                      :class="{
                        'justify-self-end self-end': config.promoCard.style.position === 'bottom-right',
                        'justify-self-start self-end': config.promoCard.style.position === 'bottom-left',
                        'justify-self-end self-start': config.promoCard.style.position === 'top-right',
                        'justify-self-start self-start': config.promoCard.style.position === 'top-left'
                      }" :style="{ background: getBackgroundStyle(config.promoCard.style.background) }">
                      <button class="absolute top-2 right-2 text-current opacity-60 hover:opacity-100 p-1">
                        <X class="w-4 h-4" />
                      </button>

                      <!-- Title -->
                      <h3 class="text-base font-bold mb-1 px-2 py-1 rounded break-words" :style="{
                        background: getBackgroundStyle(config.promoCard.style.titleStyle.background),
                        color: config.promoCard.style.titleStyle.textColor,
                        textAlign: config.promoCard.style.titleStyle.textAlign || 'center'
                      }" v-html="config.promoCard.title || 'Title'">
                      </h3>

                      <!-- Subtitle -->
                      <h4 v-if="config.promoCard.subtitle"
                        class="text-base font-medium mb-2 px-2 py-1 rounded break-words" :style="{
                          background: getBackgroundStyle(config.promoCard.style.subheadingStyle.background),
                          color: config.promoCard.style.subheadingStyle.textColor,
                          textAlign: config.promoCard.style.subheadingStyle.textAlign || 'center'
                        }" v-html="config.promoCard.subtitle">
                      </h4>
                      <h4 v-else class="text-base font-medium mb-2 px-2 py-1 rounded break-words" :style="{
                        background: getBackgroundStyle(config.promoCard.style.subheadingStyle.background),
                        color: config.promoCard.style.subheadingStyle.textColor,
                        textAlign: config.promoCard.style.subheadingStyle.textAlign || 'center'
                      }">
                        Subtitle
                      </h4>

                      <!-- Description -->
                      <p class="text-base opacity-90 mb-2 px-2 py-1 rounded break-words" :style="{
                        background: getBackgroundStyle(config.promoCard.style.descriptionStyle.background),
                        color: config.promoCard.style.descriptionStyle.textColor,
                        textAlign: config.promoCard.style.descriptionStyle.textAlign || 'left'
                      }" v-html="config.promoCard.description || 'Description text goes here.'">
                      </p>

                      <!-- Timer Display -->
                      <div v-if="config.promoCard.showTimer && (config.promoCard.startDate || config.promoCard.endDate)"
                        class="text-base mb-4 px-2 py-1 rounded break-words" :style="{
                          background: getBackgroundStyle(config.promoCard.style.dateStyle.background),
                          color: config.promoCard.style.dateStyle.textColor,
                          textAlign: config.promoCard.style.dateStyle.textAlign || 'center'
                        }" v-html="getFormattedTimerText()">
                      </div>

                      <div v-if="config.promoCard.showButton && config.promoCard.buttonText"
                        :class="config.promoCard.buttonFullWidth ? '' : 'flex justify-center'">
                        <button :class="config.promoCard.buttonFullWidth ? 'w-full' : ''"
                          class="py-2 px-4 rounded-lg text-base font-semibold transition-transform active:scale-95"
                          :style="{
                            background: getBackgroundStyle(config.promoCard.style.buttonStyle.background),
                            color: config.promoCard.style.buttonStyle.textColor
                          }" v-html="config.promoCard.buttonText">
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <SamplePromoTemplates @apply-template="applyPromoTemplate" />
            </div>
          </section>

          <!-- Raw Data (Collapsed) -->
          <details
            class="group bg-white rounded-lg border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <summary class="flex items-center justify-between p-4 cursor-pointer">
              <h3 class="text-sm font-medium text-gray-700 font-mono flex items-center dark:text-gray-300">
                <Code class="w-4 h-4 mr-2" />
                JSON Configuration
              </h3>
              <ChevronDown
                class="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform dark:text-gray-500" />
            </summary>
            <div
              class="p-4 bg-gray-50 border-t border-gray-200 font-mono text-xs overflow-x-auto text-gray-600 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300">
              <pre>{{ JSON.stringify(config, null, 2) }}</pre>
            </div>
          </details>

        </div>
      </main>
    </div>

    <!-- Toast Notification -->
    <div v-if="showToast"
      class="fixed top-6 left-6 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3 z-50 animate-bounce-in">
      <CheckCircle v-if="!toastIsError" class="w-5 h-5 text-green-400" />
      <AlertCircle v-else class="w-5 h-5 text-red-400" />
      <span class="font-medium">{{ toastMessage }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { loadConfig, saveConfig } from './services/campaignService'
import type { CampaignConfig, PromoCard } from './types/campaign'
import { defaultConfig } from './types/campaign'
import SamplePromoTemplates from './components/SamplePromoTemplates.vue'
import {
  LayoutDashboard,
  Megaphone,
  Gift,
  LayoutGrid,
  Save,
  Calendar,
  X,
  CheckCircle,
  AlertCircle,
  Code,
  ChevronDown,
  Sun,
  Moon,
  LogOut
} from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const activeTab = ref<'dashboard' | 'announcement' | 'promo'>('dashboard')
const config = ref<CampaignConfig>(defaultConfig)
const hasChanges = ref(false)
const showToast = ref(false)
const toastMessage = ref('')
const toastIsError = ref(false)
const isDarkMode = ref(false)
const newAnnouncementText = ref('')
const selectedAnnouncementIndex = ref<number | null>(null)
const currentTime = ref(Date.now())
const selectedAnnouncementUrl = ref('')
const selectedAnnouncementRichText = ref(false)

type ActiveFormats = {
  bold: boolean
  italic: boolean
  size: string
}

const activeFormats = ref<ActiveFormats>({
  bold: false,
  italic: false,
  size: ''
})

const promoFormats = ref<ActiveFormats>({
  bold: false,
  italic: false,
  size: ''
})

const currentFieldBgType = ref('solid')
const currentFieldFocus = ref<'title' | 'subtitle' | 'description' | 'timer' | 'button' | null>(null)
const currentFieldTextColor = ref('#ffffff')
const currentFieldBgColor = ref('#111827')
const currentFieldBgEndColor = ref('#111827')
const currentFieldBgDirection = ref('to right')
const currentFieldBgMidpoint = ref(50)

const TIMER_PLACEHOLDER_TOKENS = ['hhh', 'mmm', 'sss'] as const

const TIMER_EDITOR_COLOR_MAP: Record<string, string> = {
  hhh: 'background:#e0e7ff;color:#4338ca;border:1px solid #a5b4fc;',
  mmm: 'background:#dcfce7;color:#15803d;border:1px solid #86efac;',
  sss: 'background:#ffedd5;color:#c2410c;border:1px solid #fdba74;',
}
const TIMER_EDITOR_BASE_STYLE = 'display:inline-block;padding:1px 4px;border-radius:4px;font-family:monospace;font-weight:600;cursor:default;user-select:all;-webkit-user-select:all;'
const TIMER_SEP_STYLE = 'display:inline;user-select:none;-webkit-user-select:none;'

// --- Clean storage format (compact, no editor chrome) ---
// e.g. 'Ends in <span data-timer-placeholder="hhh">hh</span>:<span data-timer-placeholder="mmm">mm</span>:<span data-timer-placeholder="sss">ss</span>'

function getDefaultTimerStorageHTML(): string {
  return `Ends in <span data-timer-placeholder="hhh">hh</span>:<span data-timer-placeholder="mmm">mm</span>:<span data-timer-placeholder="sss">ss</span>`
}

/** Strip editor visual chrome from HTML, keep only user formatting. For saving to config. */
function cleanTimerForStorage(editorHTML: string): string {
  const parser = new DOMParser()
  const doc = parser.parseFromString(`<div>${editorHTML}</div>`, 'text/html')
  const container = doc.body.firstElementChild as HTMLElement

  // Clean placeholder spans: keep only user-applied styles
  container.querySelectorAll('[data-timer-placeholder]').forEach(el => {
    const htmlEl = el as HTMLElement
    htmlEl.removeAttribute('contenteditable')
    // Extract user-applied formatting
    const userFontSize = htmlEl.style.fontSize || '1rem' // default to md (1rem)
    const userFontWeight = htmlEl.style.fontWeight
    const userFontStyle = htmlEl.style.fontStyle
    // Build minimal style with only user formatting (always include font-size)
    let style = `font-size:${userFontSize};`
    // font-weight: 600 is our editor default, bold/700 is user-applied
    if (userFontWeight && userFontWeight !== '600' && userFontWeight !== 'normal') {
      style += `font-weight:${userFontWeight};`
    }
    if (userFontStyle && userFontStyle !== 'normal') style += `font-style:${userFontStyle};`
    htmlEl.setAttribute('style', style)
  })

  // Unwrap separator spans into plain text
  container.querySelectorAll('[data-timer-separator]').forEach(el => {
    const text = doc.createTextNode(el.textContent || '')
    el.replaceWith(text)
  })

  return container.innerHTML
}

/** Add editor visual chrome to stored HTML. For loading into the editor. */
function buildTimerEditorHTML(storedHTML: string): string {
  if (!storedHTML || !storedHTML.includes('data-timer-placeholder')) {
    return buildTimerEditorHTML(getDefaultTimerStorageHTML())
  }

  const parser = new DOMParser()
  const doc = parser.parseFromString(`<div>${storedHTML}</div>`, 'text/html')
  const container = doc.body.firstElementChild as HTMLElement

  // Add editor chrome to placeholder spans
  container.querySelectorAll('[data-timer-placeholder]').forEach(el => {
    const htmlEl = el as HTMLElement
    const token = htmlEl.getAttribute('data-timer-placeholder')!
    htmlEl.setAttribute('contenteditable', 'false')
    // Preserve user formatting on top of editor base styles
    const userFontSize = htmlEl.style.fontSize || '1rem' // default to md (1rem)
    const userFontWeight = htmlEl.style.fontWeight || ''
    const userFontStyle = htmlEl.style.fontStyle || ''
    let style = (TIMER_EDITOR_COLOR_MAP[token] || '') + TIMER_EDITOR_BASE_STYLE
    style += `font-size:${userFontSize};`
    if (userFontWeight) style += `font-weight:${userFontWeight};`
    if (userFontStyle) style += `font-style:${userFontStyle};`
    htmlEl.setAttribute('style', style)
  })

  // Wrap ':' characters in direct text nodes with separator spans
  const walker = doc.createTreeWalker(container, NodeFilter.SHOW_TEXT, null)
  const textNodes: Text[] = []
  let textNode: Text | null
  while ((textNode = walker.nextNode() as Text | null)) {
    // Only process direct children of the container
    if (textNode.parentNode === container && textNode.textContent && textNode.textContent.includes(':')) {
      textNodes.push(textNode)
    }
  }
  for (const tn of textNodes) {
    const parts = tn.textContent!.split(':')
    if (parts.length > 1) {
      const fragment = doc.createDocumentFragment()
      parts.forEach((part, i) => {
        if (part) fragment.appendChild(doc.createTextNode(part))
        if (i < parts.length - 1) {
          const sep = doc.createElement('span')
          sep.setAttribute('data-timer-separator', '')
          sep.setAttribute('contenteditable', 'false')
          sep.setAttribute('style', TIMER_SEP_STYLE)
          sep.textContent = ':'
          fragment.appendChild(sep)
        }
      })
      tn.replaceWith(fragment)
    }
  }

  return container.innerHTML
}

function ensureTimerPlaceholders(html: string): string {
  // If all three placeholders and separators are present, return as-is
  const hasAllPlaceholders = TIMER_PLACEHOLDER_TOKENS.every(t => html.includes(`data-timer-placeholder="${t}"`))
  const hasSeparators = html.includes('data-timer-separator')
  if (hasAllPlaceholders && hasSeparators) return html
  // Re-inject any missing placeholders
  // First clean to storage format, then rebuild editor HTML to fix consistency
  const cleaned = cleanTimerForStorage(html)
  // Re-inject missing tokens
  let result = cleaned
  const missing: string[] = []
  for (const token of TIMER_PLACEHOLDER_TOKENS) {
    if (!result.includes(`data-timer-placeholder="${token}"`)) {
      missing.push(token)
    }
  }
  if (missing.length > 0) {
    for (let i = 0; i < missing.length; i++) {
      if (i > 0 || result.trim().length > 0) result += ':'
      const displayText: Record<string, string> = { hhh: 'hh', mmm: 'mm', sss: 'ss' }
      result += `<span data-timer-placeholder="${missing[i]}" style="font-size:1rem;">${displayText[missing[i]] || missing[i]}</span>`
    }
  }
  // Rebuild editor HTML from the fixed storage format
  return buildTimerEditorHTML(result)
}

const syncPromoEditorsFromConfig = () => {
  const timerEditor = document.querySelector('#timer-richtext-editor') as HTMLDivElement
  if (timerEditor) {
    const stored = config.value.promoCard.timerText
    timerEditor.innerHTML = buildTimerEditorHTML(stored || '')
  }

  const titleEditor = document.querySelector('#promo-title-editor') as HTMLDivElement
  if (titleEditor) {
    titleEditor.innerHTML = config.value.promoCard.title || ''
  }

  const subtitleEditor = document.querySelector('#promo-subtitle-editor') as HTMLDivElement
  if (subtitleEditor) {
    subtitleEditor.innerHTML = config.value.promoCard.subtitle || ''
  }

  const descriptionEditor = document.querySelector('#promo-description-editor') as HTMLDivElement
  if (descriptionEditor) {
    descriptionEditor.innerHTML = config.value.promoCard.description || ''
  }

  const buttonEditor = document.querySelector('#promo-button-editor') as HTMLDivElement
  if (buttonEditor) {
    buttonEditor.innerHTML = config.value.promoCard.buttonText || ''
  }
}

async function applyPromoTemplate(template: PromoCard, templateName: string) {
  config.value.promoCard = JSON.parse(JSON.stringify(template))
  // Ensure all text fields in the template have explicit font-size
  normalizePromoCardFontSizes()
  await nextTick()
  syncPromoEditorsFromConfig()
  currentFieldFocus.value = 'title'
  syncToolbarWithField()
  markChanged()
  toast(`Template applied: ${templateName}`)
}

// Computed property to check if we're in rich text edit mode
const isRichTextEditMode = computed(() => {
  return selectedAnnouncementRichText.value
})

// Sync activeTab with current route
watch(() => route.path, (newPath) => {
  const tab = newPath.replace('/', '') as 'dashboard' | 'announcement' | 'promo'
  if (['dashboard', 'announcement', 'promo'].includes(tab)) {
    activeTab.value = tab
  }
}, { immediate: true })

// Initialize dark mode from localStorage or system preference
onMounted(async () => {
  config.value = await loadConfig()

  // Migrate old string announcements to new Announcement objects
  migrateAnnouncements(config.value)

  // Initialize timer text if not set or migrate old format
  if (!config.value.promoCard.timerText || !config.value.promoCard.timerText.includes('data-timer-placeholder')) {
    config.value.promoCard.timerText = getDefaultTimerStorageHTML()
  }

  // Migrate buttonStyle if not present
  if (!config.value.promoCard.style.buttonStyle) {
    config.value.promoCard.style.buttonStyle = {
      background: {
        type: 'solid',
        startColor: '#6366f1',
        endColor: '#6366f1',
        midpoint: 50,
      },
      textColor: '#ffffff',
      textAlign: 'center',
    }
  }

  // Initialize buttonFullWidth if not set
  if (config.value.promoCard.buttonFullWidth === undefined) {
    config.value.promoCard.buttonFullWidth = true
  }

  // Normalize all promo card text fields to have explicit font-size
  normalizePromoCardFontSizes()

  // Normalize announcement texts to have explicit font-size
  if (config.value.announcementBar?.announcements) {
    for (const ann of config.value.announcementBar.announcements) {
      if (ann.text) ann.text = wrapBareTextWithFontSize(ann.text)
    }
  }

  // Check for saved dark mode preference or system preference
  const savedDarkMode = localStorage.getItem('darkMode')
  if (savedDarkMode !== null) {
    isDarkMode.value = savedDarkMode === 'true'
  } else {
    isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  // Apply dark mode class to html element
  updateDarkModeClass()

  // Update timer every second
  setInterval(() => {
    currentTime.value = Date.now()
  }, 1000)

  // Populate editors after DOM is ready
  await nextTick()
  syncPromoEditorsFromConfig()
})

function toggleDarkMode() {
  isDarkMode.value = !isDarkMode.value
  localStorage.setItem('darkMode', isDarkMode.value.toString())
  updateDarkModeClass()
}

function updateDarkModeClass() {
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

const markChanged = () => {
  hasChanges.value = true
}

const calculateHoursRemaining = () => {
  if (!config.value.promoCard.startDate || !config.value.promoCard.endDate) {
    return '00:00:00'
  }

  const now = new Date(currentTime.value)
  const start = new Date(config.value.promoCard.startDate)
  const end = new Date(config.value.promoCard.endDate)

  // Set to start of day (midnight)
  start.setHours(0, 0, 0, 0)
  end.setHours(23, 59, 59, 999)

  if (now < start) {
    const diff = start.getTime() - now.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }

  if (now > end) {
    return '00:00:00'
  }

  const remaining = end.getTime() - now.getTime()
  const hours = Math.floor(remaining / (1000 * 60 * 60))
  const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((remaining % (1000 * 60)) / 1000)
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

const getFormattedTimerText = () => {
  const timerValue = calculateHoursRemaining()
  const [hours, minutes, seconds] = timerValue.split(':')
  const template = config.value.promoCard.timerText || getDefaultTimerStorageHTML()

  // Parse the stored template to replace placeholder spans with actual values
  const parser = new DOMParser()
  const doc = parser.parseFromString(`<div>${template}</div>`, 'text/html')
  const container = doc.body.firstElementChild as HTMLElement

  const placeholders = container.querySelectorAll('[data-timer-placeholder]')
  placeholders.forEach(el => {
    const token = el.getAttribute('data-timer-placeholder')
    const span = doc.createElement('span')
    // Copy user-applied styles from stored format
    const origStyle = (el as HTMLElement).getAttribute('style') || ''
    if (origStyle) span.setAttribute('style', origStyle)

    if (token === 'hhh') span.textContent = hours + 'h'
    else if (token === 'mmm') span.textContent = minutes + 'm'
    else if (token === 'sss') span.textContent = seconds + 's'
    el.replaceWith(span)
  })
  return container.innerHTML
}

async function handleSave() {
  const success = await saveConfig(config.value)
  if (success) {
    hasChanges.value = false
    toast('Settings saved successfully')
  } else {
    toast('Failed to save settings', true)
  }
}

function handleLogout() {
  if (hasChanges.value) {
    if (!confirm('You have unsaved changes. Are you sure you want to logout?')) {
      return
    }
  }
  window.location.href = '/'
}

function switchTab(tab: 'dashboard' | 'announcement' | 'promo') {
  activeTab.value = tab
  router.push(`/${tab}`)
}

const toggleTimer = () => {
  config.value.promoCard.showTimer = !config.value.promoCard.showTimer
  if (config.value.promoCard.showTimer) {
    if (!config.value.promoCard.timerText || !config.value.promoCard.timerText.includes('data-timer-placeholder')) {
      config.value.promoCard.timerText = getDefaultTimerStorageHTML()
    }
    nextTick(() => {
      const timerEditor = document.querySelector('#timer-richtext-editor') as HTMLDivElement
      if (timerEditor) {
        timerEditor.innerHTML = buildTimerEditorHTML(config.value.promoCard.timerText || '')
      }
    })
  }
  markChanged()
}

const toggleCampaign = (type: 'announcementBar' | 'promoCard') => {
  config.value[type].active = !config.value[type].active
  markChanged()
}

function toast(message: string, isError = false) {
  toastMessage.value = message
  toastIsError.value = isError
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}

// Announcement management functions
function addAnnouncement() {
  const text = newAnnouncementText.value?.trim()
  if (text) {
    // If an announcement is selected, update it instead of adding new
    if (selectedAnnouncementIndex.value !== null) {
      config.value.announcementBar.announcements[selectedAnnouncementIndex.value].text = text
      selectedAnnouncementIndex.value = null
      selectedAnnouncementUrl.value = ''
    } else {
      // Add new announcement
      config.value.announcementBar.announcements.push({ text, richText: selectedAnnouncementRichText.value })
    }
    newAnnouncementText.value = ''
    markChanged()
  }
}

function removeAnnouncement(index: number) {
  config.value.announcementBar.announcements.splice(index, 1)

  // Clear selection if the deleted announcement was selected
  if (selectedAnnouncementIndex.value === index) {
    selectedAnnouncementIndex.value = null
    selectedAnnouncementUrl.value = ''
  } else if (selectedAnnouncementIndex.value !== null && selectedAnnouncementIndex.value > index) {
    // Adjust selection index if an announcement before the selected one was deleted
    selectedAnnouncementIndex.value = selectedAnnouncementIndex.value - 1
  }

  markChanged()
}

function selectAnnouncement(index: number) {
  selectedAnnouncementIndex.value = index
  selectedAnnouncementUrl.value = config.value.announcementBar.announcements[index].url || ''
  selectedAnnouncementRichText.value = config.value.announcementBar.announcements[index].richText || false

  // Put the announcement text in the input bar for editing
  newAnnouncementText.value = config.value.announcementBar.announcements[index].text

  // Always reset active formats first, then re-compute for the NEW announcement
  activeFormats.value = { bold: false, italic: false, size: 'md' }
  if (selectedAnnouncementRichText.value) {
    updateActiveFormats()
  }

  // Focus the appropriate input field
  nextTick(() => {
    if (selectedAnnouncementRichText.value) {
      const richEditor = document.querySelector('#announcement-richtext-editor') as HTMLDivElement
      if (richEditor) {
        richEditor.innerHTML = config.value.announcementBar.announcements[index].text
        richEditor.focus()
        // Place cursor at the end (don't select all - user should highlight specific words to format)
        const range = document.createRange()
        range.selectNodeContents(richEditor)
        range.collapse(false) // collapse to end
        const sel = window.getSelection()
        sel?.removeAllRanges()
        sel?.addRange(range)
      }
    } else {
      const inputElement = document.querySelector('#announcement-text') as HTMLInputElement
      if (inputElement) {
        inputElement.focus()
        inputElement.select()
      }
    }
  })
}

function getSelectedAnnouncementText() {
  if (selectedAnnouncementIndex.value !== null) {
    const rawText = config.value.announcementBar.announcements[selectedAnnouncementIndex.value].text
    // Strip HTML tags to show clean readable text in the label
    const div = document.createElement('div')
    div.innerHTML = rawText
    return div.textContent || div.innerText || rawText
  }
  return ''
}

function updateSelectedAnnouncementUrl() {
  if (selectedAnnouncementIndex.value !== null) {
    config.value.announcementBar.announcements[selectedAnnouncementIndex.value].url = selectedAnnouncementUrl.value
    markChanged()
  }
}

function toggleRichText() {
  selectedAnnouncementRichText.value = !selectedAnnouncementRichText.value

  if (selectedAnnouncementIndex.value === null) {
    if (selectedAnnouncementRichText.value) {
      updateActiveFormats()
      nextTick(() => {
        const richEditor = document.querySelector('#announcement-richtext-editor') as HTMLDivElement
        if (richEditor) {
          richEditor.innerHTML = newAnnouncementText.value
          richEditor.focus()
        }
      })
    } else {
      activeFormats.value = { bold: false, italic: false, size: 'md' }
      const div = document.createElement('div')
      div.innerHTML = newAnnouncementText.value
      newAnnouncementText.value = div.textContent || div.innerText || newAnnouncementText.value
    }
    return
  }

  if (selectedAnnouncementIndex.value !== null) {
    config.value.announcementBar.announcements[selectedAnnouncementIndex.value].richText = selectedAnnouncementRichText.value
    markChanged()

    if (selectedAnnouncementRichText.value) {
      // Switching to rich text mode - populate the contenteditable div and update format indicators
      updateActiveFormats()
      nextTick(() => {
        const richEditor = document.querySelector('#announcement-richtext-editor') as HTMLDivElement
        if (richEditor) {
          richEditor.innerHTML = newAnnouncementText.value
          richEditor.focus()
        }
      })
    } else {
      // Switching off rich text - strip HTML tags and show plain text
      activeFormats.value = { bold: false, italic: false, size: 'md' }

      // Strip HTML from the announcement text
      const div = document.createElement('div')
      div.innerHTML = newAnnouncementText.value
      const plainText = div.textContent || div.innerText || newAnnouncementText.value

      // Update both the model and the reactive input
      config.value.announcementBar.announcements[selectedAnnouncementIndex.value].text = plainText
      newAnnouncementText.value = plainText
    }
  }
}

// Handle input from the contenteditable rich text editor
function onRichTextInput(event: Event) {
  const target = event.target as HTMLDivElement
  const html = wrapBareTextWithFontSize(target.innerHTML)

  newAnnouncementText.value = html

  // Update the announcement text in the data model
  if (selectedAnnouncementIndex.value !== null) {
    config.value.announcementBar.announcements[selectedAnnouncementIndex.value].text = html
    markChanged()
  }

  // Update active format indicators
  updateActiveFormats()
}

// Update active format indicators based on current cursor/selection position
function updateActiveFormats() {
  if (!selectedAnnouncementRichText.value) {
    activeFormats.value = { bold: false, italic: false, size: '' }
    return
  }

  // Use document.queryCommandState to check formatting at the current cursor position
  // This is the same API browsers use internally - it checks what's active at the caret
  activeFormats.value.bold = document.queryCommandState('bold')
  activeFormats.value.italic = document.queryCommandState('italic')

  // Detect font-size by walking up the DOM from the selection's anchor node
  // Default to 'md' (1rem) when no explicit font-size is set
  activeFormats.value.size = 'md'
  const selection = window.getSelection()
  if (selection && selection.anchorNode) {
    let node: Node | null = selection.anchorNode
    // Walk up to find a span with font-size set
    while (node && node !== document.body) {
      if (node instanceof HTMLElement) {
        const fontSize = node.style.fontSize
        if (fontSize) {
          if (fontSize === '0.75rem') activeFormats.value.size = 'xs'
          else if (fontSize === '0.875rem') activeFormats.value.size = 'sm'
          else if (fontSize === '1rem') activeFormats.value.size = 'md'
          else if (fontSize === '1.125rem') activeFormats.value.size = 'lg'
          else if (fontSize === '1.25rem') activeFormats.value.size = 'xl'
          else if (fontSize === '1.5rem') activeFormats.value.size = 'xxl'
          break
        }
      }
      node = node.parentNode
    }
  }
}

function formatText(format: string) {
  const richEditor = document.querySelector('#announcement-richtext-editor') as HTMLDivElement
  if (!richEditor) return

  const selection = window.getSelection()
  if (!selection || selection.rangeCount === 0) return

  // Make sure the cursor/selection is within our editor
  const anchorNode = selection.anchorNode
  if (!anchorNode || !richEditor.contains(anchorNode)) return

  // Bold/italic: execCommand works both with selection and at caret (toggles for future typing)
  // Font-size: applyFontSize handles both selected text and caret positioning
  switch (format) {
    case 'bold':
      document.execCommand('bold', false)
      break
    case 'italic':
      document.execCommand('italic', false)
      break
    case 'size-xs':
      applyFontSize('0.75rem')
      break
    case 'size-sm':
      applyFontSize('0.875rem')
      break
    case 'size-md':
      applyFontSize('1rem')
      break
    case 'size-lg':
      applyFontSize('1.125rem')
      break
    case 'size-xl':
      applyFontSize('1.25rem')
      break
    case 'size-xxl':
      applyFontSize('1.5rem')
      break
  }

  // Sync the updated HTML back to the data model
  const updatedHtml = wrapBareTextWithFontSize(richEditor.innerHTML)
  newAnnouncementText.value = updatedHtml
  if (selectedAnnouncementIndex.value !== null) {
    config.value.announcementBar.announcements[selectedAnnouncementIndex.value].text = updatedHtml
    markChanged()
  }

  // Update active format indicators
  updateActiveFormats()
}

// Apply font size - preserves bold/italic, prevents nesting
// Works both with selected text AND at caret (inserts a styled span for future typing)
function applyFontSize(size: string) {
  const selection = window.getSelection()
  if (!selection || selection.rangeCount === 0) return

  const range = selection.getRangeAt(0)

  // CARET MODE: No text selected — insert a styled span so next typed text inherits the size
  if (range.collapsed) {
    // Check if we're already inside a span with font-size — if so, just update it
    let existingSpan: HTMLElement | null = null
    let walkNode: Node | null = range.startContainer
    while (walkNode && walkNode !== document.body) {
      if (walkNode instanceof HTMLElement && walkNode.style.fontSize && walkNode.contentEditable !== 'true') {
        existingSpan = walkNode
        break
      }
      walkNode = walkNode.parentNode
    }

    if (existingSpan && existingSpan.textContent === '\u200B') {
      // We're inside an empty placeholder span — just update its font-size
      existingSpan.style.fontSize = size
    } else {
      // Create a new span with font-size and a zero-width space, place cursor inside
      const newSpan = document.createElement('span')
      newSpan.style.fontSize = size
      const zwsp = document.createTextNode('\u200B')
      newSpan.appendChild(zwsp)
      range.insertNode(newSpan)

      // Place cursor after the zero-width space but INSIDE the span
      const newRange = document.createRange()
      newRange.setStart(zwsp, 1)
      newRange.setEnd(zwsp, 1)
      selection.removeAllRanges()
      selection.addRange(newRange)
    }
    return
  }

  // SELECTION MODE: Text is selected — use insertHTML for atomic undo + proper spacing

  // CHECK: Can we reuse an existing font-size span? (prevents nesting on re-size)
  let existingFontSpan: HTMLElement | null = null
  let walkUp: Node | null = range.commonAncestorContainer
  if (walkUp.nodeType === Node.TEXT_NODE) walkUp = walkUp.parentElement
  while (walkUp && walkUp instanceof HTMLElement && walkUp.contentEditable !== 'true') {
    if (walkUp.style.fontSize) {
      if (walkUp.textContent === range.toString()) {
        existingFontSpan = walkUp
      }
      break
    }
    walkUp = walkUp.parentElement
  }

  // Unique marker to find the inserted span after insertHTML
  const markerId = `fs-${Date.now()}`

  if (existingFontSpan) {
    // Reuse: select the entire span node, replace via insertHTML (proper undo)
    const innerHtml = existingFontSpan.innerHTML
    const spanRange = document.createRange()
    spanRange.selectNode(existingFontSpan)
    selection.removeAllRanges()
    selection.addRange(spanRange)
    document.execCommand('insertHTML', false,
      `<span style="font-size: ${size}" data-fs-marker="${markerId}">${innerHtml}</span>`)
  } else {
    // New: clone the selection's HTML (preserves spaces, bold, italic, etc.)
    const fragment = range.cloneContents()
    const tempDiv = document.createElement('div')
    tempDiv.appendChild(fragment)

    // Unwrap any existing font-size spans inside the selection to prevent nesting
    const innerFontSpans = tempDiv.querySelectorAll('span[style]')
    for (const fs of innerFontSpans) {
      if (fs instanceof HTMLElement && fs.style.fontSize) {
        const parent = fs.parentElement
        if (parent) {
          while (fs.firstChild) {
            parent.insertBefore(fs.firstChild, fs)
          }
          parent.removeChild(fs)
        }
      }
    }

    const selectedHtml = tempDiv.innerHTML
    // insertHTML replaces the selection in one atomic undo step
    document.execCommand('insertHTML', false,
      `<span style="font-size: ${size}" data-fs-marker="${markerId}">${selectedHtml}</span>`)
  }

  // Find the inserted span via marker and re-select its contents for toolbar detection
  const insertedSpan = document.querySelector(`[data-fs-marker="${markerId}"]`) as HTMLElement
  if (insertedSpan) {
    insertedSpan.removeAttribute('data-fs-marker')
    const selectRange = document.createRange()
    selectRange.selectNodeContents(insertedSpan)
    selection.removeAllRanges()
    selection.addRange(selectRange)
  }
}

function migrateAnnouncements(config: any) {
  // Convert old string announcements to new Announcement objects
  if (config.announcementBar?.announcements && Array.isArray(config.announcementBar.announcements)) {
    const hasOldFormat = config.announcementBar.announcements.some((item: any) => typeof item === 'string')
    if (hasOldFormat) {
      config.announcementBar.announcements = config.announcementBar.announcements.map((item: any) => {
        if (typeof item === 'string') {
          return { text: item }
        }
        return item
      })
      markChanged() // Mark as changed so migration gets saved
    }
  }
}

// Comprehensive HTML normalizer for font-size consistency.
// Runs 3 passes to guarantee clean, flat, explicit font-size in stored HTML:
//   1. Wrap bare text nodes in default 1rem spans
//   2. Flatten nested font-size spans (inner wins)
//   3. Remove empty/orphaned font-size spans
function wrapBareTextWithFontSize(html: string): string {
  // Treat empty, whitespace-only, or browser-inserted <br> as empty
  if (!html || html.trim() === '' || /^(<br\s*\/?>)+$/i.test(html.trim())) return ''

  const container = document.createElement('div')
  container.innerHTML = html

  // === PASS 1: Wrap bare text nodes that aren't inside a font-size span ===
  function wrapBareText(parent: HTMLElement) {
    const children = Array.from(parent.childNodes)
    for (const node of children) {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent || ''
        if (!text || text.replace(/\u200B/g, '').trim() === '') continue

        let hasFontSize = false
        let ancestor = node.parentElement
        while (ancestor && ancestor !== container) {
          if (ancestor.style && ancestor.style.fontSize) {
            hasFontSize = true
            break
          }
          ancestor = ancestor.parentElement
        }

        if (!hasFontSize) {
          const span = document.createElement('span')
          span.style.fontSize = '1rem'
          span.textContent = text
          parent.replaceChild(span, node)
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement
        if (!el.style.fontSize) {
          wrapBareText(el)
        }
      }
    }
  }

  // === PASS 2: Flatten nested font-size spans ===
  // If a font-size span's only meaningful child is another font-size span,
  // the outer span is redundant (inner font-size wins per CSS cascade).
  // Example: <span style="font-size:X"><span style="font-size:Y">text</span></span>
  //       → <span style="font-size:Y">text</span>
  function flattenNestedFontSizes(parent: HTMLElement) {
    let changed = true
    while (changed) {
      changed = false
      const spans = parent.querySelectorAll('span[style]')
      for (const span of spans) {
        if (!(span instanceof HTMLElement) || !span.style.fontSize) continue

        // Get meaningful children (skip empty text nodes / zero-width spaces)
        const meaningfulChildren = Array.from(span.childNodes).filter(n => {
          if (n.nodeType === Node.TEXT_NODE) {
            return (n.textContent || '').replace(/\u200B/g, '').trim() !== ''
          }
          return true
        })

        // Case: outer font-size span wraps ONLY one inner font-size span
        if (meaningfulChildren.length === 1 &&
          meaningfulChildren[0] instanceof HTMLElement &&
          meaningfulChildren[0].style.fontSize) {
          // Replace outer with inner
          span.parentElement?.replaceChild(meaningfulChildren[0], span)
          changed = true
          break // Restart since DOM changed
        }

        // Case: outer font-size span wraps ONLY a <b>/<i>/<strong>/<em> which contains a font-size span
        if (meaningfulChildren.length === 1 &&
          meaningfulChildren[0] instanceof HTMLElement &&
          !meaningfulChildren[0].style.fontSize &&
          ['B', 'I', 'STRONG', 'EM'].includes(meaningfulChildren[0].tagName)) {
          const formatEl = meaningfulChildren[0] as HTMLElement
          const innerMeaningful = Array.from(formatEl.childNodes).filter(n => {
            if (n.nodeType === Node.TEXT_NODE) {
              return (n.textContent || '').replace(/\u200B/g, '').trim() !== ''
            }
            return true
          })
          if (innerMeaningful.length === 1 &&
            innerMeaningful[0] instanceof HTMLElement &&
            innerMeaningful[0].style.fontSize) {
            // <span font-size:X><b><span font-size:Y>text</span></b></span>
            // → <span font-size:Y><b>text</b></span>
            const innerSpan = innerMeaningful[0] as HTMLElement
            // Move the formatting tag inside the inner span
            const newFormatEl = document.createElement(formatEl.tagName)
            while (innerSpan.firstChild) {
              newFormatEl.appendChild(innerSpan.firstChild)
            }
            innerSpan.appendChild(newFormatEl)
            // Replace outer span with inner span
            span.parentElement?.replaceChild(innerSpan, span)
            changed = true
            break
          }
        }
      }
    }
  }

  // === PASS 3: Remove empty font-size spans ===
  function removeEmptyFontSpans(parent: HTMLElement) {
    const spans = parent.querySelectorAll('span[style]')
    for (const span of spans) {
      if (!(span instanceof HTMLElement) || !span.style.fontSize) continue
      const text = span.textContent || ''
      if (text.replace(/\u200B/g, '').trim() === '') {
        span.parentElement?.removeChild(span)
      }
    }
  }

  wrapBareText(container)
  flattenNestedFontSizes(container)
  removeEmptyFontSpans(container)

  return container.innerHTML
}

// Ensures all promo card text fields have explicit font-size in their HTML
// This is the single root-level normalizer — called on load, template apply, etc.
function normalizePromoCardFontSizes() {
  const pc = config.value.promoCard
  if (pc.title) pc.title = wrapBareTextWithFontSize(pc.title)
  if (pc.subtitle) pc.subtitle = wrapBareTextWithFontSize(pc.subtitle)
  if (pc.description) pc.description = wrapBareTextWithFontSize(pc.description)
  // Timer text placeholders handle their own formatting; don't wrap
  // if (pc.timerText) pc.timerText = wrapBareTextWithFontSize(pc.timerText)
  if (pc.buttonText) pc.buttonText = wrapBareTextWithFontSize(pc.buttonText)
}

function onTimerTextInput(event: Event) {
  const target = event.target as HTMLDivElement
  // Ensure all three placeholders are still present; re-inject if accidentally removed
  const editorHTML = ensureTimerPlaceholders(target.innerHTML)
  if (editorHTML !== target.innerHTML) {
    target.innerHTML = editorHTML
  }
  // Store clean format (no editor chrome)
  config.value.promoCard.timerText = cleanTimerForStorage(editorHTML)
  markChanged()
}

function onTimerEditorKeydown(event: KeyboardEvent) {
  const sel = window.getSelection()
  if (!sel || sel.rangeCount === 0) return

  const range = sel.getRangeAt(0)
  if (event.key !== 'Delete' && event.key !== 'Backspace') return

  const editor = document.querySelector('#timer-richtext-editor') as HTMLDivElement
  if (!editor) return

  // Collect all protected elements (placeholders + separators)
  const protectedEls = editor.querySelectorAll('[data-timer-placeholder], [data-timer-separator]')

  // NON-COLLAPSED selection: if any protected element is in the selection, block it
  if (!range.collapsed) {
    for (const el of Array.from(protectedEls)) {
      if (range.intersectsNode(el)) {
        event.preventDefault()
        return
      }
    }
    return // selection doesn't touch any protected element — allow deletion
  }

  // COLLAPSED cursor: only block when cursor is directly adjacent to a protected element
  const container = range.startContainer
  const offset = range.startOffset

  if (event.key === 'Backspace') {
    // Case 1: cursor is directly in the editor div (between child nodes)
    if (container === editor && offset > 0) {
      const prevChild = container.childNodes[offset - 1]
      if (isProtectedTimerNode(prevChild)) {
        event.preventDefault()
        return
      }
    }
    // Case 2: cursor is at position 0 of a text node — check previous sibling
    if (container.nodeType === Node.TEXT_NODE && offset === 0) {
      const prevSibling = findNonEmptyPrevSibling(container)
      if (prevSibling && isProtectedTimerNode(prevSibling)) {
        event.preventDefault()
        return
      }
    }
  } else if (event.key === 'Delete') {
    // Case 1: cursor is directly in the editor div (between child nodes)
    if (container === editor && offset < container.childNodes.length) {
      const nextChild = container.childNodes[offset]
      if (isProtectedTimerNode(nextChild)) {
        event.preventDefault()
        return
      }
    }
    // Case 2: cursor is at end of a text node — check next sibling
    if (container.nodeType === Node.TEXT_NODE && offset === (container.textContent?.length ?? 0)) {
      const nextSibling = findNonEmptyNextSibling(container)
      if (nextSibling && isProtectedTimerNode(nextSibling)) {
        event.preventDefault()
        return
      }
    }
  }
}

function isProtectedTimerNode(node: Node | null): boolean {
  if (!node || !(node instanceof HTMLElement)) return false
  return node.hasAttribute('data-timer-placeholder') || node.hasAttribute('data-timer-separator')
}

function findNonEmptyPrevSibling(node: Node): Node | null {
  let prev = node.previousSibling
  while (prev && prev.nodeType === Node.TEXT_NODE && prev.textContent === '') {
    prev = prev.previousSibling
  }
  return prev
}

function findNonEmptyNextSibling(node: Node): Node | null {
  let next = node.nextSibling
  while (next && next.nodeType === Node.TEXT_NODE && next.textContent === '') {
    next = next.nextSibling
  }
  return next
}

function updatePromoFormats() {
  const selection = window.getSelection()

  // If a timer placeholder is selected, read formatting directly from it
  if (currentFieldFocus.value === 'timer' && selection) {
    const phSpan = getSelectedTimerPlaceholder(selection)
    if (phSpan) {
      const fw = phSpan.style.fontWeight
      promoFormats.value.bold = (fw === 'bold' || fw === '700')
      promoFormats.value.italic = (phSpan.style.fontStyle === 'italic')
      promoFormats.value.size = fontSizeToLabel(phSpan.style.fontSize) || 'md'
      return
    }
  }

  promoFormats.value.bold = document.queryCommandState('bold')
  promoFormats.value.italic = document.queryCommandState('italic')
  // Default to 'md' (1rem) when no explicit font-size is set
  promoFormats.value.size = 'md'
  if (selection && selection.anchorNode) {
    let node: Node | null = selection.anchorNode
    while (node && node !== document.body) {
      if (node instanceof HTMLElement) {
        const fontSize = node.style.fontSize
        if (fontSize) {
          promoFormats.value.size = fontSizeToLabel(fontSize) || 'md'
          break
        }
      }
      node = node.parentNode
    }
  }
}

function fontSizeToLabel(fontSize: string): string {
  const map: Record<string, string> = {
    '0.75rem': 'xs',
    '0.875rem': 'sm',
    '1rem': 'md',
    '1.125rem': 'lg',
    '1.25rem': 'xl',
    '1.5rem': 'xxl',
  }
  return map[fontSize] || ''
}

function getSelectedTimerPlaceholder(selection: Selection): HTMLElement | null {
  if (!selection || selection.rangeCount === 0) return null
  const range = selection.getRangeAt(0)
  // Check if the selection is entirely within (or is) a placeholder span
  let node: Node | null = range.commonAncestorContainer
  if (node.nodeType === Node.TEXT_NODE) node = node.parentElement
  while (node && node instanceof HTMLElement) {
    if (node.hasAttribute('data-timer-placeholder')) return node
    // Also check if the parent contains only placeholder(s) in the selection
    node = node.parentElement
  }
  // Check if the selection's anchor or focus is right on a placeholder
  const anchorNode = selection.anchorNode
  if (anchorNode && anchorNode.nodeType === Node.ELEMENT_NODE) {
    const el = anchorNode as HTMLElement
    const child = el.childNodes[selection.anchorOffset]
    if (child instanceof HTMLElement && child.hasAttribute('data-timer-placeholder')) return child
  }
  // Check if a placeholder is selected via user-select: all (the range startContainer or endContainer)
  if (range.startContainer instanceof HTMLElement && range.startContainer.hasAttribute('data-timer-placeholder')) {
    return range.startContainer
  }
  // Intersect check
  const editor = document.querySelector('#timer-richtext-editor')
  if (editor) {
    const placeholders = editor.querySelectorAll('[data-timer-placeholder]')
    for (const ph of Array.from(placeholders)) {
      if (range.intersectsNode(ph) && selection.toString().trim() === ph.textContent?.trim()) {
        return ph as HTMLElement
      }
    }
  }
  return null
}

function applyFormatToTimerPlaceholder(span: HTMLElement, format: string) {
  const sizeMap: Record<string, string> = {
    'size-xs': '0.75rem',
    'size-sm': '0.875rem',
    'size-md': '1rem',
    'size-lg': '1.125rem',
    'size-xl': '1.25rem',
    'size-xxl': '1.5rem',
  }

  if (format === 'bold') {
    // Toggle bold
    const current = span.style.fontWeight
    span.style.fontWeight = (current === 'bold' || current === '700') ? '' : 'bold'
  } else if (format === 'italic') {
    // Toggle italic
    const current = span.style.fontStyle
    span.style.fontStyle = current === 'italic' ? '' : 'italic'
  } else if (sizeMap[format]) {
    span.style.fontSize = sizeMap[format]
  }
}

function formatPromoText(format: string) {
  const selection = window.getSelection()
  if (!selection || selection.rangeCount === 0) return

  // Special handling for timer placeholder spans: apply styles directly to the span
  if (currentFieldFocus.value === 'timer') {
    const placeholderSpan = getSelectedTimerPlaceholder(selection)
    if (placeholderSpan) {
      applyFormatToTimerPlaceholder(placeholderSpan, format)
      // Re-select the placeholder after formatting
      const selRange = document.createRange()
      selRange.selectNode(placeholderSpan)
      selection.removeAllRanges()
      selection.addRange(selRange)
      // Sync back (clean for storage)
      const editor = document.querySelector('#timer-richtext-editor') as HTMLDivElement
      if (editor) config.value.promoCard.timerText = cleanTimerForStorage(editor.innerHTML)
      markChanged()
      updatePromoFormats()
      return
    }
  }

  // Bold/italic: execCommand works both at caret (toggles for future typing) and with selection
  // Font-size: applyFontSize handles both caret and selection modes
  switch (format) {
    case 'bold':
      document.execCommand('bold', false)
      break
    case 'italic':
      document.execCommand('italic', false)
      break
    case 'size-xs':
      applyFontSize('0.75rem')
      break
    case 'size-sm':
      applyFontSize('0.875rem')
      break
    case 'size-md':
      applyFontSize('1rem')
      break
    case 'size-lg':
      applyFontSize('1.125rem')
      break
    case 'size-xl':
      applyFontSize('1.25rem')
      break
    case 'size-xxl':
      applyFontSize('1.5rem')
      break
  }

  // Sync the updated HTML back to config based on which field is focused
  if (currentFieldFocus.value === 'title') {
    const editor = document.querySelector('#promo-title-editor') as HTMLDivElement
    if (editor) config.value.promoCard.title = wrapBareTextWithFontSize(editor.innerHTML)
  } else if (currentFieldFocus.value === 'subtitle') {
    const editor = document.querySelector('#promo-subtitle-editor') as HTMLDivElement
    if (editor) config.value.promoCard.subtitle = wrapBareTextWithFontSize(editor.innerHTML)
  } else if (currentFieldFocus.value === 'description') {
    const editor = document.querySelector('#promo-description-editor') as HTMLDivElement
    if (editor) config.value.promoCard.description = wrapBareTextWithFontSize(editor.innerHTML)
  } else if (currentFieldFocus.value === 'timer') {
    const editor = document.querySelector('#timer-richtext-editor') as HTMLDivElement
    if (editor) config.value.promoCard.timerText = cleanTimerForStorage(editor.innerHTML)
  } else if (currentFieldFocus.value === 'button') {
    const editor = document.querySelector('#promo-button-editor') as HTMLDivElement
    if (editor) config.value.promoCard.buttonText = wrapBareTextWithFontSize(editor.innerHTML)
  }

  markChanged()
  updatePromoFormats()
}

function setFieldAlignment(align: 'left' | 'center' | 'right') {
  if (!currentFieldFocus.value) return

  const styleMap: Record<string, any> = {
    title: config.value.promoCard.style.titleStyle,
    subtitle: config.value.promoCard.style.subheadingStyle,
    description: config.value.promoCard.style.descriptionStyle,
    timer: config.value.promoCard.style.dateStyle,
    button: config.value.promoCard.style.buttonStyle
  }

  const style = styleMap[currentFieldFocus.value]
  if (style && 'textAlign' in style) {
    style.textAlign = align
    markChanged()
  }
}

function syncToolbarWithField() {
  if (!currentFieldFocus.value) return

  const styleMap: Record<string, any> = {
    title: config.value.promoCard.style.titleStyle,
    subtitle: config.value.promoCard.style.subheadingStyle,
    description: config.value.promoCard.style.descriptionStyle,
    timer: config.value.promoCard.style.dateStyle,
    button: config.value.promoCard.style.buttonStyle
  }

  const style = styleMap[currentFieldFocus.value]
  if (style) {
    currentFieldTextColor.value = style.textColor || '#ffffff'
    currentFieldBgColor.value = style.background.startColor || '#111827'
    currentFieldBgType.value = style.background.type || 'solid'
    currentFieldBgEndColor.value = style.background.endColor || '#111827'
    currentFieldBgDirection.value = style.background.direction || 'to right'
    currentFieldBgMidpoint.value = style.background.midpoint ?? 50
  }

  // Detect actual formatting (bold/italic/size) at cursor position after DOM is ready.
  // Don't set synchronous defaults to avoid a visual "flash" (e.g., MD → XL jump).
  nextTick(() => {
    updatePromoFormats()
    ensureDefaultFontSize()
  })
}

// Ensures cursor is inside a font-size span; if not, inserts one with default 1rem (MD)
// This guarantees all text gets explicit font-size in the stored HTML/JSON
function ensureDefaultFontSize() {
  const selection = window.getSelection()
  if (!selection || selection.rangeCount === 0) return

  // Walk up from cursor to check if we're already inside a font-size span
  let node: Node | null = selection.anchorNode
  while (node && node !== document.body) {
    if (node instanceof HTMLElement && node.style.fontSize && node.contentEditable !== 'true') {
      return // Already inside a font-size span — no action needed
    }
    node = node.parentNode
  }

  // Not inside a font-size span — apply default 1rem at caret
  applyFontSize('1rem')
}

function updateFieldColors() {
  if (!currentFieldFocus.value) return

  const styleMap: Record<string, any> = {
    title: config.value.promoCard.style.titleStyle,
    subtitle: config.value.promoCard.style.subheadingStyle,
    description: config.value.promoCard.style.descriptionStyle,
    timer: config.value.promoCard.style.dateStyle,
    button: config.value.promoCard.style.buttonStyle
  }

  const style = styleMap[currentFieldFocus.value]
  if (style) {
    style.textColor = currentFieldTextColor.value
    style.background.startColor = currentFieldBgColor.value
    markChanged()
  }
}

function updateFieldBgType() {
  if (!currentFieldFocus.value) return

  const styleMap: Record<string, any> = {
    title: config.value.promoCard.style.titleStyle,
    subtitle: config.value.promoCard.style.subheadingStyle,
    description: config.value.promoCard.style.descriptionStyle,
    timer: config.value.promoCard.style.dateStyle,
    button: config.value.promoCard.style.buttonStyle
  }

  const style = styleMap[currentFieldFocus.value]
  if (style) {
    style.background.type = currentFieldBgType.value
    markChanged()
  }
}

function updateFieldGradient() {
  if (!currentFieldFocus.value) return

  const styleMap: Record<string, any> = {
    title: config.value.promoCard.style.titleStyle,
    subtitle: config.value.promoCard.style.subheadingStyle,
    description: config.value.promoCard.style.descriptionStyle,
    timer: config.value.promoCard.style.dateStyle,
    button: config.value.promoCard.style.buttonStyle
  }

  const style = styleMap[currentFieldFocus.value]
  if (style) {
    style.background.endColor = currentFieldBgEndColor.value
    style.background.direction = currentFieldBgDirection.value
    style.background.midpoint = currentFieldBgMidpoint.value
    markChanged()
  }
}

function onPromoTitleInput(event: Event) {
  const target = event.target as HTMLDivElement
  config.value.promoCard.title = wrapBareTextWithFontSize(target.innerHTML)
  markChanged()
}

function onPromoSubtitleInput(event: Event) {
  const target = event.target as HTMLDivElement
  config.value.promoCard.subtitle = wrapBareTextWithFontSize(target.innerHTML)
  markChanged()
}

function onPromoDescriptionInput(event: Event) {
  const target = event.target as HTMLDivElement
  config.value.promoCard.description = wrapBareTextWithFontSize(target.innerHTML)
  markChanged()
}

function onPromoButtonInput(event: Event) {
  const target = event.target as HTMLDivElement
  config.value.promoCard.buttonText = wrapBareTextWithFontSize(target.innerHTML)
  markChanged()
}

function getBackgroundStyle(background: any) {
  if (background.type === 'solid') {
    return background.startColor
  } else if (background.type === 'linear') {
    const direction = background.direction || 'to right'
    const midpoint = background.midpoint ?? 50
    return `linear-gradient(${direction}, ${background.startColor} 0%, ${background.startColor} ${midpoint}%, ${background.endColor} 100%)`
  } else if (background.type === 'radial') {
    const midpoint = background.midpoint ?? 50
    return `radial-gradient(circle, ${background.startColor} 0%, ${background.startColor} ${midpoint}%, ${background.endColor} 100%)`
  }
  return background.startColor
}



</script>

<style scoped>
/* Scoped styles are mostly replaced by Tailwind utility classes */
.animate-bounce-in {
  animation: bounceIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes bounceIn {
  0% {
    transform: translateY(20px);
    opacity: 0;
  }

  60% {
    transform: translateY(-5px);
    opacity: 1;
  }

  100% {
    transform: translateY(0);
  }
}

/* Scrolling animation for announcements */
.animate-scroll-left {
  display: inline-flex;
  white-space: nowrap;
  animation: scrollLeft 20s linear infinite;
}

@keyframes scrollLeft {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
}

/* Contenteditable placeholder */
#announcement-richtext-editor:empty:before {
  content: attr(data-placeholder);
  color: #9ca3af;
  pointer-events: none;
}
</style>
