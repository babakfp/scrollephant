<script lang="ts">
    import { onMount } from "svelte"
    import { swipe, type SwipeEvent } from "./swipe.js"
    import type { Section } from "./types.js"
    import {
        movement as _movement,
        direction as _direction,
        loopUp as _loopUp,
        loopDown as _loopDown,
        restrictMovement as _restrictMovement,
        scrollableSubsections as _scrollableSubsections,
        rtl,
        sections,
        currentSectionNumber,
        isMoving,
    } from "./stores.js"
    import { moveForward, moveBackward, getDuration, getRTL } from "./utils.js"

    export let movement = _movement
    export let direction = _direction
    export let loopUp = _loopUp
    export let loopDown = _loopDown
    export let restrictMovement = _restrictMovement
    export let scrollableSubsections = _scrollableSubsections

    // Added this code to get rid of this shit, lol!
    // Component has unused export property 'loopDown'. If it is for external reference only, please consider using `export const loopDown`svelte(unused-export-let)
    // TODO: Maybe this is fixed in Svelte v5?
    // THIS IS PROBLEMATIC, REMOVE IT AS SOON AS POSSIBLE!!!
    $: $_movement = $movement
    $: $_direction = $direction
    $: $_loopUp = $loopUp
    $: $_loopDown = $loopDown
    $: $_restrictMovement = $restrictMovement
    $: $_scrollableSubsections = $scrollableSubsections

    let element: HTMLElement

    onMount(() => {
        getRTL()
        getDuration(element)
    })

    let translateY = 0
    let translateX = 0

    $: if (!!$sections.length) {
        const { y, x } = getSectionYX($currentSectionNumber)
        translateY = y
        translateX = x
    }

    $: if (!!$sections.length) {
        const { y, x } = getSubsectionYX(
            $sections[$currentSectionNumber - 1],
            $sections[$currentSectionNumber - 1]?.currentSubsectionNumber
        )
        $sections[$currentSectionNumber - 1].translateY = y
        $sections[$currentSectionNumber - 1].translateX = x
    }

    function onWindowResize() {
        if (!!$sections.length) {
            const { y: ySection, x: xSection } = getSectionYX(
                $currentSectionNumber
            )
            translateY = ySection
            translateX = xSection

            const { y: ySubsection, x: xSubsection } = getSubsectionYX(
                $sections[$currentSectionNumber - 1],
                $sections[$currentSectionNumber - 1]?.currentSubsectionNumber
            )
            $sections[$currentSectionNumber - 1].translateY = ySubsection
            $sections[$currentSectionNumber - 1].translateX = xSubsection
        }
    }

    function handleSwipe(e: SwipeEvent) {
        if ($restrictMovement && $isMoving) return

        // TODO: I think `"left"` may be problematic on RTL.
        if (["up", "left"].includes(e.detail.direction)) {
            moveForward()
        } else {
            moveBackward()
        }
    }

    function handleMouseWheel(e: WheelEvent) {
        if ($restrictMovement && $isMoving) return

        if (isWheelingForward(e)) {
            moveForward()
        } else if (isWheelingBackward(e)) {
            moveBackward()
        }
    }

    function getSectionYX(currentSectionNumber: number) {
        let y = 0
        let x = 0

        for (let i = 0; i < currentSectionNumber - 1; i++) {
            if ($direction === "vertical") {
                if ($sections[i]?.autoHeight) {
                    y += $sections[i]?.ref.clientHeight
                } else {
                    y += $sections[i + 1]?.ref.clientHeight
                }
            } else if ($direction === "horizontal") {
                x += $sections[i]?.ref.clientWidth
            }
        }

        return { y, x }
    }

    function getSubsectionYX(
        section: Section,
        currentSubsectionNumber: number
    ) {
        let y = 0
        let x = 0

        if (!!section?.subsections.length) {
            for (let i = 0; i < currentSubsectionNumber - 1; i++) {
                if ($direction === "vertical") {
                    x += section.subsections[i]?.ref.clientWidth
                } else if ($direction === "horizontal") {
                    if (section.subsections[i]?.autoHeight) {
                        y += section.subsections[i]?.ref.clientHeight
                    } else {
                        y += section.subsections[i + 1]?.ref.clientHeight
                    }
                }
            }
        }

        return { y, x }
    }

    const isWheelingForward = (e: WheelEvent) => e.deltaY > 0
    const isWheelingBackward = (e: WheelEvent) => e.deltaY < 0

    $: styleTranslateY = `-${$movement === "scroll" ? translateY : 0}px`
    $: styleTranslateX = `${!$rtl ? "-" : ""}${
        $movement === "scroll" ? translateX : 0
    }px`
</script>

<svelte:window on:resize={onWindowResize} />

<div
    class="scrollephant"
    data-scrollephant-movement={$movement}
    data-scrollephant-direction={$direction}
    style:--scrollephant-translate-y={styleTranslateY}
    style:--scrollephant-translate-x={styleTranslateX}
    on:wheel|preventDefault={handleMouseWheel}
    use:swipe
    on:swipe={handleSwipe}
    bind:this={element}
>
    <slot />
</div>

<style>
    :global(body) {
        margin: 0;
        overflow: hidden;
    }

    .scrollephant {
        --scrollephant-duration: 700ms;
        --scrollephant-timing-function: ease-out;
        position: relative;
        overflow: hidden;
    }
</style>
