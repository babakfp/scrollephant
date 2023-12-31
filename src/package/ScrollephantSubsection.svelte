<script lang="ts">
    import { onMount, onDestroy, getContext } from "svelte"
    import { type Writable } from "svelte/store"
    import type { Subsection, Subsections } from "./types.js"
    import { sections, activeSectionNumber, movement } from "./stores.js"

    export let label = ""
    export let autoHeight = false

    const subsections: Writable<Subsections> = getContext("subsections")

    let element: HTMLElement
    const id = crypto.randomUUID()

    $: if ($movement === "fade") {
        throw new Error("Fading movement is not supported for subsections.")
    }

    onMount(() => {
        subsections.update(currentValue => {
            const newSubsection: Subsection = {
                id,
                ref: element,
                label,
                autoHeight,
            }
            return [...currentValue, newSubsection]
        })
    })

    onDestroy(() => {
        subsections.update(_subsections =>
            _subsections.filter(subsection => subsection.id !== id)
        )
    })

    $: isCurrent =
        $subsections[
            $sections[$activeSectionNumber - 1]?.activeSubsectionNumber - 1
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
