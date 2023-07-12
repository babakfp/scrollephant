<script lang="ts">
    import { getContext } from "svelte"
    import type { Writable } from "svelte/store"

    export let isCurrent = false

    const isMoving: Writable<boolean> = getContext("isMoving")
</script>

<li class="scrollephant-dot" data-scrollephant-dot-current={isCurrent}>
    <button on:click data-scrollephant-disabled={$isMoving}>
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
        padding: 0.25rem;
        transition: calc(var(--scrollephant-duration) / 2) ease-out;
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

    li[data-scrollephant-dot-current="true"] button div {
        transform: scale(0.75);
    }

    :global(.scrollephant[data-scrollephant-direction="vertical"]) button {
        padding-right: 1rem;
    }

    :global(.scrollephant[data-scrollephant-direction="horizontal"]) button {
        padding-bottom: 1rem;
    }

    [data-scrollephant-dot-current="false"]
        [data-scrollephant-disabled="true"] {
        opacity: 0.5;
        pointer-events: none;
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
