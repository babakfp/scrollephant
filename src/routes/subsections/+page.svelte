<script lang="ts">
    import {
        Scrollephant,
        ScrollephantWrapper,
        ScrollephantSection,
        ScrollephantSubsection,
    } from "scrollephant"
</script>

<Scrollephant>
    <ScrollephantWrapper>
        <ScrollephantSection label="Section 1">1</ScrollephantSection>
        <ScrollephantSection label="Section 2">
            <ScrollephantSubsection label="Section 2.1">
                2.1
            </ScrollephantSubsection>
            <ScrollephantSubsection label="Section 2.2">
                2.2
            </ScrollephantSubsection>
            <ScrollephantSubsection label="Section 2.3">
                2.3
            </ScrollephantSubsection>
        </ScrollephantSection>
        <ScrollephantSection label="Section 3">3</ScrollephantSection>
    </ScrollephantWrapper>
</Scrollephant>
