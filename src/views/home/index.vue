<template>
  <div class="content">
    
    <!-- <Category /> -->
    <div class="search">
      <el-input placeholder="请你输入搜索音乐"  v-model="keyword" @keyup.enter="search(Songtype,keyword)">
        <template #append>
          <el-button size="default" @click="search(Songtype,keyword)" style="background-color:#409EFF;color: #FFF;border-top-left-radius: 0; border-bottom-left-radius: 0;">搜索</el-button>
        
        </template>
        
        
        <!-- <el-button type="primary" size="default" @click="search(Songtype,keyword)">搜索</el-button> -->
      </el-input>
      
    </div>
    <div class="content_main" v-show="!lyricsswitch">
        <!-- 搜索/搜索列表 -->
        <div class="search_data" v-show="!Show_empty">
          
          <!-- 歌曲列表 -->
          <!-- 歌曲列表A -->
          
          <div style="border:2px solid #409EFF; border-radius: 5px;" class="search_data_item">
            <el-table ref="multipleTableRef" :data="songDataArray[0]" row-class-name="table-row-status-active">
              
              <el-table-column label="歌曲" width="260">
                <template #="{row}">
                  {{ row.name }}
                </template>
              </el-table-column>
              <el-table-column  width="120" align="center">
              <template #="{row}">
                      <!-- <el-button type="primary" size="small" icon="User">播放</el-button> -->
                      <el-button icon="VideoPlay" text size="small" @click="VideoPlay(row)" style="font-size: 25px;margin-left: 0px;"/>
                      <el-button icon="Plus" text size="small" @click="VideoAdd(row)" style="font-size: 25px;margin-left: 0px;"/>
                      <!-- {{ row }} -->
                      
              </template>
              </el-table-column>
              <el-table-column property="artists[0].name" show-overflow-tooltip label="歌手" width="80" />
              <el-table-column property="album.name"  label="专辑" width="120" align="center" show-overflow-tooltip />
              
            </el-table>
          </div>
          <!-- 歌曲列表B -->
          <div style="border:2px solid #409EFF; border-radius: 5px;" class="search_data_item">
            <el-table ref="multipleTableRef" :data="songDataArray[1]" row-class-name="table-row-status-active">
              
              <el-table-column label="歌曲" width="260">
                <template #="{row}">
                  {{ row.name }}
                </template>
              </el-table-column>
              <el-table-column  width="120" align="center">
              <template #="{row}">
                      <!-- <el-button type="primary" size="small" icon="User">播放</el-button> -->
                      <el-button icon="VideoPlay" text size="small" @click="VideoPlay(row)" style="font-size: 25px;margin-left: 0px;"/>
                      <el-button icon="Plus" text size="small" @click="VideoAdd(row)" style="font-size: 25px;margin-left: 0px;"/>
                      <!-- {{ row }} -->
                      
              </template>
              </el-table-column>
              <el-table-column property="artists[0].name" show-overflow-tooltip label="歌手" width="80" />
              <el-table-column property="album.name"  label="专辑" width="120" align="center" show-overflow-tooltip />
              
            </el-table>
          </div>
          
          <!-- 歌曲列表C -->
          <div style="border:2px solid #409EFF; border-radius: 5px;" class="search_data_item">
            <el-table ref="multipleTableRef" :data="songDataArray[2]">
              <el-table-column label="歌曲" width="200" show-overflow-tooltip>
                <template #default="scope">{{ scope.row.name }}</template>
              </el-table-column>
              <el-table-column property="artists[0].name" label="歌手" width="100" show-overflow-tooltip />
              <el-table-column property="album.name" label="专辑" align="center" show-overflow-tooltip />
              <el-table-column property="artists[0].name" label="操作" width="120" align="center">
                
              <template #="{row}">
                      <!-- <el-button type="primary" size="small" icon="User">播放</el-button> -->
                      <el-button icon="VideoPlay" text size="small" @click="VideoPlay(row)" style="font-size: 25px;margin-left: 0px;"/>
                      <el-button icon="Plus" text size="small" @click="VideoAdd(row)" style="font-size: 25px;margin-left: 0px;"/>
                      <!-- {{ row }} -->
                      
              </template>
              </el-table-column>
            </el-table>
          </div>
          <!-- 歌曲列表D -->
          <div style="border:2px solid #409EFF; border-radius: 5px;" class="search_data_item">
            <el-table ref="multipleTableRef" :data="songDataArray[3]">
              <el-table-column label="歌曲" width="200" show-overflow-tooltip>
                <template #default="scope">{{ scope.row.name }}</template>
              </el-table-column>
              <el-table-column property="artists[0].name" label="歌手" width="100" show-overflow-tooltip />
              <el-table-column property="album.name" label="专辑" align="center" show-overflow-tooltip />
              <el-table-column property="artists[0].name" label="操作" width="120" align="center">
                
              <template #="{row}">
                      <!-- <el-button type="primary" size="small" icon="User">播放</el-button> -->
                      <el-button icon="VideoPlay" text size="small" @click="VideoPlay(row)" style="font-size: 25px;margin-left: 0px;"/>
                      <el-button icon="Plus" text size="small" @click="VideoAdd(row)" style="font-size: 25px;margin-left: 0px;"/>
                      <!-- {{ row }} -->
                      
              </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div v-show="Show_empty">
          <el-empty description="搜索列表空空如也 !!! " />
        </div>
        <!-- 播放列表 -->
        <div class="playerlist">
          <el-card class="box-card" shadow="never" body-class="box-card-body" style="padding: 0 !important;">
            <div class="playerlist_title">播放列表</div>
            <div v-for="(List,index) in songList" :key="index" class="text item" :class="{ 'my-color-class': isColorItem(index) }">
              <!-- <span @click="ListClick(List,index)">{{List.name}}---{{ List.artists[0].name }}</span> -->
              <div @click="ListClick(List,index)" style="display: flex; flex-direction:column">
                <span style="margin-bottom: 5px; margin-left: 5px;" class="list_MusicalName">{{List.name}}</span>
                <span style="font-size: 12px; margin-left: 5px;">{{ List.artists[0].name }}</span>
              </div>
              <el-button icon="Delete" text size="small" @click="VideoListDelete(index)" style="font-size: 15px;margin-left: 0px; padding: 0 5px;"/>
            </div>
          </el-card>  
        </div>

    </div>
    <!-- 打开纯净模式歌词部分 -->
    <div v-show="lyricsswitch" class="lyrics_pure">
      <!-- 歌词部分 -->
      <div  class="lyrics_content" :style="`transform: translateY(-${lyricsIndex * 20}px); transition: transform 0.3s ease-out 0s;`">
        <!-- transform 0.1s ease-out 0s -->
         <!-- 使用v-for指令遍历字符串结果集 -->  
        <p v-for="(line, index) in lyricsArray2" :key="index" :class="{ 'my-color-class': index == lyricsIndex }">  
          {{ line.content }}    
        </p>   
      </div>
      
    </div>
    <!-- <MyAudio /> -->
    <!-- 播放器 -->
    <div class="audio" ref="audio">
        <div class="currentAudioName">
          <span>{{ currentAudioName }}</span>
        </div>
        <div class="Singer">
          <span>{{ Singer }}</span>
        </div>
        <Audio-player ref="audioPlayer" :audio-list="currentSong.map((elm:any)  => elm.url)" :before-play="handleBeforePlay"
        :show-play-loading=false
        @pause="pause"
        @play="play"
        @play-prev="playPrev"
        @play-next="playNext(PlayFlag)"
        @ended="ended"
        @playing="playing"
        theme-color="rgb(110, 200, 225)">
        </Audio-player> 
        <div class="lyricsswitch">
            <el-switch
              v-model="lyricsswitch"
              class="ml-2"
              inline-prompt
              size="large"
              style="--el-switch-on-color: #089b4a; --el-switch-off-color: #ff4949"
              active-text="on纯净"
              inactive-text="纯净OFF"
            />
        </div>
        <div class="audio_lyrics" v-show="!lyricsswitch">
            <div class="audio_lyrics_item"> 
              {{ audio_lyrics }} 
            </div>
        </div>
        <!-- :class="Cyclic==0 ? 'icon-playbar-cycle' : 'icon-playbar-singlecycle'" -->
        <div class="Cur_model icon" @click.stop="updateaudioModel" :class="Cyclic==0 ? 'icon-playbar-cycle' : 'icon-playbar-singlecycle'"></div>
        <div class="audio_model_content" v-show="audioModel">
          <div>
            <ul>
              <li class="audio_model_item" @click="Cyclehandle(0)">
                <span class="icon icon-playbar-cycle active"></span>
                <span>列表循环</span>
              </li>
              <li class="audio_model_item" @click="singlecyclehandle(1)">
                <span class="icon  icon-playbar-singlecycle"></span>
                <span>单曲循环</span>
              </li>
              
            </ul>
          </div>
        </div>
    </div>
    
  </div>
</template>
  
<script setup lang="ts">
import { ref,nextTick,onBeforeMount,watch } from 'vue';
import { GET_PlayingList } from '@/utils/token';
import {convertTimeToString} from '@/utils/convertTimeToString';
import {isChinese} from '@/utils/isChinese';
import { decode } from 'js-base64'; 
import { ElMessage } from 'element-plus';
//引入用户相关的小仓库
import PlayingListStore from "@/store/modules/playingList"
import { reqSongInfo,reqSongUrl,reqLyricsUrl } from '@/api/playing';


let usePlayingListStore = PlayingListStore();


let audioModel = ref<boolean>(false)
let Cyclic = ref<number>(0)
let lyricsswitch = ref<boolean>(false)
let lyricsArray2 = ref<any>([])
let lyricsIndex = ref<number>(0)
let audio_lyrics = ref<any>('')

const updateaudioModel = () =>{
    audioModel.value = true
  }
const Cyclehandle = (modelflag:any) => {
  //列表循环
  Cyclic.value = modelflag
}


const singlecyclehandle= (modelflag:any) => {
  //单曲循环
  Cyclic.value = modelflag
  
}
const lyricsresult = (dlyricsData:any) => {
  //播放结束清空歌词
  //清空单行歌词
  audio_lyrics.value = ''
  if(lyricsArray2.value.length>0){
    lyricsArray2.value.splice(0,lyricsArray2.value.length);
  }

  let decodedData = ''
  
  if(!isChinese(dlyricsData)){
    decodedData = decode(dlyricsData)
  }else{
    decodedData = dlyricsData
  }
  let lyricsArray = decodedData.split('\n');
  
  for (let i = isChinese(dlyricsData)? 0:5; i < lyricsArray.length-1; i++) {  
   let parts = lyricsArray[i].split(']'); // 假设每行歌词的格式为 "时间戳:歌词内容"  
   let timestamp = parts[0].split('[')[1];  
   let lyricsContent = parts[1];  
   // 处理时间戳和歌词内容  timestamp 时间戳   lyricsContent 内容
   
   
   lyricsArray2.value.push({time:convertTimeToString(timestamp),content:typeof lyricsContent == 'undefined'?'暂无歌词':lyricsContent,active:''})   
 }
}






//歌曲类型
let Songtype = ['m', 'n', 'q', 'k']

let PlayFlag = ref<boolean>(true)

let keyword = ref<string>('')

//控制搜索列表显示
let Show_empty = ref<boolean>(true)

//获取audio组件实例
let audioPlayer = ref<any>()

let currentSong = ref<any>([
])
let currentSongIndex = ref<number>(0)
let isNameExists = false
let PlayerData = {
  newID:'',
  name:'',
  url:'',
  singer:''
}
let currentAudioName = ref<any>('')
let currentTime = ref<any>(0) 

let Singer = ref<any>('')
// ref<Records>([])
//存储播放列表数据

const audioList = ref<any>([
  ])
  
const isColorItem = (index:any) => {
  return index === currentSongIndex.value; 
}
// 播放前做的事
const handleBeforePlay = (next: any) => {
  // 这里可以做一些事情...
  if(currentSong.value.length>0){
  currentAudioName.value = currentSong.value[audioPlayer.value.currentPlayIndex].name
  Singer.value = currentSong.value[audioPlayer.value.currentPlayIndex].singer
  
  
  
  
  }
  //PlayFlag.value = true
  next() // 开始播放
  nextTick(() => {  
    PlayFlag.value = true
  });
}

  let songDataArray = ref<any>([])
  let songList = ref<any>([])


  const search = async (songtype:string[],keyword:string)=>{
    // 创建一个包含所有请求的数组  
    const requests = songtype.map(type => reqSongInfo(type, keyword));
    
    // 使用Promise.all同时发送所有请求  
    let results = await Promise.all(requests); 
    // 遍历结果并处理  
    results.forEach((result, index) => {  
      if (result.success == true) {  
        // 注意：这里你可能需要有一个方式来分别设置不同的songData值，  
        // 例如使用一个数组或者一个对象来存储这些值。  
        // 在这个例子中，我假设你有一个名为songDataArray的数组来存储这些值。  
        songDataArray.value[index] = result.data.songs; 
        //songDataArray.value.push(result.data.songs) 
      } 
    });   
  }
  const VideoPlay = async (row:any,index=-1)=>{
    
      let result:any = await reqSongUrl(row.newId)
      if (result.success == true) {
        //songData.value = result.data.songs;
        PlayerData.newID = row.newId
        PlayerData.name=row.name
        PlayerData.url=result.data
        PlayerData.singer = row.artists[0].name
      }else{
        ElMessage(
        {
          type:"error",
          message:'该歌曲无资源'
        }
        )
        return
      }

      
      
      if(index !== -1){
            currentSongIndex.value= index
            if(currentSong.value.length>0){
              currentSong.value.splice(0, 1);
            }
            currentSong.value.push(Object.assign({},PlayerData))
            //audioPlayer.value.playNext()
            nextTick(() => {  
              audioPlayer.value.play()
            });
            
      } 
      else {
            if(audioList.value.length>0){  
            isNameExists = audioList.value.some((obj:any) => obj.url.split('&')[0] == PlayerData.url.split('&')[0]); 
            if(!isNameExists){
              if(currentSong.value.length>0){
              currentSong.value.splice(0, 1);
              }
              currentSong.value.push(Object.assign({},PlayerData))
              audioList.value.push(Object.assign({},PlayerData)) 
              usePlayingListStore.LocalPlaying(row)
              //console.log(row);
              

              if(audioList.value.length>0){
                currentSongIndex.value=audioList.value.length-1
              }
              songList.value = JSON.parse(usePlayingListStore.playingList)
              //audioPlayer.value.playNext()
              nextTick(() => {  
              audioPlayer.value.play()
              });
            }
          }else {
            currentSong.value.push(Object.assign({},PlayerData))
            audioList.value.push(Object.assign({},PlayerData))
            usePlayingListStore.LocalPlaying(row)
            //console.log(row);
            songList.value = JSON.parse(usePlayingListStore.playingList)
            
            //audioPlayer.value.playNext()
            nextTick(() => {  
              audioPlayer.value.play()
            });
          }
      
      }
      
      //获取歌词
      getLyricsUrl(row.newId)
         
  }
  const getLyricsUrl = async (newID:any)=>{
      let result1:any = await reqLyricsUrl(newID)
      if (result1.success == true){
        lyricsresult(result1.data)
      }else{
        ElMessage(
        {
          type:"error",
          message:'该歌曲歌词无资源'
        }
        )
      }
  }
  const VideoAdd = async (row:any)=>{
      let result:any = await reqSongUrl(row.newId)
      if (result.success == true) {
        //songData.value = result.data.songs;
        PlayerData.newID = row.newId
        PlayerData.name=row.name
        PlayerData.url=result.data
        PlayerData.singer = row.artists[0].name

        //提示消息
      ElMessage(
      {
        type:"success",
        message:'添加成功'
      })
      }else{
        ElMessage(
        {
          type:"error",
          message:'该歌曲无资源'
        }
        )
        return
      }
    if(audioList.value.length>0){
      isNameExists = audioList.value.some((obj:any) => obj.url.split('&')[0] == PlayerData.url.split('&')[0]); 
        if(!isNameExists){
          
          audioList.value.push(Object.assign({},PlayerData))
          //本地存储 
          usePlayingListStore.LocalPlaying(row)
          songList.value = JSON.parse(usePlayingListStore.playingList)
          //songList.value = usePlayingListStore.LocalList()
          //console.log(songList);
          
        }
      }else {
        
        audioList.value.push(Object.assign({},PlayerData))
         //本地存储 
         usePlayingListStore.LocalPlaying(row)
         songList.value = JSON.parse(usePlayingListStore.playingList)
         //songList.value = usePlayingListStore.LocalList()
         //console.log(songList);

         
      }
 
  }
  const pause = ()=>{
    
  }
  const play = ()=>{
    
    
  }
  const playing = ()=>{
    currentTime.value = audioPlayer.value.currentTime
    
  }
  const playPrev = ()=>{
    if(currentSongIndex.value == 0){
      currentSongIndex.value = audioList.value.length-1
    }else {
      currentSongIndex.value--
    } 
    currentSong.value.splice(0, 1);
    currentSong.value.push(Object.assign({},audioList.value[currentSongIndex.value]))
    //重新获取歌词
    //获取歌词
    lyricsIndex.value = 0
    getLyricsUrl(audioList.value[currentSongIndex.value].newID)
    nextTick(() => {  
      audioPlayer.value.play()
    });
    
  }
  const playNext = (playFlag:any)=>{
    
    if(playFlag){
      if(currentSongIndex.value == audioList.value.length-1){
      currentSongIndex.value = 0
      }else {
        currentSongIndex.value++
      } 
      currentSong.value.splice(0, 1);
      currentSong.value.push(Object.assign({},audioList.value[currentSongIndex.value]))
    //重新获取歌词
    //获取歌词
      lyricsIndex.value = 0
      getLyricsUrl(audioList.value[currentSongIndex.value].newID)
      nextTick(() => {  
            audioPlayer.value.play()
      });
    }
    
  }
  const ended = ()=>{
    PlayFlag.value = false
    //Cyclic.value--控制播放模式（循环播放）
    if(Cyclic.value == 0){
      //Cyclic.value == 0即是列表循环，继续变动播放索引。
      if(currentSongIndex.value == audioList.value.length-1){
      currentSongIndex.value = 0
      }else {
        currentSongIndex.value++
      } 
      currentSong.value.splice(0, 1);
      
      currentSong.value.push(Object.assign({},audioList.value[currentSongIndex.value]))
    }
    
    lyricsIndex.value = 0
    
    //重新获取歌词
    //获取歌词
    getLyricsUrl(audioList.value[currentSongIndex.value].newID)
    
  }
  const ListClick = (row:any,index:any)=> {
   
    
    //currentSongIndex.value= index
    VideoPlay(row,index)
    
    
  }
  const closeDiv = ()=> {
    audioModel.value = false
  }
 
  const VideoListDelete = (index:any)=>{
    songList.value.splice(index, 1);
    //audioPlayer.value.playNext()
    //删除正在播放歌曲后面的歌曲，播放索引、播放歌曲无需改变
    if(index > currentSongIndex.value){
      currentSongIndex.value = currentSongIndex.value
      audioList.value.splice(index,1)
    //删除正在播放的歌曲，播放索引不变，播放歌曲需要改变
    }else if(index == currentSongIndex.value) {
      if(currentSongIndex.value !== audioList.value.length){
        currentSongIndex.value = currentSongIndex.value
      }else{
        currentSongIndex.value = currentSongIndex.value - 1
      }
      
      audioList.value.splice(index,1)
      //清除正在播放的歌曲
      currentSong.value.splice(0, 1);
      if(audioList.value.length>0){
      //console.log(currentSongIndex.value);
        
        currentSong.value.push(Object.assign({},audioList.value[currentSongIndex.value]))
        nextTick(() => {  
            audioPlayer.value.play()
        });
      }
      
    }else{
      //清除正在播放前面的歌曲
      currentSongIndex.value = currentSongIndex.value - 1
      audioList.value.splice(index,1)
    }
    
   
   
    let result = JSON.parse(localStorage.getItem('playingList') as string)
    result.splice(index, 1)
    localStorage.setItem('playingList', JSON.stringify(result));
    
    
    usePlayingListStore.playingList = GET_PlayingList()
    
    if(songList.value.length>0){
 
    }else{
      currentAudioName.value = ''
      Singer.value = ''
    } 
  }
  

  //组件挂载之前，钩子发一次请求，获取本地存储playingList
  onBeforeMount(async () => {
    
    songList.value = JSON.parse(usePlayingListStore.playingList)
    if(songList.value){
    for (let index = 0; index < songList.value.length; index++) {
      let result:any = await reqSongUrl(songList.value[index].newId)
      if (result.success == true) {
        //songData.value = result.data.songs;
        PlayerData.newID = songList.value[index].newId
        PlayerData.name=songList.value[index].name
        PlayerData.url=result.data
        PlayerData.singer = songList.value[index].artists[0].name
        audioList.value.push(Object.assign({},PlayerData))
      }
      
      }
    }
  })

  watch(songDataArray, () => {
    
    if(songDataArray.value.length > 0){
      Show_empty.value = false
    }
  },
  { deep: true }
  );

  watch(currentTime, () => {
    for (let index = 0; index < lyricsArray2.value.length - 1; index++) {
      if(currentTime.value >= lyricsArray2.value[index].time && currentTime.value < lyricsArray2.value[index + 1].time){
        lyricsIndex.value = index
        lyricsArray2.value[index].active = "active"
        audio_lyrics.value = lyricsArray2.value[index].content
        //break
      }else{
        lyricsArray2.value[index].active = ""
      }
    }
    
    
    
  },
  { immediate: true } 
  );
  watch(audioModel, (newValue) => {
    
  if (newValue) {
    document.addEventListener('click', closeDiv)
  } else {
    document.removeEventListener('click', closeDiv)
  }
})
 
   
</script>

<style scoped>

.content {
  position: relative;
  /* display: flex;
  flex-direction: column;
  justify-content: space-between; */
  height: 100%;
  width: 85%;
}
.search {
  position: fixed;
  width: 50%;
  top: 9px;
  left: calc(35% - 0px);
  margin-bottom: 10px;
  z-index: 999;
}
.content_main{
  display: flex;
  justify-content: center;
  padding-bottom: 105px;
  height: calc(100% - 82px);
  overflow: auto;
}
.content_main .playerlist{
  position: fixed;
  top: 69px;
  right: 15px;
  height: calc(100% - 65px);
  overflow: auto;
  z-index: 99;
}
.content_main .playerlist .list_MusicalName{
  white-space: nowrap; /* 防止文字换行 */  
  overflow: hidden; /* 隐藏溢出部分 */  
  text-overflow: ellipsis; /* 显示省略号 */  
  max-width: 150px; /* 设置最大宽度 */  
}
.content .lyrics_pure {
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 80px 0 20px 80px;
}
.lyrics_content {
  width: 100%;
  display: flex;
  flex-direction:column;
  align-items: center;
  line-height: 30px;
  font-size: 18px;
  
}
.playerlist .box-card .box-card-body {
  
  padding: 0px !important;
  
}
.search_data div{
  
}
.singerList{
  display: flex;
  margin: 10px;
  flex-direction: column;
  justify-content: space-between;
  /* align-items: center; */
}
.singerListContent{
  display: flex;
  /* align-items: center; */
  justify-content: space-evenly
}
.content .audio {
    box-sizing: border-box;
    position: fixed;
    width: calc(100% - 260px);
    height: 11%;
    bottom: 0;
    right: 0;
    padding: 0 10px;
    z-index: 1000;
    background: #282828;
    opacity: .4;
}
.content .audio .audio_model_content{
  position: absolute;
  display: flex;
  align-items: center;
  justify-content:center;
  width: 90px;
  height: 55px;
  top: -60px;
  left: 850px;
  padding: 2px;
  background-color: #282828;
  border-radius: 3px;
  z-index: 999;
  
  
}
.content .audio .audio_model_content .audio_model_item{
  display: flex;
  color: #fff;
  margin: 6px 0px;
  font-size: 12px;
  align-items: center;
  cursor: pointer;
}
.content .audio .audio_model_content .audio_model_item:hover{
  color: #409eff;
}
.content .audio .audio_model_content .icon{
  width: 16px;
  height: 16px;
  margin-right: 3px;
  background: url("../../assets/images/video-btn.png");
  background-repeat: no-repeat;
  
}

.content .audio .icon-playbar-cycle {
  background-position: -96px -179px!important;
}

.content .audio .icon-playbar-singlecycle{
  background-position: 0 -179px!important;
}
.content .audio .Cur_model{
  position: absolute;
  height: 16px;
  width: 16px;
  cursor: pointer;
  
  /* background-position: -64px -179px; */
  
  left: 866px;
  top: 22px;
  color: #3DC3C0;
}
.content .audio .icon{
  cursor: pointer;
  background: url("../../assets/images/video-btn.png");
  background-repeat: no-repeat;
}
.content .audio .audio_model_content {
  position: absolute;
  
}
.content .audio .audio_lyrics{
  position: absolute;
  height: 30px;
  left: 230px;
  top: 11px;
  z-index: 999;
}
.content .audio .audio_lyrics .audio_lyrics_item {
  font-size: 20px;
  height: 30px;
  line-height: 30px;
  /* background: rgba(255, 255, 255, 0.3); */
  text-align: center;
  color: #fff;
  background-image: linear-gradient(to right, #3DC3C0, #8568F5);
  opacity: .9;
}
.content .audio .currentAudioName{
  position: absolute;
  left: 45px;
  top: 10px;
  color: #c3d6e8;
}

.content .audio .Singer{
  position: absolute;
  left: 45px;
  top: 30px;
  font-size: 15px;
  color: #c3d6e8;
}
.audio-player{
  
  height: 35px;
  width: 95%;
  margin:10px auto;
  
}
.content .audio .audioList {
  position: absolute;
  right: 50px;
  top: 20px;
  color: rgb(51, 124, 218);
}

.content .audio .lyricsswitch {
  position: absolute;
  right: 50px;
  top: 20px;
}
.content .box-card {
  width: 225px;
  height: 87.5%;
  overflow: auto;
}

.playerlist_title{
  margin: 10px 0 10px 5px;
}
.content .box-card .box-card-body {
  
  padding: 0px !important;
}
.text {
  font-size: 14px;
}

.content .box-card .box-card-body .item {
  display: flex;
  height: 45px;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  transition: all 0.3s linear 0s;
  /* transition: all 0.5s ease;  */
}

.content .box-card .box-card-body .item:hover{
  font-size: 16px;
  cursor: pointer; 
  
}
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.search_data {
   /* display: grid;
   grid-template-columns:1fr 1fr;
   column-gap: 3px;
   row-gap: 3px; */

   column-count: 2;
   column-gap:6px; 
}
.search_data_item {
  margin-bottom: 5px;
  
}

.my-color-class {  
  color: #fff; 
  opacity: .9;
  background-image: linear-gradient(to right, rgb(142, 196, 179), rgb(143, 113, 113), rgb(91, 179, 214));
  
}

</style>