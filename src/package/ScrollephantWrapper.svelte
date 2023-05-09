<div class="scrollephant-wrapper">
    <slot />
</div>

<style>
    .scrollephant-wrapper {
        display: grid;
        transition-property: transform;
        transition-duration: var(--scrollephant-duration);
        transition-timing-function: var(--scrollephant-timing-function);
    }
    :global(.scrollephant[data-direction="vertical"]) .scrollephant-wrapper {
        transform: translateY(var(--scrollephant-translate-y));
    }
    :global(.scrollephant[data-direction="horizontal"]) .scrollephant-wrapper {
        transform: translateX(var(--scrollephant-translate-x));
    }
</style>
