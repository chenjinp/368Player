export const convertTimeToString = (timeString:any) => {
    // 使用正则表达式检查输入的时间字符串是否符合"mm:ss."的格式
    //00:01.099  
  const regex = /^(\d{2}):(\d{2}\.\d{2,3})$/;  
  //console.log(timeString);
  try {
    if (!regex.test(timeString)) {  
      throw new Error('输入的时间字符串格式不正确');  
    } 
  } catch (error) {
    return '0.00'
  }
   
  
  // 将时间字符串按冒号分割成数组  
  const parts = timeString.split(':');  
  const minutes = parseInt(parts[0], 10); // 获取分钟数部分并转换为整数  
  const secondsAndMilliseconds = parts[1]; // 获取秒数和毫秒数部分  
  
  // 将秒数和毫秒数部分按小数点分割成数组  
  const [seconds, milliseconds] = secondsAndMilliseconds.split('.').map(Number);  

  
  
  
  // 计算总秒数并转换为以秒为单位的小数秒数  
  const totalSeconds = minutes * 60 + seconds + milliseconds / 100;  
  const formattedTime = totalSeconds.toFixed(2); // 保留两位小数并转换为字符串  
  
  return formattedTime;  
}