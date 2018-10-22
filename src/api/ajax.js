import axios from 'axios';

// data: {username:dashen1,password:123}
// paramStr: username=dashen1&password=123
export default function ajax(url,data={},type="GET") {
    if(type === 'GET'){
        let paramStr = '';
        Object.keys(data).forEach(key => {
            paramStr += key + '=' + data[key] + '&';
            // 这样拼接后，username=dashen1&password=123&，多了一个&符号，要去掉
        })
        if(paramStr) {
            // 去掉最后一个& 符
            paramStr = paramStr.substring(0,paramStr.length -1);
        }
        return  axios.get(url+'?' + paramStr);
    }
    else {
        return axios.post(url,data);
    }
    
    
}