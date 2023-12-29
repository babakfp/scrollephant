<script lang="ts">
    import { writable } from "svelte/store"
    import {
        Scrollephant,
        ScrollephantWrapper,
        ScrollephantSection,
    } from "scrollephant"
</script>

<Scrollephant loopUp={writable(true)} loopDown={writable(true)}>
    <ScrollephantWrapper>
        <ScrollephantSection label="Auto Height" autoHeight={true}>
            Auto Height
        </ScrollephantSection>
        <ScrollephantSection label="Section 2">2</ScrollephantSection>
        <ScrollephantSection label="Section 3">3</ScrollephantSection>
    </ScrollephantWrapper>
</Scrollephant>
