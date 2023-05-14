<script lang="ts">
    import { getContext } from "svelte"
    import type { Writable } from "svelte/store"
    import type { Sections } from "./types.js"
    import ScrollephantTooltip from "./ScrollephantTooltip.svelte"
    import ScrollephantButtonNext from "./ScrollephantButtonNext.svelte"
    import ScrollephantButtonPrev from "./ScrollephantButtonPrev.svelte"
    import ScrollephantDot from "./ScrollephantDot.svelte"

    const sections: Writable<Sections> = getContext("sections")
    const activeSectionNumber: Writable<number> = getContext(
        "activeSectionNumber"
    )
</script>

<nav class="scrollephant-dots">
    <ScrollephantButtonPrev />

    <ol>
        {#each $sections as section, i}
            <ScrollephantDot
                isCurrent={i === $activeSectionNumber - 1}
                on:click={() => ($activeSectionNumber = i + 1)}
            >
                {#if section.label}
                    <ScrollephantTooltip content={section.label} />
                {/if}
            </ScrollephantDot>
        {/each}
    </ol>

    <ScrollephantButtonNext />
</nav>

<style>
    .scrollephant-dots {
        position: fixed;
        user-select: none;
        -webkit-user-drag: none;
    }

    ol {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    :global(.scrollephant[data-scrollephant-direction="vertical"])
        .scrollephant-dots {
        right: 0;
        top: 50%;
        transform: translateY(-50%);
    }

    :global(.scrollephant[data-scrollephant-direction="vertical"]) ol {
        display: grid;
    }

    :global(.scrollephant[data-scrollephant-direction="horizontal"])
        .scrollephant-dots {
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
    }

    :global(.scrollephant[data-scrollephant-direction="horizontal"]) ol {
        display: flex;
    }

    /* RTL */
    :global(
            html[dir="rtl"]
                .scrollephant[data-scrollephant-direction="vertical"]
        )
        .scrollephant-dots {
        right: initial;
        left: 0;
    }
</style>
