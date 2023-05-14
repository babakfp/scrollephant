<script>
    export let isCurrent = false
</script>

<li data-scrollephant-current={isCurrent}>
    <button on:click>
        <div />
    </button>

    <slot />
</li>

<style>
    li {
        position: relative;
        display: flex;
    }

    button {
        border: none;
        background: transparent;
        padding: 0;
        cursor: pointer;
    }

    button div {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 1rem;
        height: 1rem;
        background: white;
        border-radius: 99px;
        transition: calc(var(--scrollephant-duration) / 2) ease-out;
        transform: scale(0.25);
    }

    button:hover div {
        transform: scale(0.5);
    }

    li[data-scrollephant-current="true"] button div {
        transform: scale(0.75);
    }

    :global(.scrollephant[data-scrollephant-direction="vertical"]) button {
        padding: 0.25rem 1rem 0.25rem 0.25rem;
    }

    :global(.scrollephant[data-scrollephant-direction="horizontal"]) button {
        padding: 0.25rem 0.25rem 1rem 0.25rem;
    }

    /* RTL */
    :global(
            html[dir="rtl"]
                .scrollephant[data-scrollephant-direction="vertical"]
        )
        button {
        padding-right: 0.25rem;
        padding-left: 1rem;
    }
</style>
