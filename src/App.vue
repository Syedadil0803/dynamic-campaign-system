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
        <div class="max-w-6xl mx-auto space-y-8 pb-12">

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
                <span v-else-if="config.announcementBar.announcements.length === 1">{{
                  config.announcementBar.announcements[0] }}</span>
                <span v-else>{{ config.announcementBar.announcements[0] }} • {{
                  config.announcementBar.announcements[1] }}</span>
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
              class="px-6 py-5 border-b border-gray-200 bg-gray-50/50 flex items-center justify-between dark:border-gray-700 dark:bg-gray-700/50">
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

            <div class="p-6 space-y-6">
              <!-- Announcement Input -->
              <div class="mb-6">
                <div class="flex items-center justify-between mb-2">
                  <label for="announcement-text" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Announcement Text
                  </label>

                  <!-- Rich Text Toggle - Only show when editing an existing announcement -->
                  <div v-if="selectedAnnouncementIndex !== null" class="flex items-center gap-2">
                    <span class="text-xs text-gray-500">Rich Text</span>
                    <button @click="toggleRichText"
                      :class="selectedAnnouncementRichText ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'"
                      class="px-2 py-0.5 text-xs rounded-md border-0 focus:ring-2 focus:ring-indigo-500 transition-colors">
                      {{ selectedAnnouncementRichText ? 'ON' : 'OFF' }}
                    </button>
                  </div>
                </div>

                <!-- Rich Text Toolbar -->
                <div v-if="selectedAnnouncementRichText && selectedAnnouncementIndex !== null"
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
                    @mouseup="updateActiveFormats" @keyup="updateActiveFormats" @keyup.enter.prevent="addAnnouncement"
                    class="flex-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-3 border bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400 min-h-[56px] outline-none overflow-auto"
                    :data-placeholder="'Type announcement text...'"></div>
                  <button @click="addAnnouncement" :disabled="!newAnnouncementText?.trim()"
                    class="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed">
                    Add
                  </button>
                </div>
              </div>

              <!-- Announcements List -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Announcements</label>
                <div class="flex flex-wrap gap-2 mb-4">
                  <div v-for="(announcement, index) in config.announcementBar.announcements" :key="index"
                    class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 group relative"
                    :class="{ 'ring-2 ring-indigo-500': selectedAnnouncementIndex === index }">
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

                <!-- Single Date Fields for All Announcements -->
                <div class="border-t pt-4">
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
              </div>

              <!-- Style and URL Sections Side by Side -->
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Style Customization -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">Style
                    Customization</label>

                  <!-- Background Type Selector -->
                  <div class="mb-4">
                    <label class="block text-xs text-gray-500 mb-1 dark:text-gray-400">Background Type</label>
                    <select v-model="config.announcementBar.style.background.type" @change="markChanged"
                      class="block w-full text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md p-2 border bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                      <option value="solid">Solid</option>
                      <option value="radial">Gradient</option>
                    </select>
                  </div>

                  <div class="grid grid-cols-2 gap-4">
                    <div class="relative rounded-md shadow-sm">
                      <label class="block text-xs text-gray-500 mb-1 dark:text-gray-400">Start Color</label>
                      <input type="color" v-model="config.announcementBar.style.background.startColor"
                        @input="markChanged"
                        class="h-10 w-full rounded border border-gray-300 cursor-pointer dark:border-gray-600" />
                    </div>
                    <div class="relative rounded-md shadow-sm"
                      v-if="config.announcementBar.style.background.type !== 'solid'">
                      <label class="block text-xs text-gray-500 mb-1 dark:text-gray-400">End Color</label>
                      <input type="color" v-model="config.announcementBar.style.background.endColor"
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
                  <div v-else class="text-center py-8 px-4 border-2 border-dashed border-gray-300 rounded-lg">
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

            <!-- Live Preview Area Inline -->
            <div class="bg-gray-100 p-4 border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
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
          </section>

          <!-- Promo Card Section -->
          <section v-if="activeTab === 'promo'" id="promo"
            class="bg-white shadow rounded-lg border border-gray-200 overflow-hidden dark:bg-gray-800 dark:border-gray-700">
            <div
              class="px-6 py-5 border-b border-gray-200 bg-gray-50/50 flex items-center justify-between dark:border-gray-700 dark:bg-gray-700/50">
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

            <div class="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
              <!-- Form Side -->
              <div class="space-y-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                  <input type="text" v-model="config.promoCard.title" @input="markChanged"
                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2.5 border bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                    placeholder="Get 20% OFF" />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                  <textarea rows="2" v-model="config.promoCard.description" @input="markChanged"
                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2.5 border bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
                    placeholder="Sign up for our newsletter today!"></textarea>
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Button Text</label>
                    <input type="text" v-model="config.promoCard.buttonText" @input="markChanged"
                      class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2.5 border bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Button URL</label>
                    <input type="text" v-model="config.promoCard.buttonUrl" @input="markChanged"
                      class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2.5 border bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" />
                  </div>
                </div>


                <!-- Dates -->
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Start Date</label>
                    <input type="date" v-model="config.promoCard.startDate" @input="markChanged"
                      class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2.5 border bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">End Date</label>
                    <input type="date" v-model="config.promoCard.endDate" @input="markChanged"
                      class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2.5 border bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" />
                  </div>
                </div>

                <!-- Styling -->
                <div class="border-t border-gray-200 pt-4 dark:border-gray-600">
                  <h4 class="text-sm font-medium text-gray-900 mb-3 dark:text-gray-100">Card Appearance</h4>
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block text-xs text-gray-500 mb-1 dark:text-gray-400">Position</label>
                      <select v-model="config.promoCard.style.position" @change="markChanged"
                        class="block w-full text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md p-2 border bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                        <option value="bottom-right">Bottom Right</option>
                        <option value="bottom-left">Bottom Left</option>
                      </select>
                    </div>

                    <!-- Background Type Selector -->
                    <div>
                      <label class="block text-xs text-gray-500 mb-1 dark:text-gray-400">Background Type</label>
                      <select v-model="config.promoCard.style.background.type" @change="markChanged"
                        class="block w-full text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md p-2 border bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                        <option value="solid">Solid</option>
                        <option value="radial">Gradient</option>
                      </select>
                    </div>

                    <div class="flex items-end space-x-2">
                      <div class="flex-1">
                        <label class="block text-xs text-gray-500 mb-1 dark:text-gray-400">Start Color</label>
                        <input type="color" v-model="config.promoCard.style.background.startColor" @input="markChanged"
                          class="h-9 w-full rounded border border-gray-300 cursor-pointer dark:border-gray-600" />
                      </div>
                      <div class="flex-1" v-if="config.promoCard.style.background.type !== 'solid'">
                        <label class="block text-xs text-gray-500 mb-1 dark:text-gray-400">End Color</label>
                        <input type="color" v-model="config.promoCard.style.background.endColor" @input="markChanged"
                          class="h-9 w-full rounded border border-gray-300 cursor-pointer dark:border-gray-600" />
                      </div>
                    </div>

                    <div class="flex items-end space-x-2" v-if="config.promoCard.style.background.type !== 'solid'">
                      <div class="flex-1">
                        <label class="block text-xs text-gray-500 mb-1 dark:text-gray-400">End Color</label>
                        <input type="color" v-model="config.promoCard.style.background.endColor" @input="markChanged"
                          class="h-9 w-full rounded border border-gray-300 cursor-pointer dark:border-gray-600" />
                      </div>
                      <div class="flex-1">
                        <label class="block text-xs text-gray-500 mb-1 dark:text-gray-400">Text Color</label>
                        <input type="color" v-model="config.promoCard.style.textColor" @input="markChanged"
                          class="h-9 w-full rounded border border-gray-300 cursor-pointer dark:border-gray-600" />
                      </div>
                    </div>

                    <div class="flex items-end space-x-2 mt-4"
                      v-if="config.promoCard.style.background.type === 'solid'">
                      <div class="flex-1">
                        <label class="block text-xs text-gray-500 mb-1 dark:text-gray-400">Text Color</label>
                        <input type="color" v-model="config.promoCard.style.textColor" @input="markChanged"
                          class="h-9 w-full rounded border border-gray-300 cursor-pointer dark:border-gray-600" />
                      </div>
                    </div>

                    <div class="flex items-end space-x-2 mt-4">
                      <div class="flex-1">
                        <label class="block text-xs text-gray-500 mb-1 dark:text-gray-400">Button Bg Color</label>
                        <input type="color" v-model="config.promoCard.style.buttonColor" @input="markChanged"
                          class="h-9 w-full rounded border border-gray-300 cursor-pointer dark:border-gray-600" />
                      </div>
                      <div class="flex-1">
                        <label class="block text-xs text-gray-500 mb-1 dark:text-gray-400">Button Text Color</label>
                        <input type="color" v-model="config.promoCard.style.buttonTextColor" @input="markChanged"
                          class="h-9 w-full rounded border border-gray-300 cursor-pointer dark:border-gray-600" />
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              <!-- Preview Side -->
              <div
                class="bg-gray-100 rounded-lg p-4 flex items-center justify-center relative min-h-[400px] border border-gray-200 bg-[url('https://lib.shadcn.com/placeholder.svg')] bg-center bg-no-repeat bg-contain dark:bg-gray-700 dark:border-gray-600">
                <div
                  class="absolute inset-0 flex items-center justify-center text-gray-400 text-sm font-medium pointer-events-none dark:text-gray-500">
                  Website Content Area</div>

                <!-- The Actual Card Preview -->
                <div v-if="config.promoCard.active"
                  class="absolute w-72 rounded-xl shadow-2xl p-5 transition-all duration-300 flex flex-col" :class="{
                    'bottom-4 right-4': config.promoCard.style.position === 'bottom-right',
                    'bottom-4 left-4': config.promoCard.style.position === 'bottom-left',
                    'top-4 right-4': config.promoCard.style.position === 'top-right',
                    'top-4 left-4': config.promoCard.style.position === 'top-left'
                  }"
                  :style="{ background: getBackgroundStyle(config.promoCard.style.background), color: config.promoCard.style.textColor }">
                  <button class="absolute top-2 right-2 text-current opacity-60 hover:opacity-100 p-1">
                    <X class="w-4 h-4" />
                  </button>

                  <h3 class="text-lg font-bold mb-1">{{ config.promoCard.title || 'Title' }}</h3>
                  <p class="text-sm opacity-90 mb-4">{{ config.promoCard.description || 'Description text goes here.' }}
                  </p>

                  <button v-if="config.promoCard.buttonText"
                    class="w-full py-2 px-4 rounded-lg text-sm font-semibold transition-transform active:scale-95"
                    :style="{ backgroundColor: config.promoCard.style.buttonColor, color: config.promoCard.style.buttonTextColor }">
                    {{ config.promoCard.buttonText }}
                  </button>
                </div>
              </div>
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
import type { CampaignConfig } from './types/campaign'
import { defaultConfig } from './types/campaign'
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
const selectedAnnouncementUrl = ref('')
const selectedAnnouncementRichText = ref(false)
const activeFormats = ref<{ bold: boolean; italic: boolean; size: string }>({
  bold: false,
  italic: false,
  size: ''
})

// Computed property to check if we're in rich text edit mode
const isRichTextEditMode = computed(() => {
  return selectedAnnouncementIndex.value !== null && selectedAnnouncementRichText.value
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

  // Check for saved dark mode preference or system preference
  const savedDarkMode = localStorage.getItem('darkMode')
  if (savedDarkMode !== null) {
    isDarkMode.value = savedDarkMode === 'true'
  } else {
    isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  // Apply dark mode class to html element
  updateDarkModeClass()
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

function markChanged() {
  hasChanges.value = true
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

function toggleCampaign(type: 'announcementBar' | 'promoCard') {
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
      config.value.announcementBar.announcements.push({ text })
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

  // Update the announcement text in the data model
  if (selectedAnnouncementIndex.value !== null) {
    config.value.announcementBar.announcements[selectedAnnouncementIndex.value].text = html
    newAnnouncementText.value = html
    markChanged()
  }

  // Update active format indicators
  updateActiveFormats()
}

// Update active format indicators based on current cursor/selection position
function updateActiveFormats() {
  if (selectedAnnouncementIndex.value === null || !selectedAnnouncementRichText.value) {
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
          break
        }
      }
      node = node.parentNode
    }
  }
}

function formatText(format: string) {
  if (selectedAnnouncementIndex.value === null) return

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
  }

  // Sync the updated HTML back to the data model
  const updatedHtml = richEditor.innerHTML
  config.value.announcementBar.announcements[selectedAnnouncementIndex.value].text = updatedHtml
  newAnnouncementText.value = updatedHtml
  markChanged()

  // Update active format indicators
  updateActiveFormats()
}

// Apply font size using execCommand with a span wrapper
function applyFontSize(size: string) {
  const selection = window.getSelection()
  if (!selection || selection.rangeCount === 0) return

  const range = selection.getRangeAt(0)

  // Only apply to selected text, not everything
  if (range.collapsed) return

  // Extract the selected content
  const fragment = range.extractContents()

  // Remove any existing font-size spans from the fragment
  const existingSpans = fragment.querySelectorAll('span[style*="font-size"]')
  existingSpans.forEach(span => {
    const parent = span.parentNode
    while (span.firstChild) {
      parent?.insertBefore(span.firstChild, span)
    }
    parent?.removeChild(span)
  })

  // Wrap in a new span with the desired font size
  const wrapper = document.createElement('span')
  wrapper.style.fontSize = size
  wrapper.appendChild(fragment)

  range.insertNode(wrapper)

  // Restore selection around the wrapper
  range.selectNodeContents(wrapper)
  selection.removeAllRanges()
  selection.addRange(range)
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

function getBackgroundStyle(background: any) {
  if (background.type === 'solid') {
    return background.startColor
  } else if (background.type === 'radial') {
    return `radial-gradient(circle, ${background.startColor}, ${background.endColor})`
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
