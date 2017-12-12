const TOGGLE_MENU = 'TOGGLE_MENU'
export default {
    [TOGGLE_MENU ] ( state ) {
        state.toggleMenu = !state.toggleMenu;
    },
}