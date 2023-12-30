<script lang="ts">
    import { onMount, onDestroy, getContext } from "svelte"
    import { type Writable } from "svelte/store"
    import type { SubSection, SubSections } from "./types.js"
    import { sections, activeSectionNumber } from "./stores.js"

    export let label = ""
    export let autoHeight = false

    const subSections: Writable<SubSections> = getContext("subSections")

    let element: HTMLElement
    const id = crypto.randomUUID()

    onMount(() => {
        subSections.update(currentValue => {
            const newSubSection: SubSection = {
                id,
                ref: element,
                label,
                autoHeight,
            }
            return [...currentValue, newSubSection]
        })
    })

    onDestroy(() => {
        subSections.update(_subSections =>
            _subSections.filter(subSection => subSection.id !== id)
        )
    })

    $: isCurrent =
        $subSections[
            $sections[$activeSectionNumber - 1]?.activeSubSectionNumber - 1
        ]?.id === id
</script>

<div
    class="scrollephant-subsection"
    data-scrollephant-current={isCurrent}
    bind:this={element}
>
    <slot />
</div>

<style>
    .scrollephant-subsection {
        height: 100%;
        width: 100%;
        /* Prevent width shrinks. Inforce full view size. */
        flex-shrink: 0;
    }
</style>
