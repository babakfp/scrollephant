<script lang="ts">
    import {
        Scrollephant,
        ScrollephantWrapper,
        ScrollephantSection,
        ScrollephantNavigationsWrapper,
        ScrollephantDots,
        ScrollephantArrowPrev,
        ScrollephantArrowNext,
    } from "scrollephant"
</script>

<Scrollephant>
    <ScrollephantWrapper>
        <ScrollephantSection label="Section 1">1</ScrollephantSection>
        <ScrollephantSection label="Section 2">2</ScrollephantSection>
        <ScrollephantSection label="Section 3">3</ScrollephantSection>
    </ScrollephantWrapper>

    <ScrollephantNavigationsWrapper>
        <ScrollephantArrowPrev />
        <ScrollephantDots />
        <ScrollephantArrowNext />
    </ScrollephantNavigationsWrapper>
</Scrollephant>
