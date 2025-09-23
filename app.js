// Show a sample notification when the button is clicked
document.addEventListener('DOMContentLoaded', function() {
	const sampleNotifyBtn = document.getElementById('sampleNotifyBtn');
	if (sampleNotifyBtn) {
		sampleNotifyBtn.addEventListener('click', function() {
			// Send a real push notification using OneSignal REST API
			const appId = '76443416-6742-4c31-b806-916bc5e5085f';
			const restApiKey = 'bqypjazgguc5mrynvpjwdawa4';
			fetch('https://onesignal.com/api/v1/notifications', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Basic ' + restApiKey
				},
				body: JSON.stringify({
					app_id: appId,
					included_segments: ['All'],
					headings: { en: 'Sample Notification' },
					contents: { en: 'This is a demo notification for all users!' },
					url: window.location.origin
				})
			})
			.then(response => response.json())
			.then(data => {
				if (data.errors) {
					alert('Failed to send notification: ' + JSON.stringify(data.errors));
				} else {
					alert('Push notification sent to all subscribed users!');
				}
			})
			.catch(error => {
				alert('Error sending notification: ' + error);
			});
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

