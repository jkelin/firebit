self.onmessage = function (e) {
  console.log(e.data); // 'ping'
  self.postMessage('pong');
};
