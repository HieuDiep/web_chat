<template>
  <DefaultLayout>
    <div class="home">
      <!-- <img alt="Vue logo" src="../assets/logo.png" />
      <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    </div>
  </DefaultLayout>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import DefaultLayout from "@/layouts/default.vue"

export default {
  name: "Home",
  components: { DefaultLayout },
}
</script>
