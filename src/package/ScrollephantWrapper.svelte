<div class="scrollephant-wrapper">
    <slot />
</div>

<style>
    .scrollephant-wrapper {
        display: flex;
        transition: transform var(--scrollephant-duration)
            var(--scrollephant-timing-function);
    }

    :global([data-scrollephant-section-has-subsections="true"])
        .scrollephant-wrapper {
        height: 100%;
    }

    :global(.scrollephant[data-scrollephant-direction="vertical"])
        .scrollephant-wrapper:first-child,
    :global(
            .scrollephant[data-scrollephant-direction="horizontal"]
                [data-scrollephant-section-has-subsections="true"]
        )
        .scrollephant-wrapper {
        flex-direction: column;
        transform: translateY(var(--scrollephant-translate-y));
    }

    :global(.scrollephant[data-scrollephant-direction="horizontal"])
        .scrollephant-wrapper:first-child,
    :global(
            .scrollephant[data-scrollephant-direction="vertical"]
                [data-scrollephant-section-has-subsections="true"]
        )
        .scrollephant-wrapper {
        transform: translateX(var(--scrollephant-translate-x));
    }

    :global(.scrollephant[data-scrollephant-movement="fade"])
        .scrollephant-wrapper {
        position: relative;
    }
</style>
