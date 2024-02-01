//创建用户相关的小仓库
import {defineStore} from 'pinia'


//引入本地存储的方法
import { SET_PlayingList,GET_PlayingList,REMOVE_PlayingList } from '@/utils/token';
import { ref } from 'vue';


//创建用户小仓库
let PlayingListStore = defineStore('playingList',{
    //小仓库存储数据的地方
    state:() => {
        let playingList = ref<any>([])
        playingList = GET_PlayingList()
        return {
            //playingList:GET_PlayingList(),//用户唯一标识
            playingList
            
        }
    },
    //异步|逻辑的地方
    actions:{
        LocalPlaying(data:any){
            // 检查键是否存在  
            let PlayingListArray = GET_PlayingList();
            let PlayingListTmp = [] 
            //console.log('123456789');
            
            //console.log(PlayingListArray);
            //console.log('987654321');
             
            if (PlayingListArray) {  
                // 如果存在，解析为数组  
                PlayingListTmp = JSON.parse(PlayingListArray);  
            } else {  
                // 如果不存在，创建一个新数组  
                PlayingListTmp = [];  
            }  
            
            // 将新值添加到数组中  
            PlayingListTmp.push(data);  
            //console.log(PlayingListTmp);
            
            
            //console.log(JSON.stringify(PlayingListTmp));
            
            // 将数组转换为字符串并存储回localStorage  
            //localStorage.setItem(key, JSON.stringify(array))
            SET_PlayingList(JSON.stringify(PlayingListTmp))
            this.playingList = GET_PlayingList()
            
            
        },
        LocalList(){
            
            let songData2 = JSON.parse(this.playingList as string)
            
            
            
            return songData2
        },

        LocalListDel(){
            REMOVE_PlayingList()
        },
        
        
    },
    getters:{

    }
})

//对外暴露获取小仓库方法
export default PlayingListStore;