<script lang="ts">
    import { getContext } from "svelte"

    const numberOfSections = getContext("numberOfSections")
    numberOfSections.update((v: number) => ++v)
</script>

<div class="scrollephant-section">
    <slot />
</div>

<style>
    :global(.scrollephant[data-direction="vertical"]) .scrollephant-section {
        height: 100vh;
        height: 100dvh;
    }
    :global(.scrollephant[data-direction="horizontal"]) .scrollephant-section {
        width: 100vw;
        width: 100dvw;
    }
</style>
