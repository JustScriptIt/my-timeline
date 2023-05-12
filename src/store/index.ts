import { createStore } from 'vuex'
import appStore from './appStore'
import modalsStore from './modalsStore'

const store = createStore({
    modules: {
        appStore,
        modalsStore
    }
})

export default store;
