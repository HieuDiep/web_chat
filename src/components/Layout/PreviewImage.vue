<template>
  <div
    ref="start"
    class="layout-preview-image w-100 h-100"
    tabindex="0"
    @keyup.right="handleNext"
    @keydown.right.exact.prevent
    @keyup.esc="closePopup"
    @keydown.esc.exact.prevent
    @keyup.left="handlePrev"
    @keydown.left.exact.prevent
  >
    <div class="close-tag">
      <img
        class="pointer d-block ml-auto mr-3"
        src="@/assets/images/x-icon.png"
        alt=""
        height="25px"
        width="25px"
        @click="closePopup"
      />
    </div>
    <!-- <span style="position: absolute; right: 60px; top: 30px; z-index: 6">
      <a
        :href="items[activeIdx].path"
        alt=""
        download="filename"
        target="_blank"
      >
        <img src="/imgs/download.svg" height="30px" alt="" />
      </a>
    </span> -->
    <div class="w-100">
      <div class="carousel main-img">
        <div class="prev-t" :style="`opacity: ${items.length > 1 ? '1' : '0'}`">
          <img
            src="@/assets/images/arrow-left.svg"
            alt=""
            @click="handlePrev"
          />
        </div>
        <div class="carousel-top">
          <img :src="items[activeIdx].src || items[activeIdx].url" alt="" />
        </div>
        <div class="next-t" :style="`opacity: ${items.length > 1 ? '1' : '0'}`">
          <img
            src="@/assets/images/arrow-right.svg"
            alt=""
            @click="handleNext"
          />
        </div>
      </div>
      <div class="box-overflow">
        <div
          class="carousel-botttom"
          :style="`transform: translateX(${elmScrollpx}px);opacity: ${
            items.length > 1 ? '1' : '0'
          }`"
        >
          <div
            v-for="(item, i) in items"
            :key="i"
            :class="activeIdx == i ? 'image-active' : ''"
            @click="changeImg(i)"
          >
            <img :src="item.src || item.url" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default() {
        return []
      },
    },
    handlerClosePopup: {
      type: Function,
      default() {
        return {}
      },
    },
    itemIdx: {
      type: Number,
      default: -1,
    },
  },
  data() {
    return {
      activeIdx: 0,
      elmScroll: 0,
      elmScrollpx: 0,
    }
  },
  watch: {
    activeIdx() {
      if (this.activeIdx > 10) {
        this.elmScrollpx = -(parseInt(this.activeIdx - 10) * 74)
      } else {
        this.elmScrollpx = 0
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.itemIdx !== -1) {
        this.changeImg(this.itemIdx)
      }
      this.focusEvent()
    })
  },
  methods: {
    async download() {
      const a = document.createElement("a")
      a.href = await this.toDataURL("")
      a.download = ""
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    },
    toDataURL(url) {
      return fetch(url)
        .then((response) => {
          return response.blob()
        })
        .then((blob) => {
          return URL.createObjectURL(blob)
        })
    },
    focusEvent() {
      this.$refs.start.focus()
    },
    closePopup() {
      this.handlerClosePopup()
    },
    changeImg(i) {
      this.activeIdx = i
    },
    handleNext() {
      this.activeIdx =
        this.activeIdx < this.items.length - 1
          ? parseInt(this.activeIdx) + 1
          : 0
    },
    handlePrev() {
      this.activeIdx =
        this.activeIdx > 0
          ? parseInt(this.activeIdx) - 1
          : this.items.length - 1
    },
  },
}
</script>
<style lang="scss">
.layout-preview-image {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  padding: 0 8px;
  background: #7b7c7c4b;
  z-index: 999;
  display: flex;
  .carousel {
    height: 100%;
    display: flex;
    height: calc(100% - 150px);
    .carousel-top {
      margin: auto;
      margin-bottom: 30px;
      margin-top: 30px;
      width: calc(100% - 300px);
      align-items: center;
      justify-content: center;
      display: flex;
      img {
        max-width: 100% !important;
        /* width: auto !important; */
        /* height: auto !important; */
        max-height: 100% !important;
      }
    }
  }
  .prev-t,
  .next-t {
    width: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      cursor: pointer;
    }
  }

  .carousel-botttom {
    display: flex;
    transition: 0.2s ease;
    justify-content: center;

    div {
      &:not(:last-child) {
        margin-right: 10px;
      }
      position: relative;
      &:not(.image-active) {
        img {
          width: 64px;
          height: 64px;
          object-fit: cover;

          filter: brightness(0.5);
        }
      }
      img {
        width: 64px;
        height: 64px;
        object-fit: cover;
        filter: brightness(1);
      }
    }
    /* width */
  }
  .box-overflow {
    width: calc(100% - 300px);
    overflow: hidden;
    margin: auto;
  }

  .v-icon {
    position: absolute;
    top: 0;
    color: #ffff;
    padding: 10px;
    cursor: pointer;
    right: 0;
  }
  /* .image-active {
   &:not()::before {
    content: "";
    width: 100px;
    height: 100px;
    z-index: 1;
    position: absolute;
    background: rgba(0, 0, 0, 0.5);
   }
  } */
}
.close-tag {
  height: 40px;
  background-color: #000;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  img {
    filter: invert(1);
  }
}
.main-img {
  margin-top: 50px;
}
</style>
