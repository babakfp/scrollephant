<script lang="ts">
    import ScrollephantDot from "./ScrollephantDot.svelte"
    import ScrollephantTooltip from "./ScrollephantTooltip.svelte"
    import { sections, activeSectionNumber } from "./stores.js"
    import { setIsMovingToTrue, setIsMovingToFalse } from "./utils.js"

    export let useSubSectionsDots = true

    function handleClick(i: number) {
        if ($activeSectionNumber === i + 1) return
        setIsMovingToTrue()
        $activeSectionNumber = i + 1
        setIsMovingToFalse()
    }

    function handleSubSections(i: number, sectionIndex: number) {
        // if ($activeSectionNumber === i + 1) return
        if ($activeSectionNumber - 1 !== sectionIndex) {
            $activeSectionNumber = sectionIndex + 1
        }

        setIsMovingToTrue()
        $sections[$activeSectionNumber - 1].activeSubSectionNumber = i + 1
        setIsMovingToFalse()
    }
</script>

<ol>
    {#each $sections as section, i}
        {@const isCurrentSection =
            $sections[$activeSectionNumber - 1].id === section.id}
        <ScrollephantDot
            isCurrent={isCurrentSection}
            on:click={() => handleClick(i)}
        >
            {#if useSubSectionsDots && section.subSections.length > 0}
                <ol>
                    {#each section.subSections as subSection, i2}
                        {@const isCurrentSubSection =
                            isCurrentSection &&
                            section.subSections[
                                section.activeSubSectionNumber - 1
                            ].id === subSection.id}
                        <ScrollephantDot
                            isCurrent={isCurrentSubSection}
                            on:click={() => handleSubSections(i2, i)}
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
