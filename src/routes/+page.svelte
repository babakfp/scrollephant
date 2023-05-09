<script lang="ts">
    import { Scrollephant, ScrollephantSection } from "scrollephant"
</script>

<Scrollephant>
    <ScrollephantSection>
        <div class="section-inner">1</div>
    </ScrollephantSection>
    <ScrollephantSection>
        <div class="section-inner">2</div>
    </ScrollephantSection>
    <ScrollephantSection>
        <div class="section-inner">3</div>
    </ScrollephantSection>
</Scrollephant>

<style>
    .section-inner {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        color: white;
        font-size: 4rem;
    }
    .section-inner:nth-child(1) {
        background: blueviolet;
    }
    .section-inner:nth-child(2) {
        background: brown;
    }
    .section-inner:nth-child(3) {
        background: cyan;
    }
</style>
