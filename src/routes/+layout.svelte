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
        justify-content: center;
        width: 100%;
        height: 100%;
        color: white;
        font-size: 4rem;
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
</style>
