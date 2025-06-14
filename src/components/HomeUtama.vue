<template>
  <div class="min-h-screen bg-[#131010] overflow-hidden">
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      <div v-for="i in 12" :key="i" class="absolute rounded-full bg-indigo-500/10" :style="{
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        width: `${Math.random() * 300 + 100}px`,
        height: `${Math.random() * 300 + 100}px`,
        animation: `pulse ${Math.random() * 15 + 10}s infinite alternate`
      }"></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <section class="text-center mb-28">
        <div class="animate-fade-in-up">
          <h1 class="text-4xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent text-white">
            Say to someone
          </h1>
          <p class="text-md md:text-2xl text-indigo-200 max-w-3xl mx-auto mb-10">
            Kirim pesan spesial dengan lagu favoritmu. Ungkapkan perasaan melalui musik.
          </p>
          <div class="flex justify-center gap-4">
            <router-link to="/add"
              class="px-8 py-3 bg-white rounded-full font-medium text-[#131010] shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 transform hover:-translate-y-1">
              Say To....
            </router-link>
            <router-link to="/all"
              class="px-8 py-3 bg-transparent border-2 border-white text-white rounded-full font-medium shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 transform hover:-translate-y-1">
              Lihat Pesan
            </router-link>
          </div>
        </div>

        <div class="mt-20 animate-float">
          <div class="relative inline-block">
            <img src="https://cdn-icons-png.flaticon.com/512/725/725281.png"
              class="w-24 h-24 object-contain animate-spin-slow" alt="Music Icon">
            <div class="absolute -inset-4 bg-cyan-500/20 rounded-full blur-lg animate-pulse"></div>
          </div>
        </div>
      </section>

      <section class="mb-28">
        <h2 class="text-3xl font-bold text-center mb-16 text-white">
          <span class="border-b-4 border-cyan-400 pb-2">Fitur Utama</span>
        </h2>

        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="(feature, index) in features" :key="index"
            class="bg-white backdrop-blur-md p-6 rounded-xl transition-all duration-500 hover:-translate-y-2"
            :style="`animation-delay: ${index * 100}ms`">
            <div class="text-cyan-400 mb-4" v-html="feature.icon"></div>
            <h3 class="text-xl font-semibold mb-2 text-[#131010]">{{ feature.title }}</h3>
            <p class="text-[#131010] text-sm">{{ feature.description }}</p>
          </div>
        </div>
      </section>

      <section class="mb-20">
        <h2 class="text-3xl font-bold text-center mb-16 text-white">
          <span class="border-b-4 border-cyan-400 pb-2">Pesan Terbaru</span>
        </h2>

        <div v-if="loadingMessages" class="flex justify-center py-10">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
        </div>

        <div v-else-if="recentMessages && recentMessages.length === 0" class="text-center py-10 text-indigo-300">
          Belum ada pesan terbaru. Mari jadi yang pertama mengirim!
        </div>

        <div v-else class="relative overflow-hidden py-4 rounded-md">
          <div class="flex gap-6 pb-4 whitespace-nowrap scrolling-container">
            <div v-for="(message, index) in displayedMessagesTop" :key="`top-${message._id}-${index}`"
              class="flex-shrink-0 w-64 md:w-[400px] bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-xl overflow-hidden transition-all duration-300 message-card">
              <div class="bg-white rounded-lg p-6 h-72 flex flex-col justify-between">
                <div class="flex w-full h-16 rounded-lg">
                  <div class="p-3 flex w-full gap-4 items-center">
                    <img :src="message.cover || 'https://via.placeholder.com/300/1e3a8a/ffffff?text=No+Cover'"
                      :alt="message.title" class="w-10 h-10 object-cover rounded-md" />
                    <div>
                      <h3 class="font-semibold text-[#131010] text-base">{{ message.title }}</h3>
                      <p class="text-xs text-gray-500 ">{{ message.artist || 'Unknown Artist' }}</p>
                    </div>
                  </div>
                </div>
                <p class="text-sm font-medium p-3 text-[#131010] truncate">
                  To: <span class="font-bold">{{ message.to }}</span>
                </p>
                <div class="h-56 p-3 pt-4 flex handwritten items-center overflow-hidden">
                  <p class="text-[#131010] text-3xl line-clamp-2 overflow-hidden leading-tight">
                    "{{ message.pesan }}"
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
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import axios from 'axios';
import dayjs from 'dayjs'; // Pastikan dayjs terinstal jika digunakan

export default {
  setup() {
    const loadingMessages = ref(true);
    const recentMessages = ref([]);

    const features = ref([
      {
        title: 'Kirim Pesan',
        description: 'Kirim pesan tulus dengan lagu favoritmu kepada seseorang yang spesial.',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10"><path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0v9l-9 5.25M3 7.5v9l9 5.25m0-9v9" /></svg>'
      },
      {
        title: 'Cari Pesan',
        description: 'Kamu bisa menemukan pesan yang ditujukan untukmu dari seseorang yang kamu kenal.',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0M3.75 18H7.5m3-6h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0M3.75 12H7.5" /></svg>'
      },
      {
        title: 'Bagikan ke Medsos',
        description: 'Tap pada salah satu pesan lalu tap ikon share untuk membagikan ke sosial media kesukaanmu.',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10"><path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186A2.25 2.25 0 015.124 15.15c-.868.23-1.761.52-2.657.879.145.39.297.779.458 1.162A12.067 12.067 0 007.217 21a2.25 2.25 0 100-2.186m0-2.186c1.393 0 2.524-.764 2.524-2.186s-1.131-2.186-2.524-2.186M12 1.5c-3.243 0-6.148 1.458-8.06 3.75c1.413-.574 2.871-.977 4.381-1.218C10.634 1.748 13.06 1.5 15.5 1.5A7.5 7.5 0 0121 9c0 2.203-.787 4.228-2.052 5.868a12.06 12.06 0 01-2.657-.879c-.933-.315-1.859-.44-2.783-.379C12.43 14.862 12 16.517 12 18.25c0 .324.015.647.045.968A9 9 0 0012 1.5z" /></svg>'
      },
    ]);

    const formatDate = (dateString) => {
      // Fungsi ini tidak terpakai di template yang diperbarui, tapi tetap relevan jika ingin menampilkan tanggal
      return dayjs(dateString).format('D MMM');
    };

    const displayedMessagesTop = computed(() => {
      if (recentMessages.value.length === 0) return [];
      const messages = [...recentMessages.value];
      // Duplikasi konten 10x agar animasi loop CSS berjalan mulus tanpa jeda
      return Array(10).fill(messages).flat();
    });

    const fetchRecentMessages = async () => {
      try {
        const response = await axios.get('https://server-sts.vercel.app/song/messages/random?limit=8');
        recentMessages.value = response.data.data || [];
      } catch (error) {
        console.error('Error fetching recent messages:', error);
        recentMessages.value = [];
      } finally {
        loadingMessages.value = false;
      }
    };

    onMounted(async () => {
      await fetchRecentMessages();
      // Tidak perlu lagi memanggil startScrolling() karena kita pakai CSS Animation
    });

    onUnmounted(() => {
      // Tidak ada lagi interval JavaScript yang perlu dihentikan
    });

    return {
      loadingMessages,
      recentMessages,
      displayedMessagesTop,
      features,
      formatDate,
    };
  }
};
</script>

<style>
/* Existing styles remain */
/* Font kustom untuk tulisan tangan */
.handwritten {
  font-family: 'Reenie Beanie', cursive;
  font-size: 2rem;
}

/* Base Animations */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-20px);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.1;
  }

  100% {
    transform: scale(1.2);
    opacity: 0.3;
  }
}

@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 1s ease-out forwards;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-spin-slow {
  animation: spin-slow 20s linear infinite;
}

/* Line clamping for message text */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Transitions for hover effects */
.transition-all {
  transition-property: all;
}

.duration-300 {
  transition-duration: 300ms;
}

.duration-500 {
  transition-duration: 500ms;
}

/* --- Perbaikan Animasi Scroll Horizontal (NEW/MODIFIED) --- */

/* Keyframes untuk animasi scroll tak terbatas ke kiri */
@keyframes scrollLeft {
  0% {
    transform: translateX(0);
  }

  100% {
    /* Menggulir setengah dari total lebar konten yang diduplikasi */
    /* Ini penting untuk menciptakan loop yang mulus */
    transform: translateX(-50%);
  }
}

/* Container untuk pesan yang akan di-scroll */
.scrolling-container {
  /* Hilangkan properti snap-x, snap-mandatory, dan scroll-smooth */
  /* Karena animasi CSS yang akan mengendalikan pergerakan */
  overflow: hidden;
  /* Penting untuk menyembunyikan bagian konten yang diduplikasi */
  animation: scrollLeft 300s linear infinite;
  /* Sesuaikan durasi (60s) untuk kecepatan scroll yang diinginkan */
  /* 'linear' untuk kecepatan konstan */
  /* 'infinite' untuk mengulang terus menerus */
  width: max-content;
  /* Sangat penting! Memastikan lebar container cukup untuk semua item yang diduplikasi */
}

/* Opsional: Jeda animasi saat di-hover */
.scrolling-container:hover {
  animation-play-state: paused;
}

/* Pastikan kartu pesan individu tidak mempengaruhi tata letak scroll */
.message-card {
  display: inline-block;
  /* Menjadikan kartu sebagai blok inline agar bisa berjajar horizontal */
  vertical-align: top;
  /* Memastikan align top jika ada perbedaan tinggi */
}
</style>
