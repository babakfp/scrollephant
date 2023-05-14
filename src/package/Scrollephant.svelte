<script lang="ts">
    import { onMount, setContext } from "svelte"
    import { writable } from "svelte/store"
    import type { Sections } from "./types.js"
    import { swipe, type SwipeEvent } from "./swipe.js"
    import { moveForward, moveBackward } from "./utils.js"

    export let mode: "scroll" | "fade" = "scroll"
    export let direction: "vertical" | "horizontal" = "vertical"
    export let loopFromStart = false
    export let loopFromEnd = false

    setContext("mode", mode)
    setContext("direction", direction)
    setContext("loopFromStart", loopFromStart)
    setContext("loopFromEnd", loopFromEnd)

    const sections = setContext("sections", writable<Sections>([]))
    const activeSectionNumber = setContext("activeSectionNumber", writable(1))

    let rtl = false

    onMount(() => {
        if (document.dir === "rtl") {
            rtl = true
        }
    })

    let translateY = 0
    let translateX = 0

    $: {
        const { y, x } = getYX($activeSectionNumber)
        translateY = y
        translateX = x
    }

    function onWindowResize() {
        const { y, x } = getYX($activeSectionNumber)
        translateY = y
        translateX = x
    }

    function getYX(activeSectionNumber: number) {
        let y = 0
        let x = 0

        for (let i = 0; i < activeSectionNumber - 1; i++) {
            if (direction === "vertical") {
                if ($sections[i]?.autoHeight) {
                    y += $sections[i]?.ref.clientHeight
                } else {
                    y += $sections[i + 1]?.ref.clientHeight
                }
            } else if (direction === "horizontal") {
                x += $sections[i]?.ref.clientWidth
            }
        }

        return {
            y,
            x,
        }
    }

    function handleSwipe(e: SwipeEvent) {
        if (direction === "vertical") {
            if (e.detail.direction === "up") {
                moveForward(canMoveForward(), activeSectionNumber, loopFromEnd)
            }
            if (e.detail.direction === "down") {
                moveBackward(
                    canMoveBackward(),
                    activeSectionNumber,
                    sections,
                    loopFromStart
                )
            }
        }

        if (direction === "horizontal") {
            if (e.detail.direction === "left") {
                moveForward(canMoveForward(), activeSectionNumber, loopFromEnd)
            }
            if (e.detail.direction === "right") {
                moveBackward(
                    canMoveBackward(),
                    activeSectionNumber,
                    sections,
                    loopFromStart
                )
            }
        }
    }

    function handleMousewheel(e: WheelEvent) {
        if (isWheelingForward(e)) {
            moveForward(canMoveForward(), activeSectionNumber, loopFromEnd)
        } else if (isWheelingBackward(e)) {
            moveBackward(
                canMoveBackward(),
                activeSectionNumber,
                sections,
                loopFromStart
            )
        }
    }

    function canMoveForward() {
        if ($activeSectionNumber < $sections.length) {
            return true
        }
        return false
    }

    function canMoveBackward() {
        if ($activeSectionNumber > 1) {
            return true
        }
        return false
    }

    function isWheelingForward(e: WheelEvent) {
        return e.deltaY > 0
    }

    function isWheelingBackward(e: WheelEvent) {
        return e.deltaY < 0
    }
</script>

<svelte:window on:resize={onWindowResize} />

<div
    class="scrollephant"
    data-scrollephant-mode={mode}
    data-scrollephant-direction={direction}
    style:--scrollephant-translate-y="-{mode === "scroll" ? translateY : 0}px"
    style:--scrollephant-translate-x="{!rtl ? "-" : ""}{mode === "scroll"
        ? translateX
        : 0}px"
    on:wheel|preventDefault={handleMousewheel}
    use:swipe
    on:swipe={handleSwipe}
>
    <slot />
</div>

<style>
    .scrollephant {
        --scrollephant-duration: 700ms;
        --scrollephant-timing-function: ease-out;
        overflow: hidden;

        &[data-scrollephant-direction="vertical"] {
            --scrollephant-translate-y: 0;
        }
        &[data-scrollephant-direction="horizontal"] {
            --scrollephant-translate-x: 0;
        }
    }
</style>
