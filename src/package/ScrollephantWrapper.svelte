<div class="scrollephant-wrapper">
    <slot />
</div>

<style>
    .scrollephant-wrapper {
        display: flex;
        transition-property: transform;
        transition-duration: var(--scrollephant-duration);
        transition-timing-function: var(--scrollephant-timing-function);
    }

    :global(.scrollephant[data-scrollephant-direction="vertical"])
        > .scrollephant-wrapper {
        flex-direction: column;
        transform: translateY(var(--scrollephant-translate-y));
    }

    :global(.scrollephant[data-scrollephant-direction="horizontal"])
        > .scrollephant-wrapper {
        transform: translateX(var(--scrollephant-translate-x));
    }

    :global(
            .scrollephant[data-scrollephant-direction="vertical"]
                [data-scrollephant-have-subsection="true"]
        )
        .scrollephant-wrapper {
        transform: translateX(var(--scrollephant-translate-x));
    }

    :global(
            .scrollephant[data-scrollephant-direction="horizontal"]
                [data-scrollephant-have-subsection="true"]
        )
        .scrollephant-wrapper {
        flex-direction: column;
        transform: translateY(var(--scrollephant-translate-y));
    }

    :global(.scrollephant[data-scrollephant-movement="fade"])
        .scrollephant-wrapper {
        position: relative;
        display: block;
        height: 100vh;
        height: 100dvh;
        width: 100vw;
        width: 100dvw;
    }
</style>
