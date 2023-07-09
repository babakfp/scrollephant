<script lang="ts">
    import {
        Scrollephant,
        ScrollephantWrapper,
        ScrollephantSection,
        ScrollephantSubSection,
        ScrollephantDots,
    } from "scrollephant"
</script>

<Scrollephant>
    <ScrollephantWrapper>
        <ScrollephantSection label="Section 1">
            <div class="section-inner">1</div>
        </ScrollephantSection>
        <ScrollephantSection label="Section 2">
            <div class="section-inner">2</div>
        </ScrollephantSection>
        <ScrollephantSection label="Section 3" isSubSectionWrapper={true}>
            <ScrollephantSubSection label="Section 1">
                <div class="section-inner">1</div>
            </ScrollephantSubSection>
            <ScrollephantSubSection label="Section 2">
                <div class="section-inner">2</div>
            </ScrollephantSubSection>
            <ScrollephantSubSection label="Section 3">
                <div class="section-inner">3</div>
            </ScrollephantSubSection>
        </ScrollephantSection>
    </ScrollephantWrapper>

    <ScrollephantDots />
</Scrollephant>

<style>
    .section-inner {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }
</style>
