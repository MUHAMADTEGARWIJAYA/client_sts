<template>
  <div class="w-full  flex justify-center items-center mb-7">
    <div class="flex flex-col justify-center items-center gap-2 w-96  text-[10px] sm:text-xs z-50">
      <div
        class="error-alert cursor-default flex items-center justify-between w-full h-12 sm:h-14 rounded-lg bg-[#232531] px-[10px]">
        <div class="flex gap-2">
          <div class=" bg-white/5 items-center justify-center backdrop-blur-xl p-1 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-8 h-8">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"></path>
            </svg>
          </div>
          <div>
            <p class="text-white">Tolong baca ini</p>
            <p class="text-gray-500">Pesan yang anda kirim tidak bisa dihapus maupun diedit</p>
            <p class="text-gray-500">Pesan otomatis terhapus selama 7 hari</p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
