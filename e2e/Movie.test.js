describe('MoviesScreen', () => {
	beforeAll(async () => {
		// Launch the app before all tests
		await device.launchApp();
	});

	beforeEach(async () => {
		// Reload React Native before each test to ensure a clean state
		await device.reloadReactNative();
	});

	/**
	 * Helper function to navigate to a tab by its testID
	 */
	const navigateToTab = async tabTestID => {
		await element(by.id(tabTestID)).tap();
	};

	/**
	 * Helper function to verify the visibility of a banner item
	 */
	const verifyBannerItem = async index => {
		await expect(element(by.id(`banner-image-${index}`))).toBeVisible();
		await expect(element(by.id(`banner-title-${index}`))).toBeVisible();
	};

	/**
	 * Helper function to handle platform-specific delays
	 */
	const handleAndroidDelay = async () => {
		if (device.getPlatform() === 'android') {
			await new Promise(resolve => setTimeout(resolve, 500));
		}
	};

	/**
	 * Test case: Verify the MoviesScreen and its tabs
	 */
	it('should display the MoviesScreen Tabs', async () => {
		// Verify MoviesScreen is visible
		await expect(element(by.id('movies-screen'))).toBeVisible();

		// Verify home banner and its first item
		await expect(element(by.id('home-banner'))).toBeVisible();
		await verifyBannerItem(0);

		// Navigate to the Favorites tab and verify
		await navigateToTab('tab-favorites');
		await expect(element(by.id('favorites-screen'))).toBeVisible();

		// Navigate to the Booked tab and verify
		await navigateToTab('tab-booked');
		await expect(element(by.id('booked-screen'))).toBeVisible();
	});

	/**
	 * Test case: Verify swiping through the HomeBanner
	 */
	it('should allow swiping through the HomeBanner', async () => {
		// Swipe left on the home banner
		await element(by.id('home-banner')).swipe('left');

		// Verify the second banner item is visible
		await verifyBannerItem(1);
	});

	/**
	 * Test case: Verify the full flow of booking a movie
	 */
	it('should complete the full booking flow', async () => {
		const testIndex = 0;

		// Navigate to the booking screen
		await expect(
			element(by.id(`navigate-booking-action-${testIndex}`)),
		).toBeVisible();
		await element(by.id(`navigate-booking-action-${testIndex}`)).tap();
		await expect(element(by.id('booking-screen'))).toBeVisible();

		// Scroll to the bottom of the booking screen and confirm booking
		await element(by.id('booking-screen')).scrollTo('bottom');
		await element(by.id(`booking-action-${testIndex}`)).tap();

		// Verify the booked screen and booked list
		await expect(element(by.id('booked-screen'))).toBeVisible();
		await expect(element(by.id('booked-list'))).toBeVisible();
		await expect(element(by.id(`booked-list-item-${testIndex}`))).toBeVisible();

		// Navigate back to Movies tab and verify the booking status
		await navigateToTab('tab-movies');
		await expect(element(by.id(`booked-checker-${testIndex}`))).toBeVisible();
		await expect(element(by.id(`booking-action-${testIndex}`))).not.toExist();
	});

	/**
	 * Test case: Verify the favorite functionality
	 */
	it('should toggle favorite status when the favorite button is pressed', async () => {
		const testIndex = 0;

		// Verify the favorite button is visible and tap it
		await expect(element(by.id(`fav-action-${testIndex}`))).toBeVisible();
		await element(by.id(`fav-action-${testIndex}`)).tap();

		// Navigate to the Favorites tab and verify the favorite item is listed
		await navigateToTab('tab-favorites');
		await expect(element(by.id('favorites-screen'))).toBeVisible();
		await expect(element(by.id('favorite-list'))).toBeVisible();
		await expect(
			element(by.id(`favorite-list-item-${testIndex}`)),
		).toBeVisible();
	});

	/**
	 * Test case: Verify removing a movie from favorites
	 */
	it('should remove a movie from favorites and verify it no longer appears in the favorites list', async () => {
		let testIndex = 0;

		// Ensure the first movie's favorite button is visible and tap it to add to favorites
		await expect(element(by.id(`fav-action-${testIndex}`))).toBeVisible();
		await element(by.id(`fav-action-${testIndex}`)).tap();
		await element(by.id('home-banner')).swipe('left');
		await handleAndroidDelay();

		testIndex++;

		// Ensure the second movie's favorite button is visible and tap it to add to favorites
		await expect(element(by.id(`fav-action-${testIndex}`))).toBeVisible();
		await element(by.id(`fav-action-${testIndex}`)).tap();

		// Navigate to the Favorites tab and verify the second movie is in the list
		await navigateToTab('tab-favorites');
		await expect(element(by.id('favorite-list'))).toBeVisible();
		await expect(
			element(by.id(`favorite-list-item-${testIndex}`)),
		).toBeVisible();

		// Navigate back to Movies tab
		await navigateToTab('tab-movies');
		await handleAndroidDelay();

		// Ensure the second movie's favorite button is visible and tap it to remove from favorites
		await expect(element(by.id(`fav-action-${testIndex}`))).toBeVisible();
		await element(by.id(`fav-action-${testIndex}`)).tap();

		// Navigate back to the Favorites tab and verify the second movie is no longer in the list
		await navigateToTab('tab-favorites');
		await expect(
			element(by.id(`favorite-list-item-${testIndex}`)),
		).not.toBeVisible();
	});
});
