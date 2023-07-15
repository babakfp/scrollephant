<script lang="ts">
    import {
        Scrollephant,
        ScrollephantWrapper,
        ScrollephantSection,
        ScrollephantSubSection,
    } from "scrollephant"
</script>

<Scrollephant scrollableSubSections={false}>
    <ScrollephantWrapper>
        <ScrollephantSection label="Section 1">1</ScrollephantSection>
        <ScrollephantSection label="Section 2">
            <ScrollephantSubSection label="Section 2.1">
                2.1
            </ScrollephantSubSection>
            <ScrollephantSubSection label="Section 2.2">
                2.2
            </ScrollephantSubSection>
            <ScrollephantSubSection label="Section 2.3">
                2.3
            </ScrollephantSubSection>
        </ScrollephantSection>
        <ScrollephantSection label="Section 3">3</ScrollephantSection>
    </ScrollephantWrapper>
</Scrollephant>
