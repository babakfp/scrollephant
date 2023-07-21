<script lang="ts">
    import {
        Scrollephant,
        ScrollephantWrapper,
        ScrollephantSection,
        ScrollephantSubSection,
    } from "scrollephant"
</script>

<Scrollephant>
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
</Scrollephant>
