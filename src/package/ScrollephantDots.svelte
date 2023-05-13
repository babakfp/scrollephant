<script lang="ts">
    import { getContext } from "svelte"
    import type { Writable } from "svelte/store"
    import type { Sections } from "./types.js"
    import ScrollephantTooltip from "./ScrollephantTooltip.svelte"

    const sections: Writable<Sections> = getContext("sections")
    const activeSectionNumber: Writable<number> = getContext(
        "activeSectionNumber"
    )
</script>

<nav class="scrollephant-dots">
    <ol>
        {#each $sections as section, i}
            <li data-scrollephant-current={i === $activeSectionNumber - 1}>
                <button on:click={() => ($activeSectionNumber = i + 1)}>
                    <div />
                </button>

                {#if section.label}
                    <ScrollephantTooltip content={section.label} />
                {/if}
            </li>
        {/each}
    </ol>
</nav>

<style>
    .scrollephant-dots {
        position: fixed;
        user-select: none;
        -webkit-user-drag: none;

        & ol {
            margin: 0;
            padding: 0;
            list-style: none;
        }

        & li {
            position: relative;
            display: flex;
        }

        & button {
            border: none;
            background: transparent;
            padding: 0;
            cursor: pointer;

            & div {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 1rem;
                height: 1rem;
                background: white;
                border-radius: 99px;
                transition: calc(var(--scrollephant-duration) / 2) ease-out;
                transform: scale(0.25);
            }

            &:hover div {
                transform: scale(0.5);
            }
        }

        & li[data-scrollephant-current="true"] button div {
            transform: scale(0.75);
        }
    }

    :global(.scrollephant[data-scrollephant-direction="vertical"])
        .scrollephant-dots {
        right: 0;
        top: 50%;
        transform: translateY(-50%);

        & ol {
            display: grid;
        }

        & button {
            padding: 0.25rem 1rem 0.25rem 0.25rem;
        }
    }

    :global(.scrollephant[data-scrollephant-direction="horizontal"])
        .scrollephant-dots {
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);

        & ol {
            display: flex;
        }

        & button {
            padding: 0.25rem 0.25rem 1rem 0.25rem;
        }
    }
</style>
