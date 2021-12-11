var peer = new Peer();
peer.on('open', function(id) {
	drawQR(id);

	peer.on('connection', function(conn) {
		// document.getElementById("qrcode").hidden = true;

		conn.on('open', function() {
			console.log('open');

			conn.on('data', function(state) {
				if (state.fire) {
					sendVirtualKey("keydown","KeyI");
					setTimeout(function () {
						sendVirtualKey("keyup","KeyI");
					}, 25);
				}

				if (state.alter) {
					sendVirtualKey("keydown","KeyU");
					setTimeout(function () {
						sendVirtualKey("keyup","KeyU");
					}, 25);
				}

				sendVirtualKey(state.up ? 'keydown' : 'keyup', 'KeyQ');
				sendVirtualKey(state.right ? 'keydown' : 'keyup', 'KeyR');
				sendVirtualKey(state.down ? 'keydown' : 'keyup', 'KeyW');
				sendVirtualKey(state.left ? 'keydown' : 'keyup', 'KeyE');
			});
		});

		omg.onclick = function () {
			var c = document.createElement('canvas');
			var cx = c.getContext('2d');

			c.width = 256;
			c.height = 240;

			setTimeout(function kekeke () {
				cx.drawImage(document.getElementById('canvas'), -22, 0, 300, c.height);

				c.toBlob(function (blob) {
					blob.arrayBuffer().then(shot => {
						conn.send(shot);
					});
					
					setTimeout(kekeke, 33);
				}, 'image/webp');
			}, 33);
		}
	});
});

function drawQR (id) {
	var wrapper = document.getElementById("qrcode");
	var url = '../lol_stream.html' +'?peer='+ id;

	wrapper.insertAdjacentHTML('beforeend', `
		<a href="${url}">${url}</a>
		<button id="omg">omg</button>
	`);
}
