<script lang="ts">
    import { onMount, setContext } from "svelte"
    import { writable } from "svelte/store"
    import type { SubSections } from "./types.js"
    import { movement, rtl, sections, activeSectionNumber } from "./stores.js"

    export let label = ""
    export let autoHeight = false

    const subSections = setContext("subSections", writable<SubSections>([]))

    let element: HTMLElement
    const id = crypto.randomUUID()

    if (autoHeight && $movement === "fade") {
        console.warn(
            "Using the autoHeight prop in conjunction with the movement prop set to fade is not logically meaningful and should be avoided."
        )
        autoHeight = false
    }

    $: if ($movement === "fade" && $subSections.length > 0) {
        throw new Error(
            "Using sub-sections with the movement prop set to fade is not logically meaningful and should be avoided."
        )
    }

    onMount(() => {
        sections.update(currentValue => {
            const newSection = {
                id,
                ref: element,
                label,
                autoHeight,
                subSections: $subSections,
                translateY: 0,
                translateX: 0,
                activeSubSectionNumber: 1,
            }
            return [...currentValue, newSection]
        })
    })

    $: translateY = $sections.filter(section => section.id === id)[0]
        ?.translateY
    $: translateX = $sections.filter(section => section.id === id)[0]
        ?.translateX

    $: isCurrent = $sections[$activeSectionNumber - 1]?.id === id
</script>

<div
    class="scrollephant-section"
    data-scrollephant-current={isCurrent}
    data-scrollephant-auto-height={autoHeight}
    data-scrollephant-have-subsection={$subSections.length > 0}
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
    .scrollephant-section:not([data-scrollephant-auto-height="true"]) {
        height: 100vh;
        height: 100dvh;
    }

    .scrollephant-section[data-scrollephant-auto-height="true"] {
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
        [data-scrollephant-current="true"] {
        opacity: 1;
        visibility: visible;
        pointer-events: all;
        z-index: 1;
    }

    :global(.scrollephant[data-scrollephant-movement="fade"])
        [data-scrollephant-current="true"]
        .scrollephant-section-inner {
        opacity: 1;
        visibility: visible;
        pointer-events: all;
        transform: scale(1);
    }
</style>
