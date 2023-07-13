<script lang="ts">
    import {
        Scrollephant,
        ScrollephantWrapper,
        ScrollephantSection,
    } from "scrollephant"
</script>

<Scrollephant>
    <ScrollephantWrapper>
        <ScrollephantSection label="Section 1">1</ScrollephantSection>
        <ScrollephantSection label="Section 2">2</ScrollephantSection>
        <ScrollephantSection label="Auto Height" autoHeight={true}>
            Auto Height
        </ScrollephantSection>
    </ScrollephantWrapper>
</Scrollephant>
