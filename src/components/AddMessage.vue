<template>
  <div class="min-h-screen bg-[#131010] text-white p-4 md:p-8">
    <header class="mb-10 text-center">

      <TambahCoba />
      <p class="text-lg text-white">Kirim pesan dengan lagu favoritmu</p>
    </header>

    <main class="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Search Section -->
      <div class="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20">
        <h2 class="text-2xl font-semibold mb-4 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Cari Lagu
        </h2>

        <div class="relative mb-6">
          <input v-model="searchQuery" @keyup.enter="searchSongs" type="text" placeholder="Cari lagu atau artist..."
            class="w-full bg-white/20 rounded-full py-3 px-5 pr-12 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white" />
          <button @click="searchSongs"
            class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/20 rounded-full p-2 transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>

        <div v-if="isSearching" class="flex justify-center py-8">
          <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-400"></div>
        </div>

        <div v-if="searchResults.length > 0" class="space-y-3 max-h-96 overflow-y-auto pr-2">
          <div v-for="song in searchResults" :key="song.id" @click="selectSong(song)"
            class="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-white/10 transition"
            :class="{ 'bg-purple-600/50': selectedSong?.id === song.id }">
            <img :src="song.cover" :alt="song.title" class="w-12 h-12 rounded-md object-cover" />
            <div class="flex-1 min-w-0">
              <h3 class="font-medium truncate">{{ song.title }}</h3>
              <p class="text-sm text-purple-200 truncate">{{ song.artist }}</p>
            </div>
            <button class="p-1 text-purple-200 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                  clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        <div v-if="searchError" class="text-red-300 bg-red-900/30 p-3 rounded-lg">
          {{ searchError }}
        </div>
      </div>

      <!-- Message Form Section -->
      <div class="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20">
        <h2 class="text-2xl font-semibold mb-4 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          Buat Pesan
        </h2>

        <form @submit.prevent="sendMessage" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-white mb-1">Dari (optional)</label>
              <input v-model="messageForm.from" type="text" placeholder="Boleh dikosongkan"
                class="w-full bg-white/20 rounded-lg py-2 px-4 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-purple-400" />
            </div>
            <div>
              <label class="block text-sm font-medium text-white mb-1">Untuk</label>
              <input v-model="messageForm.to" type="text" required placeholder="Nama penerima"
                class="w-full bg-white/20 rounded-lg py-2 px-4 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-purple-400" />
            </div>
          </div>

          <div v-if="selectedSong" class="bg-purple-900/30 rounded-xl p-4 border border-purple-400/30">
            <div class="flex gap-4">
              <img :src="selectedSong.cover" :alt="selectedSong.title" class="w-16 h-16 rounded-lg object-cover" />
              <div class="flex-1">
                <h3 class="font-medium">{{ selectedSong.title }}</h3>
                <p class="text-sm text-purple-200">{{ selectedSong.artist }}</p>
                <div class="mt-2 flex gap-2">
                  <a :href="selectedSong.spotify_url" target="_blank"
                    class="text-xs bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded-full flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
                      fill="currentColor">
                      <path
                        d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                    </svg>
                    Spotify
                  </a>
                  <button v-if="selectedSong.preview_url" @click.prevent="toggleAudio" type="button"
                    class="text-xs bg-pink-600 hover:bg-pink-700 text-white px-2 py-1 rounded-full flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
                      fill="currentColor">
                      <path
                        d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                    </svg>
                    {{ isPlaying ? 'Stop' : 'Preview' }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="bg-purple-900/20 rounded-xl p-6 text-center border border-dashed border-purple-400/30">
            <p class="text-purple-200">Pilih lagu terlebih dahulu untuk melanjutkan</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-purple-200 mb-1">Pesan Kamu</label>
            <textarea v-model="messageForm.pesan" required rows="4" placeholder="Tulis pesan yang ingin dikirim..."
              class="w-full bg-white/20 rounded-lg py-2 px-4 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-purple-400"></textarea>
          </div>

          <button type="submit" :disabled="!selectedSong || isSending"
            class="w-full bg-white text-[#131010] hover:bg-[#131010] hover:text-white py-3 px-4 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
            <svg v-if="isSending" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 animate-spin" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            {{ isSending ? 'Mengirim...' : 'Kirim Pesan' }}
          </button>
        </form>

        <audio ref="audioPlayer" :src="selectedSong?.preview_url" @ended="isPlaying = false" class="hidden"></audio>
      </div>
    </main>

    <!-- Success Notification -->
    <div v-if="showSuccess"
      class="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in-up">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      Pesan berhasil dikirim!
    </div>


  </div>


</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import TambahCoba from './TambahCoba.vue'
const searchQuery = ref('')
const searchResults = ref([])
const isSearching = ref(false)
const searchError = ref(null)

const selectedSong = ref(null)
const isPlaying = ref(false)
const audioPlayer = ref(null)

const messageForm = ref({

  to: '',
  pesan: ''
})

const isSending = ref(false)
const showSuccess = ref(false)

const searchSongs = async () => {
  if (!searchQuery.value.trim()) return

  isSearching.value = true
  searchError.value = null

  try {
    const response = await axios.get(`https://server-sts.vercel.app/song/search?q=${encodeURIComponent(searchQuery.value)}`)
    searchResults.value = response.data
  } catch (error) {
    console.error('Search error:', error)
    searchError.value = error.response?.data?.msg || 'Gagal mencari lagu'
    searchResults.value = []
  } finally {
    isSearching.value = false
  }
}

const selectSong = (song) => {
  selectedSong.value = song
  if (audioPlayer.value) {
    audioPlayer.value.pause()
    audioPlayer.value.src = song.preview_url || ''
    isPlaying.value = false
  }
}

const toggleAudio = () => {
  if (!selectedSong.value?.preview_url || !audioPlayer.value) return

  if (isPlaying.value) {
    audioPlayer.value.pause()
  } else {
    audioPlayer.value.play()
  }
  isPlaying.value = !isPlaying.value
}

const sendMessage = async () => {
  if (!selectedSong.value) return

  isSending.value = true

  try {
    const payload = {
      ...messageForm.value,
      title: selectedSong.value.title
    }

    await axios.post('https://server-sts.vercel.app/song/message', payload)

    // Reset form
    messageForm.value = {

      to: '',
      pesan: ''
    }
    selectedSong.value = null
    searchResults.value = []
    searchQuery.value = ''

    showSuccess.value = true
    setTimeout(() => {
      showSuccess.value = false
    }, 3000)
  } catch (error) {
    console.error('Send message error:', error)
    alert(error.response?.data?.msg || 'Gagal mengirim pesan')
  } finally {
    isSending.value = false
  }
}

onMounted(() => {
  audioPlayer.value = new Audio()
})
</script>



<style>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.3s ease-out forwards;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}
</style>
