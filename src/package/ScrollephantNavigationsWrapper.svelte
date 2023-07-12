<nav class="scrollephant-navigation-wrapper">
    <slot />
</nav>

<style>
    .scrollephant-navigation-wrapper {
        position: fixed;
        user-select: none;
        -webkit-user-drag: none;
    }

    :global(.scrollephant[data-scrollephant-direction="vertical"])
        .scrollephant-navigation-wrapper {
        right: 0;
        top: 50%;
        transform: translateY(-50%);
    }

    :global(.scrollephant[data-scrollephant-direction="horizontal"])
        .scrollephant-navigation-wrapper {
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
    }

    /* RTL */
    :global(
            html[dir="rtl"]
                .scrollephant[data-scrollephant-direction="vertical"]
        )
        .scrollephant-navigation-wrapper {
        right: initial;
        left: 0;
    }
</style>
