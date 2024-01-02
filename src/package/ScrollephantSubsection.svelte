<script lang="ts">
    import { onMount, onDestroy, getContext } from "svelte"
    import { type Writable } from "svelte/store"
    import type { Subsections } from "./types.js"
    import { movement } from "./stores.js"
    import { isSubsectionCurrentById } from "./utils.js"

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
                isCurrent: $subsections.length === 0 ? true : false,
            },
        ]
    })

    onDestroy(() => {
        $subsections = $subsections.filter(subsection => subsection.id !== id)
    })
</script>

<div
    class="scrollephant-subsection"
    data-scrollephant-is-current-subsection={isSubsectionCurrentById(
        $subsections,
        id
    )}
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
