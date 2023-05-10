/**
 * @name: Svelte Swipe
 * @version: 0.0.1
 * @inspiration https://github.com/john-doherty/swiped-events. v1.1.7 - 10 May 2023
 */

import type { ActionReturn } from "svelte/action"

interface Attributes {
    "on:swipe": (e: SwipeEvent) => void
}

export interface SwipeEvent extends Event {
    target: EventTarget
    detail: {
        direction: "up" | "right" | "down" | "left"
        touchType: "direct" | "stylus" | "indirect" | undefined
        xStart: number
        xEnd: number
        yStart: number
        yEnd: number
    }
}

interface ExtendedTouch extends Touch {
    touchType?: string
}

interface Options {
    thresholdSize?: number
    thresholdUnit?: "px" | "vw" | "vh"
    timeout?: number
}

export function swipe(
    element: HTMLElement,
    options?: Options
): ActionReturn<undefined, Attributes> {
    const mergedOptions = {
        ...{
            thresholdSize: 20,
            thresholdUnit: "px",
            timeout: 500,
        },
        ...options,
    }

    // Setup goes here
    let touchStartTarget: EventTarget
    let touchStartTime: number | null
    let touchStartClientX: number | null
    let touchStartClientY: number | null
    let clientXDifference: number
    let clientYDifference: number

    element.addEventListener("touchstart", handleTouchStart, false)
    element.addEventListener("touchmove", handleTouchMove, false)
    element.addEventListener("touchend", handleTouchEnd, false)

    // Records current location on touchstart event
    function handleTouchStart(e: TouchEvent) {
        // We stop listening for swipe events
        if (
            element.getAttribute("data-swipe-events") === "none" ||
            getComputedStyle(element).touchAction === "none"
        )
            return

        touchStartTarget = e.target!
        touchStartTime = Date.now()
        touchStartClientX = e.touches[0].clientX
        touchStartClientY = e.touches[0].clientY
        clientXDifference = 0
        clientYDifference = 0
    }

    // Records location diff in px on touchmove event
    function handleTouchMove(e: TouchEvent) {
        if (!touchStartClientX || !touchStartClientY) return

        clientXDifference = touchStartClientX - e.touches[0].clientX
        clientYDifference = touchStartClientY - e.touches[0].clientY
    }

    // Fires swipe event if swipe detected on touchend
    function handleTouchEnd(e: TouchEvent) {
        // If the user released on a different target, cancel!
        if (e.target !== touchStartTarget) return

        let thresholdSize = mergedOptions.thresholdSize
        const timeDifference = Date.now() - touchStartTime!
        let swipeDirection = ""
        const changedTouches = e.changedTouches || e.touches || []

        if (mergedOptions.thresholdUnit === "vh") {
            thresholdSize = Math.round(
                (thresholdSize / 100) * document.documentElement.clientHeight
            ) // get percentage of viewport height in pixels
        }
        if (mergedOptions.thresholdUnit === "vw") {
            thresholdSize = Math.round(
                (thresholdSize / 100) * document.documentElement.clientWidth
            ) // get percentage of viewport height in pixels
        }

        if (Math.abs(clientXDifference) > Math.abs(clientYDifference)) {
            // most significant
            if (
                Math.abs(clientXDifference) > thresholdSize &&
                timeDifference < mergedOptions.timeout
            ) {
                if (clientXDifference > 0) {
                    swipeDirection = "left"
                } else {
                    swipeDirection = "right"
                }
            }
        } else if (
            Math.abs(clientYDifference) > thresholdSize &&
            timeDifference < mergedOptions.timeout
        ) {
            if (clientYDifference > 0) {
                swipeDirection = "up"
            } else {
                swipeDirection = "down"
            }
        }

        if (swipeDirection !== "") {
            element.dispatchEvent(
                new CustomEvent("swipe", {
                    bubbles: true,
                    cancelable: true,
                    detail: {
                        direction: swipeDirection,
                        touchType:
                            ((changedTouches[0] as ExtendedTouch) || {})
                                .touchType || undefined,
                        xStart: touchStartClientX,
                        xEnd: (changedTouches[0] || {}).clientX || -1,
                        yStart: touchStartClientY,
                        yEnd: (changedTouches[0] || {}).clientY || -1,
                    },
                })
            )
        }

        // reset values
        touchStartClientX = null
        touchStartClientY = null
        touchStartTime = null
    }

    return {
        destroy() {
            // ...Cleanup goes here
            element.removeEventListener("touchstart", handleTouchStart, false)
            element.removeEventListener("touchmove", handleTouchMove, false)
            element.removeEventListener("touchend", handleTouchEnd, false)
        },
    }
}
