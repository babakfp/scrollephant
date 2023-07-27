<script lang="ts">
    import { getContext } from "svelte"
    import type { Writable } from "svelte/store"
    import type { Sections } from "./types.js"
    import ScrollephantDot from "./ScrollephantDot.svelte"
    import ScrollephantTooltip from "./ScrollephantTooltip.svelte"

    export let useSubSectionsDots = true

    const sections: Writable<Sections> = getContext("sections")
    const activeSectionNumber: Writable<number> = getContext(
        "activeSectionNumber"
    )
    const setIsMovingToTrue = getContext<() => void>("setIsMovingToTrue")
    const setIsMovingToFalse = getContext<() => void>("setIsMovingToFalse")
    const resetSubSectionsToFirstPosition = getContext<() => void>(
        "resetSubSectionsToFirstPosition"
    )

    function handleClick(i: number) {
        if ($activeSectionNumber === i + 1) return
        setIsMovingToTrue()
        $activeSectionNumber = i + 1
        resetSubSectionsToFirstPosition()
        setIsMovingToFalse()
    }

    function handleSubSections(i: number) {
        // if ($activeSectionNumber === i + 1) return
        setIsMovingToTrue()
        $sections[$activeSectionNumber - 1].activeSubSectionNumber = i + 1
        setIsMovingToFalse()
    }
</script>

<ol>
    {#each $sections as section, i}
        <ScrollephantDot
            isCurrent={$activeSectionNumber === i + 1}
            on:click={() => handleClick(i)}
        >
            {#if useSubSectionsDots && section.subSections.length > 0}
                <ol>
                    {#each section.subSections as _, i2}
                        <ScrollephantDot
                            isCurrent={$activeSectionNumber === i + 1 &&
                                section.activeSubSectionNumber === i2 + 1}
                            on:click={() => handleSubSections(i2)}
                        />
                    {/each}
                </ol>
            {:else if section.label}
                <ScrollephantTooltip content={section.label} />
            {/if}
        </ScrollephantDot>
    {/each}
</ol>

<style>
    ol {
        margin: 0;
        padding: 0;
        list-style: none;
        position: relative;
    }

    :global(.scrollephant[data-scrollephant-direction="vertical"]) ol {
        display: grid;
    }

    :global(.scrollephant[data-scrollephant-direction="horizontal"]) ol {
        display: flex;
    }

    :global(.scrollephant[data-scrollephant-direction="vertical"]) ol ol {
        display: flex;
        flex-direction: row-reverse;
    }

    :global(.scrollephant[data-scrollephant-direction="horizontal"]) ol ol {
        display: flex;
        flex-direction: column-reverse;
    }

    ol ol {
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        position: absolute;
        right: 100%;
        transition: calc(var(--scrollephant-duration) - 300ms) ease-out;
    }

    :global(html[dir="rtl"]) ol ol {
        right: initial;
        left: 100%;
    }
</style>
