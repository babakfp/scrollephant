<ol>
    <slot />
</ol>

<style>
    ol {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    :global(.scrollephant[data-scrollephant-direction="vertical"]) ol {
        display: grid;
    }

    :global(.scrollephant[data-scrollephant-direction="horizontal"]) ol {
        display: flex;
    }
</style>
