<script lang="ts">
    import { onMount } from "svelte"
    import { swipe, type SwipeEvent } from "./swipe.js"
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
    import {
        moveForward,
        moveBackward,
        getDuration,
        getRTL,
        getSectionWrapperPositions,
        getSubsectionWrapperPositions,
        moveOnMouseWheel,
    } from "./utils.js"

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
        const { y, x } = getSectionWrapperPositions()
        translateY = y
        translateX = x
    }

    $: if (!!$sections.length) {
        const { y, x } = getSubsectionWrapperPositions(
            $sections[$currentSectionNumber - 1],
            $sections[$currentSectionNumber - 1]?.currentSubsectionNumber
        )
        $sections[$currentSectionNumber - 1].translateY = y
        $sections[$currentSectionNumber - 1].translateX = x
    }

    function onWindowResize() {
        if (!!$sections.length) {
            const { y: ySection, x: xSection } = getSectionWrapperPositions()
            translateY = ySection
            translateX = xSection

            const { y: ySubsection, x: xSubsection } =
                getSubsectionWrapperPositions(
                    $sections[$currentSectionNumber - 1],
                    $sections[$currentSectionNumber - 1]
                        ?.currentSubsectionNumber
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
    on:wheel|preventDefault={moveOnMouseWheel}
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
