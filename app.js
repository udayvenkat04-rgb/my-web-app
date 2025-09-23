// Show a sample notification when the button is clicked
document.addEventListener('DOMContentLoaded', function() {
	const sampleNotifyBtn = document.getElementById('sampleNotifyBtn');
	if (sampleNotifyBtn) {
		sampleNotifyBtn.addEventListener('click', function() {
			// Check for notification permission
			if (Notification.permission === 'granted') {
				new Notification('Sample Notification', {
					body: 'This is a demo notification for all users!',
					icon: 'favicon.ico'
				});
			} else if (Notification.permission !== 'denied') {
				Notification.requestPermission().then(function(permission) {
					if (permission === 'granted') {
						new Notification('Sample Notification', {
							body: 'This is a demo notification for all users!',
							icon: 'favicon.ico'
						});
					} else {
						alert('Notification permission denied.');
					}
				});
			} else {
				alert('Notification permission denied.');
			}
		});
	}
});

console.log("Web app with OneSignal push notifications loaded!");

// Listen for the subscribe button click and show feedback
document.addEventListener('DOMContentLoaded', function() {
	const subscribeBtn = document.querySelector('button[onclick]');
	if (subscribeBtn) {
		subscribeBtn.addEventListener('click', function() {
			// Show feedback when native prompt is triggered
			alert('Subscription prompt is being shown. Please allow notifications in your browser.');
		});
	}

	// Listen for OneSignal permission changes
	if (window.OneSignal) {
		window.OneSignal.push(function() {
			window.OneSignal.on('subscriptionChange', function(isSubscribed) {
				if (isSubscribed) {
					alert('You are now subscribed to notifications!');
				} else {
					alert('You are NOT subscribed to notifications.');
				}
			});
		});
	}
});

