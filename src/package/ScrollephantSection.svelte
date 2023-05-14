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
    let indexPlusOne: number

    onMount(() => {
        sections.update(currentValue => {
            return [
                ...currentValue,
                {
                    ref: element,
                    label,
                },
            ]
        })
        indexPlusOne = get(sections).length
    })
</script>

<div
    class="scrollephant-section"
    class:scrollephant-section--auto-height={autoHeight}
    class:scrollephant-section-current={$activeSectionNumber === indexPlusOne}
    bind:this={element}
>
    <slot />
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

    :global(.scrollephant[data-scrollephant-mode="fade"])
        .scrollephant-section {
        position: absolute;
        inset: 0;
        transition: var(--scrollephant-duration) ease-in;
        opacity: 0;
        visibility: hidden;
        pointer-events: none;

        &.scrollephant-section-current {
            opacity: 1;
            visibility: visible;
            pointer-events: all;
        }
    }
</style>
