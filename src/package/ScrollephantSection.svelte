<div class="scrollephant-section">
    <slot />
</div>

<style>
	:global(.scrollephant-vertical) .scrollephant-section {
		height: 100vh;
		height: 100dvh;
	}
	:global(.scrollephant-horizontal) .scrollephant-section {
		width: 100vw;
		width: 100dvw;
	}
</style>
