var peer = new Peer();
peer.on('open', function(id) {
	drawQR(id);

	peer.on('connection', function(conn) {
		document.getElementById("qrcode1").hidden = true;

		conn.on('open', function() {
			console.log('open');

			// Receive messages
			conn.on('data', function(state) {
				console.log('Received', state);

				if (state.fire) {
					sendVirtualKey("keydown","KeyZ");
					setTimeout(function () {
						sendVirtualKey("keyup","KeyZ");
					}, 25);
				}

				if (state.alter) {
					sendVirtualKey("keydown","KeyX");
					setTimeout(function () {
						sendVirtualKey("keyup","KeyX");
					}, 25);
				}

				sendVirtualKey(state.up ? 'keydown' : 'keyup', 'ArrowUp');
				sendVirtualKey(state.right ? 'keydown' : 'keyup', 'ArrowRight');
				sendVirtualKey(state.down ? 'keydown' : 'keyup', 'ArrowDown');
				sendVirtualKey(state.left ? 'keydown' : 'keyup', 'ArrowLeft');
			});
			// conn.on('data', function(state) {
			// 	// console.log('Received', state);

			// 	if (state.fire) {
			// 		sendVirtualKey("keydown","KeyI");
			// 		setTimeout(function () {
			// 			sendVirtualKey("keyup","KeyI");
			// 		}, 25);
			// 	}

			// 	if (state.alter) {
			// 		sendVirtualKey("keydown","KeyU");
			// 		setTimeout(function () {
			// 			sendVirtualKey("keyup","KeyU");
			// 		}, 25);
			// 	}

			// 	sendVirtualKey(state.up ? 'keydown' : 'keyup', 'KeyQ');
			// 	sendVirtualKey(state.right ? 'keydown' : 'keyup', 'KeyR');
			// 	sendVirtualKey(state.down ? 'keydown' : 'keyup', 'KeyW');
			// 	sendVirtualKey(state.left ? 'keydown' : 'keyup', 'KeyE');
			// });
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
	var url = '../lol.html' +'?peer='+ id;

	var qrcode = new QRCode(document.getElementById("qrcode1"), {
		text: url,
		width: 256,
		height: 256,
		colorDark : "#000000",
		colorLight : "#ffffff",
		correctLevel : QRCode.CorrectLevel.H
	});

	wrapper.insertAdjacentHTML('beforeend', `
		<a href="${url}">${url}</a>
		<button id="omg">omg</button>
	`);

	// omg.onclick = function () {
	// 	// https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/readPixels
	// }
}
