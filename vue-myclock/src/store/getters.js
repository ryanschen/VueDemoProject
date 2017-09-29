export default {
    getStatus: state => state.status,
    getDuration: state => state.duration,
    switchTime: state => {
         let date_ = '',
             toTime_ = '',
             offTime_ = ''
     
        const list = []
        state.clockList.forEach(function(item, key, obj) {
            const gotowork = item.gotowork
            const gooffwork = item.gooffwork
            date_ = gotowork.getFullYear() + '年' + 
                    (1*gotowork.getMonth() + 1) + '月' + gotowork.getDate() + '日'
            toTime_ = gotowork.getHours() + '：' + gotowork.getMinutes() + '：' + gotowork.getSeconds()
            if(gooffwork){
                offTime_ = gooffwork.getHours() + '：' + gooffwork.getMinutes() + '：' + gooffwork.getSeconds()
            }else{
                offTime_ = ''
            }
            list.push({'date': date_, 'gotowork': toTime_, 'gooffwork': offTime_})

        });
        return list
    }
}