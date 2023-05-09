<script lang="ts">
    import { getContext } from "svelte"
    import type { Writable } from "svelte/store"

    const numberOfSections: Writable<number> = getContext("numberOfSections")
    const activeSectionNumber: Writable<number> = getContext(
        "activeSectionNumber"
    )
</script>

<nav class="scrollephant-dots">
    <ol>
        {#each Array($numberOfSections) as _, i}
            <li data-current={i === $activeSectionNumber - 1}>
                <button on:click={() => ($activeSectionNumber = i + 1)}>
                    <div />
                </button>
            </li>
        {/each}
    </ol>
</nav>

<style>
    .scrollephant-dots {
        --scrollephant-dot-size: 1rem;
        --scrollephant-dot-action-size: 0.25rem;
        --scrollephant-dot-action-hover-size: 0.5rem;
        --scrollephant-dot-action-active-size: 0.75rem;

        position: fixed;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        user-select: none;
        -webkit-user-drag: none;
    }
    .scrollephant-dots ol {
        display: grid;
        list-style: none;
        margin: 0;
    }
    .scrollephant-dots button {
        border: none;
        background: transparent;
        padding: 0;

        display: flex;
        align-items: center;
        justify-content: center;
        width: calc(var(--scrollephant-dot-size) + 1.5rem);
        height: calc(var(--scrollephant-dot-size) + 0.5rem);
        padding-right: 0.5rem;
        cursor: pointer;
    }
    .scrollephant-dots button:hover div {
        width: var(--scrollephant-dot-action-hover-size);
        height: var(--scrollephant-dot-action-hover-size);
    }
    .scrollephant-dots button div {
        width: var(--scrollephant-dot-action-size);
        height: var(--scrollephant-dot-action-size);
        background: white;
        border-radius: 99px;
        transition: 100ms ease-in-out;
    }
    .scrollephant-dots li[data-current="true"] button div {
        width: var(--scrollephant-dot-action-active-size);
        height: var(--scrollephant-dot-action-active-size);
    }
    @media (max-width: 640px) {
        .scrollephant-dots button {
            width: calc(var(--scrollephant-dot-size) + 1rem);
            height: calc(var(--scrollephant-dot-size) + 0.25rem);
            padding-right: 0;
        }
    }
</style>
