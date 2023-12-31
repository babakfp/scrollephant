<script lang="ts">
    import { writable } from "svelte/store"
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
</script>

<Scrollephant direction={writable("horizontal")}>
    <ScrollephantWrapper>
        <ScrollephantSection label="Section 1">1</ScrollephantSection>
        <ScrollephantSection label="Section 2">
            <ScrollephantWrapper>
                <ScrollephantSubsection label="Section 2.1">
                    2.1
                </ScrollephantSubsection>
                <ScrollephantSubsection label="Section 2.2">
                    2.2
                </ScrollephantSubsection>
                <ScrollephantSubsection label="Section 2.3">
                    2.3
                </ScrollephantSubsection>
            </ScrollephantWrapper>
        </ScrollephantSection>
        <ScrollephantSection label="Section 3">3</ScrollephantSection>
    </ScrollephantWrapper>

    <ScrollephantNavigationsWrapper>
        <ScrollephantArrowPrev />
        <ScrollephantDots />
        <ScrollephantArrowNext />
    </ScrollephantNavigationsWrapper>
</Scrollephant>
