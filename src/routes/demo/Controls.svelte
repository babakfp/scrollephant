<script lang="ts">
    import type { Writable } from "svelte/store"
    import type { ControlsType } from "./types.js"
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

    let isControlsOpen = false

    controls.subscribe(_controls => {
        $sections = $sections.map((section, i) => {
            section.label = _controls.sections[i].label
            section.autoHeight = _controls.sections[i].autoHeight
            section.subsections = section.subsections.map((subsection, i2) => {
                section.label = _controls.sections[i].subsections[i2].label
                section.autoHeight =
                    _controls.sections[i].subsections[i2].autoHeight
                return subsection
            })
            return section
        })
    })

    const buttonClasses =
        "rounded-md bg-indigo-600 px-3.5 h-10 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
</script>

<div class="fixed top-0 left-0 bottom-0 p-4 grid gap-4">
    <button
        class="justify-self-start {buttonClasses}"
        on:click={() => (isControlsOpen = !isControlsOpen)}>Settings</button
    >

    {#if isControlsOpen}
        <div class="bg-white rounded-md grid gap-4 h-full overflow-y-auto p-4">
            <ul class="grid gap-4">
                <li class="p-4 bg-gray-100 rounded-md">
                    <p><code>{"<Scrollephant />"}</code> options</p>
                    <ul class="mt-4">
                        <li>
                            <select bind:value={$movement}>
                                <option value="scroll">Scroll</option>
                                <option value="fade">Fade</option>
                            </select>
                        </li>
                        <li>
                            <select bind:value={$direction}>
                                <option value="vertical">Vertical</option>
                                <option value="horizontal">Horizontal</option>
                            </select>
                        </li>
                        <li>
                            <label>
                                <input type="checkbox" bind:checked={$loopUp} />
                                <span>Loop Up</span>
                            </label>
                        </li>
                        <li>
                            <label>
                                <input
                                    type="checkbox"
                                    bind:checked={$loopDown}
                                />
                                <span>Loop Down</span>
                            </label>
                        </li>
                        <li>
                            <label>
                                <input
                                    type="checkbox"
                                    bind:checked={$restrictMovement}
                                />
                                <span>Restrict Movement</span>
                            </label>
                        </li>
                        <li>
                            <label>
                                <input
                                    type="checkbox"
                                    bind:checked={$scrollableSubsections}
                                />
                                <span>Scrollable Sub Sections</span>
                            </label>
                        </li>
                    </ul>
                </li>
                <li>
                    <ul>
                        {#each $controls.sections as section}
                            <li>
                                <label>Label</label>
                                <input type="text" bind:value={section.label} />
                            </li>
                            <li>
                                <div>
                                    <input
                                        type="checkbox"
                                        bind:checked={section.autoHeight}
                                    />
                                    <span>Auto Height</span>
                                </div>
                            </li>
                            <li>
                                <label>Text Content</label>
                                <input
                                    type="text"
                                    bind:value={section.textContent}
                                />
                            </li>
                            {#if section?.subsections?.length}
                                <li>
                                    <ul>
                                        {#each section.subsections as subsection}
                                            <li>
                                                <label>Label</label>
                                                <input
                                                    type="text"
                                                    bind:value={subsection.label}
                                                />
                                            </li>
                                            <li>
                                                <div>
                                                    <input
                                                        type="checkbox"
                                                        bind:checked={subsection.autoHeight}
                                                    />
                                                    <span>Auto Height</span>
                                                </div>
                                            </li>
                                            <li>
                                                <label>Text Content</label>
                                                <input
                                                    type="text"
                                                    bind:value={subsection.textContent}
                                                />
                                            </li>
                                        {/each}
                                    </ul>
                                </li>
                            {/if}
                            <button
                                class={buttonClasses}
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
                            </button>
                        {/each}
                    </ul>
                </li>
                <li>
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
                </li>
            </ul>
        </div>
    {/if}
</div>

<style lang="postcss">
    input,
    select {
        @apply h-10 rounded-md px-3.5;
    }
    input:not([type="checkbox"]),
    select {
        width: 100%;
    }
    ul {
        display: grid;
        gap: 1rem;
    }
    li > label {
        @apply flex gap-4 items-center;
    }
</style>
