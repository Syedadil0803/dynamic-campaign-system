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
        <div class="flex items-center space-x-4">
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
                <span class="sr-only">Use setting</span>
                <span :class="config.announcementBar.active ? 'translate-x-5' : 'translate-x-0'"
                  class="pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200">
                  <span
                    :class="config.announcementBar.active ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200'"
                    class="absolute inset-0 h-full w-full flex items-center justify-center transition-opacity">
                    <svg class="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                      <path d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2" stroke="currentColor" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </span>
                  <span
                    :class="config.announcementBar.active ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100'"
                    class="absolute inset-0 h-full w-full flex items-center justify-center transition-opacity">
                    <svg class="h-3 w-3 text-indigo-600" fill="currentColor" viewBox="0 0 12 12">
                      <path
                        d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                    </svg>
                  </span>
                </span>
              </button>
            </div>

            <div class="p-6 space-y-6">
              <!-- Announcement Input -->
              <div class="mb-6">
                <label for="announcement-text"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300">Announcement Text</label>
                <div class="mt-1 flex gap-2">
                  <textarea id="announcement-text" rows="2" v-model="newAnnouncementText" @keyup.enter="addAnnouncement"
                    class="flex-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-3 border bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
                    placeholder="Type announcement and press Enter..."></textarea>
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
                    class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                    {{ announcement }}
                    <button @click="removeAnnouncement(index)"
                      class="ml-2 text-indigo-600 hover:text-indigo-800 dark:text-indigo-300 dark:hover:text-indigo-100">
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

              <!-- Colors -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">Style
                  Customization</label>
                <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div class="relative rounded-md shadow-sm">
                    <input type="color" v-model="config.announcementBar.style.backgroundColor" @input="markChanged"
                      class="h-10 w-full rounded border border-gray-300 cursor-pointer dark:border-gray-600" />
                    <div class="mt-1 text-xs text-center text-gray-500 dark:text-gray-400">Background</div>
                  </div>
                  <div class="relative rounded-md shadow-sm">
                    <input type="color" v-model="config.announcementBar.style.textColor" @input="markChanged"
                      class="h-10 w-full rounded border border-gray-300 cursor-pointer dark:border-gray-600" />
                    <div class="mt-1 text-xs text-center text-gray-500 dark:text-gray-400">Text</div>
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
                <div v-if="config.announcementBar.active && getActiveAnnouncements().length > 0"
                  class="py-2.5 px-4 text-center text-sm font-medium transition-colors duration-300 overflow-hidden"
                  :style="{ backgroundColor: config.announcementBar.style.backgroundColor, color: config.announcementBar.style.textColor }">
                  <div class="animate-scroll-left">
                    <span v-for="announcement in getActiveAnnouncements()" :key="announcement"
                      class="inline-block px-4">
                      {{ announcement }}
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
                    <div class="flex items-end space-x-2">
                      <div class="flex-1">
                        <label class="block text-xs text-gray-500 mb-1 dark:text-gray-400">Bg Color</label>
                        <input type="color" v-model="config.promoCard.style.backgroundColor" @input="markChanged"
                          class="h-9 w-full rounded border border-gray-300 cursor-pointer dark:border-gray-600" />
                      </div>
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
                  :style="{ backgroundColor: config.promoCard.style.backgroundColor, color: config.promoCard.style.textColor }">
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
      class="fixed bottom-6 right-6 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3 z-50 animate-bounce-in">
      <CheckCircle class="w-5 h-5 text-green-400" />
      <span class="font-medium">{{ toastMessage }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
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
  Code,
  ChevronDown,
  Sun,
  Moon
} from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const activeTab = ref<'dashboard' | 'announcement' | 'promo'>('dashboard')
const config = ref<CampaignConfig>(defaultConfig)
const hasChanges = ref(false)
const showToast = ref(false)
const toastMessage = ref('')
const isDarkMode = ref(false)
const newAnnouncementText = ref('')

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
    toast('Failed to save settings')
  }
}

function switchTab(tab: 'dashboard' | 'announcement' | 'promo') {
  activeTab.value = tab
  router.push(`/${tab}`)
}

function toggleCampaign(type: 'announcementBar' | 'promoCard') {
  config.value[type].active = !config.value[type].active
  markChanged()
}

function toast(message: string) {
  toastMessage.value = message
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}

// Announcement management functions
function addAnnouncement() {
  const text = newAnnouncementText.value?.trim()
  if (text) {
    config.value.announcementBar.announcements.push(text)
    newAnnouncementText.value = ''
    markChanged()
  }
}

function removeAnnouncement(index: number) {
  config.value.announcementBar.announcements.splice(index, 1)
  markChanged()
}

function getActiveAnnouncements() {
  const now = new Date()
  const { startDate, endDate } = config.value.announcementBar

  // If no dates are set, show all announcements
  if (!startDate && !endDate) {
    return config.value.announcementBar.announcements
  }

  // If both start and end dates are set, check if current date is within range
  if (startDate && endDate) {
    const start = new Date(startDate)
    const end = new Date(endDate)
    if (now >= start && now <= end) {
      return config.value.announcementBar.announcements
    }
  }

  // If only start date is set, check if current date is after start date
  if (startDate && !endDate) {
    const start = new Date(startDate)
    if (now >= start) {
      return config.value.announcementBar.announcements
    }
  }

  return []
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
</style>
