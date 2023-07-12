<slot />

<style>
    :global(body) {
        margin: 0;
        overflow: hidden;
        font-family: JetBrains Mono;
    }

    :global(.scrollephant-section-inner) {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
        color: white;
        font-size: 4rem;
    }
    :global(
            .scrollephant-section:not([data-scrollephant-is-subsection-wrapper])
                .scrollephant-section-inner
        ) {
        justify-content: center;
    }
    :global(.scrollephant-section) {
        background: #52525b;
    }
    :global(.scrollephant-section:nth-child(1)) {
        background: #ff5f45;
    }
    :global(.scrollephant-section:nth-child(2)) {
        background: #0798ec;
    }
    :global(.scrollephant-section:nth-child(3)) {
        background: #fec401;
    }
    :global(.scrollephant-section:nth-child(4)) {
        background: #65a30d;
    }
    :global(.scrollephant-section:nth-child(5)) {
        background: #0891b2;
    }
    :global(.scrollephant-section:nth-child(6)) {
        background: #7c3aed;
    }
</style>
