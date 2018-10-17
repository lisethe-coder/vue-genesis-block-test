'use strict';
 
var app = new Vue({
	el: '#app',
	data: {
		currentHash: '',
		previousHash: '',
		timeStamp: '',
		amount: '',
		sender: '',
		recipient: '',
	},
	methods: {
		getInformation() {
			// Set default value to 0000 
			this.previousHash = '0000';

			var date = new Date();
			var monthReal = date.getMonth()+1;

			var hours = date.getUTCHours()+1;
			var minutes = date.getUTCMinutes() +1;
			var seconds = date.getUTCSeconds() +1;
			this.timeStamp = `${date.getDate()}/
							${monthReal < 10 ? '0'+monthReal: monthReal}/
							${date.getFullYear()}, 
							${hours}:${minutes}:${seconds}`;
			async function sha256(message) {
			    // encode as UTF-8
			    const msgBuffer = new TextEncoder('utf-8').encode(message);                    

			    // hash the message
			    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

			    // convert ArrayBuffer to Array
			    const hashArray = Array.from(new Uint8Array(hashBuffer));

			    // convert bytes to hex string
			    const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
		    	return hashHex;
			}

			var message = this.amount || this.sender || this.recipient;
			sha256(message).then((hashVal)=>{
				this.currentHash = hashVal;
			});
		},
	}
});
