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
                          <span v-if="!announcement.richText">{{ announcement.text }}</span>
                          <span v-else v-html="announcement.text"></span>
                        </a>
                        <span v-else>
                          <span v-if="!announcement.richText">{{ announcement.text }}</span>
                          <span v-else v-html="announcement.text"></span>
                        </span>
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
                          Highlight to format
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
                        @keyup.enter.prevent="addAnnouncement"
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
                          v-if="!announcement.richText">
                          {{ announcement.text }}
                        </span>
                        <span @click="selectAnnouncement(index)" class="cursor-pointer flex-1" v-else
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
                  <p class="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">Floating widget for special offers
                    or
                    lead gen.</p>
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
                    @mouseup="updatePromoFormats" @keyup="updatePromoFormats"
                    @focus="currentFieldFocus = 'timer'; syncToolbarWithField()"
                    class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 min-h-[48px] outline-none break-words overflow-wrap-anywhere"
                    :data-placeholder="'Ends in hh mmm sss'"></div>
                  <p class="text-xs text-gray-500 mt-1 dark:text-gray-400">Use h, mm, ss or hh, m, s placeholders.
                    Select to format.</p>
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
                    <input type="text" v-model="config.promoCard.buttonText" @input="markChanged"
                      class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2 border bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Button URL</label>
                    <input type="text" v-model="config.promoCard.buttonUrl" @input="markChanged"
                      class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2 border bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" />
                  </div>
                </div>

                <div v-if="config.promoCard.showButton" class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="block text-xs text-gray-500 mb-1 dark:text-gray-400">Button Bg Color</label>
                    <input type="color" v-model="config.promoCard.style.buttonColor" @input="markChanged"
                      class="h-9 w-full rounded border border-gray-300 cursor-pointer dark:border-gray-600" />
                  </div>
                  <div>
                    <label class="block text-xs text-gray-500 mb-1 dark:text-gray-400">Button Text Color</label>
                    <input type="color" v-model="config.promoCard.style.buttonTextColor" @input="markChanged"
                      class="h-9 w-full rounded border border-gray-300 cursor-pointer dark:border-gray-600" />
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
                      <h3 class="text-lg font-bold mb-1 px-2 py-1 rounded break-words" :style="{
                        background: getBackgroundStyle(config.promoCard.style.titleStyle.background),
                        color: config.promoCard.style.titleStyle.textColor,
                        textAlign: config.promoCard.style.titleStyle.textAlign || 'center'
                      }" v-html="config.promoCard.title || 'Title'">
                      </h3>

                      <!-- Subtitle -->
                      <h4 v-if="config.promoCard.subtitle"
                        class="text-sm font-medium mb-2 px-2 py-1 rounded break-words" :style="{
                          background: getBackgroundStyle(config.promoCard.style.subheadingStyle.background),
                          color: config.promoCard.style.subheadingStyle.textColor,
                          textAlign: config.promoCard.style.subheadingStyle.textAlign || 'center'
                        }" v-html="config.promoCard.subtitle">
                      </h4>
                      <h4 v-else class="text-sm font-medium mb-2 px-2 py-1 rounded break-words" :style="{
                        background: getBackgroundStyle(config.promoCard.style.subheadingStyle.background),
                        color: config.promoCard.style.subheadingStyle.textColor,
                        textAlign: config.promoCard.style.subheadingStyle.textAlign || 'center'
                      }">
                        Subtitle
                      </h4>

                      <!-- Description -->
                      <p class="text-sm opacity-90 mb-2 px-2 py-1 rounded break-words" :style="{
                        background: getBackgroundStyle(config.promoCard.style.descriptionStyle.background),
                        color: config.promoCard.style.descriptionStyle.textColor,
                        textAlign: config.promoCard.style.descriptionStyle.textAlign || 'left'
                      }" v-html="config.promoCard.description || 'Description text goes here.'">
                      </p>

                      <!-- Timer Display -->
                      <div v-if="config.promoCard.showTimer && (config.promoCard.startDate || config.promoCard.endDate)"
                        class="text-xs mb-4 px-2 py-1 rounded break-words" :style="{
                          background: getBackgroundStyle(config.promoCard.style.dateStyle.background),
                          color: config.promoCard.style.dateStyle.textColor,
                          textAlign: config.promoCard.style.dateStyle.textAlign || 'center'
                        }" v-html="getFormattedTimerText()">
                      </div>

                      <button v-if="config.promoCard.showButton && config.promoCard.buttonText"
                        class="w-full py-2 px-4 rounded-lg text-sm font-semibold transition-transform active:scale-95"
                        :style="{ backgroundColor: config.promoCard.style.buttonColor, color: config.promoCard.style.buttonTextColor }">
                        {{ config.promoCard.buttonText }}
                      </button>
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
const currentFieldFocus = ref<'title' | 'subtitle' | 'description' | 'timer' | null>(null)
const currentFieldTextColor = ref('#ffffff')
const currentFieldBgColor = ref('#111827')
const currentFieldBgEndColor = ref('#111827')
const currentFieldBgDirection = ref('to right')
const currentFieldBgMidpoint = ref(50)

const syncPromoEditorsFromConfig = () => {
  const timerEditor = document.querySelector('#timer-richtext-editor') as HTMLDivElement
  if (timerEditor) {
    timerEditor.innerHTML = config.value.promoCard.timerText || 'Ends in <strong>hh</strong> mmm sss'
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
}

async function applyPromoTemplate(template: PromoCard, templateName: string) {
  config.value.promoCard = JSON.parse(JSON.stringify(template))
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

  // Initialize timer text if not set
  if (!config.value.promoCard.timerText) {
    config.value.promoCard.timerText = 'Ends in <strong>hh</strong> mmm sss'
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
  const hoursRaw = String(Number(hours) || 0)
  const minutesRaw = String(Number(minutes) || 0)
  const secondsRaw = String(Number(seconds) || 0)
  const template = config.value.promoCard.timerText || 'Ends in <strong>hh</strong> mmm sss'
  return template
    .replace(/\{hh\}/g, hours)
    .replace(/\{h\}/g, hoursRaw)
    .replace(/\{mm\}/g, minutes)
    .replace(/\{m\}/g, minutesRaw)
    .replace(/\{ss\}/g, seconds)
    .replace(/\{s\}/g, secondsRaw)
    // Backward compatibility with old templates
    .replace(/hh/g, hours)
    .replace(/mm/g, minutes)
    .replace(/ss/g, seconds)
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
    if (!config.value.promoCard.timerText) {
      config.value.promoCard.timerText = 'Ends in <strong>hh</strong> mmm sss'
    }
    nextTick(() => {
      const timerEditor = document.querySelector('#timer-richtext-editor') as HTMLDivElement
      if (timerEditor) {
        timerEditor.innerHTML = config.value.promoCard.timerText || 'Ends in <strong>hh</strong> mmm sss'
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
  activeFormats.value = { bold: false, italic: false, size: '' }
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
      activeFormats.value = { bold: false, italic: false, size: '' }
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
      activeFormats.value = { bold: false, italic: false, size: '' }

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
  const html = target.innerHTML

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
  activeFormats.value.size = ''
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

  // Check if text is actually selected (don't apply to everything)
  const selection = window.getSelection()
  if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
    // No text is highlighted - show a brief visual hint
    return
  }

  // Make sure the selection is within our editor
  const anchorNode = selection.anchorNode
  if (!anchorNode || !richEditor.contains(anchorNode)) {
    return
  }

  // Use execCommand for bold, italic, underline (browser handles combining natively)
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
  const updatedHtml = richEditor.innerHTML
  newAnnouncementText.value = updatedHtml
  if (selectedAnnouncementIndex.value !== null) {
    config.value.announcementBar.announcements[selectedAnnouncementIndex.value].text = updatedHtml
    markChanged()
  }

  // Update active format indicators
  updateActiveFormats()
}

// Apply font size - preserves bold/italic, prevents nesting
function applyFontSize(size: string) {
  const selection = window.getSelection()
  if (!selection || selection.rangeCount === 0) return

  const range = selection.getRangeAt(0)
  if (range.collapsed) return

  const selectedText = range.toString()
  if (!selectedText) return

  // Check if selection contains bold or italic by examining the range
  const fragment = range.cloneContents()
  const tempDiv = document.createElement('div')
  tempDiv.appendChild(fragment)

  // Check for bold/italic in the cloned content
  const hasBold = !!tempDiv.querySelector('b, strong')
  const hasItalic = !!tempDiv.querySelector('i, em')

  // Also check if the selection is inside bold/italic elements
  let node = range.commonAncestorContainer
  if (node.nodeType === Node.TEXT_NODE) {
    node = node.parentElement!
  }

  let isBold = hasBold
  let isItalic = hasItalic

  // Walk up the tree to check parent elements
  let current = node as HTMLElement
  while (current && current.contentEditable !== 'true') {
    if (current.tagName === 'B' || current.tagName === 'STRONG') {
      isBold = true
    }
    if (current.tagName === 'I' || current.tagName === 'EM') {
      isItalic = true
    }
    current = current.parentElement!
  }

  // Delete the selection
  document.execCommand('delete', false)

  // Create the new span with font-size
  const newSpan = document.createElement('span')
  newSpan.style.fontSize = size

  // Build the content with preserved formatting
  let content: Node
  if (isBold && isItalic) {
    const bold = document.createElement('b')
    const italic = document.createElement('i')
    italic.textContent = selectedText
    bold.appendChild(italic)
    content = bold
  } else if (isBold) {
    const bold = document.createElement('b')
    bold.textContent = selectedText
    content = bold
  } else if (isItalic) {
    const italic = document.createElement('i')
    italic.textContent = selectedText
    content = italic
  } else {
    content = document.createTextNode(selectedText)
  }

  newSpan.appendChild(content)

  // Insert the new span
  const newRange = selection.getRangeAt(0)
  newRange.insertNode(newSpan)

  // Move cursor after the span
  newRange.setStartAfter(newSpan)
  newRange.setEndAfter(newSpan)
  selection.removeAllRanges()
  selection.addRange(newRange)
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

function onTimerTextInput(event: Event) {
  const target = event.target as HTMLDivElement
  config.value.promoCard.timerText = target.innerHTML
  markChanged()
}

function updatePromoFormats() {
  promoFormats.value.bold = document.queryCommandState('bold')
  promoFormats.value.italic = document.queryCommandState('italic')
  promoFormats.value.size = ''
  const selection = window.getSelection()
  if (selection && selection.anchorNode) {
    let node: Node | null = selection.anchorNode
    while (node && node !== document.body) {
      if (node instanceof HTMLElement) {
        const fontSize = node.style.fontSize
        if (fontSize) {
          if (fontSize === '0.75rem') promoFormats.value.size = 'xs'
          else if (fontSize === '0.875rem') promoFormats.value.size = 'sm'
          else if (fontSize === '1.125rem') promoFormats.value.size = 'lg'
          else if (fontSize === '1.25rem') promoFormats.value.size = 'xl'
          else if (fontSize === '1.5rem') promoFormats.value.size = 'xxl'
          break
        }
      }
      node = node.parentNode
    }
  }
}

function formatPromoText(format: string) {
  const selection = window.getSelection()
  if (!selection || selection.rangeCount === 0 || selection.isCollapsed) return

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
    if (editor) config.value.promoCard.title = editor.innerHTML
  } else if (currentFieldFocus.value === 'subtitle') {
    const editor = document.querySelector('#promo-subtitle-editor') as HTMLDivElement
    if (editor) config.value.promoCard.subtitle = editor.innerHTML
  } else if (currentFieldFocus.value === 'description') {
    const editor = document.querySelector('#promo-description-editor') as HTMLDivElement
    if (editor) config.value.promoCard.description = editor.innerHTML
  } else if (currentFieldFocus.value === 'timer') {
    const editor = document.querySelector('#timer-richtext-editor') as HTMLDivElement
    if (editor) config.value.promoCard.timerText = editor.innerHTML
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
    timer: config.value.promoCard.style.dateStyle
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
    timer: config.value.promoCard.style.dateStyle
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
}

function updateFieldColors() {
  if (!currentFieldFocus.value) return

  const styleMap: Record<string, any> = {
    title: config.value.promoCard.style.titleStyle,
    subtitle: config.value.promoCard.style.subheadingStyle,
    description: config.value.promoCard.style.descriptionStyle,
    timer: config.value.promoCard.style.dateStyle
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
    timer: config.value.promoCard.style.dateStyle
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
    timer: config.value.promoCard.style.dateStyle
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
  config.value.promoCard.title = target.innerHTML
  markChanged()
}

function onPromoSubtitleInput(event: Event) {
  const target = event.target as HTMLDivElement
  config.value.promoCard.subtitle = target.innerHTML
  markChanged()
}

function onPromoDescriptionInput(event: Event) {
  const target = event.target as HTMLDivElement
  config.value.promoCard.description = target.innerHTML
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
