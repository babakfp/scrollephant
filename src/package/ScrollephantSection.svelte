<script lang="ts">
    import { onMount, getContext } from "svelte"
    import { type Writable, get } from "svelte/store"
    import type { Sections } from "./types.js"

    export let autoHeight = false
    export let label = ""

    const sections: Writable<Sections> = getContext("sections")
    const activeSectionNumber: Writable<number> = getContext(
        "activeSectionNumber"
    )

    let element: HTMLElement
    let id: number

    onMount(() => {
        sections.update(currentValue => {
            const newSection = {
                id: get(sections).length + 1,
                ref: element,
                label,
                autoHeight,
            }
            id = newSection.id
            return [...currentValue, newSection]
        })
    })
</script>

<div
    class="scrollephant-section"
    data-scrollephant-current={$activeSectionNumber === id}
    data-scrollephant-auto-height={autoHeight}
    data-scrollephant-id={id}
    bind:this={element}
>
    <div class="scrollephant-section-inner">
        <slot />
    </div>
</div>

<style>
    .scrollephant-section:not([data-scrollephant-auto-height="true"]) {
        height: 100vh;
        height: 100dvh;
    }

    [data-scrollephant-auto-height="true"] {
        max-height: 100vh;
        max-height: 100dvh;
    }

    :global(.scrollephant[data-scrollephant-direction="horizontal"])
        .scrollephant-section {
        width: 100vw;
        width: 100dvw;

        /* Prevent width shrinks. Inforce full view size. */
        flex-shrink: 0;
    }

    .scrollephant-section-inner {
        width: 100%;
        height: 100%;
    }

    :global(.scrollephant[data-scrollephant-movement="fade"])
        .scrollephant-section {
        position: absolute;
        inset: 0;
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transition: var(--scrollephant-duration) ease-in-out;
    }

    :global(.scrollephant[data-scrollephant-movement="fade"])
        .scrollephant-section-inner {
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transition: calc(var(--scrollephant-duration) / 2) ease-in;
        transform: scale(0.75);
    }

    :global(.scrollephant[data-scrollephant-movement="fade"])
        [data-scrollephant-current="true"] {
        opacity: 1;
        visibility: visible;
        pointer-events: all;
        z-index: 1;
    }

    :global(.scrollephant[data-scrollephant-movement="fade"])
        [data-scrollephant-current="true"]
        .scrollephant-section-inner {
        opacity: 1;
        visibility: visible;
        pointer-events: all;
        transform: scale(1);
    }
</style>
