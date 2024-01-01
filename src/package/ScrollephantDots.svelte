<script lang="ts">
    import ScrollephantDot from "./ScrollephantDot.svelte"
    import ScrollephantTooltip from "./ScrollephantTooltip.svelte"
    import { sections } from "./stores.js"
    import {
        setIsMovingToTrue,
        setIsMovingToFalse,
        setSectionToCurrent,
        isSectionCurrent,
    } from "./utils.js"

    export let useSubsectionsDots = true

    function moveToSection(id: string) {
        if (isSectionCurrent(id)) return
        setIsMovingToTrue()
        setSectionToCurrent(id)
        setIsMovingToFalse()
    }

    function moveToSubsection(i: number, sectionId: string) {
        if (!isSectionCurrent(sectionId)) {
            setSectionToCurrent(sectionId)
        }

        setIsMovingToTrue()
        $sections[$currentSectionNumber - 1].currentSubsectionNumber = i + 1
        setIsMovingToFalse()
    }
</script>

<ol>
    {#each $sections as section, i}
        <ScrollephantDot
            isCurrent={isSectionCurrent(section.id)}
            on:click={() => moveToSection(section.id)}
        >
            {#if useSubsectionsDots && !!section.subsections.length}
                <ol>
                    {#each section.subsections as subsection, i2}
                        {@const isCurrentSubsection =
                            isSectionCurrent(section.id) &&
                            section.subsections[
                                section.currentSubsectionNumber - 1
                            ].id === subsection.id}
                        <ScrollephantDot
                            isCurrent={isCurrentSubsection}
                            on:click={() => moveToSubsection(i2, section.id)}
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
