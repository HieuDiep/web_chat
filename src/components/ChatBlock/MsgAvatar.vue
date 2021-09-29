<template>
  <div class="chat-block__avatar">
    <img :src="url || ''" alt="" draggable="false" @error="replaceByDefault" />
  </div>
</template>

<script>
import defaultAvatar from "@/assets/images/logo-fav.png"
export default {
  props: {
    url: {
      type: String,
      default: "",
    },
  },
  methods: {
    replaceByDefault(e) {
      e.target.src = defaultAvatar
    },
  },
}
</script>

<style lang="scss">
.chat-block__avatar {
  img {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    object-fit: cover;
    object-position: center;
  }
}
</style>
