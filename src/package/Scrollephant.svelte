<script lang="ts">
	export let direction: "vertical" | "horizontal" = "vertical"
</script>

<div class="scrollephant scrollephant-{direction}">
    <slot />
</div>