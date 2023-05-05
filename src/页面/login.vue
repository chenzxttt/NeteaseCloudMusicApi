<template>
    <!-- 将登录框挂载到body上 -->
    <Teleport to="body">
        <div class="imgbox"></div>
    </Teleport>
    <!-- 登录框的过渡效果 -->
    <transition name="el-zoom-in-center">
        <div class="fabox transition-box" v-show="show == true" style="overflow: hidden;">
            <div class="box1">
                <!-- login页面的头像 -->
                <div class="demo-basic--circle">
                    <div class="block">
                        <el-avatar shape="square" :size="105" />
                    </div>
                </div>
                <!-- 用户名输入框 -->
                <div class="inputBox">
                    <span style="color: red;position: absolute;left: -15px;top: 15px;">*</span>
                    <el-icon style="margin-left: 10px;">
                        <Avatar style="color: white;font-size: 18px;" />
                    </el-icon>
                    <input type="text" placeholder="请输入用户名" v-model="userobj.name">
                    <!-- 用户名未注册提示 -->
                    <span style="position: absolute; color: #F56C6C;font-size: 8px; top: 45px;
                left: 35px;" class="spantips">用户名未注册</span>
                </div>
                <!-- 密码输入框 -->
                <div class="inputBox">
                    <span style="color: red;position: absolute;left: -15px;top: 15px;">*</span>
                    <el-icon style="margin-left: 10px;">
                        <Avatar style="color: white;font-size: 18px;" />
                    </el-icon>
                    <input type="password" placeholder="请输入密码" v-model="userobj.password">
                    <!-- 账户密码错误提示 -->
                    <span style="position: absolute; color: #F56C6C;font-size: 8px; top: 45px;
                left: 35px;" class="spantips">账户密码错误</span>
                </div>
                <!-- 登录按钮 -->
                <div class="inputBox"
                    style="background-color: white; color: #1f6f4a;font-size: 18px; display: flex;justify-content: space-around;cursor:pointer"
                    @click="cklogin">
                    登录
                </div>
                <!-- 注册账号和忘记密码 -->
                <div class="textbox">
                    <span @click="loginbtn">注册账号</span>
                    <span>忘记密码</span>
                </div>
            </div>
        </div>
    </transition>
    <!-- 路由视图 -->
    <router-view></router-view>
</template>
<script>
import { onMounted, computed, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'
import { ElNotification } from 'element-plus'

export default {
    name: 'Vue3PjtLogin',
    // show.value = store.state.isshow

    setup() {
        const userobj = reactive({
            // show.value = store.state.isshow
            name: '',
            password: ''
        })
        // vuex store
        const store = useStore()
        // vue-router
        const router = useRouter()
        // 是否显示登录框
        const show = computed(() => store.getters.setIncrement11)
        // 登录框显示后，延迟500ms后执行
        onMounted(() => {
            setTimeout(() => {
                store.commit('setIncrement', true)
                localStorage.setItem('logNum', false)
            }, 500)
        })
        // 注册账号按钮
        const loginbtn = () => {
            store.commit('setIncrement', false)
            router.push({ name: 'logenroll' })
        }
        // 点击登录按钮
        const cklogin = () => {
            // 获取本地帐号数据
            let userArr = store.state.userEnroll
            function findUserIndex(userArr, userobj) {
                const index = userArr.findIndex(user => user.name === userobj.name);
                return index !== -1 ? index : false;
            }
            // 判断账号是否存在，存在即返回下标，不存在即返回false
            const retFindindex = findUserIndex(userArr, userobj)
            if (userobj.name == '') {
                ElNotification({
                    title: '账号错误',
                    message: '你还没有账号，请注册',
                    type: 'error',
                })
                setTimeout(() => {
                    store.commit('setIncrement', false)
                    router.push({ name: 'logenroll' })
                }, 300)
            } else {
                if (typeof retFindindex === "number") {
                    if (userobj.password === userArr[retFindindex].password) {
                        // 创建本地登录值
                        localStorage.setItem('logNum', true)
                        ElNotification({
                            title: '登录成功',
                            message: '恭喜您成功登录',
                            type: 'success',
                        })
                        router.push({ name: 'home' })
                    } else {
                        ElNotification({
                            title: '密码',
                            message: '密码错误',
                            type: 'error',
                        })
                    }
                } else {
                    if (userobj.name != '' && userobj.password != '') {
                        ElNotification({
                            title: '账号错误',
                            message: '此账号还未注册',
                            type: 'error',
                        })
                    } else {
                        ElNotification({
                            title: '账号错误',
                            message: '账号密码输入不完整',
                            type: 'error',
                        })
                    }
                }

            }
        }
        return {
            userobj,
            store,
            router,
            show,
            loginbtn,
            cklogin
        }
    }
}
</script>

<style lang="less" scoped>
.fabox {
    display: flex;
    height: 100vh;
    align-items: center;
    justify-content: center;
}

.imgbox {
    top: 0;
    z-index: -999;
    width: 100%;
    height: 100vh;
    position: absolute;
    background: #fff url(../assets/DM_20230424151216_001.png) 50% 50% no-repeat;
    background-size: cover;
}

.block {
    // outline: 1px solid red;
    text-align: center;
    margin: 50px auto;
}

.block>span {
    background: url(../assets/logo.png)0 0 no-repeat;
    background-size: cover;
}


.box1 {
    width: 430px;
    height: 550px;
    border: 2px solid white;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.inputBox {
    width: 280px;
    height: 40px;
    background-color: rgba(255, 255, 255, 0.133);
    border: 2px solid white;
    border-radius: 20px;
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    position: relative;

}

.box1 .inputBox>input {
    background-color: #ffffff00;
    width: 260px;
    height: 40px;
    border: none;
    outline: none;
    color: white;
    font-size: 18px;
    margin: auto 10px;
    font-weight: 1;
}

.inputBox>input::-webkit-input-placeholder {
    color: rgb(194, 194, 194);
    font-size: 14px;
}

.textbox {
    width: 100%;
    color: #fff;
    font-size: 14px;
    display: flex;
    justify-content: space-evenly;
}

.spantips {
    display: none;
}

.textbox>span {
    cursor: pointer;
}
</style>
