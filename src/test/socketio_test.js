// 引入客户端io
import io from 'socket.io-client';
// 链接服务器，得到链接的socket对象
const socket = io('ws://localhost:4000');
// 绑定receiveMessage 监听，接受服务器发送的消息
socket.on('receiveMsg',function(data){
    console.log('浏览器端接受消息：',data);
})
// 向服务器发送消息
socket.emit('sendMsg',{name:'tom',data:Date.now()});
console.log('浏览器向服务端发送消息：',{name:'Tom',date:Date.now()});

