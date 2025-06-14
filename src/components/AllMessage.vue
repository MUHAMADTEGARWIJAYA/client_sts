<template>
  <div class="min-h-screen bg-[#131010] text-white p-4 md:p-8">
    <header class="mb-10 text-center">
      <h1 class="text-4xl text-white md:text-5xl font-bold mb-2 bg-clip-text text-transparent">
        Pesan Musik
      </h1>
      <p class="text-lg text-white">Lihat apakah ada pesan yang telah dikirim untuk kamu</p>
    </header>

    <div class="max-w-6xl mx-auto">
      <div class="mb-8 backdrop-blur-md rounded-xl p-4 ">
        <div class="relative">
          <input v-model="searchQuery" type="text" placeholder="Cari berdasarkan penerima..."
            class="w-full bg-white/20 rounded-full py-3 px-5 pr-12 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-cyan-400" />
          <div class="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div v-if="isLoading" class="flex justify-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
      </div>

      <div v-else-if="filteredMessages.length === 0" class="text-center py-20">
        <div class="mx-auto w-24 h-24 text-blue-400 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 class="text-xl font-medium text-blue-100">Tidak ada pesan ditemukan</h3>
        <p class="text-blue-300 mt-2">Coba gunakan kata kunci pencarian berbeda</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <router-link v-for="message in filteredMessages" :key="message._id" :to="`/detail/${message._id}`"
          class="bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-xl overflow-hidden transition-all duration-300 block">
          <div>
            <div class="bg-white rounded-lg p-6 h-72 flex flex-col justify-between ">
              <div class="flex w-full h-16 rounded-lg">
                <div class="p-3 flex w-full gap-10">
                  <img :src="message.cover || 'https://via.placeholder.com/300/1e3a8a/ffffff?text=No+Cover'"
                    :alt="message.title" class="w-10 h-10 object-cover" />
                  <div>
                    <h3 class="font-semibold text-[#131010] ">{{ message.title }}</h3>
                    <p class="text-xs text-[#131010] ">{{ message.artist || 'Unknown Artist' }}</p>
                  </div>
                </div>
              </div>

              <p class="text-sm font-medium p-3 text-[#131010] truncate">
                To: {{ message.to }}
              </p>
              <div class="h-56 p-3 pt-4 flex handwritten items-center overflow-hidden">
                <p class="text-[#131010] text-3xl line-clamp-2 overflow-hidden leading-tight">
                  {{ message.pesan }}
                </p>
              </div>
              <div class="flex justify-start p-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#1DB954">
                  <path
                    d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
              </div>
            </div>

          </div>
        </router-link>
      </div>

      <div v-if="hasMore && !isLoading" class="mt-10 text-center">
        <button @click="loadMore" :disabled="isLoadingMore"
          class="inline-flex items-center px-6 py-3 border border-cyan-400/30 text-cyan-300 hover:text-white hover:bg-cyan-400/10 rounded-full transition">
          <svg v-if="isLoadingMore" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 animate-spin mr-2" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          {{ isLoadingMore ? 'Memuat...' : 'Muat Lebih Banyak' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import dayjs from 'dayjs';

export default {
  setup() {
    const messages = ref([]);
    const isLoading = ref(true);
    const isLoadingMore = ref(false);
    const searchQuery = ref('');
    // expandedMessages mungkin tidak lagi diperlukan jika detail pesan ditampilkan di halaman terpisah
    const expandedMessages = ref({});
    const page = ref(1);
    const limit = 9;
    const hasMore = ref(true);

    // Format tanggal
    const formatDate = (dateString) => {
      return dayjs(dateString).format('D MMM YYYY, HH:mm');
    };

    // toggleExpand tidak lagi dipanggil di card, tetapi tetap ada jika mungkin digunakan di tempat lain
    const toggleExpand = (messageId) => {
      expandedMessages.value = {
        ...expandedMessages.value,
        [messageId]: !expandedMessages.value[messageId]
      };
    };

    // Filter messages berdasarkan search query
    const filteredMessages = computed(() => {
      if (!searchQuery.value) return messages.value;
      return messages.value.filter(message =>
        message.to.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    // Fetch messages dari API
    const fetchMessages = async (loadMore = false) => {
      if (loadMore) {
        isLoadingMore.value = true;
        page.value += 1;
      } else {
        isLoading.value = true;
        page.value = 1; // Reset page if not loading more (e.g., initial load or search change)
        messages.value = []; // Clear messages on new fetch
      }

      try {
        const response = await axios.get(`https://server-sts.vercel.app/song/messages?page=${page.value}&limit=${limit}`);
        messages.value = [...messages.value, ...response.data.data];
        hasMore.value = response.data.data.length === limit;
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        isLoading.value = false;
        isLoadingMore.value = false;
      }
    };

    // Load more messages
    const loadMore = () => {
      fetchMessages(true);
    };

    // Watch for searchQuery changes to re-fetch messages (optional, if you want server-side search)
    // Jika search dilakukan secara client-side (pada filteredMessages computed), ini tidak perlu
    // watch(searchQuery, (newValue, oldValue) => {
    //   if (newValue !== oldValue) {
    //     fetchMessages();
    //   }
    // });

    // Initialize component
    onMounted(() => {
      fetchMessages();
    });

    return {
      messages,
      isLoading,
      isLoadingMore,
      searchQuery,
      expandedMessages, // Tetap dikembalikan jika ada kebutuhan lain
      hasMore,
      filteredMessages,
      formatDate,
      toggleExpand, // Tetap dikembalikan jika ada kebutuhan lain
      loadMore
    };
  }
};
</script>

<style>
.crafty-text {
  font-family: 'Crafty Girls', cursive;
}

.handwritten {
  font-family: 'Reenie Beanie', cursive;
  font-size: 2rem;
}


.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Line clamp untuk memotong teks */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Animasi untuk card hover */
.transition-all {
  transition-property: all;
}

.duration-300 {
  transition-duration: 300ms;
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
