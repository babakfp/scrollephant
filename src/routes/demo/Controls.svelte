<script lang="ts">
    import type { Writable } from "svelte/store"
    import type { ControlsType } from "./types.js"
    import { persisted } from "svelte-persisted-store"
    import {
        movement,
        direction,
        loopUp,
        loopDown,
        restrictMovement,
        scrollableSubsections,
        sections,
    } from "../../package/stores.js"

    export let controls: Writable<ControlsType>

    let isControlsOpen = persisted("isControlsOpen", false)

    controls.subscribe(_controls => {
        $sections = $sections.map((section, i) => {
            section.label = _controls.sections[i].label
            section.autoHeight = _controls.sections[i].autoHeight
            // section.subsections = section.subsections.map((subsection, i2) => {
            //     section.label = _controls.sections[i].subsections[i2].label
            //     section.autoHeight =
            //         _controls.sections[i].subsections[i2].autoHeight
            //     return subsection
            // })
            return section
        })
    })

    const insertItemAtIndex = (array: any[], item: any, index: number) => {
        // Create a copy of the original array to avoid modifying it directly
        const newArray = [...array]
        // Use splice to insert the item at the specified index
        newArray.splice(index, 0, item)
        // Return the modified array
        return newArray
    }
</script>

<div class="fixed top-0 left-0 bottom-0 p-4 grid gap-4 text-sm">
    <button
        class="justify-self-start"
        on:click={() => ($isControlsOpen = !$isControlsOpen)}>Settings</button
    >

    {#if $isControlsOpen}
        <div class="bg-white rounded-md h-full overflow-y-auto p-4">
            <p><code>{"<Scrollephant />"}</code> options</p>
            <div class="p-4 bg-gray-50 rounded-md mt-2">
                <select bind:value={$movement}>
                    <option value="scroll">Scroll</option>
                    <option value="fade">Fade</option>
                </select>
                <select class="mt-2" bind:value={$direction}>
                    <option value="vertical">Vertical</option>
                    <option value="horizontal">Horizontal</option>
                </select>
                <label class="mt-4">
                    <input type="checkbox" bind:checked={$loopUp} />
                    <span>Loop Up</span>
                </label>
                <label class="mt-2">
                    <input type="checkbox" bind:checked={$loopDown} />
                    <span>Loop Down</span>
                </label>
                <label class="mt-2">
                    <input type="checkbox" bind:checked={$restrictMovement} />
                    <span>Restrict Movement</span>
                </label>
                <label class="mt-2">
                    <input
                        type="checkbox"
                        bind:checked={$scrollableSubsections}
                    />
                    <span>Scrollable Sub Sections</span>
                </label>
            </div>

            <div class="grid gap-4 mt-4">
                {#each $controls.sections as section, sectionIndex}
                    <p>Section</p>

                    <div class="grid gap-4 p-4 bg-gray-50 rounded-md">
                        <label>
                            <span>Label</span>
                            <input type="text" bind:value={section.label} />
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                bind:checked={section.autoHeight}
                            />
                            <span>Auto Height</span>
                        </label>
                        <label>
                            <span>Text Content</span>
                            <input
                                type="text"
                                bind:value={section.textContent}
                            />
                        </label>
                    </div>

                    {#each section.subsections as subsection}
                        <p class="ml-8">Subsection</p>

                        <div class="grid gap-4 p-4 bg-gray-50 rounded-md ml-8">
                            <label>
                                <span>Label</span>
                                <input
                                    type="text"
                                    bind:value={subsection.label}
                                />
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    bind:checked={subsection.autoHeight}
                                />
                                <span>Auto Height</span>
                            </label>
                            <label>
                                <span>Text Content</span>
                                <input
                                    type="text"
                                    bind:value={subsection.textContent}
                                />
                            </label>
                        </div>
                    {/each}
                    <!-- <button
                        on:click={() => {
                            const newSubsection = {
                                label: "",
                                autoHeight: false,
                                textContent: "",
                                subsections: [],
                            }
                            if (!section?.subsections) {
                                section.subsections = [newSubsection]
                            } else {
                                section.subsections.push(newSubsection)
                            }
                        }}
                    >
                        Add subsection
                    </button> -->

                    <button
                        on:click={() => {
                            const newSectionDestinationIndex = sectionIndex + 1
                            controls.update(_controls => {
                                _controls.sections = insertItemAtIndex(
                                    _controls.sections,
                                    {
                                        label: "New section",
                                        autoHeight: false,
                                        textContent: "New section",
                                        subsections: [],
                                    },
                                    newSectionDestinationIndex
                                )
                                return _controls
                            })
                        }}
                    >
                        Add section
                    </button>
                {/each}
            </div>

            <!-- <li>
                    <ul>
                        <li>
                            <label>
                                <input
                                    type="checkbox"
                                    bind:checked={$controls.arrowPrev}
                                />
                                <span>Arrow Prev</span>
                            </label>
                        </li>
                        <li>
                            <label>
                                <input
                                    type="checkbox"
                                    bind:checked={$controls.dots}
                                />
                                <span>Dots</span>
                            </label>
                        </li>
                        <li>
                            <label>
                                <input
                                    type="checkbox"
                                    bind:checked={$controls.arrowNext}
                                />
                                <span>Arrow Next</span>
                            </label>
                        </li>
                        <li>
                            <label>
                                <input
                                    type="checkbox"
                                    bind:checked={$controls.useSubsectionsDots}
                                />
                                <span>Use Subsections Dots</span>
                            </label>
                        </li>
                    </ul>
                </li> -->
        </div>
    {/if}
</div>

<style lang="postcss">
    button {
        @apply rounded-md bg-indigo-600 px-3.5 h-10 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600;
    }
    input:not([type="checkbox"]),
    select {
        @apply h-10 rounded-md px-3.5 border-2 border-gray-200;
    }
    input:not([type="checkbox"]),
    select {
        width: 100%;
    }
    select {
        @apply appearance-none cursor-pointer;
    }
    input[type="checkbox"] {
        @apply w-4 h-4;
    }
    label:has(input[type="checkbox"]) {
        @apply flex gap-2 items-center cursor-pointer;
    }
    label:not(:has(input[type="checkbox"])) {
        @apply grid gap-0.5;
    }
</style>
