<script lang="ts">
    import { onMount, getContext } from "svelte"
    import { type Writable, get } from "svelte/store"
    import type { Sections } from "./types.js"

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
            }
            id = newSection.id
            return [...currentValue, newSection]
        })
    })
</script>

<div
    class="scrollephant-section"
    data-scrollephant-current={$activeSectionNumber === id}
    data-scrollephant-id={id}
    bind:this={element}
>
    <slot />
</div>

<style>
    .scrollephant-section {
        height: 100%;
        /* What about max-height and overflow: hidden */
    }

    :global(.scrollephant[data-scrollephant-direction="horizontal"])
        .scrollephant-section {
        width: 100vw;
        width: 100dvw;

        /* Prevent width shrinks. Inforce full view size. */
        flex-shrink: 0;
    }
</style>
