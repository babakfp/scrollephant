<script lang="ts">
    import { writable } from "svelte/store"
    import {
        Scrollephant,
        ScrollephantWrapper,
        ScrollephantSection,
    } from "scrollephant"
</script>

<Scrollephant movement={writable("fade")}>
    <ScrollephantWrapper>
        <ScrollephantSection label="Section 1">1</ScrollephantSection>
        <ScrollephantSection label="Section 2">2</ScrollephantSection>
        <ScrollephantSection label="Section 3">3</ScrollephantSection>
    </ScrollephantWrapper>
</Scrollephant>
