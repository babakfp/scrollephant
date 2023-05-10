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
        position: fixed;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        user-select: none;
        -webkit-user-drag: none;

        & ol {
            display: grid;
            list-style: none;
            margin: 0;
        }

        & button {
            border: none;
            background: transparent;
            padding: 0;

            display: flex;
            align-items: center;
            justify-content: center;
            width: 2rem;
            height: 1.25rem;
            cursor: pointer;

            @media (min-width: 640px) {
                width: 2.5rem;
                height: 1.5rem;
                padding-right: 0.5rem;
            }

            @media (min-width: 1280px) {
                padding-right: 1rem;
            }

            & div {
                width: 0.25rem;
                height: 0.25rem;
                background: white;
                border-radius: 99px;
                transition: 100ms ease-in-out;
            }

            &:hover div {
                width: 0.5rem;
                height: 0.5rem;
            }
        }

        & li[data-current="true"] button div {
            width: 0.75rem;
            height: 0.75rem;
        }
    }
</style>
