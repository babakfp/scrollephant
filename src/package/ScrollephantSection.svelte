<script lang="ts">
    import { onMount, onDestroy, setContext } from "svelte"
    import { writable } from "svelte/store"
    import type { Subsections } from "./types.js"
    import { movement, rtl, sections, currentSectionNumber } from "./stores.js"
    import { addSection, deleteSectionById } from "./utils.js"

    export let label = ""
    export let autoHeight = false

    const subsections = setContext("subsections", writable<Subsections>([]))

    let element: HTMLElement
    const id = crypto.randomUUID()

    if (autoHeight && $movement === "fade") {
        console.warn(
            "Using the autoHeight prop in conjunction with the movement prop set to fade is not logically meaningful and should be avoided."
        )
        autoHeight = false
    }

    subsections.subscribe(_subsections => {
        sections.update(_sections =>
            _sections.map(section => {
                if (section.id === id) {
                    section.subsections = _subsections
                }
                return section
            })
        )
    })

    onMount(() => {
        addSection(id, element, label, autoHeight, $subsections)
    })

    onDestroy(() => {
        deleteSectionById(id)
    })

    $: translateY = $sections.find(section => section.id === id)?.translateY
    $: translateX = $sections.find(section => section.id === id)?.translateX
    $: isCurrent = $sections[$currentSectionNumber - 1]?.id === id
</script>

<div
    class="scrollephant-section"
    data-scrollephant-is-current-section={isCurrent}
    data-scrollephant-section-auto-height={autoHeight}
    data-scrollephant-section-has-subsections={!!$subsections.length}
    bind:this={element}
    style:--scrollephant-translate-y="-{$movement === "scroll"
        ? translateY
        : 0}px"
    style:--scrollephant-translate-x="{!$rtl ? "-" : ""}{$movement === "scroll"
        ? translateX
        : 0}px"
>
    <div class="scrollephant-section-inner">
        <slot />
    </div>
</div>

<style>
    .scrollephant-section[data-scrollephant-section-auto-height="false"] {
        height: 100vh;
        height: 100dvh;
    }

    .scrollephant-section[data-scrollephant-section-auto-height="true"] {
        max-height: 100vh;
        max-height: 100dvh;
    }

    :global(.scrollephant[data-scrollephant-direction="horizontal"])
        .scrollephant-section {
        width: 100vw;
        width: 100dvw;
        /* Prevent width shrinks. Inforce full view size. */
        flex-shrink: 0;
    }

    :global(.scrollephant[data-scrollephant-movement="fade"])
        .scrollephant-section {
        width: 100%;
    }

    .scrollephant-section-inner {
        width: 100%;
        height: 100%;
    }

    :global(.scrollephant[data-scrollephant-movement="fade"])
        .scrollephant-section {
        position: absolute;
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transition: var(--scrollephant-duration) ease-in-out;
    }

    :global(.scrollephant[data-scrollephant-movement="fade"])
        .scrollephant-section-inner {
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transition: calc(var(--scrollephant-duration) / 2) ease-in;
        transform: scale(0.75);
    }

    :global(.scrollephant[data-scrollephant-movement="fade"])
        [data-scrollephant-is-current-section="true"] {
        opacity: 1;
        visibility: visible;
        pointer-events: all;
        z-index: 1;
    }

    :global(.scrollephant[data-scrollephant-movement="fade"])
        [data-scrollephant-is-current-section="true"]
        .scrollephant-section-inner {
        opacity: 1;
        visibility: visible;
        pointer-events: all;
        transform: scale(1);
    }
</style>
