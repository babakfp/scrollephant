<script lang="ts">
    export let content: string
</script>

<div>{content}</div>

<style>
    div {
        position: absolute;
        background: white;
        border-radius: 0.5rem;
        padding: 0.5rem 0.75rem;
        white-space: nowrap;
        font-size: 0.75rem;
        opacity: 0;
        transition: 200ms ease-in;
        pointer-events: none;
        z-index: -1;
    }
    :global(.scrollephant-dots button:hover) + div {
        opacity: 1;
    }

    :global(.scrollephant[data-scrollephant-direction="vertical"]) div {
        right: 100%;
        top: 50%;
        transform: translateX(-0.75rem) translateY(-50%);
    }
    :global(.scrollephant[data-scrollephant-direction="horizontal"]) div {
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%) translateY(-0.75rem);
    }
</style>
