//console.log("This is from the connect: ", socket);
window.onload = function subscribeAndListen() {
  io.socket.get('/tweet/subscribe');

  io.socket.on('tweet', function (obj) {
    console.log(obj.data);
  });
}
