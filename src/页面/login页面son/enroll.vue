<template>
    <!-- 使用过渡动画 -->
    <transition name="el-zoom-in-center">
        <div class="fabox transition-box" v-show="show == false" style="overflow: hidden;">
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
                    <input type="text" placeholder="请设置用户名" v-model="userobj.name">
                </div>
                <!-- 密码输入框 -->
                <div class="inputBox">
                    <span style="color: red;position: absolute;left: -15px;top: 15px;">*</span>
                    <el-icon style="margin-left: 10px;">
                        <Avatar style="color: white;font-size: 18px;" />
                    </el-icon>
                    <input type="password" placeholder="请设置密码" v-model="userobj.password">
                </div>
                <!-- 验证码输入框 -->
                <div class="inputBox">
                    <input type="text" placeholder="请输入验证码" style="width: 180px;" v-model="inputCode">
                    <div @click="codeRom"
                        style="background-color: #c5d3bf;width: 80px;height: 40px;border-top-right-radius: 25px;border-bottom-right-radius: 25px;color: #005a10;font-size: 18px;text-align: center;line-height: 40px;cursor:pointer;">
                        {{ code }}
                    </div>
                </div>
                <!-- 注册按钮 -->
                <div class="inputBox" @click="checkCode"
                    style="background-color: white; color: #1f6f4a;font-size: 18px; display: flex;justify-content: space-around;cursor:pointer;">
                    注册
                </div>
                <!-- 返回登录按钮 -->
                <div class="textbox">
                    <span @click="loginbtn">返回登录</span>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import { ref, onMounted, reactive, computed } from 'vue';
import { ElNotification } from 'element-plus'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'

export default {
    name: 'Vue3PjtLogin',

    setup() {
        let store = useStore()
        let router = useRouter()
        let userobj = reactive({
            name: '',
            password: ''
        })
        const show = computed(() => store.getters.setIncrement11)
        console.log(show, 'rshow');
        onMounted(() => {
            document.body.style.overflow = 'hidden';
            show.value = true
        })
        // 随机生成验证码
        const generateCode = () => {
            const codeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let code = '';
            for (let i = 0; i < 6; i++) {
                const randomIndex = Math.floor(Math.random() * codeChars.length);
                code += codeChars[randomIndex];
            }
            console.log(code);
            return code;
        };

        let code = ref('')
        // 储存验证码
        let codeRom = () => {
            code.value = generateCode();
        }
        codeRom()
        // 返回登录页面
        const loginbtn = () => {
            setTimeout(() => {

                router.push({ name: 'login' })
                store.commit('setIncrement', true)

                // console.log(store.state);
            }, 500)
        }
        // 输入框的内容
        const inputCode = ref('');

        // 验证输入框的内容是否等于验证码
        const checkCode = () => {
            const input = inputCode.value.toUpperCase(); // 转为大写进行比较
            const code2 = code.value.toUpperCase()
            if (input === code2 && userobj.name != '' && userobj.password != '') {
                let name = userobj.name
                let userArr = store.state.userEnroll
                const isNameExist = (name, userArr) => {
                    return userArr.filter(user => user.name === name).length > 0 ? false : true;
                }
                let isNameExist1 = isNameExist(name, userArr)
                if (isNameExist1 == true) {
                    // TODO: 跳转到别的页面
                    ElNotification({
                        title: '注册',
                        message: '恭喜您注册成功，祝您使用愉快！',
                        type: 'success',
                    })
                    store.commit('enrollUser', {
                        name: userobj.name,
                        password: userobj.password
                    })
                    loginbtn()
                } else {
                    ElNotification({
                        title: '提示',
                        message: '你输入的用户名已被注册，请更换用户名',
                        type: 'error',
                    })
                }

            } else {
                if (userobj.name == '' || userobj.password == '') {
                    ElNotification({
                        title: '提示',
                        message: '用户名或密码输入不完整',
                        type: 'error',
                    })

                } else {
                    ElNotification({
                        title: '提示',
                        message: '验证码验证失败',
                        type: 'error',
                    })
                    codeRom()
                }
            }
        };

        return {
            show,
            code,
            inputCode,
            checkCode,
            generateCode,
            codeRom,
            userobj,
            loginbtn
        }
    }
};
</script>

<style lang="less" scoped>
.fabox {
    display: flex;
    height: 790px;
    align-items: center;
    justify-content: center;
}


.block {
    // outline: 1px solid red;
    text-align: center;
    margin: 50px auto;
}

.block>span {
    background: url(../../assets/logo.png)0 0 no-repeat;
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

.textbox>span {
    cursor: pointer;
}
</style>

