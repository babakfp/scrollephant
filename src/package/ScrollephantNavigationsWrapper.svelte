<nav class="scrollephant-navigation-wrapper">
    <slot />
</nav>

<style>
    .scrollephant-navigation-wrapper {
        position: fixed;
        user-select: none;
        -webkit-user-drag: none;
        display: flex;
    }

    :global(.scrollephant[data-scrollephant-direction="vertical"])
        .scrollephant-navigation-wrapper {
        flex-direction: column;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
    }

    :global(.scrollephant[data-scrollephant-direction="horizontal"])
        .scrollephant-navigation-wrapper {
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
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
