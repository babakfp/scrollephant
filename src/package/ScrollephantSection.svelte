<script lang="ts">
    import { getContext } from "svelte"
    import type { Writable } from "svelte/store"

    const numberOfSections: Writable<number> = getContext("numberOfSections")
    $numberOfSections += 1
</script>

<div class="scrollephant-section">
    <slot />
</div>

<style>
    :global(.scrollephant[data-direction="vertical"]) .scrollephant-section {
        height: 100vh;
        height: 100dvh;
        transform: translateY(--scrollephant-translate-y);
    }
    :global(.scrollephant[data-direction="horizontal"]) .scrollephant-section {
        width: 100vw;
        width: 100dvw;
        transform: translateX(--scrollephant-translate-x);
    }
</style>
