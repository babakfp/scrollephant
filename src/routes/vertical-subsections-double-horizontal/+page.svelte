<script lang="ts">
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

<Scrollephant>
    <ScrollephantWrapper>
        <ScrollephantSection label="Section 1">
            <ScrollephantWrapper>
                <ScrollephantSubsection label="Section 1.1">
                    1.1
                </ScrollephantSubsection>
                <ScrollephantSubsection label="Section 1.2">
                    1.2
                </ScrollephantSubsection>
            </ScrollephantWrapper>
        </ScrollephantSection>
        <ScrollephantSection label="Section 2">
            <ScrollephantWrapper>
                <ScrollephantSubsection label="Section 2.1">
                    2.1
                </ScrollephantSubsection>
                <ScrollephantSubsection label="Section 2.2">
                    2.2
                </ScrollephantSubsection>
            </ScrollephantWrapper>
        </ScrollephantSection>
    </ScrollephantWrapper>

    <ScrollephantNavigationsWrapper>
        <ScrollephantArrowPrev />
        <ScrollephantDots />
        <ScrollephantArrowNext />
    </ScrollephantNavigationsWrapper>
</Scrollephant>
