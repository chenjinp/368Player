//封装本地存储数据与读取数据方法
export const SET_TOKEN = (token:string) => {
    localStorage.setItem("TOKEN",token)
}


export const GET_TOKEN = () => {
    return localStorage.getItem("TOKEN")
}
//本地存储删除数据方法
export const REMOVE_TOKEN = () => {
    localStorage.removeItem('TOKEN');
}


//playingList
export const SET_PlayingList = (playingList:any)=>{
    localStorage.setItem("playingList",playingList)
}

export const GET_PlayingList = () => {
    return localStorage.getItem("playingList")
}

//本地存储删除数据方法
export const REMOVE_PlayingList = () => {
    localStorage.removeItem('playingList');
}