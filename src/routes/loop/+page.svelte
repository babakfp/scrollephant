<script lang="ts">
    import {
        Scrollephant,
        ScrollephantWrapper,
        ScrollephantSection,
        ScrollephantDots,
    } from "scrollephant"
</script>

<Scrollephant loopUp={true} loopDown={true}>
    <ScrollephantWrapper>
        <ScrollephantSection label="Section 1">
            <div class="section-inner">1</div>
        </ScrollephantSection>
        <ScrollephantSection label="Section 2">
            <div class="section-inner">2</div>
        </ScrollephantSection>
        <ScrollephantSection label="Section 3">
            <div class="section-inner">3</div>
        </ScrollephantSection>
    </ScrollephantWrapper>

    <ScrollephantDots />
</Scrollephant>
