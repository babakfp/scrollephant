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

export function swipe(
    element: HTMLElement
): ActionReturn<undefined, Attributes> {
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

        let swipeThreshold = Number(
            getClosestAttribute(
                touchStartTarget as HTMLElement,
                "data-swipe-threshold",
                20
            )
        )
        const swipeUnit = getClosestAttribute(
            touchStartTarget as HTMLElement,
            "data-swipe-unit",
            "px"
        )
        const swipeTimeout = Number(
            getClosestAttribute(
                touchStartTarget as HTMLElement,
                "data-swipe-timeout",
                500
            )
        )
        const timeDifference = Date.now() - touchStartTime!
        let swipeDirection = ""
        const changedTouches = e.changedTouches || e.touches || []

        if (swipeUnit === "vh") {
            swipeThreshold = Math.round(
                (swipeThreshold / 100) * document.documentElement.clientHeight
            ) // get percentage of viewport height in pixels
        }
        if (swipeUnit === "vw") {
            swipeThreshold = Math.round(
                (swipeThreshold / 100) * document.documentElement.clientWidth
            ) // get percentage of viewport height in pixels
        }

        if (Math.abs(clientXDifference) > Math.abs(clientYDifference)) {
            // most significant
            if (
                Math.abs(clientXDifference) > swipeThreshold &&
                timeDifference < swipeTimeout
            ) {
                if (clientXDifference > 0) {
                    swipeDirection = "left"
                } else {
                    swipeDirection = "right"
                }
            }
        } else if (
            Math.abs(clientYDifference) > swipeThreshold &&
            timeDifference < swipeTimeout
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

    // Gets attribute off HTML element or nearest parent
    function getClosestAttribute(
        targetElement: HTMLElement,
        attributeName: string,
        defaultValue: string | number
    ): string | number {
        const closestElement = targetElement.closest(`[${attributeName}]`)

        if (!closestElement || closestElement === document.documentElement) {
            return defaultValue
        }

        const AttributeValue = closestElement?.getAttribute(attributeName)

        if (AttributeValue) return AttributeValue

        return defaultValue
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
