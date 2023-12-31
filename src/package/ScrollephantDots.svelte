<script lang="ts">
    import ScrollephantDot from "./ScrollephantDot.svelte"
    import ScrollephantTooltip from "./ScrollephantTooltip.svelte"
    import { sections, currentSectionNumber } from "./stores.js"
    import { setIsMovingToTrue, setIsMovingToFalse } from "./utils.js"

    export let useSubsectionsDots = true

    function handleClick(i: number) {
        if ($currentSectionNumber === i + 1) return
        setIsMovingToTrue()
        $currentSectionNumber = i + 1
        setIsMovingToFalse()
    }

    function handleSubsections(i: number, sectionIndex: number) {
        // if ($currentSectionNumber === i + 1) return

        const isSubsectinParentIsTheCurrentSection =
            $currentSectionNumber - 1 === sectionIndex
        if (!isSubsectinParentIsTheCurrentSection) {
            $currentSectionNumber = sectionIndex + 1
        }

        setIsMovingToTrue()
        $sections[$currentSectionNumber - 1].currentSubsectionNumber = i + 1
        setIsMovingToFalse()
    }
</script>

<ol>
    {#each $sections as section, i}
        {@const isCurrentSection =
            $sections[$currentSectionNumber - 1].id === section.id}
        <ScrollephantDot
            isCurrent={isCurrentSection}
            on:click={() => handleClick(i)}
        >
            {#if useSubsectionsDots && section.subsections.length > 0}
                <ol>
                    {#each section.subsections as subsection, i2}
                        {@const isCurrentSubsection =
                            isCurrentSection &&
                            section.subsections[
                                section.currentSubsectionNumber - 1
                            ].id === subsection.id}
                        <ScrollephantDot
                            isCurrent={isCurrentSubsection}
                            on:click={() => handleSubsections(i2, i)}
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
