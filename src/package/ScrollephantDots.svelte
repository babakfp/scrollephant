<script lang="ts">
    import { getContext } from "svelte"
    import type { Writable } from "svelte/store"
    import type { Sections } from "./types.js"
    import ScrollephantDotsContainer from "./ScrollephantDotsContainer.svelte"
    import ScrollephantDotsWrapper from "./ScrollephantDotsWrapper.svelte"
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

    <ScrollephantDotsWrapper>
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
    </ScrollephantDotsWrapper>

    <ScrollephantButtonNext />
</ScrollephantDotsContainer>
