<script lang="ts">
    export let direction: "vertical" | "horizontal" = "vertical"
</script>

<div class="scrollephant" data-direction={direction}>
    <slot />
</div>
