<template>
  <nav class="bg-[#131010] p-4 shadow-md">
    <div class="max-w-7xl  mx-auto flex justify-between items-center">
      <router-link to="/" class="text-white md:text-2xl font-bold">
        Say To Someone
      </router-link>

      <div class="w-full flex justify-end">
        <router-link to="/" :class="{
          'text-[#131010] bg-white ': $route.path === '/',
          'text-indigo-200 hover:text-white': $route.path !== '/'
        }" class="px-2 py-2 rounded-md text-sm font-medium transition-colors duration-200 pl-2">
          Home
        </router-link>
        <router-link to="/add" :class="{
          'text-[#131010] bg-white ': $route.path === '/add',
          'text-indigo-200 hover:text-white': $route.path !== '/add'
        }" class="px-2 py-2 rounded-md text-sm font-medium transition-colors duration-200 md:ml-4">
          Add
        </router-link>
        <router-link to="/all" :class="{
          'text-[#131010] bg-white ': $route.path === '/all',
          'text-indigo-200 hover:text-white': $route.path !== '/all'
        }" class="px-2 py-2 rounded-md text-sm font-medium transition-colors duration-200 md:ml-4">
          Search
        </router-link>
        <router-link to="/support" :class="{
          'text-[#131010] bg-white ': $route.path === '/support',
          'text-indigo-200 hover:text-white': $route.path !== '/support'
        }" class="px-2 py-2 rounded-md text-sm font-medium transition-colors duration-200 md:ml-4">
          Support
        </router-link>
      </div>
    </div>
  </nav>
</template>



<style scoped>
/* Anda bisa menambahkan gaya kustom di sini jika diperlukan */
/* Namun, dengan Tailwind CSS, sebagian besar styling sudah dilakukan di template */
</style>
