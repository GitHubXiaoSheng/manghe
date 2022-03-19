import Vue from 'vue';
import Vuex from 'vuex';
import plugin from './plugin';
import user from './user';

Vue.use(Vuex);

const store = new Vuex.Store({
    plugins: [plugin.sessionStoragePlugin],
    modules: {
        user
    }
});

Vue.store = store;

export default store;
