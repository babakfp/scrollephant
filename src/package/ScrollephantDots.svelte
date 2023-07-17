<script lang="ts">
    import { getContext } from "svelte"
    import type { Writable } from "svelte/store"
    import type { Sections } from "./types.js"
    import ScrollephantDot from "./ScrollephantDot.svelte"
    import ScrollephantTooltip from "./ScrollephantTooltip.svelte"

    const sections: Writable<Sections> = getContext("sections")
    const activeSectionNumber: Writable<number> = getContext(
        "activeSectionNumber"
    )
	const setIsMovingToTrue = getContext<() => void>("setIsMovingToTrue")
	const setIsMovingToFalse = getContext<() => void>("setIsMovingToFalse")

    function handleClick(i: number) {
        if ($activeSectionNumber === i + 1) return
        setIsMovingToTrue()
        $activeSectionNumber = i + 1
        setIsMovingToFalse()
    }
</script>

<ol>
    {#each $sections as section, i}
        <ScrollephantDot
            isCurrent={i === $activeSectionNumber - 1}
            on:click={() => handleClick(i)}
        >
            {#if section.label}
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
    }

    :global(.scrollephant[data-scrollephant-direction="vertical"]) ol {
        display: grid;
    }

    :global(.scrollephant[data-scrollephant-direction="horizontal"]) ol {
        display: flex;
    }
</style>
