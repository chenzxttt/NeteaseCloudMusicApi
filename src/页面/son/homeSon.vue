<template>
  <div>
    <div class="carousel">
      <el-carousel :interval="5000" arrow="always" indicator-position="outside" style="width: 100vw;"
        ref="carousel">
        <el-carousel-item v-for="(item, index) in state.carouselItems" :key="index">
          <img :src="item.src" class="carousel-image" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="flex-container">
      <div class="flex-item" @click="playMusic(0)">
        <span>迪迦奥特曼</span>
        <el-icon>
          <VideoPause v-if="state.isPlaying[0]" />
          <VideoPlay v-else />
        </el-icon>
        <audio ref="audio0"
          src="https://m801.music.126.net/20230504223654/6555d6f23ccb8248aca7f117b51440c9/jdyyaac/obj/w5rDlsOJwrLDjj7CmsOj/12479418498/ca51/0c4b/2a90/9c7658369913ec07215915dba9b39455.m4a"
          @ended="state.isPlaying[0] = false"></audio>
      </div>
      <div class="flex-item" @click="playMusic(1)">
        <span>野花做了场玫瑰的梦</span>
        <el-icon>
          <VideoPause v-if="state.isPlaying[1]" />
          <VideoPlay v-else />
        </el-icon>
        <audio ref="audio1"
          src="https://m801.music.126.net/20230504223542/bef7a2a0af7c31410607b3cc7c97c39c/jdyyaac/obj/w5rDlsOJwrLDjj7CmsOj/27276750939/b584/f08a/8aef/6b3e4193860b96f3ba77a1b35fc8d03d.m4a"
          @ended="state.isPlaying[1] = false"></audio>
      </div>
      <div class="flex-item" @click="playMusic(2)">
        <span>模特</span>
        <el-icon>
          <VideoPause v-if="state.isPlaying[2]" />
          <VideoPlay v-else />
        </el-icon>
        <audio ref="audio2"
          src="https://m804.music.126.net/20230504223902/de5228aa6d3b94e12cde8e5149161a05/jdyyaac/obj/w5rDlsOJwrLDjj7CmsOj/14096431475/2324/f434/2f95/3314a99f8af1a1fb4bd9579d34497036.m4a?authSecret=00000187e71ce13416320aaba0c90e21"
          @ended="state.isPlaying[2] = false"></audio>
      </div>
      <div class="flex-item" @click="playMusic(3)">
        <span>无数</span>
        <el-icon>
          <VideoPause v-if="state.isPlaying[3]" />
          <VideoPlay v-else />
        </el-icon>
        <audio ref="audio3"
          src="https://m704.music.126.net/20230504223947/2fcf31117402fd3d88d2b73f981aae46/jdyyaac/obj/w5rDlsOJwrLDjj7CmsOj/19244335569/d0e0/35aa/f4c9/0b7b74c37e73b26e4328a9321608a7c9.m4a?authSecret=00000187e71d8fe416ed0aa463652407"
          @ended="state.isPlaying[3] = false"></audio>
      </div>
      <div class="flex-item" @click="playMusic(4)">
        <span>Weak</span>
        <el-icon>
          <VideoPause v-if="state.isPlaying[4]" />
          <VideoPlay v-else />
        </el-icon>
        <audio ref="audio4"
          src="https://m804.music.126.net/20230504224025/0c884ebf25c2315a400e5be6d6a39c0e/jdyyaac/obj/w5rDlsOJwrLDjj7CmsOj/5759613970/c860/8d5a/40fd/4313d618b4644d692c7cca30fa24ed53.m4a?authSecret=00000187e71e254a19500aaba37c25b0"
          @ended="state.isPlaying[4] = false"></audio>
      </div>
      <div class="flex-item" @click="playMusic(5)">
        <span>春娇与志明</span>
        <el-icon>
          <VideoPause v-if="state.isPlaying[5]" />
          <VideoPlay v-else />
        </el-icon>
        <audio ref="audio5"
          src="https://m704.music.126.net/20230504224207/98d85384aa8758d22359253054d2c191/jdyyaac/obj/w5rDlsOJwrLDjj7CmsOj/19974945349/7c08/36da/4415/5f49c13f157ffafb602edfc0fa8e236e.m4a?authSecret=00000187e71fb3ce05bb0aaba23d1299"
          @ended="state.isPlaying[5] = false"></audio>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted } from 'vue'
import { ElCarousel, ElCarouselItem } from 'element-plus'

export default {
  name: 'homeSon',
  components: {
    ElCarousel,
    ElCarouselItem
  },
  setup() {
    const state = reactive({
      carouselItems: [
        { src: 'http://p1.music.126.net/e2eR9tBKremff0ytXZfnDQ==/109951168589574946.jpg?imageView&quality=99' },
        { src: 'http://p1.music.126.net/TtEmwMoHR53V-8mjjsy7KA==/109951168589532321.jpg?imageView&quality=99' },
        { src: require('@/assets/小麦.jpg') },
        { src: 'http://p1.music.126.net/lKyP0o59SmE5b7qgq4lemA==/109951168590962505.jpg?imageView&quality=99' },
        { src: 'http://p1.music.126.net/XxEn37QP0ssJ1zNhXGQv2A==/109951168589508469.jpg?imageView&quality=99' },
        { src: 'http://p1.music.126.net/i0cnQzubRTHeLd1ZX7T7nw==/109951168589558149.jpg?imageView&quality=99' }

      ],
      isPlaying: [false, false, false, false, false, false],
      currentCarouselIndex: 0
    })

    const playMusic = (index) => {
      state.isPlaying.forEach((item, i) => {
        if (i !== index) {
          state.isPlaying[i] = false
          const audio = document.querySelectorAll('audio')[i]
          audio.pause()
          audio.currentTime = 0
        }
      })
      state.isPlaying[index] = !state.isPlaying[index]
      const audio = document.querySelectorAll('audio')[index]

      if (state.isPlaying[index]) {
        audio.play()
        state.currentCarouselIndex = state.currentCarouselIndex
      } else {
        audio.pause()
        setTimeout(() => {
          state.currentCarouselIndex = state.currentCarouselIndex
        }, 0)
      }

    }

    onMounted(() => {
      const carousel = document.querySelector('.carousel')
      carousel.style.height = '320px'
    })

    return {
      state,
      playMusic
    }
  }
}
</script>


<style scoped>
.carousel {
  display: flex;
  justify-content: center;
  align-items: center;
  /* width: 100vw; */
  height: 360px;
  position: relative;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.el-carousel__container{
  height: 360px;
}
.flex-container {
  display: flex;
  margin-top: 20px;
  height: 440px;
  flex-wrap: wrap;
  justify-content: space-evenly;
  flex-direction: column;
}

.flex-item {
  display: flex;
  width: 300px;
  height: 200px;
  background-color: #f2f2f2;
  border-radius: 10px;
  cursor: pointer;
  align-content: flex-start;
  justify-content: flex-end;
  flex-wrap: nowrap;
  align-items: flex-start;
  flex-direction: column;
}

.flex-item:hover {
  background-color: #e6e6e6;
}

.flex-item span {
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
  color: rgb(253, 253, 253);
}

.flex-item:nth-child(1) {
  background: #fff url(https://p1.music.126.net/5L_1EHogb3gxb2EhaOEuUg==/109951165552443735.jpg?param=400y280) 50% 50% no-repeat;
  background-size: cover;
}

.flex-item:nth-child(2) {
  background: #fff url(https://p1.music.126.net/0lO3AxYOp52bqoNrqeYf2g==/109951168579442653.jpg?param=400y280) 50% 50% no-repeat;
  background-size: cover;
}

.flex-item:nth-child(3) {
  background: #fff url(https://p2.music.126.net/H6G7JaDpgo-EGgfvV1wtcQ==/2901611186844776.jpg?param=400y280) 50% 50% no-repeat;
  background-size: cover;
}

.flex-item:nth-child(4) {
  background: #fff url(https://p1.music.126.net/z0b7uhQmjXdFqkgBTSpsfA==/109951167891177817.jpg?param=400y280) 50% 50% no-repeat;
  background-size: cover;
}

.flex-item:nth-child(5) {
  background: #fff url(https://p1.music.126.net/12_MeVqN4fWOeTOY7q-RQg==/109951166489248591.jpg?param=400y280) 50% 50% no-repeat;
  background-size: cover;
}

.flex-item:nth-child(6) {
  background: #fff url(https://p2.music.126.net/Bay5Skf_u3CiRpXCEH75Vw==/109951167919998513.jpg?param=400y280) 50% 50% no-repeat;
  background-size: cover;
}

.el-icon {
  font-size: 44px;
  color: #ffffff;
}
</style >


