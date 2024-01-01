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
</script>

<div class="controls-wrapper">
    <button
        class="controls-toggle"
        on:click={() => (isControlsOpen = !isControlsOpen)}
    >
        Settings
    </button>
    {#if isControlsOpen}
        <ul class="controls">
            <li>
                <ul>
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
                        <div>
                            <input type="checkbox" bind:checked={$loopUp} />
                            <span>Loop Up</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <input type="checkbox" bind:checked={$loopDown} />
                            <span>Loop Down</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <input
                                type="checkbox"
                                bind:checked={$restrictMovement}
                            />
                            <span>Restrict Movement</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <input
                                type="checkbox"
                                bind:checked={$scrollableSubsections}
                            />
                            <span>Scrollable Sub Sections</span>
                        </div>
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
                        <div>
                            <input
                                type="checkbox"
                                bind:checked={$controls.arrowPrev}
                            />
                            <span>Arrow Prev</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <input
                                type="checkbox"
                                bind:checked={$controls.dots}
                            />
                            <span>Dots</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <input
                                type="checkbox"
                                bind:checked={$controls.arrowNext}
                            />
                            <span>Arrow Next</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <input
                                type="checkbox"
                                bind:checked={$controls.useSubsectionsDots}
                            />
                            <span>Use Subsections Dots</span>
                        </div>
                    </li>
                </ul>
            </li>
        </ul>
    {/if}
</div>

<style>
    .controls-wrapper {
        position: fixed;
        left: 0;
        top: 0;
        display: grid;
        gap: 1rem;
        max-height: 100vh;
        max-height: 100dvh;
        overflow-y: auto;
        background: white;
        padding: 1rem;
    }
    .controls {
        display: grid;
        gap: 1rem;
    }
    input:not([type="checkbox"]),
    select {
        width: 100%;
    }
    ul {
        display: grid;
        gap: 1rem;
    }
</style>
