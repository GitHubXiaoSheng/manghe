import persistedState from 'vuex-persistedstate';
// import * as Cookies from 'js-cookie'

const sessionStoragePlugin = persistedState({
    storage: window.sessionStorage
});
export default { sessionStoragePlugin } 
