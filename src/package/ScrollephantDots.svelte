<script lang="ts">
    import { getContext } from "svelte"
    import type { Writable } from "svelte/store"
    import type { Props, Sections } from "./types.js"
    import ScrollephantDot from "./ScrollephantDot.svelte"
    import ScrollephantTooltip from "./ScrollephantTooltip.svelte"

    const sections: Writable<Sections> = getContext("sections")
    const activeSectionNumber: Writable<number> = getContext(
        "activeSectionNumber"
    )
    const isMoving: Writable<boolean> = getContext("isMoving")
    const duration: Writable<number> = getContext("duration")
    const restrictMovement: Writable<Props["restrictMovement"]> =
        getContext("restrictMovement")

    function handleClick(i: number) {
        $isMoving = true

        $activeSectionNumber = i + 1

        if (restrictMovement && $isMoving) {
            setTimeout(() => {
                $isMoving = false
            }, $duration - 300)
        }
    }
</script>

<ol>
    {#each $sections as section, i}
        <ScrollephantDot
            isCurrent={i === $activeSectionNumber - 1}
            on:click={() => handleClick(i)}
        >
            {#if section.label}
                <ScrollephantTooltip content={section.label} />
            {/if}
        </ScrollephantDot>
    {/each}
</ol>

<style>
    ol {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    :global(.scrollephant[data-scrollephant-direction="vertical"]) ol {
        display: grid;
    }

    :global(.scrollephant[data-scrollephant-direction="horizontal"]) ol {
        display: flex;
    }
</style>
