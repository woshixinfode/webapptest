export const generateUUID = () => {   //生成唯一ID
    let d = Date.now();
    let uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
            let r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
        }
    );
    return uuid;
}
//JavaScript生成随机字符串函数 
function RandomString(length) {
  var str = '';
  for ( ; str.length < length; str += Math.random().toString(36).substr(2) );
  return str.substr(0, length);
}
export const getUid = () =>{
  return parseInt(new Date().getTime() / 1000) + RandomString(3);
}


export const getfileSuffix =(filename)=>{  //取得文件名称后缀
    return filename.split('.')[1];
}
