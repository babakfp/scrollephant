<script lang="ts">
    import { writable, type Writable } from "svelte/store"
    import {
        Scrollephant,
        ScrollephantWrapper,
        ScrollephantSection,
        ScrollephantSubsection,
        ScrollephantNavigationsWrapper,
        ScrollephantArrowPrev,
        ScrollephantArrowNext,
        ScrollephantDots,
    } from "scrollephant"
    import type { ControlsType } from "./types.js"
    import Controls from "./Controls.svelte"

    let controls: Writable<ControlsType> = writable({
        sections: [
            {
                label: "Section 1",
                textContent: "1",
                autoHeight: false,
            },
            {
                label: "Section 2",
                subsections: [
                    {
                        label: "Section 2.1",
                        textContent: "2.1",
                        autoHeight: false,
                    },
                    {
                        label: "Section 2.2",
                        textContent: "2.2",
                        autoHeight: false,
                    },
                    {
                        label: "Section 2.3",
                        textContent: "2.3",
                        autoHeight: false,
                    },
                ],
            },
            {
                label: "Section 3",
                textContent: "3",
                autoHeight: false,
            },
        ],
        arrowPrev: true,
        dots: true,
        arrowNext: true,
        useSubsectionsDots: true,
    })
</script>

<svelte:head>
    <script
        rel="preload"
        as="script"
        src="https://cdn.tailwindcss.com"
    ></script>
</svelte:head>

<Scrollephant>
    <ScrollephantWrapper>
        {#each $controls.sections as section}
            <ScrollephantSection
                bind:label={section.label}
                bind:autoHeight={section.autoHeight}
            >
                {#if section.subsections}
                    <ScrollephantWrapper>
                        {#each section.subsections as subsection}
                            <ScrollephantSubsection
                                bind:label={subsection.label}
                            >
                                {subsection.textContent}
                            </ScrollephantSubsection>
                        {/each}
                    </ScrollephantWrapper>
                {:else if section.textContent}
                    {section.textContent}
                {/if}
            </ScrollephantSection>
        {/each}
    </ScrollephantWrapper>

    {#if $controls.arrowPrev || $controls.dots || $controls.arrowNext}
        <ScrollephantNavigationsWrapper>
            {#if $controls.arrowPrev}
                <ScrollephantArrowPrev />
            {/if}
            {#if $controls.dots}
                <ScrollephantDots />
            {/if}
            {#if $controls.arrowNext}
                <ScrollephantArrowNext />
            {/if}
        </ScrollephantNavigationsWrapper>
    {/if}
</Scrollephant>

<Controls bind:controls />
