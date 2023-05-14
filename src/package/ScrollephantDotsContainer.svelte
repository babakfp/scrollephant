<nav class="scrollephant-dots">
    <slot />
</nav>

<style>
    .scrollephant-dots {
        position: fixed;
        user-select: none;
        -webkit-user-drag: none;
    }

    :global(.scrollephant[data-scrollephant-direction="vertical"])
        .scrollephant-dots {
        right: 0;
        top: 50%;
        transform: translateY(-50%);
    }

    :global(.scrollephant[data-scrollephant-direction="horizontal"])
        .scrollephant-dots {
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
    }

    /* RTL */
    :global(
            html[dir="rtl"]
                .scrollephant[data-scrollephant-direction="vertical"]
        )
        .scrollephant-dots {
        right: initial;
        left: 0;
    }
</style>
