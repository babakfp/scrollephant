<script lang="ts">
    import { getContext } from "svelte"
    import type { Writable } from "svelte/store"
    import type { Sections } from "./types.js"
    import ScrollephantDotsContainer from "./ScrollephantDotsContainer.svelte"
    import ScrollephantDot from "./ScrollephantDot.svelte"
    import ScrollephantTooltip from "./ScrollephantTooltip.svelte"
    import ScrollephantButtonNext from "./ScrollephantButtonNext.svelte"
    import ScrollephantButtonPrev from "./ScrollephantButtonPrev.svelte"

    const sections: Writable<Sections> = getContext("sections")
    const activeSectionNumber: Writable<number> = getContext(
        "activeSectionNumber"
    )
</script>

<ScrollephantDotsContainer>
    <ScrollephantButtonPrev />

    <ol>
        {#each $sections as section, i}
            <ScrollephantDot
                isCurrent={i === $activeSectionNumber - 1}
                on:click={() => ($activeSectionNumber = i + 1)}
            >
                {#if section.label}
                    <ScrollephantTooltip content={section.label} />
                {/if}
            </ScrollephantDot>
        {/each}
    </ol>

    <ScrollephantButtonNext />
</ScrollephantDotsContainer>

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
