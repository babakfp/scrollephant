<script lang="ts">
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

<Scrollephant>
    <ScrollephantWrapper>
        <ScrollephantSection label="Section 1">
            <ScrollephantWrapper>
                <ScrollephantSubSection label="Section 1.1">
                    1.1
                </ScrollephantSubSection>
                <ScrollephantSubSection label="Section 1.2">
                    1.2
                </ScrollephantSubSection>
            </ScrollephantWrapper>
        </ScrollephantSection>
        <ScrollephantSection label="Section 2">
            <ScrollephantWrapper>
                <ScrollephantSubSection label="Section 2.1">
                    2.1
                </ScrollephantSubSection>
                <ScrollephantSubSection label="Section 2.2">
                    2.2
                </ScrollephantSubSection>
            </ScrollephantWrapper>
        </ScrollephantSection>
    </ScrollephantWrapper>

    <ScrollephantNavigationsWrapper>
        <ScrollephantArrowPrev />
        <ScrollephantDots />
        <ScrollephantArrowNext />
    </ScrollephantNavigationsWrapper>
</Scrollephant>
