const KEZHUNET_ISLOGIN = 'KEZHUNET_ISLOGIN'

export default {
    loggedIn () {
        return sessionStorage.getItem(KEZHUNET_ISLOGIN)
    }
}