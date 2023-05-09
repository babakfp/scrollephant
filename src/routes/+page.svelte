<script lang="ts">
    import {
        Scrollephant,
        ScrollephantWrapper,
        ScrollephantSection,
        ScrollephantDots,
    } from "scrollephant"
</script>

<Scrollephant>
    <ScrollephantWrapper>
        <ScrollephantSection>
            <div class="section-inner">1</div>
        </ScrollephantSection>
        <ScrollephantSection>
            <div class="section-inner">2</div>
        </ScrollephantSection>
        <ScrollephantSection>
            <div class="section-inner">3</div>
        </ScrollephantSection>
    </ScrollephantWrapper>

    <ScrollephantDots />
</Scrollephant>

<style>
    :global(body) {
        margin: 0;
        overflow: hidden;
    }

    .section-inner {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        color: white;
        font-size: 4rem;
    }
    :global(.scrollephant-section):nth-child(1) .section-inner {
        background: blueviolet;
    }
    :global(.scrollephant-section):nth-child(2) .section-inner {
        background: brown;
    }
    :global(.scrollephant-section):nth-child(3) .section-inner {
        background: cyan;
    }
</style>
