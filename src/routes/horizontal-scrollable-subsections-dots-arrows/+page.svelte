<script lang="ts">
    import { writable } from "svelte/store"
    import {
        Scrollephant,
        ScrollephantWrapper,
        ScrollephantSection,
        ScrollephantSubSection,
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
                <ScrollephantSubSection label="Section 2.1">
                    2.1
                </ScrollephantSubSection>
                <ScrollephantSubSection label="Section 2.2">
                    2.2
                </ScrollephantSubSection>
                <ScrollephantSubSection label="Section 2.3">
                    2.3
                </ScrollephantSubSection>
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
