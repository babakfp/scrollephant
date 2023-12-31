<slot />

<style>
    :global(body) {
        font-family: JetBrains Mono;
    }

    :global(.scrollephant-section-inner) {
        align-items: center;
        color: white;
        font-size: 4rem;
    }
    :global(
            .scrollephant-section:not([data-scrollephant-has-subsection="true"])
                .scrollephant-section-inner
        ) {
        display: flex;
        justify-content: center;
    }
    :global(.scrollephant-subsection) {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    :global(.scrollephant-section) {
        background: #52525b;
    }
    :global(.scrollephant-section:nth-child(1)),
    :global(.scrollephant-subsection:nth-child(6)) {
        background: #ff5f45;
    }
    :global(.scrollephant-section:nth-child(2)),
    :global(.scrollephant-subsection:nth-child(5)) {
        background: #0798ec;
    }
    :global(.scrollephant-section:nth-child(3)),
    :global(.scrollephant-subsection:nth-child(4)) {
        background: #fec401;
    }
    :global(.scrollephant-section:nth-child(4)),
    :global(.scrollephant-subsection:nth-child(3)) {
        background: #65a30d;
    }
    :global(.scrollephant-section:nth-child(5)),
    :global(.scrollephant-subsection:nth-child(2)) {
        background: #0891b2;
    }
    :global(.scrollephant-section:nth-child(6)),
    :global(.scrollephant-subsection:nth-child(1)) {
        background: #7c3aed;
    }
    :global(.scrollephant-section[data-scrollephant-has-subsection="true"]) {
        background: unset;
    }
</style>
