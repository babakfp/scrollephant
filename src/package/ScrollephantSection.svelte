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
    class:scrollephant-section--auto-height={autoHeight}
    class:scrollephant-section-current={$activeSectionNumber === id}
    bind:this={element}
    data-scrollephant-id={`${id}`}
>
    <div class="scrollephant-section-inner">
        <slot />
    </div>
</div>

<style>
    .scrollephant-section:not(.scrollephant-section--auto-height) {
        height: 100vh;
        height: 100dvh;
    }

    :global(.scrollephant[data-scrollephant-direction="horizontal"])
        .scrollephant-section {
        width: 100vw;
        width: 100dvw;
        flex-shrink: 0;
    }

    .scrollephant-section-inner {
        width: 100%;
        height: 100%;
    }

    :global(.scrollephant[data-scrollephant-mode="fade"]) {
        & .scrollephant-section {
            position: absolute;
            inset: 0;
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
            transition: var(--scrollephant-duration) ease-in-out;
        }

        & .scrollephant-section-inner {
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
            transition: calc(var(--scrollephant-duration) / 2) ease-in;
            transform: scale(0.75);
        }

        & .scrollephant-section-current {
            opacity: 1;
            visibility: visible;
            pointer-events: all;
            z-index: 1;

            & .scrollephant-section-inner {
                opacity: 1;
                visibility: visible;
                pointer-events: all;
                transform: scale(1);
            }
        }
    }
</style>
