var peer = new Peer();
var peerIds = {
	a: null,
	b: null,
}

closea.onclick = function () {
	closea.closest('#qrcode').remove();
}
closeb.onclick = function () {
	closeb.closest('#qrcodeb').remove();
}

peer.on('open', function(id) {
	drawQR(id);

	peer.on('connection', function(conn) {

		conn.on('open', function() {

			// Receive messages
			conn.on('data', function(state) {
				if (state.id) {
					if (state.id === 'a') {
						peerIds.a = conn.peer;
						document.getElementById("qrcode1").hidden = true;
					}
					else {
						peerIds.b = conn.peer;
						document.getElementById("qrcodeb1").hidden = true;
					}

					return;
				}

				if (conn.peer === peerIds.a) {
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
				}

				if (conn.peer === peerIds.b) {
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
				}
			});
		});

		omg.onclick = startStream;
		omgb.onclick = startStream;

		function startStream () {
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
	var url = '../lol.html' +'?peer='+ id +'#a';
	var a = document.createElement('a');

	a.href = url;
	a.innerHTML = url;

	var qrcode = new QRCode(document.getElementById("qrcode1"), {
		text: a.href,
		width: 256,
		height: 256,
		colorDark : "#000000",
		colorLight : "#ffffff",
		correctLevel : QRCode.CorrectLevel.H
	});

	wrapper.appendChild(a);

	wrapper.insertAdjacentHTML('beforeend', `
		<button id="omg">omg</button>
	`);


	var wrapper = document.getElementById("qrcodeb");
	var url = '../lol.html' +'?peer='+ id +'#b';
	var a = document.createElement('a');

	a.href = url;
	a.innerHTML = url;

	var qrcode = new QRCode(document.getElementById("qrcodeb1"), {
		text: a.href,
		width: 256,
		height: 256,
		colorDark : "#000000",
		colorLight : "#ffffff",
		correctLevel : QRCode.CorrectLevel.H
	});

	wrapper.appendChild(a);

	wrapper.insertAdjacentHTML('beforeend', `
		<button id="omgb">omg</button>
	`);

	// omg.onclick = function () {
	// 	// https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/readPixels
	// }
}
