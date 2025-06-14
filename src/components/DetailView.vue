<template>
  <div class="min-h-screen bg-white text-black flex items-center justify-center p-4 md:p-8">
    <div v-if="isLoading" class="flex flex-col items-center justify-center">
      <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-black"></div>
      <p class="mt-4 text-gray-600">Loading message...</p>
    </div>

    <div v-else-if="error" class="text-center p-8 bg-gray-100 border border-gray-300 rounded-lg max-w-md mx-auto">
      <p class="text-gray-800 text-lg mb-2">Error occurred!</p>
      <p class="text-gray-600">{{ error }}</p>
      <router-link to="/messages"
        class="mt-6 inline-block bg-black text-white font-medium py-2 px-6 rounded hover:bg-gray-800 transition-colors">
        Back to Messages
      </router-link>
    </div>

    <div v-else-if="message"
      class="w-full max-w-4xl bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
      <div class="p-6 md:p-8 flex flex-col" id="message-content-visible">
        <div class="flex flex-col md:flex-row gap-8">
          <div class="md:w-1/3 flex flex-col items-center">
            <img :src="message.cover || 'https://via.placeholder.com/600/000000/FFFFFF?text=No+Cover'"
              :alt="message.title" class="w-full max-w-xs rounded-sm shadow-md mb-4" />

            <div v-if="message.spotify_id" class="w-full mt-4">
              <iframe :src="`https://open.spotify.com/embed/track/${message.spotify_id}`" width="100%" height="80"
                frameborder="0" allowtransparency="true" allow="encrypted-media" class="rounded-sm shadow-sm">
              </iframe>
            </div>
          </div>

          <div class="md:w-2/3">
            <div class="mb-6">
              <h2 class="text-xl font-bold text-gray-900 mb-1">{{ message.title }}</h2>
              <p class="text-md text-gray-600 mb-6">{{ message.artist || 'Unknown Artist' }}</p>

              <div class="flex items-center gap-4 mb-4">
                <div>
                  <p>Hello <span class="font-semibold italic">{{ message.to }}</span>, someone sent you this song along
                    with a heartfelt message — hoping it brings a smile to your day :)</p>
                </div>
              </div>

              <div class="p-5 rounded mb-6">
                <p class="text-gray-800 text-2xl leading-relaxed handwritten">{{ message.pesan }}</p>
              </div>

              <p class="text-xs text-gray-400 text-right">Sent on: {{ formatDate(message.createdAt) }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap gap-3 mt-6 justify-end mb-10 px-9">
        <a :href="message.spotify_url" target="_blank" rel="noopener noreferrer"
          class="flex items-center gap-2 bg-black text-white py-2 px-5 rounded text-sm font-medium hover:bg-gray-800 transition-colors">
          <i class="fab fa-spotify"></i> Play on Spotify
        </a>
        <button @click="downloadMessageAsImage"
          class="flex items-center gap-2 bg-gray-100 text-gray-800 py-2 px-5 rounded text-sm font-medium hover:bg-gray-200 transition-colors">
          <i class="fas fa-download"></i> Download as Image
        </button>

        <button @click="copyLink"
          class="flex items-center gap-2 bg-gray-100 text-gray-800 py-2 px-5 rounded text-sm font-medium hover:bg-gray-200 transition-colors">
          <i class="fas fa-link"></i> Copy Link
        </button>
      </div>
    </div>

    <div v-else class="text-center p-8 bg-gray-100 border border-gray-300 rounded-lg max-w-md mx-auto">
      <p class="text-gray-800 text-lg mb-2">Message not found</p>
      <p class="text-gray-600">The message ID may be invalid or deleted.</p>
      <router-link to="/messages"
        class="mt-6 inline-block bg-black text-white font-medium py-2 px-6 rounded hover:bg-gray-800 transition-colors">
        Back to Messages
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import dayjs from 'dayjs';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

export default {
  name: 'MessageDetail',
  setup() {
    const route = useRoute();
    const message = ref(null);
    const isLoading = ref(true);
    const error = ref(null);

    const fetchMessage = async () => {
      try {
        isLoading.value = true;
        error.value = null;
        const messageId = route.params.id;
        const response = await axios.get(`https://server-sts.vercel.app/song/message/${messageId}`);
        message.value = response.data.data;

        // Corrected Spotify iframe URL: Get spotify_id from spotify_url
        if (message.value.spotify_url && !message.value.spotify_id) {
          const spotifyRegex = /(?:spotify:track:|https:\/\/open\.spotify\.com\/track\/)([a-zA-Z0-9]+)/;
          const match = message.value.spotify_url.match(spotifyRegex);
          if (match && match[1]) {
            message.value.spotify_id = match[1];
          }
        }
      } catch (err) {
        console.error('Error fetching message:', err);
        error.value = err.response?.status === 404
          ? 'Pesan tidak ditemukan.'
          : 'Gagal memuat pesan. Silakan coba lagi nanti.';
      } finally {
        isLoading.value = false;
      }
    };

    const formatDate = (dateString) => {
      if (!dateString) return '';
      return dayjs(dateString).format('MMMM D, YYYY [at] h:mm A');
    };

    // Fungsi shareToTwitter dan shareToWhatsApp tidak ada di template HTML Anda,
    // jadi saya tidak menyertakannya lagi di sini untuk menjaga konsistensi.
    // Jika Anda ingin menggunakannya, tambahkan kembali tombolnya di template.

    const copyLink = async () => {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link berhasil disalin ke clipboard!');
      } catch (err) {
        console.error('Failed to copy link:', err);
        alert('Gagal menyalin link.');
      }
    };

    const downloadMessageAsImage = async () => {
      const visibleContent = document.getElementById('message-content-visible');

      if (!visibleContent) {
        console.error('Elemen konten pesan tidak ditemukan!');
        alert('Tidak dapat menemukan konten untuk diunduh.');
        return;
      }

      // 1. Buat klon dari elemen konten yang terlihat
      const clonedContent = visibleContent.cloneNode(true);

      // 2. Tentukan lebar tetap untuk klon (misalnya, lebar desktop yang Anda inginkan)
      //    Ini akan membuat html2canvas merender pada lebar ini, terlepas dari viewport
      const targetWidth = 800; // Lebar standar yang diinginkan untuk gambar (sesuaikan)
      clonedContent.style.width = `${targetWidth}px`;
      clonedContent.style.maxWidth = `${targetWidth}px`; // Pastikan tidak melebihi

      // 3. Atur posisi klon di luar layar agar tidak terlihat pengguna
      clonedContent.style.position = 'absolute';
      clonedContent.style.top = '-9999px';
      clonedContent.style.left = '-9999px';
      clonedContent.style.background = '#ffffff'; // Pastikan background putih

      // 4. Tambahkan klon ke body atau elemen induk lainnya
      document.body.appendChild(clonedContent);

      try {
        // 5. Render klon menggunakan html2canvas
        const canvas = await html2canvas(clonedContent, {
          scale: 2, // Meningkatkan skala untuk resolusi gambar yang lebih baik (misal 2x atau 3x)
          useCORS: true, // Penting untuk memuat gambar dari domain berbeda (misal cover Spotify)
          backgroundColor: '#ffffff', // Atur warna latar belakang kanvas
        });

        // 6. Konversi kanvas ke URL data (format PNG)
        const imageDataUrl = canvas.toDataURL('image/png');

        // 7. Gunakan file-saver untuk mengunduh gambar
        saveAs(imageDataUrl, `song-message-${message.value.title.replace(/\s/g, '-')}.png`);

      } catch (err) {
        console.error('Error downloading message as image:', err);
        alert('Gagal mengunduh pesan sebagai gambar. Silakan coba lagi.');
      } finally {
        // 8. Hapus klon dari DOM setelah selesai
        document.body.removeChild(clonedContent);
      }
    };


    onMounted(() => {
      fetchMessage();
    });

    return {
      message,
      isLoading,
      error,
      formatDate,
      copyLink,
      downloadMessageAsImage,
    };
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Reenie+Beanie&display=swap');


/* Minimalist scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.handwritten {
  font-family: 'Reenie Beanie', cursive;
  font-size: 2rem;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Spin animation */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Smooth transitions */
a,
button {
  transition: all 0.2s ease;
}

/* Responsive iframe */
iframe {
  min-height: 80px;
}
</style>
