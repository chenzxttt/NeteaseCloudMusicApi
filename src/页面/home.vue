<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="200px">

                <el-col :span="12">
                    <h5 class="mb-2"></h5>
                    <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                        style="padding-top: 30px;">

                        <el-menu-item-group title="聚合平台" style="text-align: left; margin-bottom: 10px;">
                            <el-menu-item index="1" class="playlist-item asideGl" style="height: 30px; "
                                @click="musiclist1">
                                <el-icon><icon-menu /></el-icon>
                                <span>精选歌单</span>
                            </el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="新建歌单" style="text-align: left; margin-bottom: 10px;"
                            class="playlist-item">
                            <el-menu-item index="2-1" style="height: 30px;" @click="musiclist">
                                <el-icon>
                                    <Headset />
                                </el-icon>
                                歌单1
                            </el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="收藏歌单" style="text-align: left; margin-bottom: 10px;"
                            class="playlist-item">
                            <el-menu-item index="3-1" style="height: 30px;">
                                <el-icon>
                                    <HotWater />
                                </el-icon>
                                歌单1
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-menu>
                </el-col>
            </el-aside>
            <el-container>
                <!-- 头部 -->
                <el-header>
                    <el-row :gutter="100" style="display: flex;flex-wrap: nowrap">

                        <el-col :xs="4" :sm="3" :md="2" :lg="2" :xl="1">
                            <el-icon>
                                <ArrowLeft />
                            </el-icon>
                        </el-col>
                        <el-col>
                            <el-input v-model="input2" placeholder="搜索" :xs="4" :sm="5" :md="5" :lg="6" :xl="8"
                                style="margin-top: -4px;" @keydown.enter="search" />
                        </el-col>
                        <el-col :xs="3" :sm="4" :md="5" :lg="6" :xl="8">

                        </el-col>

                        <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1" style="text-align: right;">
                            <span style="margin-right: 10px;font-size: 18px; " title="退出登录" @click="TCDL">
                                <el-icon>
                                    <SwitchButton />
                                </el-icon>
                            </span>
                        </el-col>
                    </el-row>
                </el-header>
                <!-- 内容 -->
                <el-main style="height: calc(100vh - 100px);">
                    <!-- 路由视图层 -->
                    <router-view></router-view>
                </el-main>

            </el-container>

        </el-container>
        <!-- 尾部 -->
        <el-footer>
            <bFq></bFq>
        </el-footer>
    </div>
</template>

<script>
import bFq from "./son/bfq.vue";
import { ref } from 'vue'
import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
} from '@element-plus/icons-vue'
import axios from 'axios';

import { useRouter } from 'vue-router';
export default {
    components: { IconMenu, bFq },
    setup() {
        // 搜索框内容绑定
        let input2 = ref('')
        // 搜索事件
        function search() {
            axios.get(`http://localhost:3000/search?keywords=${input2.value}`)
                .then(response => {
                    console.log('data', response.data.result.songs)
                    alert(response.data.result.songs)
                })
                .catch(error => {
                    console.log('error', error)
                })
        }
        // 音乐的播放
        const audioRef = ref(null);
        const play = () => {
            audioRef.value.play();
        };

        const pause = () => {
            audioRef.value.pause();
        };
        let asideGl = 'asideGl'
        let router = useRouter()
        function show(val) {
            router.push({ name: `${val}` })
        }
        const isCollapse = ref(true)
        const handleOpen = (key, keyPath) => {
            console.log(key, keyPath)
        }
        const handleClose = (key, keyPath) => {
            console.log(key, keyPath)
        }
        const TCDL = () => {
            router.push({ name: 'login' })

            localStorage.setItem('logNum', false)
            console.log(localStorage.getItem('logNum'));
        }
        // 高亮
        function highlightMenuItem(event) {
            const menuItems = document.getElementsByClassName('playlist-item');
            for (let i = 0; i < menuItems.length; i++) {
                menuItems[i].classList.remove('asideGl');
            }
            event.target.classList.add('asideGl');
        }
        // 为所有playlist-item元素的click事件添加上述highlightMenuItem函数为监听器：
        const menuItems = document.getElementsByClassName('playlist-item');
        for (let i = 0; i < menuItems.length; i++) {
            menuItems[i].addEventListener('click', highlightMenuItem);
        }
        function musiclist() {
            router.push({ name: 'music' })
        }
         function musiclist1() {
            router.push({ name: 'home' })
        }

        return {
            show,
            isCollapse,
            handleClose,
            handleOpen,
            asideGl,
            TCDL,
            input2,
            search,
            audioRef,
            play,
            pause,
            musiclist,
            musiclist1
        }
    }
}
</script>

<style lang="less" scoped>
.el-header,
.el-footer {
    background-color: #FFFFFF;
    border-bottom: 0px solid #d5d5d5;
    overflow: hidden;
    height: 50px;
    color: #333;
    // text-align: center;
    // line-height: 50px;
    display: flex;
    align-items: center;
    width: calc(100vw - 160px);
}

.el-footer {
    border-top: 1px solid #d5d5d5;
    overflow: hidden;
    padding: 0;
    width: 100vw;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 160px;
    min-height: calc(100vh - 60px);
}

.el-aside {
    background-color: #FFFFFF;
    color: #333;
    text-align: center;
    // line-height: 140px;
    width: 160px;
    border-right: 1px solid #d5d5d5;
    overflow: hidden;
    height: calc(100vh - 60px);
}

.el-main {
    background-color: #FFFFFF;
    color: #333;
    border-top: 1px solid #eeeeee;
    text-align: center;
    line-height: 30px;
}

.el-col {
    border-radius: 4px;
}

.bg-purple-dark {
    background: #99a9bf;
}

.bg-purple {
    background: #d3dce6;
}

.bg-purple-light {
    background: #e5e9f2;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}

// aside 高亮
.asideGl {
    color: white;
    background-color: #4D4D4D;
}
</style>
