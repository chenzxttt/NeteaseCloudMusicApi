import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate';
const store = createStore({
    plugins: [
        // 将数据存储到localStorage中
        createPersistedState({
            storage: window.localStorage,
        }),
    ],
    state() {

        return {
            count: 0,
            isshow: false,
            userEnroll: [{
                name: 'vue3', password: '123456'
            }]
        }
    },
    mutations: {
        setIncrement(state, val) {
            state.isshow = val
        },
        enrollUser(state, val) {
            console.log(val);
            state.userEnroll.push(val)
        }
    },
    actions: {

    },
    getters: {
        setIncrement11(state) {
            return state.isshow
        }
    }
})

export default store
