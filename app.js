

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


