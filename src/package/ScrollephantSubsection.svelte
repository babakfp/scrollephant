<script lang="ts">
    import { onMount, onDestroy, getContext } from "svelte"
    import { type Writable } from "svelte/store"
    import type { Subsections } from "./types.js"
    import { movement } from "./stores.js"
    import { isCurrentSubsectionOfCurrentSection } from "./utils.js"

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

    let isCurrent = false

    $: if ($subsections) {
        isCurrent = isCurrentSubsectionOfCurrentSection(id)
    }
</script>

<div
    class="scrollephant-subsection"
    data-scrollephant-is-current-subsection={isCurrent}
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
