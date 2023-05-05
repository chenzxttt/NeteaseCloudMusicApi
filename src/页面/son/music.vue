<template>
    <div id="app" :class="mass ? 'shu' : 'shu1'">
        <!-- 准备一个容器用来存放音乐播放器 -->
        <div id="aplayer" ref="myButton"></div>

    </div>
</template>

<script setup>

import axios from 'axios'

import 'aplayer/dist/APlayer.min.css';

import APlayer from 'aplayer';



import { getCurrentInstance, ref, onMounted, warn, watch, inject, computed } from "vue";

const myButton = ref(null);

const miao = ref(null)

onMounted(() => {
    // 组件挂载后，访问按钮本身
    initAudio()
});

const audio = [ // 歌曲列表

    {

        name: "罗生门（Follow）", // 歌曲名字

        artist: "梨冻紧 / Wiz_H张子豪", // 歌曲演唱者

        url: "http://music.163.com/song/media/outer/url?id=1456890009",

        cover: "http://p2.music.126.net/yN1ke1xYMJ718FiHaDWtYQ==/109951165076380471.jpg?param=130y130", // 歌曲头像

        lrc: "", // 歌词

        theme: "rgb(127, 218, 180)", // 播放这首歌曲时的主题色

    },

    {

        name: "还是会想你", // 歌曲名字

        artist: "林达浪 / h3R3", // 歌曲演唱者

        url: "http://music.163.com/song/media/outer/url?id=1827600686",

        cover: "http://p1.music.126.net/9FhSEQtMhP-JP3_U84YfWQ==/109951165798773745.jpg?param=130y130", // 歌曲头像

        lrc: "", // 歌词

        theme: "rgb(127, 218, 180)", // 播放这首歌曲时的主题色

    },

    {

        name: "若把你", // 歌曲名字

        artist: "Kirsty刘瑾睿", // 歌曲演唱者

        url: "http://music.163.com/song/media/outer/url?id=865632948",

        cover: "http://p1.music.126.net/M877M2-VhWZiLPVFORf9iQ==/109951163401482434.jpg?param=130y130", // 歌曲头像

        lrc: "", // 歌词

        theme: "rgb(127, 218, 180)", // 播放这首歌曲时的主题色

    },

    {

        name: "唯一", // 歌曲名字

        artist: "告五人", // 歌曲演唱者

        url: "http://music.163.com/song/media/outer/url?id=1807799505",

        cover: "http://p1.music.126.net/5URIeP6GjMFg_hKhGloNTA==/109951165585701063.jpg?param=130y130", // 歌曲头像

        lrc: "", // 歌词

        theme: "rgb(127, 218, 180)", // 播放这首歌曲时的主题色

    },

    {

        name: "把回忆拼好给你", // 歌曲名字

        artist: "王贰浪", // 歌曲演唱者

        url: "http://music.163.com/song/media/outer/url?id=1403318151",

        cover: "http://p2.music.126.net/CBx2K_jEN3SNWwYztagPPw==/109951164485969446.jpg?param=130y130", // 歌曲头像

        lrc: "", // 歌词

        theme: "rgb(127, 218, 180)", // 播放这首歌曲时的主题色

    },

    {

        name: "在你的身边", // 歌曲名字

        artist: "盛哲", // 歌曲演唱者

        url: "http://music.163.com/song/media/outer/url?id=475479888",

        cover: "http://p2.music.126.net/AYNBdRxJ8EdZo4xFjp7b4Q==/109951163191178425.jpg?param=130y130", // 歌曲头像

        lrc: "", // 歌词

        theme: "rgb(127, 218, 180)", // 播放这首歌曲时的主题色

    },

    {

        name: "哪里都是你", // 歌曲名字

        artist: "队长", // 歌曲演唱者

        url: "http://music.163.com/song/media/outer/url?id=488249475",

        cover: "http://p2.music.126.net/lnOnBbP_H-052Hv5ls-QjA==/109951162964628408.jpg?param=130y130", // 歌曲头像

        lrc: "", // 歌词

        theme: "rgb(127, 218, 180)", // 播放这首歌曲时的主题色

    },

    {

        name: "时间煮雨", // 歌曲名字

        artist: "郁可唯", // 歌曲演唱者

        url: "http://music.163.com/song/media/outer/url?id=26418130&market=baiduqk",

        cover: "http://p1.music.126.net/_pbswB9WWRIRIWd2A4jxFg==/109951164715799924.jpg?param=130y130", // 歌曲头像

        lrc: "", // 歌词

        theme: "rgb(127, 218, 180)", // 播放这首歌曲时的主题色

    },

    {

        name: "追光者",

        artist: "岑宁儿",

        url: "http://music.163.com/song/media/outer/url?id=483671599",

        cover: "http://p1.music.126.net/ZZAQGWl9mR7g5xCyWWH3Pw==/19149094509535913.jpg?param=130y130",

        lrc: "",

        theme: "rgb(61, 162, 230)",

    },

    {

        name: "起风了",

        artist: "买辣椒也用券",

        url: "http://music.163.com/song/media/outer/url?id=1330348068",

        cover: "http://p2.music.126.net/diGAyEmpymX8G7JcnElncQ==/109951163699673355.jpg?param=130y130",

        lrc: "",

        theme: "#baf",

    },

]

const info = {

    fixed: false, // 不开启吸底模式

    listFolded: false, // 折叠歌曲列表

    autoplay: false, // 开启自动播放

    preload: "auto", // 自动预加载歌曲

    loop: "all", // 播放循环模式、all全部循环 one单曲循环 none只播放一次

    order: "list", //  播放模式，list列表播放, random随机播放

}

function initAudio() {

    // 创建一个音乐播放器实例，并挂载到DOM上，同时进行相关配置

    const ap = new APlayer({

        container: myButton.value,

        audio: audio, // 音乐信息

        ...info, // 其他配置信息

    });



    // 用户点击页面时播放音频

    // 创建一个ResizeObserver实例

    const resizeObserver = new ResizeObserver(entries => {

        // 获取.aplayer-body的宽度

        const progressWidth = entries[0].contentRect.width;

        miao.value = progressWidth

        if (miao.value != 66) {

            mass.value = false

        } else {

            mass.value = true

        }



    });

    // 获取.aplayer-body元素

    const progressElement = document.querySelector('.aplayer-body');

    if (progressElement) {
        // 监听.aplayer-body元素的大小变化
        resizeObserver.observe(progressElement);
    } else {
        console.error('.aplayer-body element not found');
    }
}
const mass = ref(true)
</script>


<style lang='less' scoped>
#app {

    width: 100%;

    height: 100%;


    #aplayer {

        width: calc(100vw - 200px); // 定个宽度
        height: calc(100vh - 160px);

    }

}



.shu1 {
padding: 0px;
    
}
</style>

