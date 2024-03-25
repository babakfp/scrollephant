<script lang="ts">
    import {
        Scrollephant,
        ScrollephantSection,
        ScrollephantArrowPrev,
        ScrollephantArrowNext,
        ScrollephantDots,
    } from "scrollephant"
</script>

<Scrollephant>
    <svelte:fragment slot="sections">
        <ScrollephantSection label="Section 1">1</ScrollephantSection>

        <ScrollephantSection label="Section 2">
            <svelte:fragment slot="subsections">
                <ScrollephantSection label="Section 2.1">
                    2.1
                </ScrollephantSection>
                <ScrollephantSection label="Section 2.2">
                    2.2
                </ScrollephantSection>
                <ScrollephantSection label="Section 2.3">
                    2.3
                </ScrollephantSection>
            </svelte:fragment>

            <svelte:fragment slot="navigation">
                <ScrollephantArrowPrev />
                <ScrollephantDots />
                <ScrollephantArrowNext />
            </svelte:fragment>
        </ScrollephantSection>

        <ScrollephantSection label="Section 3">3</ScrollephantSection>
    </svelte:fragment>

    <svelte:fragment slot="navigation">
        <ScrollephantArrowPrev />
        <ScrollephantDots />
        <ScrollephantArrowNext />
    </svelte:fragment>
</Scrollephant>
