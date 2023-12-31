<script lang="ts">
    import { onMount, onDestroy, getContext } from "svelte"
    import { type Writable } from "svelte/store"
    import type { Subsections } from "./types.js"
    import { sections, currentSectionNumber, movement } from "./stores.js"

    export let label = ""
    export let autoHeight = false

    const subsections: Writable<Subsections> = getContext("subsections")

    let element: HTMLElement
    const id = crypto.randomUUID()

    $: if ($movement === "fade") {
        throw new Error("Fading movement is not supported for subsections.")
    }

    onMount(() => {
        $subsections = [
            ...$subsections,
            {
                id,
                ref: element,
                label,
                autoHeight,
            },
        ]
    })

    onDestroy(() => {
        $subsections = $subsections.filter(subsection => subsection.id !== id)
    })

    $: isCurrent =
        $subsections[
            $sections[$currentSectionNumber - 1]?.currentSubsectionNumber - 1
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
