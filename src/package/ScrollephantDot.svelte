<script lang="ts">
    import { getContext } from "svelte"
    import type { Writable } from "svelte/store"

    export let isCurrent = false

    const isMoving: Writable<boolean> = getContext("isMoving")
</script>

<li class="scrollephant-dot" data-scrollephant-dot-current={isCurrent}>
    <button on:click data-scrollephant-dot-disabled={$isMoving}>
        <div />
    </button>

    <slot />
</li>

<style>
    li {
        --dot-button-padding: 0.25rem;
        --dot-button-corner-padding: 1rem;
        position: relative;
        display: flex;
    }

    button {
        border: none;
        background: transparent;
        padding: 0;
        cursor: pointer;
        padding: var(--dot-button-padding);
        transition: calc(var(--scrollephant-duration) - 300ms) ease-out;
    }

    button div {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 1rem;
        height: 1rem;
        background: white;
        border-radius: 99px;
        transition: calc(var(--scrollephant-duration) - 300ms) ease-out;
        transform: scale(0.25);
    }

    button:hover div {
        transform: scale(0.5);
    }

    li[data-scrollephant-dot-current="true"] > button div {
        transform: scale(0.75);
    }

    :global(.scrollephant[data-scrollephant-direction="vertical"]) button {
        padding-right: var(--dot-button-corner-padding);
    }

    :global(.scrollephant[data-scrollephant-direction="horizontal"]) button {
        padding-bottom: var(--dot-button-corner-padding);
    }

    li[data-scrollephant-dot-current="false"]
        [data-scrollephant-dot-disabled="true"] {
        opacity: 0.5;
        pointer-events: none;
    }

    :global(
            html[dir="rtl"]
                .scrollephant[data-scrollephant-direction="vertical"]
        )
        button {
        padding-right: var(--dot-button-padding);
        padding-left: var(--dot-button-corner-padding);
    }

    li:hover :global(ol) {
        opacity: 1 !important;
        visibility: visible !important;
        pointer-events: all !important;
    }

    :global(.scrollephant[data-scrollephant-direction="vertical"])
        li
        :global(ol button),
    :global(.scrollephant[data-scrollephant-direction="horizontal"])
        li
        :global(ol button) {
        --dot-button-corner-padding: var(--dot-button-padding);
    }
</style>
