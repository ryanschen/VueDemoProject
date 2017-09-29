import * as types from './mutation-types'
export default {
    [types.CHANGE_STATUS] (state) {
        if(state.status === '已结束'){
            state.status = '计时中'
        }else{
            state.status = '已结束'
        }
    },
    [types.ADD_DURATION] (state, obj) {
        if(state.status === '计时中'){
            console.info(obj.time)
            state.duration = obj.time
        }else{
            clearInterval(obj.timer)
        }
    },
    [types.SAVE_CLOCK_LIST] (state, nowTime) {
        if(state.status === '计时中'){
            console.info(state.clockList.length)
            state.len = state.clockList.length
            state.clockList.push({'gotowork': nowTime, 'gooffwork': ''})
        }
       
        if(state.status === '已结束'){
            console.info('进入已结束中。')
            state.clockList[state.len].gooffwork = nowTime
        }
    }
}