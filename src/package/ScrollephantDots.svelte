<script lang="ts">
    import ScrollephantDot from "./ScrollephantDot.svelte"
    import ScrollephantTooltip from "./ScrollephantTooltip.svelte"
    import { sections } from "./stores.js"
    import {
        setIsMovingToTrue,
        setIsMovingToFalse,
        setSectionToCurrentById,
        isSectionCurrentById,
        setSubsectionOfCurrentSectionToCurrent,
        isCurrentSubsectionOfCurrentSection,
    } from "./utils.js"

    export let useSubsectionsDots = true

    function moveToSection(id: string) {
        if (isSectionCurrentById(id)) return
        setIsMovingToTrue()
        setSectionToCurrentById(id)
        setIsMovingToFalse()
    }

    function moveToSubsection(sectionId: string, subsectionId: string) {
        if (!isSectionCurrentById(sectionId)) {
            setSectionToCurrentById(sectionId)
        }
        setIsMovingToTrue()
        setSubsectionOfCurrentSectionToCurrent(subsectionId)
        setIsMovingToFalse()
    }
</script>

<ol>
    {#each $sections as section}
        <ScrollephantDot
            isCurrent={isSectionCurrentById(section.id, $sections)}
            on:click={() => moveToSection(section.id)}
        >
            {#if useSubsectionsDots && !!section.subsections.length}
                <ol>
                    {#each section.subsections as subsection}
                        <ScrollephantDot
                            isCurrent={isCurrentSubsectionOfCurrentSection(
                                subsection.id
                            )}
                            on:click={() =>
                                moveToSubsection(section.id, subsection.id)}
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
