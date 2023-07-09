<script lang="ts">
    import { onMount, setContext, getContext } from "svelte"
    import { type Writable, get, writable } from "svelte/store"
    import type { Sections, SubSections, Props } from "./types.js"

    export let autoHeight = false
    export let label = ""
    export let isSubSectionWrapper = false

    const sections: Writable<Sections> = getContext("sections")
    const activeSectionNumber: Writable<number> = getContext(
        "activeSectionNumber"
    )
    const movement: Writable<Props["movement"]> = getContext("movement")
    const translateYSubSection: Writable<number> = getContext(
        "translateYSubSection"
    )
    const translateXSubSection: Writable<number> = getContext(
        "translateXSubSection"
    )
    const rtl: Writable<number> = getContext("rtl")
    const subSections = setContext("subSections", writable<SubSections>([]))

    let element: HTMLElement
    let id: number

    onMount(() => {
        sections.update(currentValue => {
            id = get(sections).length + 1
            const newSection = {
                id,
                ref: element,
                label,
                autoHeight,
                subSections: $subSections,
                isSubSectionWrapper,
            }
            return [...currentValue, newSection]
        })
    })
</script>

<div
    class="scrollephant-section"
    data-scrollephant-current={$activeSectionNumber === id}
    data-scrollephant-auto-height={autoHeight}
    data-scrollephant-is-subsection-wrapper={isSubSectionWrapper}
    data-scrollephant-id={id}
    bind:this={element}
    style:--scrollephant-translate-y-subsection="-{$movement === "scroll"
        ? $translateYSubSection
        : 0}px"
    style:--scrollephant-translate-x-subsection="{!$rtl
        ? "-"
        : ""}{$movement === "scroll" ? $translateXSubSection : 0}px"
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

    [data-scrollephant-auto-height="true"] {
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

    .scrollephant-section-inner {
        width: 100%;
        height: 100%;
    }

    :global(.scrollephant[data-scrollephant-movement="fade"])
        .scrollephant-section {
        position: absolute;
        inset: 0;
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

    /* --- */

    .scrollephant-section-inner {
        display: flex;
        transition-property: transform;
        transition-duration: var(--scrollephant-duration);
        transition-timing-function: var(--scrollephant-timing-function);
    }

    :global(.scrollephant[data-scrollephant-direction="vertical"])
        .scrollephant-section-inner {
        transform: translateX(var(--scrollephant-translate-x-subsection));
    }

    :global(.scrollephant[data-scrollephant-direction="horizontal"])
        .scrollephant-section-inner {
        flex-direction: column;
        transform: translateY(var(--scrollephant-translate-y-subsection));
    }

    :global(.scrollephant[data-scrollephant-movement="fade"])
        .scrollephant-section-inner {
        position: relative;
        display: block;
        height: 100vh;
        height: 100dvh;
        width: 100vw;
        width: 100dvw;
    }
</style>
