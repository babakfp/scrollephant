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

    // onMount(() => {
    //     sections.update(currentValue => {
    //         id = get(sections).length + 1
    //         const newSection = {
    //             id,
    //             ref: element,
    //             label,
    //         }
    //         return [...currentValue, newSection]
    //     })
    // })
</script>

<div
    class="scrollephant-subsection"
    data-scrollephant-current={$activeSectionNumber === id}
    data-scrollephant-id={id}
    bind:this={element}
>
    <slot />
</div>

<style>
    .scrollephant-subsection {
        height: 100vh;
        height: 100dvh;
        /* TODO:? max-height & overflow: hidden */

        width: 100vw;
        width: 100dvw;

        /* Prevent width shrinks. Inforce full view size. */
        flex-shrink: 0;
    }
</style>
