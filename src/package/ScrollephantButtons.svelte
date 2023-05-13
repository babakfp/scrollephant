<nav class="scrollephant-buttons">
    <button class="scrollephant-buttons-prev">
        <!-- prettier-ignore -->
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18"/></svg>
    </button>
    <button class="scrollephant-buttons-next">
        <!-- prettier-ignore -->
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3"/></svg>
    </button>
</nav>

<style>
    .scrollephant-buttons {
        position: fixed;
        right: 0;
        top: 0;
        bottom: 0;
        display: grid;
        align-content: space-between;

        & button {
            border: none;
            background: transparent;
            padding: 0;
            cursor: pointer;
            padding: 1rem 1rem 1rem 0.25rem;

            &[data-scrollephant-disabled="true"] {
                opacity: 50;
                pointer-events: none;
            }
        }

        & svg {
            width: 1.25em;
            color: white;
        }
    }

    .scrollephant-buttons-prev {
        padding-bottom: 0.5rem;
    }
    .scrollephant-buttons-next {
        padding-top: 0.5rem;
    }
</style>
