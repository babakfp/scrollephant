<script lang="ts">
    import { onMount, getContext } from "svelte"
    import type { Writable } from "svelte/store"
    import type { Section } from "./types.js"

    export let autoHeight = false
    export let label = ""

    const sections: Writable<Section[] | []> = getContext("sections")

    let element: HTMLElement

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
    })
</script>

<div
    class="scrollephant-section"
    class:scrollephant-section--auto-height={autoHeight}
    bind:this={element}
>
    <slot />
</div>

<style>
    .scrollephant-section:not(.scrollephant-section--auto-height) {
        height: 100vh;
        height: 100dvh;
    }

    :global(.scrollephant[data-direction="horizontal"]) .scrollephant-section {
        width: 100vw;
        width: 100dvw;
        flex-shrink: 0;
    }
</style>
